import { readFileSync, existsSync } from "node:fs";

const assert = (condition, message) => {
  if (!condition) throw new Error("Portfolio identity export: " + message);
};

const pageContracts = [
  {locale:"en", path:"out/index.html", role:"COMPUTER ENGINEER", title:"Abdulrahman Hajar | Computer Engineer"},
  {locale:"ar", path:"out/ar/index.html", role:"مهندس كمبيوتر", title:"عبد الرحمن حجار | مهندس كمبيوتر"},
  {locale:"tr", path:"out/tr/index.html", role:"BİLGİSAYAR MÜHENDİSİ", title:"Abdulrahman Hajar | Bilgisayar Mühendisi"},
];

for (const {locale,path,role,title} of pageContracts) {
  assert(existsSync(path), locale + ": localized page missing");
  const html = readFileSync(path,"utf8");
  const roleMarkup = "<strong>HAJAR</strong><small>" + role + "</small>";
  const roleCount = html.split(roleMarkup).length - 1;
  assert(roleCount === 2, locale + ": header/footer primary professional role differs (" + roleCount + " occurrences)");
  const pageTitle = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1] ?? "";
  assert(pageTitle.includes(title), locale + ": localised SEO title is missing primary computer-engineering qualification");
  if (locale==="ar") assert(!html.includes("عبدالرحمن حجار"), "Arabic name uses inconsistent spacing");
  console.log("Professional identity verified for", locale);
}
const resume = readFileSync("out/resume/index.html","utf8");
assert(resume.includes("COMPUTER ENGINEER · FULL-STACK DEVELOPER · SOFTWARE ENGINEER"), "resume hero role not updated");
assert(resume.includes("Computer Engineer · Full-Stack Developer · Software Engineer"), "resume professional snapshot not updated");
console.log("Professional identity export verified: 3 languages, 2 brand placements each and online résumé.");

// Compare the *downloadable* binary with the web résumé identity. Source-level
// checks alone would miss an old PDF asset left behind after an HTML redesign.
const pdfPath = "out/Abdulrahman-Hajar-Resume.pdf";
assert(existsSync(pdfPath), "downloadable PDF is missing from static export");
const pdfBytes = readFileSync(pdfPath);
const pdfHeader = pdfBytes.subarray(0, 5).toString("latin1");
const pdfStructure = pdfBytes.toString("latin1");
assert(pdfHeader === "%PDF-", "downloadable PDF header is invalid");
assert(pdfStructure.includes("/Title (Abdulrahman Hajar - Computer Engineer Resume)"),
  "downloadable PDF still has the old software-engineer title or missing metadata");
assert(pdfStructure.includes("/URI (https://github.com/rahman-997)"),
  "downloadable PDF lacks the expected clickable GitHub contact");
assert(pdfStructure.includes("/URI (https://www.linkedin.com/in/"),
  "downloadable PDF lacks a clickable LinkedIn contact");
console.log("Downloadable résumé PDF contract verified: primary title, binary header and contact links.");

