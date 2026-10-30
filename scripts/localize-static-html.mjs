/**
 * Portfolio V3.1: finalize the exported HTML document language before hosting.
 *
 * Next static export has one shared app/layout.tsx that emits <html lang="en">.
 * Locale pages contain SSR lang/dir in their content but the top-level element
 * needs localized attributes too, including when JavaScript is unavailable.
 *
 * This is a deterministic build-time step (not a client-side patch). Keep it
 * in npm run build so Render, Netlify and CI publish the corrected HTML.
 * No external dependencies, no network calls, no production writes.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const out = join(process.cwd(), "out");
if (!existsSync(join(out,"index.html"))) throw Error("Build export not found. Run next build before localization.");
function pages(dir){
  return readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    const filename=join(dir,e.name);
    return e.isDirectory()?pages(filename):filename.endsWith(".html")?[filename]:[];
  });
}
const expected = {ar:"rtl",tr:"ltr"};
let updated=0,matched=0;
for (const [locale,dir] of Object.entries(expected)) {
  const base=join(out,locale);
  if (!existsSync(join(base,"index.html"))) throw Error("Missing localized homepage /"+locale+"/");
  const routes=pages(base);
  if(routes.length !== 6)throw Error("Expected 6 exported HTML routes for /"+locale+"/, found "+routes.length);
  for(const filename of routes){
    const raw=readFileSync(filename,"utf8");
    const found=raw.match(/<html\b[^>]*>/i);
    if(!found)throw Error("Missing html root: "+relative(out,filename));
    let next=found[0];
    // Avoid matching any other nested language markup or serialized React data.
    next=next.replace(/\s+(?:lang|dir)\s*=\s*(?:"[^"]*"|'[^']*')/gi,"");
    next=next.replace(/^<html\b/i,'<html lang="'+locale+'" dir="'+dir+'"');
    const result=raw.replace(found[0],next);
    if(result!==raw){writeFileSync(filename,result,"utf8");updated++;}
    const tag=result.match(/<html\b[^>]*>/i)?.[0]??"";
    if(!tag.includes('lang="'+locale+'"')||!tag.includes('dir="'+dir+'"'))throw Error("Incorrect root locale in "+filename);
    matched++;
  }
}
const english=readFileSync(join(out,"index.html"),"utf8").match(/<html\b[^>]*>/i)?.[0]??"";
if(!english.includes('lang="en"')||!english.includes('dir="ltr"'))throw Error("English root HTML regressed.");
console.log("V3.1 HTML localization: "+matched+" localized pages checked; "+updated+" HTML files updated; English preserved.");
