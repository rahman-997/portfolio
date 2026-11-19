#!/usr/bin/env node
/**
 * Read-only code QA + local dependency validation. No deploy, merge, secret
 * mutation, production call or paid API. npm ci only affects local node_modules.
 * Hosted CodeQL/Semgrep and publication approval are independent gates.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BROWSER_SUITES, REQUIRED_FULL_STEPS, isSafeReviewBranch, assessQa } from "./qa-gate-policy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const full = process.argv.includes("--full");
const out = resolve(root, ".qa");
mkdirSync(out, { recursive: true });
const report = {
  mode: full ? "full" : "unit",
  started_at: new Date().toISOString(),
  commit: null,
  branch: null,
  checks: [],
  local_qa_status: "INCOMPLETE",
  release_status: "NO-GO",
  release_reason: "Requires successful hosted security scans and separate publication approval",
};
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const python = process.platform === "win32" ? "py" : "python";
const sleep = ms => new Promise(done => setTimeout(done, ms));
function record(name, status, reason = "") {
  report.checks.push({ name, status, reason });
  process.stdout.write(status + " " + name + (reason ? " — " + reason : "") + "\n");
}
function exec(name, bin, args, timeout = 240000, env = {}) {
  const npmWin = process.platform === "win32" && bin === npm;
  const command = npmWin ? "cmd.exe" : bin;
  const cmdArgs = npmWin ? ["/d", "/s", "/c", "npm " + args.join(" ")] : args;
  const p = spawnSync(command, cmdArgs, {
    cwd: root,
    timeout,
    encoding: "utf8",
    env: { ...process.env, ...env },
    maxBuffer: 16 * 1024 * 1024,
  });
  const log = join(out, name.replace(/[^a-z0-9:._-]/gi, "_") + ".log");
  writeFileSync(log, (p.stdout ?? "") + "\n" + (p.stderr ?? ""));
  const ok = p.status === 0 && !p.error;
  record(name, ok ? "PASS" : "FAIL", (p.error?.message ?? "exit=" + p.status) + "; log=" + log);
  return ok;
}
function git(...args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", timeout: 15000 });
  return result.status === 0 ? result.stdout.trim() : null;
}
function finish() {
  report.local_qa_status = assessQa(report.checks, full);
  report.completed_at = new Date().toISOString();
  writeFileSync(join(out, "release-report.json"), JSON.stringify(report, null, 2) + "\n");
  process.stdout.write("LOCAL QA: " + report.local_qa_status + " | RELEASE: NO-GO\n");
  if (report.local_qa_status !== "PASS" && full) process.exitCode = 1;
  if (report.local_qa_status === "FAILED" && !full) process.exitCode = 1;
}
async function browsers() {
  if (!existsSync(join(root, "out", "index.html"))) {
    record("browser-precondition", "FAIL", "Missing out/index.html");
    return;
  }
  const ssrScript = join("scripts", "offline-ssr-qa.py");
  const ssrArgs = process.platform === "win32"
    ? ["-3", ssrScript, "--root", root, "--output", join(out, "offline-ssr-report.json")]
    : [ssrScript, "--root", root, "--output", join(out, "offline-ssr-report.json")];
  if (!exec("ssr-css-layout", python, ssrArgs, 180000)) {
    for (const file of BROWSER_SUITES)
      record("browser:" + file, "BLOCKED", "Offline SSR/CSS smoke test failed");
    return;
  }
  const port = Number(process.env.PORTFOLIO_QA_PORT || "4173");
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    record("browser-precondition", "FAIL", "Invalid PORTFOLIO_QA_PORT");
    return;
  }
  const pyArgs = process.platform === "win32"
    ? ["-3", "-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", "out"]
    : ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", "out"];
  const server = spawn(python, pyArgs, { cwd: root, stdio: "ignore" });
  let error = null;
  server.on("error", cause => { error = cause; });
  try {
    let ready = false;
    for (let attempt = 0; attempt < 30; attempt++) {
      if (error || server.exitCode !== null) break;
      try {
        const response = await fetch("http://127.0.0.1:" + port + "/", { signal: AbortSignal.timeout(750) });
        if (response.ok) { ready = true; break; }
      } catch { /* local server still starting */ }
      await sleep(200);
    }
    if (!ready) {
      record("browser-precondition", "FAIL", error?.message ?? "Cannot start a localhost static server");
      return;
    }
    const env = {
      ATLAS_BASE_URL: "http://127.0.0.1:" + port,
      ATLAS_QA_OUTPUT: join(out, "browser"),
    };
    for (const file of BROWSER_SUITES) {
      const name = "browser:" + file;
      if (!existsSync(join(root, "scripts", file))) {
        record(name, "FAIL", "Missing " + file);
        continue;
      }
      const args = process.platform === "win32"
        ? ["-3", join("scripts", file)] : [join("scripts", file)];
      exec(name, python, args, 600000, env);
    }
  } finally {
    server.kill("SIGTERM");
  }
}
report.commit = git("rev-parse", "HEAD");
report.branch = git("branch", "--show-current");
const clean = git("status", "--porcelain") === "";
const testsDir = join(root, "scripts", "tests");
const testFiles = existsSync(testsDir)
  ? readdirSync(testsDir).filter(x => x.endsWith(".test.mjs")).sort().map(x => join("scripts", "tests", x))
  : [];
const extraTest = join(root, "scripts", "security.test.mjs");
if (testFiles.length === 0) record("node-unit-tests", "FAIL", "No Node test files found");
else exec("node-unit-tests", process.execPath,
  ["--test", ...testFiles, ...(existsSync(extraTest) ? [join("scripts", "security.test.mjs")] : [])]);
if (full) {
  if (!isSafeReviewBranch(report.branch, report.commit, clean)) {
    record("branch-safety", "FAIL", "Require a clean, named non-main review branch");
    for (const name of REQUIRED_FULL_STEPS.filter(x => !["branch-safety", "node-unit-tests"].includes(x)))
      record(name, "BLOCKED", "Unsafe checkout");
  } else {
    record("branch-safety", "PASS", report.branch);
    const installed = exec("npm-ci", npm, ["ci", "--no-audit", "--no-fund"], 420000);
    if (!installed) {
      for (const name of REQUIRED_FULL_STEPS.filter(x => x.startsWith("npm-") && x !== "npm-ci" || x.startsWith("browser:")))
        record(name, "BLOCKED", "npm ci failed");
    } else {
      let successful = report.checks.every(x => x.status === "PASS");
      for (const script of ["lint", "typecheck", "build", "verify:export", "audit"])
        successful = exec("npm-" + script, npm, ["run", script], script === "build" ? 600000 : 300000) && successful;
      if (successful) await browsers();
      else for (const file of BROWSER_SUITES) record("browser:" + file, "BLOCKED", "Prior gates failed");
    }
  }
} else {
  record("full-release-gates", "BLOCKED", "Use --full on a clean isolated review branch");
}
finish();
