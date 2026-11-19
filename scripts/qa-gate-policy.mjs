// Release policy. Unit-verifiable without network, browser or GitHub Actions.
export const BROWSER_SUITES = [
  "v4-browser-qa.py",
  "release-browser-qa.py",
  "evolution-browser-qa.py",
];
export const REQUIRED_FULL_STEPS = [
  "branch-safety",
  "node-unit-tests",
  "npm-ci",
  "npm-lint",
  "npm-typecheck",
  "npm-build",
  "npm-verify:export",
  "npm-audit",
  ...BROWSER_SUITES.map(name => "browser:" + name),
];
export function isSafeReviewBranch(branch, head, clean) {
  return typeof head === "string" && /^[a-f0-9]{40}$/i.test(head)
    && typeof branch === "string" && branch.length > 0
    && !["main", "master"].includes(branch)
    && !branch.startsWith("release/production")
    && clean === true;
}
export function assessQa(steps, full) {
  const byName = new Map(steps.map(step => [step.name, step.status]));
  if (steps.some(step => step.status === "FAIL")) return "FAILED";
  if (!full) return "INCOMPLETE";
  if (REQUIRED_FULL_STEPS.some(name => byName.get(name) !== "PASS")) return "INCOMPLETE";
  return "PASS";
}
