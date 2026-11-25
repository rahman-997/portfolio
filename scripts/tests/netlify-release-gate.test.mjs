import {test} from "node:test";
import assert from "node:assert/strict";
import {validateRelease} from "../netlify-release-gate.mjs";
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
