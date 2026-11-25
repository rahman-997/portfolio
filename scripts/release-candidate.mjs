import { createHash } from "node:crypto";
import { lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED = ["index.html","ar/index.html","tr/index.html","404.html","resume/index.html",
  "work/fitflow/index.html","work/mizan/index.html","work/bookhaven/index.html","work/eventify/index.html","work/venues-api/index.html",
  "briefs/project-brief-en.txt","briefs/project-brief-ar.txt","briefs/project-brief-tr.txt",
  "Abdulrahman-Hajar-Frontend-Resume.pdf","robots.txt","sitemap.xml","manifest.webmanifest"];
const forbidden = /(^|\/)(?:\.env(?:\.[^/]+)?|\.git|node_modules|\.next|.*\.(?:pem|key|pfx|p12))($|\/)/i;
const digest = bytes => createHash("sha256").update(bytes).digest("hex");

export function inventoryExport(directory, commit) {
  if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error("Expected an exact 40-character Git SHA");
  const root = resolve(directory);
  if (!lstatSync(root).isDirectory()) throw new Error("Export root must be a real directory");
  const files = [];
  function walk(dir) {
    for (const name of readdirSync(dir).sort()) {
      const full = join(dir,name);
      const path = relative(root,full).split(sep).join("/");
      if (forbidden.test(path)) throw new Error("Forbidden release file: " + path);
      const st = lstatSync(full);
      if (st.isSymbolicLink()) throw new Error("Symlink in release: " + path);
      if (st.isDirectory()) walk(full);
      else if (st.isFile()) {
        const bytes = readFileSync(full);
        files.push({path,bytes:bytes.length,sha256:digest(bytes)});
      } else throw new Error("Unexpected release entry: " + path);
    }
  }
  walk(root);
  for (const path of REQUIRED) if (!files.some(file=>file.path===path)) throw new Error("Required release file missing: " + path);
  for (const path of ["index.html","ar/index.html","tr/index.html"]) {
    if (!readFileSync(join(root,path),"utf8").includes('data-deploy-commit="'+commit+'"')) throw new Error("Commit marker mismatch: "+path);
  }
  files.sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
  return {schemaVersion:1,commit,fileCount:files.length,totalBytes:files.reduce((n,f)=>n+f.bytes,0),files};
}

export function verifyInventory(directory, expected) {
  const actual=inventoryExport(directory,expected.commit);
  if (JSON.stringify(actual)!==JSON.stringify(expected)) throw new Error("Release inventory mismatch: missing, extra or changed files");
  return actual;
}

if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const [mode,dir,file,commit]=process.argv.slice(2);
  if (mode==="create" && dir && file && commit) {
    const result=inventoryExport(dir,commit);
    writeFileSync(file,JSON.stringify(result,null,2)+"\n");
    console.log("Release inventory created: "+result.fileCount+" files, "+result.totalBytes+" bytes, "+commit);
  } else if (mode==="verify" && dir && file) {
    const result=verifyInventory(dir,JSON.parse(readFileSync(file,"utf8")));
    console.log("Release integrity verified: "+result.fileCount+" files at "+result.commit);
  } else {
    console.error("Usage: release-candidate.mjs create <out> <manifest.json> <git-sha> | verify <out> <manifest.json>");
    process.exitCode=2;
  }
}
