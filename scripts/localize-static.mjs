import { existsSync, readFileSync, writeFileSync } from "node:fs";
const plans = [
  ["ar","rtl"],
  ["tr","ltr"]
];
for (const [lang,dir] of plans) {
  const file=`out/${lang}/index.html`;
  if (!existsSync(file)) throw new Error(`Missing localized static export: ${file}`);
  const html=readFileSync(file,"utf8");
  const next=html.replace(/<html\b[^>]*>/,tag=>
    tag.replace(/lang="[^"]*"/,`lang="${lang}"`).replace(/\sdir="[^"]*"/g,"").replace(/>$/,` dir="${dir}">`));
  if (next===html) throw new Error(`Failed to set static language for ${file}`);
  writeFileSync(file,next);
}
