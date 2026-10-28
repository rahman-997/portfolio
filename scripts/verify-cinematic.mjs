import {readFileSync,existsSync} from "node:fs";
const assert=(ok,msg)=>{if(!ok)throw Error("Cinematic preview contract: "+msg);};
const cases=[["en","out/index.html"],["ar","out/ar/index.html"],["tr","out/tr/index.html"]];
for(const [locale,path] of cases) {
 assert(existsSync(path),`missing export ${path}`);
 const s=readFileSync(path,"utf8");
 assert(s.includes('data-cinematic-scene="true"'),`${locale}: missing immersive hero`);
 assert(s.includes('data-featured-showcase="true"'),`${locale}: missing featured gallery`);
 assert((s.match(/data-featured-system=/g)||[]).length===3,`${locale}: expected three featured systems`);
 for(const project of ["eventify","bookhaven","fitflow"]) {
   assert(s.includes("/work/"+project+"/"),`${locale}: missing case study link ${project}`);
 }
 assert(s.includes('id="work"'),`${locale}: complete 7-project library missing`);
 assert(s.includes('id="ai-lab"'),`${locale}: AI Atlas must remain`);
 assert(s.includes('id="highlights"'),`${locale}: case study evidence must remain`);
 assert(s.includes('id="faq"'),`${locale}: FAQ must remain`);
 assert(s.includes("EN")&&s.includes("/ar/")&&s.includes("/tr/"),`${locale}: language switcher missing`);
 if(locale==="ar") assert(/<html[^>]+dir="rtl"/.test(s),"Arabic static HTML lost RTL");
}
console.log("Cinematic V6 export confirmed: 3 locales, hero, 3 featured systems and all legacy sections.");
