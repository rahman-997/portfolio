import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
function htmlFiles(directory){
 return readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?htmlFiles(join(directory,entry.name)):entry.name.endsWith(".html")?[join(directory,entry.name)]:[]);
}
for(const [lang,dir] of [["ar","rtl"],["tr","ltr"]]){
 const root=`out/${lang}`;
 if(!existsSync(`${root}/index.html`))throw new Error(`Missing localized export: ${root}`);
 for(const file of htmlFiles(root)){
  const html=readFileSync(file,"utf8");
  const next=html.replace(/<html\b[^>]*>/,tag=>tag.replace(/lang="[^"]*"/,`lang="${lang}"`).replace(/\sdir="[^"]*"/g,"").replace(/>$/,` dir="${dir}">`));
  if(!next.includes(`<html lang="${lang}"`))throw new Error(`Failed to localize ${file}`);
  writeFileSync(file,next);
 }
}
