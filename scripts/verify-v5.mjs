import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

const check = (condition, message) => {
  if (!condition) throw new Error("V5 new section regression: " + message);
};

// The previous photograph was visibly incomplete even though it decoded.
// Pin the manually reviewed replacement, not merely a successful image load.
const reviewedFitflowDigest = "36f9676c7938e92e83bbb1cc36c56a9b158a387bcc5574818c1a180f535f038f";
for (const file of ["public/projects/fitflow-real-interface.webp", "out/projects/fitflow-real-interface.webp"]) {
  check(existsSync(file), "Missing reviewed FitFlow capture: " + file);
  check(createHash("sha256").update(readFileSync(file)).digest("hex") === reviewedFitflowDigest, "FitFlow screenshot differs from visually reviewed image: " + file);
}

const reviewedMizanDigest = "e812540bd66598d8019b7b54f4f2a932f97fd0d0582d2366f843bccaa5bd3783";
for (const file of ["public/projects/mizan-live-dashboard.png", "out/projects/mizan-live-dashboard.png"]) {
  check(existsSync(file), "Missing reviewed Mizan capture: " + file);
  check(createHash("sha256").update(readFileSync(file)).digest("hex") === reviewedMizanDigest, "Mizan screenshot differs from visually reviewed image: " + file);
}

const locales = [
  { id: "en", file: "out/index.html", titles: ["Engineering evidence, not vanity numbers.", "How a project moves forward.", "Ways to work together.", "Questions, answered."] },
  { id: "ar", file: "out/ar/index.html", titles: ["أدلة هندسية بلا أرقام دعائية.", "كيف أنقل الفكرة إلى التنفيذ.", "مجالات يمكننا التعاون فيها.", "أسئلة وأجوبة."] },
  { id: "tr", file: "out/tr/index.html", titles: ["Gösteriş değil, mühendislik kanıtı.", "Bir proje nasıl ilerler?", "Birlikte çalışabileceğimiz alanlar.", "Sorular ve yanıtlar."] },
];

function section(html, id, nextId) {
  const begin = html.indexOf('id="' + id + '"');
  check(begin >= 0, "Missing #" + id);
  const end = nextId ? html.indexOf('id="' + nextId + '"', begin) : -1;
  return html.slice(begin, end < 0 ? undefined : end);
}

