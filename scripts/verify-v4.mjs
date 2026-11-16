import { readFileSync, existsSync } from "node:fs";
const projectsSource=readFileSync("app/experience/projects.ts","utf8")+readFileSync("app/experience/additional-projects.ts","utf8");
const expectedProjectIds = ["eventify","bookbookhaven","fitflow-gym","venues-api","mizan-finance","portfolio","free-claude-code","hajarcare","sirahazir","salespilot-ai","kivyro","digital-rug-max","aura","athrua","sham","smart-qr-pager","marketing-agents","hajar-studio","lumera","switchboard","venueflow","culture-sy"];
const check=(yes,message)=>{if(!yes)throw new Error(message)};
check((projectsSource.match(/id:"/g)||[]).length===expectedProjectIds.length,"Incomplete project catalog");
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
  check((html.match(/data-project-id=/g)||[]).length===expectedProjectIds.length,"Wrong rendered project count: "+path);
  for(const id of expectedProjectIds)check(html.includes('data-project-id="'+id+'"'),"Missing catalog entry "+id+" in "+path);
  check(html.includes('id="project-search"'),"Missing accessible project search");
  check(html.includes('id="mobile-navigation"'),"Missing accessible mobile navigation");
  check(html.includes('id="appearance-init"'),"Missing safe pre-paint theme initialization");
  check(html.includes('property="og:title"') && html.includes('property="og:image"'),"Missing social sharing metadata");
  check(html.includes('name="twitter:title"') && html.includes('name="twitter:image"'),"Missing Twitter sharing metadata");
  for(const stale of ["Six listed repositories", "ستة مستودعات", "Listelenen altı depo", "Private repositories are not displayed", "Computer Engineering student", "طالب هندسة", "öğrencisiyim"])
    check(!html.includes(stale),"Stale public copy: "+stale);
  for(const id of ["eventify","bookbookhaven","fitflow-gym","venues-api","mizan-finance","portfolio","free-claude-code"]){
    check(html.includes("https://github.com/rahman-997/"+id),"Missing public project "+id+" in "+path);
  }
  for(const match of html.matchAll(/https:\/\/github\.com\/rahman-997\/([A-Za-z0-9_.-]+)/g)){
    check(allowedPublicIds.has(match[1]),"Unexpected repository exposed in "+path);
  }
  for(const locale of ["/ar/","/tr/"])check(html.includes(locale),"Missing language navigation "+locale+" in "+path);
  check(html.includes('aria-label="')&&html.includes(language==="ar"?"وضع العرض":language==="tr"?"Görselleştirme modu":"Visualization mode"),"Accessibility controls missing");
}
console.log("Project exports verified: 22 projects, 3 languages, RTL, Atlas, 7 public sources, no private repository URLs");
