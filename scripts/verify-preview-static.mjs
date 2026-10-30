/** Smoke-test the exact no-dependency preview server used for Windows/Android QA. */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
if(!existsSync("out/ar/index.html"))throw Error("Build the static export before preview smoke test");
const port=42479,base="http://127.0.0.1:"+port;
const child=spawn(process.execPath,["scripts/preview-static.mjs"],{
  env:{...process.env,PORTFOLIO_PREVIEW_PORT:String(port)},stdio:["ignore","pipe","pipe"],windowsHide:true,
});
let output="",stderr="";
child.stdout.on("data",d=>{output+=d.toString();});
child.stderr.on("data",d=>{stderr+=d.toString();});
try{
 let ready=false;
 for(let i=0;i<65;i++){
   if(child.exitCode!==null)throw Error("Preview server exited: "+stderr);
   try{if((await fetch(base+"/")).ok){ready=true;break;}}catch{}
   await new Promise(r=>setTimeout(r,120));
 }
 assert.ok(ready,"Preview server did not start: "+output+" "+stderr);
 for(const [path,expectedLang,expectedDir] of [
   ["/","en","ltr"],["/ar/","ar","rtl"],["/tr/","tr","ltr"],
   ["/ar/resume/","ar","rtl"],["/tr/work/eventify/","tr","ltr"],
 ]) {
   const r=await fetch(base+path);
   assert.equal(r.status,200,path);
   assert.match(r.headers.get("content-type")??"",/text\/html/);
   assert.equal(r.headers.get("cache-control"),"no-store");
   const tag=(await r.text()).match(/<html\b[^>]*>/i)?.[0]??"";
   assert.ok(tag.includes('lang="'+expectedLang+'"')&&tag.includes('dir="'+expectedDir+'"'),"SSR lang/dir "+path);
 }
 const redirect=await fetch(base+"/ar",{redirect:"manual"});
 assert.equal(redirect.status,308,"directory canonical redirect");
 assert.equal(redirect.headers.get("location"),"/ar/");
 assert.equal((await fetch(base+"/ar/no-such-route/")).status,404,"unknown path");
 assert.equal((await fetch(base+"/.env")).status,404,"dotfile is not exposed");
 assert.equal((await fetch(base+"/", {method:"POST"})).status,405,"read-only preview");
 const page=await fetch(base+"/ar/",{method:"HEAD"});
 assert.equal(page.status,200,"HEAD permitted");
 assert.equal((await page.text()).length,0,"HEAD empty body");
 console.log("Preview smoke passed: local read-only server, 5 actual routes, Arabic RTL, Turkish, 308/404, dotfile rejection and HEAD.");
}finally{
 child.kill();
}
