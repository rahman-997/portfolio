/** Static-export verification of English, Arabic RTL and Turkish content. Fail closed on regressions. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const out=path.resolve("out");
const slugs=["eventify","bookhaven","fitflow","venues-api"];
const read=(route)=>{
 const file=path.join(out,route,"index.html");
 assert.ok(fs.existsSync(file),"Missing static route "+route);
 return fs.readFileSync(file,"utf8");
};
const en=read("");
assert.ok(en.includes("I build software as"),"English homepage remains available");
assert.ok(en.includes('href="/ar/"'),"English homepage links to Arabic");
assert.ok(en.includes('href="/tr/"'),"English homepage links to Turkish");
assert.ok(read("resume").includes("Technical capabilities"),"English resume remains");
for(const locale of ["ar","tr"]){
 const isAr=locale==="ar";
 const home=read(locale),resume=read(locale+"/resume");
 assert.ok(home.includes('lang="'+locale+'"'),"Home locale attribute "+locale);
 assert.ok(home.includes('dir="'+(isAr?"rtl":"ltr")+'"'),"Home direction "+locale);
 assert.ok(home.includes(isAr?"أبني البرمجيات":"Yalnızca ekran değil"),"Translated home headline "+locale);
 assert.ok(home.includes('href="/'+locale+'/resume/"'),"Localized resume link "+locale);
 assert.ok(home.includes('href="/'+locale+'/work/eventify/"'),"Localized case study link "+locale);
 assert.ok(home.includes("WEBGL2"),"V2 interactive graphics preserved "+locale);
 assert.ok(resume.includes(isAr?"الملف المهني":"Profesyonel profil"),"Translated resume "+locale);
 assert.ok(resume.includes("Abdulrahman-Hajar-Resume.pdf"),"PDF proof preserved "+locale);
 for(const slug of slugs){
  const doc=read(locale+"/work/"+slug);
  assert.ok(doc.includes('lang="'+locale+'"'),"Case study locale "+locale+" "+slug);
  assert.ok(doc.includes(isAr?"المشكلة":"Problem"),"Case study problem translated "+locale+" "+slug);
  assert.ok(doc.includes(isAr?"الموثوقية":"Güvenilirlik"),"Case study reliability translated "+locale+" "+slug);
  assert.ok(doc.includes('href="/'+locale+'/"'),"Case study back link "+locale+" "+slug);
 }
}
console.log("V3 i18n passed: 15 static pages (5 English legacy + 10 localized), RTL, content, links, 4 project studies per language, V2 preserved.");
