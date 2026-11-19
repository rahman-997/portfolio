import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("audit gate blocks moderate and higher security findings", () => {
  const script = readFileSync(new URL("../audit-dependencies.mjs", import.meta.url), "utf8");
  assert.match(script, /spawnSync\(npm,\s*\["audit", "--audit-level=moderate"\]/);
  assert.match(script, /process\.exit\(result\.status \?\? 1\)/);
});

test("Portfolio CI cannot ignore npm audit service outages", () => {
  const workflow = readFileSync(new URL("../../.github/workflows/ci.yml", import.meta.url), "utf8");
  assert.match(workflow, /- name: Dependency audit \(fail closed on moderate\+ or service errors\)\s+run: npm run audit/);
  assert.doesNotMatch(workflow, /npm audit service is temporarily unavailable/);
  assert.doesNotMatch(workflow, /grep -Eq 'Service Unavailable/);
});

test("Portfolio CI executes all existing native Node regression tests", () => {
  const workflow = readFileSync(new URL("../../.github/workflows/ci.yml", import.meta.url), "utf8");
  assert.match(workflow, /node --test scripts\/tests\/\*\.test\.mjs/);
});
