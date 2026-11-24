import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, dirname } from "node:path";
import { lighthouseDiagnostics } from "./lighthouse-diagnostics.mjs";

// Lighthouse is a lab measurement. These scores are NOT real-user Web Vitals.
const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node scripts/report-lighthouse.mjs <report.json> [...]");
  process.exit(2);
}
const metrics = {
  "first-contentful-paint": "FCP",
  "largest-contentful-paint": "LCP",
  "total-blocking-time": "TBT",
  "cumulative-layout-shift": "CLS",
  "speed-index": "Speed Index",
};
const summaries = [];
for (const file of files) {
  const result = JSON.parse(readFileSync(file, "utf8"));
  if (result.runtimeError?.code) {
    throw new Error(`Lighthouse could not audit ${file}: ${result.runtimeError.code}`);
  }
  if (!result.finalUrl || !result.categories?.performance) {
    throw new Error(`Lighthouse output malformed for ${file}`);
  }
  const score = Object.fromEntries(
    Object.entries(result.categories).map(([name, data]) => [
      name,
      typeof data.score === "number" ? Math.round(data.score * 100) : null,
    ]),
  );
  const measured = Object.fromEntries(
    Object.entries(metrics).map(([id, label]) => [
      label,
      result.audits?.[id]?.numericValue ?? null,
    ]),
  );
  const diagnostics = lighthouseDiagnostics(result);
  summaries.push({
    report: basename(file),
    transferScenario: basename(file).includes("-gzip-") ? "gzip-lab" : "uncompressed-baseline",
    url: result.finalUrl,
    lighthouseVersion: result.lighthouseVersion,
    scores: score,
    lab: measured,
    diagnostics,
  });
  console.log(`\nLighthouse ${basename(file)} (${result.lighthouseVersion})`);
  console.log(`  Scores (0–100): ${Object.entries(score).map(([k,v]) => `${k}=${v ?? "n/a"}`).join(", ")}`);
  console.log(`  Lab: ${Object.entries(measured).map(([k,v]) => `${k}=${v === null ? "n/a" : Number(v).toFixed(k === "CLS" ? 3 : 0)}`).join(", ")}`);
  console.log("  Diagnostics: " + JSON.stringify(diagnostics));
}
const path = "lighthouse-evidence/summary.json";
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, JSON.stringify({
  note: "Synthetic Chrome lab runs on a GitHub-hosted runner; uncompressed and gzip scenarios are separate, not field Core Web Vitals or verified production behavior.",
  measuredAt: new Date().toISOString(),
  summaries,
}, null, 2) + "\n");
console.log("\nBaseline written to " + path);
