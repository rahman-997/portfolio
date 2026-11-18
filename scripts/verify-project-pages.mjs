import { readFileSync, existsSync } from "node:fs";
import { hasVerifiedUpstreamCredit } from "./project-link-security.mjs";
const ids=["eventify","bookbookhaven","fitflow-gym","venues-api","mizan-finance","portfolio","free-claude-code","hajarcare","sirahazir","salespilot-ai","kivyro","digital-rug-max","aura","athrua","sham","smart-qr-pager","marketing-agents","hajar-studio","lumera","switchboard","venueflow","culture-sy"];
const allowed=new Set(ids.slice(0,7));
const check=(yes,message)=>{if(!yes)throw new Error(message);};
const sitemap=readFileSync("out/sitemap.xml","utf8");
let count=0;
for(const locale of ["en","ar","tr"]){
  const prefix=locale==="en"?"":`${locale}/`;
  const home=readFileSync(`out/${prefix}index.html`,"utf8");
  check(home.includes('id="contact-brief"'),`${locale}: enquiry composer missing`);
  check(home.includes('id="share-projects"'),`${locale}: share control missing`);
  for(const id of ids){
    const path=`/${prefix}projects/${id}/`;
    const file=`out${path}index.html`;
    check(existsSync(file),`Missing project overview: ${file}`);
    const html=readFileSync(file,"utf8");
    check(html.includes(`data-project-brief="${id}"`),`Wrong project overview: ${file}`);
    check(html.includes(`<html lang="${locale}"`),`Wrong static locale: ${file}`);
    if(locale==="ar")check(/<html[^>]*dir="rtl"/.test(html),`Missing no-JS RTL: ${file}`);
    check(html.includes(`rel="canonical" href="https://abdulrahman-hajar-portfolio.onrender.com${path}"`),`Wrong canonical: ${file}`);
    check(home.includes(`href="${path}"`),`Gallery cannot reach ${path}`);
    check(sitemap.includes(`<loc>https://abdulrahman-hajar-portfolio.onrender.com${path}</loc>`),`Sitemap missing ${path}`);
    check(html.includes('id="scope-title"')&&html.includes('id="focus-title"'),`Overview content missing: ${file}`);
    check(html.includes(`project=${id}#contact-brief`),`Project enquiry not linked: ${file}`);
    for(const language of ["ar","tr"]){
      check(html.includes(`href="/${language}/projects/${id}/"`),`Language switch loses the project: ${file}`);
    }
    for(const match of html.matchAll(/https:\/\/github\.com\/rahman-997\/([A-Za-z0-9_.-]+)/g))check(allowed.has(match[1]),`Private source URL exposed: ${file}`);
    if(id==="free-claude-code")check(hasVerifiedUpstreamCredit(html),`Fork provenance missing or invalid URL: ${file}`);
    check(!html.includes("\ufffd"),`Broken Unicode: ${file}`);
    count++;
  }
}
console.log(`Project overviews verified: ${count} localized pages, 22 gallery links per language, sitemap, metadata, RTL and public-source boundaries.`);
