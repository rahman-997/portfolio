import {readFileSync,existsSync} from "node:fs";
const assert=(ok,message)=>{if(!ok)throw new Error("HAJAR atelier regression: "+message)};
const css=readFileSync("app/experience/atelier.module.css","utf8");
const typography=readFileSync("app/globals.css","utf8");
assert(typography.includes("IBM Plex Sans Arabic"),"Missing Arabic-focused typography");
assert(typography.includes("DM Sans"),"Missing multilingual UI typography");
assert(css.includes("#be9875"),"Missing logo-aligned bronze color");
for(const [locale,path] of [["en","out/index.html"],["ar","out/ar/index.html"],["tr","out/tr/index.html"]]){
 assert(existsSync(path),"Missing static route "+locale);
 const html=readFileSync(path,"utf8");
 assert(html.includes('data-design-system="hajar-atelier"'),"Missing new art direction on "+locale);
 assert(html.includes('data-cinematic-scene="true"'),"Hero removed on "+locale);
 assert(html.includes("/brand/hajar-emblem.svg"),"Original HAJAR mark missing on "+locale);
 assert(html.includes('data-featured-showcase="true"'),"Actual project showcase missing on "+locale);
 for(const id of ["work","blueprint-lab","ai-lab","faq"])assert(html.includes('id="'+id+'"'),locale+" missing #"+id);
}
console.log("HAJAR editorial art direction: three locales, authentic brand, projects and Atlas retained.");
