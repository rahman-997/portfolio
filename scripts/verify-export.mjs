import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

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
  "opengraph-image",
  "twitter-image",
  "Abdulrahman-Hajar-Resume.pdf",
];

const missing = requiredPaths.filter((path) => !existsSync(join(outDir, path)));
if (missing.length > 0) {
  console.error("Export verification failed. Missing required output:");
  for (const path of missing) console.error(`- out/${path}`);
  process.exit(1);
}

const pdfPath = join(outDir, "Abdulrahman-Hajar-Resume.pdf");
const pdf = readFileSync(pdfPath);
const pdfText = pdf.toString("latin1");
if (pdf.length < 1000 || !pdfText.startsWith("%PDF-") || !pdfText.includes("startxref") || !pdfText.trimEnd().endsWith("%%EOF")) {
  console.error("Export verification failed: downloadable résumé is not a structurally valid PDF.");
  process.exit(1);
}

const textExtensions = new Set([".html", ".txt", ".xml", ".json", ".webmanifest", ".js", ".css"]);
const stalePatterns = [
  { label: "legacy Netlify hostname", value: "abdulrahman-hajjar-dev.netlify.app" },
  { label: "legacy visible name", value: "Abdulrahman Hajjar" },
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const findings = [];
const brokenInternalLinks = [];

function internalTargetFor(htmlFile, href) {
  const withoutHash = href.split("#")[0].split("?")[0];
  if (!withoutHash) return null;
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(withoutHash)) return null;

  const absolute = withoutHash.startsWith("/")
    ? join(outDir, withoutHash.slice(1))
    : resolve(dirname(htmlFile), withoutHash);

  if (withoutHash.endsWith("/")) return join(absolute, "index.html");
  if (extname(absolute)) return absolute;
  if (existsSync(absolute) && statSync(absolute).isDirectory()) return join(absolute, "index.html");
  return absolute;
}

for (const file of walk(outDir)) {
  if (!statSync(file).isFile() || !textExtensions.has(extname(file))) continue;
  const content = readFileSync(file, "utf8");

  for (const pattern of stalePatterns) {
    if (content.includes(pattern.value)) {
      findings.push({ file: relative(root, file), label: pattern.label, value: pattern.value });
    }
  }

  if (extname(file) === ".html") {
    for (const match of content.matchAll(/href=["']([^"']+)["']/g)) {
      const href = match[1];
      const target = internalTargetFor(file, href);
      if (target && !existsSync(target)) {
        brokenInternalLinks.push({ file: relative(root, file), href, target: relative(outDir, target) });
      }
    }
  }
}

if (findings.length > 0) {
  console.error("Export verification found stale professional identity data:");
  for (const finding of findings) console.error(`- ${finding.file}: ${finding.label} (${finding.value})`);
  process.exit(1);
}

if (brokenInternalLinks.length > 0) {
  console.error("Export verification found broken internal links:");
  for (const link of brokenInternalLinks) console.error(`- ${link.file}: ${link.href} -> ${link.target}`);
  process.exit(1);
}

console.log(`Export verification passed: ${requiredPaths.length} required outputs, valid résumé PDF, internal links, and professional identity checks.`);
