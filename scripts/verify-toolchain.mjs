import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const nodeVersion = read(".node-version").trim();
if (nodeVersion !== "22.13.0") {
  throw new Error(`.node-version drifted from 22.13.0: ${nodeVersion}`);
}

const pkg = JSON.parse(read("package.json"));
if (pkg.engines?.node !== ">=22.13.0 <23") {
  throw new Error(`package.json engines.node drifted: ${pkg.engines?.node ?? "missing"}`);
}
if (pkg.packageManager !== "npm@11.19.1") {
  throw new Error(`packageManager must stay pinned to npm@11.19.1: ${pkg.packageManager ?? "missing"}`);
}

const ci = read(".github/workflows/ci.yml");
for (const required of [
  "node-version-file: .node-version",
  "npm install --global npm@11.19.1",
]) {
  if (!ci.includes(required)) throw new Error(`Portfolio CI toolchain contract is missing: ${required}`);
}

const smoke = read(".github/workflows/production-smoke.yml");
for (const required of [
  "branches: [main]",
  "node-version-file: .node-version",
  "npm install --global npm@11.19.1",
  "github.event.workflow_run.conclusion == 'success'",
]) {
  if (!smoke.includes(required)) throw new Error(`Production smoke contract is missing: ${required}`);
}

if (smoke.includes("node-version: 22.13.0")) {
  throw new Error("Production smoke must consume .node-version instead of duplicating the Node version");
}

console.log("Toolchain verification passed: Node 22.13.0 and npm 11.19.1 are aligned across package metadata, Portfolio CI, and Production Smoke.");
