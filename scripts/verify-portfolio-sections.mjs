/** Static-export contract for V3.8 portfolio sections in all three locales. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const cases=[
 {locale:"en",directory:"",heading:["How I work","Explore by challenge","Quick answers"]},
 {locale:"ar",directory:"ar/",heading:["كيف أعمل","استكشف حسب التحدّي","أسئلة سريعة"]},
 {locale:"tr",directory:"tr/",heading:["Nasıl çalışırım","Probleme göre keşfet","Kısa yanıtlar"]},
];
for(const {locale,directory,heading} of cases){
 const html=readFileSync(join("out",directory,"index.html"),"utf8");
 const prefix=locale==="en"?"/":"/"+locale+"/";
 const sections=Object.fromEntries(["process","explore","questions"].map(id=>{
  const pattern=new RegExp('<section\\b[^>]*\\bid="'+id+'"[^>]*>([\\s\\S]*?)<\\/section>','i');
  const match=html.match(pattern);
  assert.ok(match,"Missing SSR section #"+id+" in "+locale);
  return [id,match[1]];
 }));
 for(const [i,id] of ["process","explore","questions"].entries()){
  assert.ok(sections[id].includes(heading[i]),"Missing localized "+id+" heading in "+locale);
  assert.ok(html.includes('href="#'+id+'"'),"Missing navigation to #"+id+" in "+locale);
 }
 assert.equal((sections.process.match(/data-process-step="/g)??[]).length,4,
   "Four distinct delivery steps expected in "+locale);
 assert.equal((sections.explore.match(/data-focus-project="/g)??[]).length,4,
   "Four challenge-driven project paths expected in "+locale);
 for(const slug of ["eventify","bookhaven","fitflow","venues-api"]){
  assert.ok(sections.explore.includes('href="'+prefix+'work/'+slug+'/"'),
    "Explore section must link to localized "+slug+" case study in "+locale);
 }
 assert.equal((sections.questions.match(/<details\b/g)??[]).length,3,
   "Three keyboard-accessible no-JS FAQ entries expected in "+locale);
 assert.ok(sections.questions.includes('href="/Abdulrahman-Hajar-Resume.pdf"'),
   "FAQ should link to existing English résumé PDF in "+locale);
 const newSections=Object.fromEntries(["decisions","collaborate"].map(id=>{
  const re=new RegExp('<section\\b[^>]*\\bid="'+id+'"[^>]*>([\\s\\S]*?)<\\/section>','i');
  const match=html.match(re);
  assert.ok(match,"Missing new section #"+id+" in "+locale);
  assert.ok(html.includes('href="#'+id+'"'),"New section #"+id+" has no in-page route in "+locale);
  return [id,match[1]];
 }));
 assert.ok(newSections.decisions.includes(
   locale==="ar"?"قرارات هندسية ومفاضلات":locale==="tr"?"Mühendislik kararları ve ödünleşimler":"Engineering decisions and trade-offs"
 ),"Decision heading translated in "+locale);
 assert.ok(newSections.collaborate.includes(
   locale==="ar"?"مجالات التعاون":locale==="tr"?"Birlikte çalışma alanları":"Ways to collaborate"
 ),"Collaboration heading translated in "+locale);
 assert.equal((newSections.decisions.match(/data-decision-project="/g)??[]).length,4,
   "Decision journal covers 4 existing projects in "+locale);
 for(const slug of ["eventify","bookhaven","fitflow","venues-api"]){
   assert.ok(newSections.decisions.includes('href="'+prefix+'work/'+slug+'/"'),
    "Decision journal must link to localized "+slug+" case study in "+locale);
 }
 assert.equal((newSections.collaborate.match(/data-collab-area="/g)??[]).length,3,
   "Three collaboration paths in "+locale);
 assert.ok(newSections.collaborate.includes('href="'+prefix+'resume/"'),
   "Collaboration includes localized résumé in "+locale);
 assert.ok(newSections.collaborate.includes("https://www.linkedin.com/in/"),
   "Collaboration links to existing LinkedIn profile in "+locale);
 console.log(locale+": 5 localized sections, 4 steps, 4 project paths, 3 FAQ entries, 4 decisions, 3 collaboration areas verified");
}
