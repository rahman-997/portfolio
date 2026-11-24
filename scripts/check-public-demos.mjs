import { mkdirSync, writeFileSync } from "node:fs";

// GET only. No credentials, deployment changes, data mutation, or paid APIs.
// A single cold-start/network failure is inconclusive, not proof of a broken app.
const endpoints = [
  ["FitFlow", "https://fitflow-gym.onrender.com/"],
  ["BookHaven", "https://bookbookhaven-free.onrender.com/"],
  ["Eventify", "https://eventify-web.onrender.com/"],
  ["Venues API health", "https://venues-api-rahman.onrender.com/health"],
  ["Portfolio published", "https://abdulrahman-hajar-portfolio.onrender.com/"],
];
async function probe([name, url]) {
  let last = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const started = Date.now();
    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { accept: "text/html,application/json;q=0.9,*/*;q=0.2", "user-agent": "portfolio-demo-readonly-probe/1.0" },
        signal: AbortSignal.timeout(60000),
      });
      const record = {
        project: name,
        requestedUrl: url,
        finalUrl: response.url,
        httpStatus: response.status,
        contentType: response.headers.get("content-type"),
        durationMs: Date.now() - started,
        attempt,
        outcome: response.ok ? "reachable" : "not-verified",
      };
      await response.body?.cancel();
      if (response.ok || (response.status !== 502 && response.status !== 503 && response.status !== 504)) return record;
      last = record;
    } catch (error) {
      last = {
        project: name,
        requestedUrl: url,
        outcome: "not-verified",
        attempt,
        durationMs: Date.now() - started,
        reason: error instanceof Error ? error.name : "unknown",
      };
    }
  }
  return last;
}
const results = await Promise.all(endpoints.map(probe));
for (const result of results) {
  const summary = result.outcome === "reachable" ? `HTTP ${result.httpStatus}` : `INCONCLUSIVE (${result.httpStatus ?? result.reason ?? "unknown"})`;
  console.log(`${result.project}: ${summary}, ${result.durationMs}ms, attempts=${result.attempt}`);
}
mkdirSync("demo-health-evidence", {recursive:true});
writeFileSync("demo-health-evidence/report.json", JSON.stringify({
  checkedAt: new Date().toISOString(),
  note: "Read-only public demo GET probes; even HTTP 200 does not verify all app features or source-to-deployment parity.",
  results,
}, null, 2) + "\n");
console.log("Demo health evidence saved without reading or storing response bodies.");
