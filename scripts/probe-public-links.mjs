import { mkdirSync, writeFileSync } from "node:fs";

const links = [
  "https://abdulrahman-hajar-portfolio.onrender.com/",
  "https://eventify-web.onrender.com/",
  "https://bookbookhaven-free.onrender.com/",
  "https://fitflow-gym.onrender.com/",
  "https://venues-api-rahman.onrender.com/health",
];
const allowedHosts = new Set(links.map(link => new URL(link).hostname));

async function probe(link) {
  const target = new URL(link);
  if (target.protocol !== "https:" || !allowedHosts.has(target.hostname) || target.username || target.password) {
    throw new Error("Only the fixed public HTTPS demo hosts may be probed");
  }
  try {
    // Native fetch verifies TLS certificates. Redirects cannot escape the fixed host set.
    const response = await fetch(target, {
      redirect: "error",
      signal: AbortSignal.timeout(40000),
      headers: { "User-Agent": "Portfolio-Release-Link-Check/1.0" },
    });
    await response.body?.cancel();
    return { url: link, status: response.status };
  } catch (error) {
    return { url: link, status: null, error: String(error).slice(0, 250) };
  }
}

const report = await Promise.all(links.map(probe));
mkdirSync("atlas-qa-artifacts", { recursive: true });
writeFileSync("atlas-qa-artifacts/public-links.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
