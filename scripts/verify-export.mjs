import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");

const requiredPaths = [
  "index.html",
  "404.html",
  "resume/index.html",
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

const textExtensions = new Set([".html", ".txt", ".xml", ".json", ".webmanifest", ".js", ".css"]);
const stalePatterns = [
  {
    label: "legacy Netlify hostname",
    value: "abdulrahman-hajjar-dev.netlify.app",
  },
  {
    label: "legacy visible name",
    value: "Abdulrahman Hajjar",
  },
];

function extension(path) {
  const index = path.lastIndexOf(".");
  return index >= 0 ? path.slice(index) : "";
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const findings = [];

for (const file of walk(outDir)) {
  if (!statSync(file).isFile() || !textExtensions.has(extension(file))) continue;
  const content = readFileSync(file, "utf8");

  for (const pattern of stalePatterns) {
    if (content.includes(pattern.value)) {
      findings.push({
        file: relative(root, file),
        label: pattern.label,
        value: pattern.value,
      });
    }
  }
}

if (findings.length > 0) {
  console.error("Export verification found stale professional identity data:");
  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.label} (${finding.value})`);
  }
  process.exit(1);
}

console.log(`Export verification passed: ${requiredPaths.length} required outputs present and no stale identity markers found.`);
