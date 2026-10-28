import { readFileSync, existsSync } from "node:fs";
const projectsSource=readFileSync("app/experience/projects.ts","utf8");
const check=(yes,message)=>{if(!yes)throw new Error(message)};
check((projectsSource.match(/id:"/g)||[]).length===7,"Expected 7 verified public GitHub repositories");
const allowedPublicIds = new Set(["eventify","bookbookhaven","fitflow-gym","venues-api","mizan-finance","portfolio","free-claude-code"]);
check(!projectsSource.includes("source:\"http://"),"Project sources must use HTTPS");
for(const language of ["en","ar","tr"]){
  const path=language==="en"?"out/index.html":`out/${language}/index.html`;
  check(existsSync(path),"Missing locale export "+path);
  const html=readFileSync(path,"utf8");
  const expected=language==="en"?"<html lang=\"en\"":"<html lang=\""+language+"\"";
  check(html.includes(expected),"Incorrect document language: "+path);
  if(language==="ar")check(/<html[^>]*dir="rtl"/.test(html),"Missing document RTL direction");
  check(html.includes('id="ai-lab"'),"Missing AI Atlas: "+path);
  check(html.includes('id="work"'),"Missing project gallery: "+path);
  for(const id of ["eventify","bookbookhaven","fitflow-gym","venues-api","mizan-finance","portfolio","free-claude-code"]){
    check(html.includes("https://github.com/rahman-997/"+id),"Missing public project "+id+" in "+path);
  }
  for(const match of html.matchAll(/https:\/\/github\.com\/rahman-997\/([A-Za-z0-9_.-]+)/g)){
    check(allowedPublicIds.has(match[1]),"Unexpected repository exposed in "+path);
  }
  for(const locale of ["/ar/","/tr/"])check(html.includes(locale),"Missing language navigation "+locale+" in "+path);
  check(html.includes('aria-label="')&&html.includes(language==="ar"?"وضع العرض":language==="tr"?"Görselleştirme modu":"Visualization mode"),"Accessibility controls missing");
}
console.log("V4 static exports verified: 3 languages, RTL, Atlas, 7 public sources, no private repos");
