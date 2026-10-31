import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = "out";
const invalid = [];
let pagesChecked = 0;
function scan(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      scan(path);
    } else if (entry.isFile() && path.endsWith(".html")) {
      pagesChecked++;
      const html = readFileSync(path, "utf8");
      if (/\/_next\/image(?:[/?&]|&amp;)/i.test(html)) {
        invalid.push(path);
      }
    }
  }
}
scan(outputDirectory);
if (!pagesChecked) {
  console.error("Static image audit: no exported HTML files found");
  process.exitCode = 1;
} else if (invalid.length) {
  console.error("Static image audit: server-only Next image URLs in:", invalid.join(", "));
  process.exitCode = 1;
} else {
  console.log("Static image audit passed for", pagesChecked, "HTML files");
}
