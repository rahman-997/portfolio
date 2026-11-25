import {test} from "node:test";
import assert from "node:assert/strict";
import {validateRelease, validateQualityEvidence, REQUIRED_WORKFLOWS} from "../netlify-release-gate.mjs";
const sha="a".repeat(40),repository="example/portfolio";
const run={id:123,head_sha:sha,head_branch:"main",event:"push",status:"completed",conclusion:"success",path:".github/workflows/ci.yml",head_repository:{full_name:repository},repository:{full_name:repository}};
const input={run,mainSha:sha,requestedSha:sha,requestedRunId:"123",repository,workflowSha:sha};
test("accepts exact successful main CI",()=>assert.equal(validateRelease(input),sha));
test("rejects stale, wrong or malformed identifiers",()=>{
  for(const patch of [{mainSha:"b".repeat(40)},{workflowSha:"b".repeat(40)},{requestedSha:"bad"},{requestedRunId:"0"},{requestedRunId:"124"}]) assert.throws(()=>validateRelease({...input,...patch}));
});
test("rejects other events, branches, repos, workflows and failures",()=>{
  for(const patch of [{event:"pull_request"},{head_branch:"feature"},{conclusion:"failure"},{status:"in_progress"},{path:".github/workflows/other.yml"},{head_repository:{full_name:"other/repo"}},{repository:{full_name:"other/repo"}},{head_sha:"b".repeat(40)}]) assert.throws(()=>validateRelease({...input,run:{...run,...patch}}));
});

const collection=()=>Object.fromEntries(REQUIRED_WORKFLOWS.map((path,i)=>[path,{
  total_count:1,workflow_runs:[{...run,path,id:123+i,run_number:10+i}]
}]));
const quality=(evidence)=>validateQualityEvidence({evidence,sha,repository,ciRunId:123});
test("requires all four successful workflows on exact SHA",()=>{
  assert.equal(quality(collection()).length,4);
  for(const path of REQUIRED_WORKFLOWS){
    const evidence=collection();delete evidence[path];
    assert.throws(()=>quality(evidence),/Missing or incomplete/);
  }
});
test("rejects newer incomplete or unsuccessful run instead of accepting older success",()=>{
  for(const patch of [{status:"in_progress",conclusion:null},{conclusion:"failure"},{conclusion:"cancelled"},{conclusion:"skipped"}]){
    const evidence=collection(),group=evidence[REQUIRED_WORKFLOWS[2]];
    group.workflow_runs.unshift({...group.workflow_runs[0],...patch,id:900,run_number:99});
    group.total_count=2;
    assert.throws(()=>quality(evidence),/Latest required workflow/);
  }
});
test("rejects foreign, stale, PR and partial evidence",()=>{
  for(const patch of [{head_sha:"b".repeat(40)},{head_branch:"feature"},{event:"pull_request"},{path:"wrong.yml"},{repository:{full_name:"other/repo"}}]){
    const evidence=collection();
    Object.assign(evidence[REQUIRED_WORKFLOWS[1]].workflow_runs[0],patch);
    assert.throws(()=>quality(evidence),/Unexpected workflow identity/);
  }
  const evidence=collection();evidence[REQUIRED_WORKFLOWS[3]].total_count=2;
  assert.throws(()=>quality(evidence),/Missing or incomplete/);
});
test("requires artifact CI to be latest eligible CI",()=>{
  const evidence=collection(),group=evidence[REQUIRED_WORKFLOWS[0]];
  group.workflow_runs.push({...group.workflow_runs[0],id:999,run_number:99});
  group.total_count=2;
  assert.throws(()=>quality(evidence),/Artifact must come/);
});
