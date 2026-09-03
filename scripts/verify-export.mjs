import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");

const requiredPaths = [
  "index.html",
  "404.html",
  "resume/index.html",
  "resume.html",
  "work/eventify/index.html",
  "work/bookhaven/index.html",
  "work/fitflow/index.html",
  "work/venues-api/index.html",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "favicon.svg",
  "opengraph-image",
  "twitter-image",
  "Abdulrahman-Hajar-Resume.pdf",
];

const missing = requiredPaths.filter((path) => !existsSync(join(outDir, path)));
if (missing.length) {
  console.error("Export verification failed. Missing required output:");
  for (const path of missing) console.error(`- out/${path}`);
  process.exit(1);
}

const textExtensions = new Set([".html", ".txt", ".xml", ".json", ".webmanifest", ".js", ".css", ".svg"]);
const forbiddenOutput = [
  ["legacy Netlify hostname", "abdulrahman-hajjar-dev.netlify.app"],
  ["legacy visible name", "Abdulrahman Hajjar"],
  ["generation disclosure", "AI generated"],
  ["generation disclosure", "ChatGPT"],
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(outDir).filter((file) => statSync(file).isFile());
const findings = [];
const brokenInternalLinks = [];

function internalTargetExists(href) {
  const clean = href.split("#", 1)[0].split("?", 1)[0];
  if (!clean || clean === "/") return existsSync(join(outDir, "index.html"));
  if (!clean.startsWith("/")) return true;

  const pathname = clean.replace(/^\/+/, "");
  const candidates = [];
  if (pathname.endsWith("/")) candidates.push(join(outDir, pathname, "index.html"));
  else if (extname(pathname)) candidates.push(join(outDir, pathname));
  else candidates.push(join(outDir, pathname, "index.html"), join(outDir, pathname));
  return candidates.some(existsSync);
}

for (const file of files) {
  if (!textExtensions.has(extname(file))) continue;
  const content = readFileSync(file, "utf8");

  for (const [label, value] of forbiddenOutput) {
    if (content.includes(value)) findings.push({ file: relative(root, file), label, value });
  }

  if (extname(file) === ".html") {
    for (const match of content.matchAll(/href=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (/^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(href)) continue;
      if (!internalTargetExists(href)) brokenInternalLinks.push({ file: relative(root, file), href });
    }
  }
}

if (findings.length) {
  console.error("Export verification found forbidden/stale public content:");
  for (const finding of findings) console.error(`- ${finding.file}: ${finding.label} (${finding.value})`);
  process.exit(1);
}

if (brokenInternalLinks.length) {
  console.error("Export verification found broken internal links:");
  for (const finding of brokenInternalLinks) console.error(`- ${finding.file}: ${finding.href}`);
  process.exit(1);
}

const pdf = readFileSync(join(outDir, "Abdulrahman-Hajar-Resume.pdf"));
if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
  console.error("Résumé PDF verification failed: file does not have a valid PDF header.");
  process.exit(1);
}
if (pdf.length < 4000) {
  console.error(`Résumé PDF verification failed: suspiciously small file (${pdf.length} bytes).`);
  process.exit(1);
}

const netlifyConfig = readFileSync(join(root, "netlify.toml"), "utf8");

function headerBlock(route) {
  const escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = netlifyConfig.match(new RegExp(`\\[\\[headers\\]\\]\\s*\\n\\s*for = "${escapedRoute}"([\\s\\S]*?)(?=\\n\\[\\[headers\\]\\]|$)`));
  if (!match) throw new Error(`Netlify config is missing required header block: ${route}`);
  return match[1];
}

const globalHeaders = headerBlock("/*");
for (const requiredHeader of [
  'X-Content-Type-Options = "nosniff"',
  'X-Frame-Options = "DENY"',
  'Cross-Origin-Opener-Policy = "same-origin"',
  'Cross-Origin-Resource-Policy = "same-origin"',
  'Strict-Transport-Security = "max-age=31536000; includeSubDomains"',
]) {
  if (!globalHeaders.includes(requiredHeader)) {
    throw new Error(`Netlify global security headers are missing: ${requiredHeader}`);
  }
}

const nextStaticHeaders = headerBlock("/_next/static/*");
if (!nextStaticHeaders.includes('Cache-Control = "public, max-age=31536000, immutable"')) {
  throw new Error("Content-hashed Next.js assets must remain immutable-cached");
}

const projectAssetHeaders = headerBlock("/projects/*");
if (projectAssetHeaders.includes("immutable")) {
  throw new Error("Stable-name portfolio project assets must remain refreshable across deployments");
}
if (!projectAssetHeaders.includes("max-age=3600")) {
  throw new Error("Portfolio project asset cache policy must stay bounded to a one-hour fresh window");
}

const manifestHeaders = headerBlock("/manifest.webmanifest");
if (!manifestHeaders.includes("max-age=0") || !manifestHeaders.includes("must-revalidate")) {
  throw new Error("PWA manifest must revalidate across portfolio deployments");
}

console.log(
  `Export verification passed: ${requiredPaths.length} required outputs, public-identity scan, internal-link checks, résumé PDF sanity checks, and Netlify header/cache contract.`,
);
