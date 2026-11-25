import {test} from "node:test";
import assert from "node:assert/strict";
import {runDependencyAudit} from "../dependency-audit-core.mjs";
async function simulate(results){
  let calls=0,waits=0;
  const outcome=await runDependencyAudit({run:()=>results[calls++],wait:async()=>{waits++}});
  return {...outcome,calls,waits};
}
test("successful advisory response passes",async()=>{
  assert.deepEqual(await simulate([{status:0}]),{status:"pass",attempts:1,exitCode:0,calls:1,waits:0});
});
test("reported vulnerabilities fail without retries",async()=>{
  assert.deepEqual(await simulate([{status:1,stdout:"1 high severity vulnerability"}]),{status:"failed",attempts:1,exitCode:1,calls:1,waits:0});
});
test("temporary advisory outage may recover",async()=>{
  assert.deepEqual(await simulate([{status:1,stderr:"503 Service Unavailable"},{status:0}]),{status:"pass",attempts:2,exitCode:0,calls:2,waits:1});
});
test("exhausted outage blocks release",async()=>{
  const failure={status:1,stderr:"audit endpoint returned an error"};
  assert.deepEqual(await simulate([failure,failure,failure]),{status:"unavailable",attempts:3,exitCode:1,calls:3,waits:2});
});
test("timeout and process errors never pass",async()=>{
  const timeout={status:null,error:{code:"ETIMEDOUT"}};
  assert.equal((await simulate([timeout,timeout,timeout])).exitCode,1);
  assert.equal((await simulate([{status:null,error:{code:"ENOENT"}}])).exitCode,1);
  assert.equal((await simulate([{status:0,signal:"SIGTERM"}])).exitCode,1);
});
