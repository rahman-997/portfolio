import { spawnSync } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const maxAttempts = 3;
const retryDelayMs = 3000;

const transientPatterns = [
  /\b429\b/i,
  /\b5\d\d\b.*(?:service|server|gateway|unavailable|timeout)/i,
  /service unavailable/i,
  /audit endpoint returned an error/i,
  /econnreset/i,
  /econnrefused/i,
  /eai_again/i,
  /enotfound/i,
  /etimedout/i,
  /socket hang up/i,
  /network.*(?:error|timeout)/i,
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  const result = spawnSync(npm, ["audit", "--audit-level=high"], {
    encoding: "utf8",
    timeout: 60000,
    env: {
      ...process.env,
      npm_config_fetch_retries: "1",
      npm_config_fetch_retry_mintimeout: "1000",
      npm_config_fetch_retry_maxtimeout: "5000",
      npm_config_fetch_timeout: "30000",
    },
  });

  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (output) process.stdout.write(output);

  if (result.status === 0) {
    console.log(`Dependency audit passed on attempt ${attempt}/${maxAttempts}.`);
    process.exit(0);
  }

  const timedOut = result.error?.code === "ETIMEDOUT";
  const transient = timedOut || transientPatterns.some((pattern) => pattern.test(output));

  if (!transient) {
    console.error("Dependency audit found a non-transient failure; refusing to retry or mask it.");
    process.exit(result.status ?? 1);
  }

  if (attempt === maxAttempts) {
    console.error(`Dependency audit could not reach the npm advisory service after ${maxAttempts} bounded attempts.`);
    process.exit(1);
  }

  console.warn(`Transient npm audit failure on attempt ${attempt}/${maxAttempts}; retrying after ${retryDelayMs}ms.`);
  await sleep(retryDelayMs);
}
