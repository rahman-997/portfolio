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
