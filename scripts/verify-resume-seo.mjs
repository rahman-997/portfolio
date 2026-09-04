import { readFileSync } from "node:fs";
import { join } from "node:path";

const printableResume = readFileSync(join(process.cwd(), "out", "resume.html"), "utf8");
const canonicalResume = "https://abdulrahman-hajar-portfolio.onrender.com/resume/";

if (!printableResume.includes('<meta name="robots" content="noindex,follow">')) {
  throw new Error("Printable resume.html must stay out of search indexes");
}

if (!printableResume.includes(`<link rel="canonical" href="${canonicalResume}">`)) {
  throw new Error("Printable resume.html must canonicalize to /resume/");
}

console.log("Printable résumé SEO contract passed (noindex + canonical /resume/).");
