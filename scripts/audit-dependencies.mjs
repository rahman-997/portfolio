import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { runDependencyAudit } from "./dependency-audit-core.mjs";

// Windows cannot reliably spawn .cmd shims without a shell on newer Node releases.
// Invoke npm's JavaScript CLI directly, keeping the subprocess shell-free.
const windows = process.platform === "win32";
const npmCandidates = windows
  ? [
      process.env.npm_execpath,
      process.env.APPDATA ? join(process.env.APPDATA, "npm", "node_modules", "npm", "bin", "npm-cli.js") : null,
      join(dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js"),
    ]
  : [];
const npmCli = npmCandidates.find((candidate) => candidate?.endsWith(".js") && existsSync(candidate));
if (windows && !npmCli) {
  console.error("Cannot locate npm-cli.js on Windows. Run this check through npm run audit.");
  process.exit(1);
}
const npm = windows ? process.execPath : "npm";
const auditArgs = windows ? [npmCli, "audit", "--audit-level=moderate"] : ["audit", "--audit-level=moderate"];
const result=await runDependencyAudit({
  run:()=>spawnSync(npm,auditArgs,{
    encoding:"utf8",timeout:60000,
    env:{...process.env,npm_config_fetch_retries:"1",npm_config_fetch_retry_mintimeout:"1000",npm_config_fetch_retry_maxtimeout:"5000",npm_config_fetch_timeout:"30000"},
  }),
  wait:ms=>new Promise(resolve=>setTimeout(resolve,ms)),
  log:output=>process.stdout.write(output),
  warn:message=>console.warn(message),
});
if(result.status==="pass") console.log(`Dependency audit passed on attempt ${result.attempts}/3.`);
else if(result.status==="unavailable") console.error("Dependency audit could not reach the npm advisory service after three bounded attempts; release blocked.");
else console.error("Dependency audit failed; refusing to mask the failure.");
process.exitCode=result.exitCode;