for (const locale of locales) {
  check(existsSync(locale.file), "Missing " + locale.file);
  const html = readFileSync(locale.file, "utf8");
  for (const heading of locale.titles) check(html.includes(heading), locale.id + ": missing translated heading " + heading);
  const role = locale.id === "en" ? "Frontend Engineer" : locale.id === "ar" ? "مهندس واجهات" : "Frontend Mühendisi";
  check(html.includes(role), locale.id + ": missing frontend-first recruiter positioning");
  const evidence = section(html, "highlights", "ai-lab");
  for (const slug of ["eventify", "bookhaven", "fitflow", "mizan", "venues-api"]) {
    check(evidence.includes('/work/' + slug + '/'), locale.id + ": missing sourced case study " + slug);
  }
  const process = section(html, "process", "systems");
  const steps = [...process.matchAll(/data-workflow-step="\d"/g)];
  check(steps.length === 4, locale.id + ": expected four process stages");
  const hero = section(html, "top", "work");
  const inquiryLabel = { en: "Discuss your project", ar: "ناقش مشروعك", tr: "Projenizi konuşalım" }[locale.id];
  const inquiryLink = hero.match(/<a\b[^>]*data-studio-cta="hero"[^>]*>[\s\S]*?<\/a>/);
  check(inquiryLink && inquiryLink[0].includes('href="#collaborate"') && inquiryLink[0].includes(inquiryLabel), locale.id + ": missing localized project inquiry link in hero");
  check(hero.includes("data-hero-actions") && hero.includes("data-hero-work"), locale.id + ": missing distinct hero visitor paths");
  const cvLink = hero.match(/<a\b[^>]*data-hero-cv[^>]*>/);
  check(cvLink && cvLink[0].includes('href="/Abdulrahman-Hajar-Frontend-Resume.pdf"') && cvLink[0].includes('aria-describedby="hero-cv-context"') && /\bdownload(?:[\s=>])/.test(cvLink[0]), locale.id + ": missing accessible CV download");
  check((hero.match(/<li\b[^>]*data-hero-proof/g) ?? []).length === 3, locale.id + ": expected three hero capability labels");
  const collaboration = section(html, "collaborate", "faq");
  check(collaboration.includes("linkedin.com/in/"), locale.id + ": missing direct collaboration CTA");
  check((collaboration.match(/data-collaboration-card=/g) ?? []).length === 3, locale.id + ": expected 3 collaboration capabilities");
  const briefTitle = { en: "Start with a clear project brief.", ar: "ابدأ بوصف واضح لمشروعك.", tr: "Net bir proje özetiyle başlayın." }[locale.id];
  check(collaboration.includes(briefTitle), locale.id + ": missing localized inquiry brief");
  check(collaboration.includes('data-project-brief="true"'), locale.id + ": missing project brief panel");
  check((collaboration.match(/data-brief-item="true"/g) ?? []).length === 4, locale.id + ": expected four brief prompts");
  check(collaboration.includes('aria-describedby="inquiry-note"') && collaboration.includes('id="inquiry-note"'), locale.id + ": missing contact privacy disclosure");
  const serviceLinks = [...collaboration.matchAll(/<a\b[^>]*data-service-evidence="true"[^>]*>/g)];
  check(serviceLinks.length === 3, locale.id + ": expected three service evidence links");
  for (const slug of ["fitflow", "mizan", "bookhaven"]) {
    check(serviceLinks.some(link => link[0].includes('href="/work/' + slug + '/"')), locale.id + ": missing service evidence " + slug);
    check(existsSync("out/work/" + slug + "/index.html"), locale.id + ": service evidence target missing");
  }
  const briefPath = "/briefs/project-brief-" + locale.id + ".txt";
  const download = collaboration.match(/<a\b[^>]*data-brief-download="true"[^>]*>/);
  check(download && download[0].includes('href="' + briefPath + '"') && /\bdownload(?:[\s=>])/.test(download[0]), locale.id + ": missing brief download");
  check(existsSync("out" + briefPath), locale.id + ": missing exported brief file");
  const briefText = readFileSync("out" + briefPath, "utf8");
  check(briefText.length > 180 && briefText.includes("linkedin.com/in/") && ["1.", "2.", "3.", "4.", "5."].every(marker => briefText.includes(marker)), locale.id + ": incomplete brief template");
  const contactLink = collaboration.match(/href="(https:\/\/www\.linkedin\.com\/in\/[^"]+)"/);
  check(contactLink && briefText.includes(contactLink[1]), locale.id + ": brief contact destination differs from the rendered contact link");
  const faq = section(html, "faq", undefined);
  check((faq.match(/<details\b/g) ?? []).length >= 3, locale.id + ": expected native, keyboard-friendly FAQ");
  check(/<summary\b/.test(faq), locale.id + ": FAQ is not semantic");
}
console.log("V5 verified: localized evidence, process, collaboration and FAQ across all 3 static routes.");

// Server-only full-page copy must not be included in browser JS chunks.
const clientChunks = [];
function collectClientChunks(dir) {
  for (const entry of readdirSync(dir,{withFileTypes:true})) {
    const path=join(dir,entry.name);
    if(entry.isDirectory()) collectClientChunks(path);
    else if(entry.isFile() && path.endsWith(".js")) clientChunks.push(path);
  }
}
collectClientChunks("out/_next/static/chunks");
check(clientChunks.length>0,"No browser JavaScript chunks to inspect");
const serverOnlyCopy = ["Engineering evidence, not vanity numbers.", "Distinctive interfaces.", "Every system is a network of decisions.", "Trace product requirements through system boundaries, ownership, and failure paths before implementation."];
for(const file of clientChunks){
  const js=readFileSync(file,"utf8");
  for(const phrase of serverOnlyCopy) check(!js.includes(phrase),"Server-only copy leaked into browser chunk: "+file+" ("+phrase+")");
}
console.log("Client chunk copy isolation verified across "+clientChunks.length+" JS files.");
