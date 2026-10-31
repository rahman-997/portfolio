import {existsSync,readFileSync} from "node:fs";
const check=(truth,message)=>{if(!truth)throw Error("Reference redesign: "+message)};
check(existsSync("out/art/hajar-landscape.svg"),"the mountain landscape is missing");
const landscape=readFileSync("out/art/hajar-landscape.svg","utf8");
check(landscape.includes("<svg")&&landscape.includes("mountain"),"mountain art must be local original SVG");
for(const [locale,path] of [["en","out/index.html"],["ar","out/ar/index.html"],["tr","out/tr/index.html"]]){
 check(existsSync(path),locale+" export missing");
 const html=readFileSync(path,"utf8");
 check(html.includes('data-reference-design="hajar-editorial-2026"'),locale+" lacks reference layout");
 check(html.includes('data-cinematic-scene="true"'),locale+" hero missing");
 check(html.includes("/art/hajar-landscape.svg"),locale+" landscape scene missing");
 check((html.match(/data-featured-system=/g)||[]).length===3,locale+" missing three featured projects");
 check(html.includes('id="eventify-feature-story"'),locale+" missing Eventify visual case study");
 check((html.match(/data-eventify-slide=/g)||[]).length===5,locale+" five story frames missing");
 check(html.includes('id="blueprint-lab"'),locale+" missing system diagram");
 check(html.includes('id="ai-lab"'),locale+" AI Atlas missing");
 check(html.includes('id="work"'),locale+" complete project gallery missing");
 check(html.includes('id="contact"'),locale+" contact missing");
 if(locale==="ar")check(/<html[^>]+dir="rtl"/.test(html),"Arabic no-JS RTL missing");
}
console.log("Reference layout export: 3 locales, real featured projects, Eventify 5-frame story and blueprint.");
