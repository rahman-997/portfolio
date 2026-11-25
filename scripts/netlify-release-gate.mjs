import {readFileSync} from "node:fs";
import {pathToFileURL} from "node:url";

export const REQUIRED_WORKFLOWS = [
  ".github/workflows/ci.yml",
  ".github/workflows/security.yml",
  ".github/workflows/atlas-browser-qa.yml",
  ".github/workflows/portfolio-lighthouse.yml",
];

function matchingRun(run, path, sha, repository) {
  return run?.path===path && run.head_sha===sha && run.head_branch==="main" &&
    run.event==="push" && run.head_repository?.full_name===repository &&
    run.repository?.full_name===repository;
}

export function validateQualityEvidence({evidence, sha, repository, ciRunId}) {
  const approved = [];
  for (const path of REQUIRED_WORKFLOWS) {
    const collection = evidence?.[path];
    if (!collection || !Array.isArray(collection.workflow_runs) ||
        !Number.isInteger(collection.total_count) ||
        collection.total_count !== collection.workflow_runs.length ||
        collection.workflow_runs.length===0) {
      throw new Error("Missing or incomplete quality evidence: "+path);
    }
    const runs = collection.workflow_runs;
    if (runs.some(run => !matchingRun(run,path,sha,repository) ||
      !Number.isSafeInteger(run.run_number) || run.run_number<1 ||
      !Number.isSafeInteger(run.id) || run.id<1)) {
      throw new Error("Unexpected workflow identity: "+path);
    }
    // A later failed or unfinished run must not be hidden by an older success.
    const latest = [...runs].sort((a,b)=>b.run_number-a.run_number || b.id-a.id)[0];
    if (latest.status!=="completed" || latest.conclusion!=="success") {
      throw new Error("Latest required workflow is not successful: "+path);
    }
    if(path===REQUIRED_WORKFLOWS[0] && String(latest.id)!==String(ciRunId)) {
      throw new Error("Artifact must come from latest successful CI run");
    }
    approved.push({path,id:latest.id,runNumber:latest.run_number});
  }
  return approved;
}

export function validateRelease({run, mainSha, requestedSha, requestedRunId, repository, workflowSha}) {
  if (!/^[a-f0-9]{40}$/.test(requestedSha) || !/^[1-9][0-9]*$/.test(String(requestedRunId))) throw new Error("Invalid release identifiers");
  if (requestedSha!==mainSha || requestedSha!==workflowSha) throw new Error("Release must match current main and workflow SHA");
  if (String(run?.id)!==String(requestedRunId) || run.head_sha!==requestedSha ||
      run.head_branch!=="main" || run.event!=="push" || run.status!=="completed" ||
      run.conclusion!=="success" || run.path!==".github/workflows/ci.yml" ||
      run.head_repository?.full_name!==repository || run.repository?.full_name!==repository) {
    throw new Error("CI evidence is not a successful same-repository main push");
  }
  return requestedSha;
}

if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const [runPath,branchPath,evidencePath]=process.argv.slice(2);
  if (!runPath || !branchPath || !evidencePath) throw new Error("Complete release evidence is required");
  const run=JSON.parse(readFileSync(runPath,"utf8"));
  const main=JSON.parse(readFileSync(branchPath,"utf8"));
  const sha=validateRelease({run,mainSha:main.commit?.sha,requestedSha:process.env.RELEASE_SHA,
    requestedRunId:process.env.CI_RUN_ID,repository:process.env.GITHUB_REPOSITORY,workflowSha:process.env.GITHUB_SHA});
  const approved=validateQualityEvidence({evidence:JSON.parse(readFileSync(evidencePath,"utf8")),sha,
    repository:process.env.GITHUB_REPOSITORY,ciRunId:process.env.CI_RUN_ID});
  for (const item of approved) console.log("Required gate passed:",item.path,"run",item.id);
  console.log("Authorized release evidence matches current main:",sha);
}
