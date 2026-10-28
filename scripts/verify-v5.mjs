import { existsSync, readFileSync } from "node:fs";

const check = (condition, message) => {
  if (!condition) throw new Error("V5 new section regression: " + message);
};

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
  const evidence = section(html, "highlights", "ai-lab");
  for (const slug of ["eventify", "bookhaven", "fitflow", "venues-api"]) {
    check(evidence.includes('/work/' + slug + '/'), locale.id + ": missing sourced case study " + slug);
  }
  const process = section(html, "process", "systems");
  const steps = [...process.matchAll(/data-workflow-step="\d"/g)];
  check(steps.length === 4, locale.id + ": expected four process stages");
  const collaboration = section(html, "collaborate", "faq");
  check(collaboration.includes("linkedin.com/in/"), locale.id + ": missing direct collaboration CTA");
  check((collaboration.match(/data-collaboration-card=/g) ?? []).length === 3, locale.id + ": expected 3 collaboration capabilities");
  const faq = section(html, "faq", undefined);
  check((faq.match(/<details\b/g) ?? []).length >= 3, locale.id + ": expected native, keyboard-friendly FAQ");
  check(/<summary\b/.test(faq), locale.id + ": FAQ is not semantic");
}
console.log("V5 verified: localized evidence, process, collaboration and FAQ across all 3 static routes.");
