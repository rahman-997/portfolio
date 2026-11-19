import test from "node:test";
import assert from "node:assert/strict";
import {
  BROWSER_SUITES, REQUIRED_FULL_STEPS, isSafeReviewBranch, assessQa,
} from "../qa-gate-policy.mjs";

const sha = "a".repeat(40);
test("only a clean, named non-production Git branch can run full QA", () => {
  assert.equal(isSafeReviewBranch("integration/portfolio-release-review-20261119", sha, true), true);
  for (const name of ["main", "master", "", "release/production-2026", null]) {
    assert.equal(isSafeReviewBranch(name, sha, true), false, String(name));
  }
  assert.equal(isSafeReviewBranch("review", "not-a-commit", true), false);
  assert.equal(isSafeReviewBranch("review", sha, false), false);
});
test("missing checks, skipped browsers, and failed npm audit cannot yield PASS", () => {
  const allPass = REQUIRED_FULL_STEPS.map(name => ({name,status:"PASS"}));
  assert.equal(assessQa(allPass, true), "PASS");
  assert.equal(assessQa(allPass, false), "INCOMPLETE");
  assert.equal(assessQa(allPass.filter(s => s.name !== "npm-audit"), true), "INCOMPLETE");
  assert.equal(assessQa(allPass.filter(s => s.name !== "browser:release-browser-qa.py"), true), "INCOMPLETE");
  assert.equal(assessQa(allPass.map(s => s.name === "npm-audit" ? {...s,status:"FAIL"} : s), true), "FAILED");
  assert.equal(assessQa(allPass.map(s => s.name === "npm-audit" ? {...s,status:"BLOCKED"} : s), true), "INCOMPLETE");
});
test("browser coverage requires three existing suites", () => {
  assert.deepEqual(BROWSER_SUITES, [
    "v4-browser-qa.py", "release-browser-qa.py", "evolution-browser-qa.py"
  ]);
});
