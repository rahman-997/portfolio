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
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "opengraph-image",
  "twitter-image",
  "Abdulrahman-Hajar-Resume.pdf",
  "projects/eventify-cover.jpg",
  "projects/bookhaven-cover.jpg",
  "projects/fitflow-cover.svg",
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
  ["legacy Netlify hostname", "abdulrahman-hajar-dev.netlify.app"],
  ["legacy FitFlow hostname", "fitflow-gym-online.netlify.app"],
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

const canonicalHost = "https://abdulrahman-hajar-portfolio.onrender.com";
const homeHtml = readFileSync(join(outDir, "index.html"), "utf8");
if (!homeHtml.includes(`<link rel="canonical" href="${canonicalHost}/"`)) {
  throw new Error("Homepage canonical URL must use the primary Render portfolio hostname");
}

const robotsText = readFileSync(join(outDir, "robots.txt"), "utf8");
for (const expected of [
  `Host: ${canonicalHost}`,
  `Sitemap: ${canonicalHost}/sitemap.xml`,
]) {
  if (!robotsText.includes(expected)) throw new Error(`robots.txt is missing canonical host contract: ${expected}`);
}

const sitemapText = readFileSync(join(outDir, "sitemap.xml"), "utf8");
for (const path of ["/", "/resume/", "/work/eventify/", "/work/bookhaven/", "/work/fitflow/", "/work/venues-api/"]) {
  if (!sitemapText.includes(`<loc>${canonicalHost}${path}</loc>`)) {
    throw new Error(`sitemap.xml is missing canonical route: ${path}`);
  }
}

const fitflowHtml = readFileSync(join(outDir, "work/fitflow/index.html"), "utf8");
if (!fitflowHtml.includes("/projects/fitflow-cover.svg")) {
  throw new Error("FitFlow case study must render the first-party local cover asset");
}
if (fitflowHtml.includes(`<meta property="og:image" content="${canonicalHost}/projects/fitflow-cover.svg"`)) {
  throw new Error("FitFlow social metadata must use the PNG OpenGraph fallback instead of SVG");
}
if (!fitflowHtml.includes("https://fitflow-gym.onrender.com")) {
  throw new Error("FitFlow case study must point to the canonical Render production URL");
}

const manifest = JSON.parse(readFileSync(join(outDir, "manifest.webmanifest"), "utf8"));
for (const key of ["background_color", "theme_color"]) {
  if (manifest[key] !== "#07100f") throw new Error(`Manifest ${key} must match the portfolio theme color`);
}

for (const expected of [
  ["/icons/icon-192.png", "192x192", "any"],
  ["/icons/icon-512.png", "512x512", "any"],
  ["/icons/icon-maskable-512.png", "512x512", "maskable"],
]) {
  const [src, sizes, purpose] = expected;
  const icon = manifest.icons?.find((entry) => entry.src === src);
  if (!icon || icon.sizes !== sizes || icon.purpose !== purpose) {
    throw new Error(`Manifest icon contract failed for ${src}`);
  }
}

function pngDimensions(path) {
  const png = readFileSync(path);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!png.subarray(0, 8).equals(signature)) throw new Error(`${path} is not a PNG`);
  return [png.readUInt32BE(16), png.readUInt32BE(20)];
}
for (const [path, expected] of [
  ["icons/icon-192.png", [192, 192]],
  ["icons/icon-512.png", [512, 512]],
  ["icons/icon-maskable-512.png", [512, 512]],
  ["icons/apple-touch-icon.png", [180, 180]],
]) {
  const actual = pngDimensions(join(outDir, path));
  if (actual[0] !== expected[0] || actual[1] !== expected[1]) {
    throw new Error(`${path} has invalid dimensions ${actual.join("x")}`);
  }
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
const netlifyHeaderBlocks = netlifyConfig
  .split("\n[[headers]]")
  .slice(1)
  .map((block) => `[[headers]]${block}`);

function headerBlock(route) {
  const marker = `for = "${route}"`;
  const block = netlifyHeaderBlocks.find((section) =>
    section.split("\n").some((line) => line.trim() === marker),
  );
  if (!block) throw new Error(`Netlify config is missing required header block: ${route}`);
  return block;
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
  throw new Error,"PWA manifest must revalidate across portfolio deployments");
}

const renderConfig = readFileSync(join(root, "render.yaml"), "utf8");
for (const required of [
  "runtime: static",
  "staticPublishPath: ./out",
  "autoDeployTrigger: checksPass",
  "name: X-Frame-Options",
  "value: DENY",
  "name: Referrer-Policy",
  "name: Permissions-Policy",
  "name: Cross-Origin-Opener-Policy",
  "name: Cross-Origin-Resource-Policy",
  "path: /_next/static/*",
  "value: public, max-age=31536000, immutable",
  "path: /manifest.webmanifest",
  "value: public, max-age=0, must-revalidate",
]) {
  if (!renderConfig.includes(required)) throw new Error(`Render Blueprint contract is missing: ${required}`);
}

console.log(
  `Export verification passed: ${requiredPaths.length} required outputs, identity/canonical checks, internal links, branded PWA icons, social metadata, manifest consistency, résumé PDF sanity checks, and Render/Netlify hosting contracts.`,
);
