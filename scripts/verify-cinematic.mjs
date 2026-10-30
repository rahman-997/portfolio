import {createHash} from "node:crypto";
import {readFileSync,existsSync} from "node:fs";
const assert=(ok,msg)=>{if(!ok)throw Error("Cinematic preview contract: "+msg);};
const cases=[["en","out/index.html"],["ar","out/ar/index.html"],["tr","out/tr/index.html"]];
const screenProof = JSON.parse(readFileSync("app/experience/project-captures.json","utf8"));
for (const [slug,record] of Object.entries(screenProof.screenshots)) {
 assert(["eventify","bookbookhaven","fitflow-gym"].includes(slug), "unknown screenshot slug "+slug);
 assert(record.verified === true && record.httpStatus >= 200 && record.httpStatus < 400, "missing authentic page verification for "+slug);
 assert(typeof record.sourceUrl === "string" && /^https:\/\//.test(record.sourceUrl), "missing source URL for "+slug);
 assert(typeof record.capturedAt === "string" && !Number.isNaN(Date.parse(record.capturedAt)), "invalid capturedAt for "+slug);
 assert(/^\/projects\/live\/[a-z-]+-actual\.jpg$/.test(record.src), "non-authentic screenshot path for "+slug);
 const file = "public" + record.src;
 assert(existsSync(file), "capture asset missing for "+slug);
 const bytes = readFileSync(file);
 assert(bytes.subarray(0,3).toString("hex") === "ffd8ff", "capture must be a real JPEG");
 assert(createHash("sha256").update(bytes).digest("hex") === record.sha256, "image changed since capture: "+slug);
}
for(const [locale,path] of cases) {
 assert(existsSync(path),`missing export ${path}`);
 const s=readFileSync(path,"utf8");
 assert(s.includes('data-cinematic-scene="true"'),`${locale}: missing immersive hero`);
 assert(s.includes('data-featured-showcase="true"'),`${locale}: missing featured gallery`);
 assert(!s.includes("eventify-concept.svg") && !s.includes("bookhaven-concept.svg"),
        `${locale}: conceptual interface incorrectly advertised as a real project`);
 for(const record of Object.values(screenProof.screenshots)){
   assert(s.includes(record.src),`${locale}: real screenshot not displayed: ${record.src}`);
 }
 assert((s.match(/data-featured-system=/g)||[]).length===3,`${locale}: expected three featured systems`);
 for(const project of ["eventify","bookhaven","fitflow"]) {
   assert(s.includes("/work/"+project+"/"),`${locale}: missing case study link ${project}`);
 }
 assert(s.includes('id="blueprint-lab"'),`${locale}: missing interactive architecture lab`);
 assert(s.includes('data-blueprint-selector="true"'),`${locale}: missing architecture explorer controls`);
 assert(s.includes('id="mission-paths"'),`${locale}: missing audience navigation`);
 assert((s.match(/data-mission-path=/g)||[]).length===3,`${locale}: missing journey paths`);
 assert(s.includes('id="work"'),`${locale}: complete 7-project library missing`);
 assert(s.includes('id="ai-lab"'),`${locale}: AI Atlas must remain`);
 assert(s.includes('id="highlights"'),`${locale}: case study evidence must remain`);
 assert(s.includes('id="faq"'),`${locale}: FAQ must remain`);
 assert(s.includes("EN")&&s.includes("/ar/")&&s.includes("/tr/"),`${locale}: language switcher missing`);
 if(locale==="ar") assert(/<html[^>]+dir="rtl"/.test(s),"Arabic static HTML lost RTL");
}
console.log("Cinematic V6 export confirmed: 3 locales, hero, 3 featured systems and all legacy sections.");
