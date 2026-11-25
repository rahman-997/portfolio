import {readFileSync} from "node:fs";
import {pathToFileURL} from "node:url";

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
  const [runPath,branchPath]=process.argv.slice(2);
  const run=JSON.parse(readFileSync(runPath,"utf8"));
  const main=JSON.parse(readFileSync(branchPath,"utf8"));
  const sha=validateRelease({run,mainSha:main.commit?.sha,requestedSha:process.env.RELEASE_SHA,
    requestedRunId:process.env.CI_RUN_ID,repository:process.env.GITHUB_REPOSITORY,workflowSha:process.env.GITHUB_SHA});
  console.log("Authorized release evidence matches current main:",sha);
}
