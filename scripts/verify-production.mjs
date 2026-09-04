const baseUrl = (process.env.PORTFOLIO_URL ?? "https://abdulrahman-hajar-portfolio.onrender.com").replace(/\/$/, "");
const expectedSha = process.env.EXPECTED_GIT_SHA?.trim() || null;
const requireSecurityHeaders = process.env.REQUIRE_SECURITY_HEADERS === "true";
const retryCount = Number(process.env.PRODUCTION_RETRIES ?? 18);
const retryDelayMs = Number(process.env.PRODUCTION_RETRY_DELAY_MS ?? 10000);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, { attempts = 3, timeoutMs = 20000 } = {}) {
  const url = `${baseUrl}${path}`;
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
        headers: { "user-agent": "portfolio-production-verifier/1.0" },
      });
      if (response.ok) return response;
      lastError = new Error(`${url} returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) await sleep(Math.min(retryDelayMs, 5000));
  }
  throw lastError;
}

async function waitForExpectedDeploy() {
  if (!expectedSha) return;
  const marker = `data-deploy-commit="${expectedSha}"`;
  for (let attempt = 1; attempt <= retryCount; attempt += 1) {
    try {
      const response = await request("/", { attempts: 1 });
      const html = await response.text();
      if (html.includes(marker)) return;
      const actual = html.match(/data-deploy-commit="([^"]+)"/)?.[1] ?? "missing";
      console.log(`Deploy check ${attempt}/${retryCount}: expected ${expectedSha.slice(0, 12)}, live ${actual.slice(0, 12)}`);
    } catch (error) {
      console.log(`Deploy check ${attempt}/${retryCount}: ${error.message}`);
    }
    if (attempt < retryCount) await sleep(retryDelayMs);
  }
  throw new Error(`Production did not reach expected commit ${expectedSha} within the retry window`);
}

await waitForExpectedDeploy();

const requiredPaths = [
  "/",
  "/resume/",
  "/work/eventify/",
  "/work/bookhaven/",
  "/work/fitflow/",
  "/work/venues-api/",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
  "/opengraph-image",
  "/twitter-image",
  "/Abdulrahman-Hajar-Resume.pdf",
  "/projects/eventify-cover.jpg",
  "/projects/bookhaven-cover.jpg",
  "/projects/fitflow-cover.svg",
];

for (const path of requiredPaths) {
  const response = await request(path);
  if (!response.ok) throw new Error(`${path} failed with ${response.status}`);
}

const homeResponse = await request("/");
const homeHtml = await homeResponse.text();
for (const expected of [
  "Abdulrahman Hajar",
  `<link rel="canonical" href="${baseUrl}/"`,
  "data-deploy-commit=",
]) {
  if (!homeHtml.includes(expected)) throw new Error(`Homepage production contract missing: ${expected}`);
}

if (expectedSha && !homeHtml.includes(`data-deploy-commit="${expectedSha}"`)) {
  throw new Error(`Homepage deploy marker does not match expected SHA ${expectedSha}`);
}

const manifestResponse = await request("/manifest.webmanifest");
const manifest = await manifestResponse.json();
if (manifest.theme_color !== "#07100f" || manifest.background_color !== "#07100f") {
  throw new Error("Production manifest theme colors do not match the portfolio identity");
}
for (const icon of ["/icons/icon-192.png", "/icons/icon-512.png", "/icons/icon-maskable-512.png"]) {
  if (!manifest.icons?.some((entry) => entry.src === icon)) {
    throw new Error(`Production manifest is missing ${icon}`);
  }
}

const robots = await (await request("/robots.txt")).text();
if (!robots.includes(`Host: ${baseUrl}`) || !robots.includes(`Sitemap: ${baseUrl}/sitemap.xml`)) {
  throw new Error("Production robots.txt does not use the canonical host");
}

const sitemap = await (await request("/sitemap.xml")).text();
for (const path of ["/", "/resume/", "/work/eventify/", "/work/bookhaven/", "/work/fitflow/", "/work/venues-api/"]) {
  if (!sitemap.includes(`<loc>${baseUrl}${path}</loc>`)) throw new Error(`Production sitemap missing ${path}`);
}

const fitflow = await (await request("/work/fitflow/")).text();
if (!fitflow.includes("/projects/fitflow-cover.svg")) throw new Error("FitFlow production case study lost its local cover");
if (fitflow.includes(`property="og:image" content="${baseUrl}/projects/fitflow-cover.svg"`)) {
  throw new Error("FitFlow production OpenGraph metadata must not use SVG");
}

const venues = await (await request("/work/venues-api/")).text();
if (!venues.includes("https://venues-api-rahman.onrender.com/health")) {
  throw new Error("Venues API production proof must target the verified health endpoint");
}

const securityHeaders = homeResponse.headers;
const requiredHeaders = new Map([
  ["x-content-type-options", "nosniff"],
  ["x-frame-options", "DENY"],
  ["referrer-policy", "strict-origin-when-cross-origin"],
  ["cross-origin-opener-policy", "same-origin"],
  ["cross-origin-resource-policy", "same-origin"],
]);
const missingHeaders = [];
for (const [name, expected] of requiredHeaders) {
  const actual = securityHeaders.get(name);
  if (!actual || !actual.toLowerCase().includes(expected.toLowerCase())) missingHeaders.push(`${name}=${actual ?? "missing"}`);
}
if (missingHeaders.length) {
  const message = `Production security header contract is not fully applied yet: ${missingHeaders.join(", ")}`;
  if (requireSecurityHeaders) throw new Error(message);
  console.warn(`WARNING: ${message}`);
  console.warn("Header enforcement is advisory until the existing Render static site is managed by the committed Blueprint policy.");
}

console.log(`Production verification passed for ${baseUrl}${expectedSha ? ` at ${expectedSha}` : ""}.`);
