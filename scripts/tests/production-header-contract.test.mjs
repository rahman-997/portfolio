import {test} from "node:test";
import assert from "node:assert/strict";
import {assessSecurityHeaders, REQUIRED_SECURITY_HEADERS} from "../production-header-contract.mjs";
const correct=()=>new Headers(REQUIRED_SECURITY_HEADERS);
test("all five required policy headers match exact normalized tokens",()=>{
  const headers=correct();headers.set("X-Frame-Options"," DENY ");
  assert.equal(assessSecurityHeaders(headers).status,"pass");
});
test("missing and contradictory values are not passed",()=>{
  const headers=correct();headers.delete("referrer-policy");
  headers.set("cross-origin-opener-policy","same-origin-allow-popups");
  headers.set("x-frame-options","DENY, SAMEORIGIN");
  const result=assessSecurityHeaders(headers);
  assert.equal(result.status,"incomplete");
  assert.equal(result.checks.find(x=>x.name==="referrer-policy").status,"missing");
  assert.equal(result.checks.find(x=>x.name==="cross-origin-opener-policy").status,"mismatch");
  assert.equal(result.checks.find(x=>x.name==="x-frame-options").status,"mismatch");
});
test("empty values do not masquerade as missing or accepted values",()=>{
  const headers=correct();headers.set("x-content-type-options","");
  assert.equal(assessSecurityHeaders(headers).checks[0].status,"mismatch");
});
