/** Portfolio V2 browser QA. Only opens local ephemeral CI server. */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const origin="http://127.0.0.1:4173", output="artifacts/holo-browser";
const models=[["desktop",1440,900,1],["tablet",820,1180,1],["mobile",390,844,2],["small-mobile",360,740,2]];
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.QA_CHROME_PATH?{executablePath:process.env.QA_CHROME_PATH}:{}),args:["--enable-webgl","--enable-unsafe-swiftshader","--use-angle=swiftshader","--disable-dev-shm-usage"]});
const reports=[]; let failures=0;
for(const [name,width,height,dpr] of models){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:dpr,isMobile:name.includes("mobile"),hasTouch:name.includes("mobile")});
 const exceptions=[],messages=[];
 page.on("pageerror",e=>exceptions.push(String(e)));
 page.on("console",m=>{if(m.type()==="error"||m.type()==="warning")messages.push(m.text());});
 const item={viewport:name,dimensions:[width,height],tests:{},warnings:messages};
 try {
  const response=await page.goto(origin,{waitUntil:"networkidle",timeout:30000});
  assert.equal(response?.status(),200,"home HTTP 200");
  await page.waitForSelector("canvas",{timeout:10000});await page.waitForTimeout(850);
  const metrics=await page.evaluate(()=>{
   const c=document.querySelector("canvas"),g=c?.getContext("webgl2");
   return {webgl2:!!g,canvasWidth:c?.width||0,canvasHeight:c?.height||0,viewportWidth:innerWidth,documentWidth:document.documentElement.scrollWidth,error:g?.getError()??null,hero:!!document.querySelector("h1"),work:!!document.querySelector("#work"),resume:!!document.querySelector('a[href="/resume/"]'),projects:document.querySelectorAll("article").length};
  });
  item.metrics=metrics;
  assert.equal(metrics.webgl2,true,"WebGL2 context should initialize");
  assert.equal(metrics.error,0,"no WebGL errors");
  assert.ok(metrics.canvasWidth>250&&metrics.canvasHeight>200,"canvas dimensions");
  assert.ok(metrics.documentWidth<=metrics.viewportWidth+1,"no horizontal overflow");
  assert.ok(metrics.hero&&metrics.work&&metrics.resume&&metrics.projects>=4,"original portfolio preserved");
  item.tests.layout_and_gpu="pass";
  await page.screenshot({path:output+"/"+name+".png",fullPage:true,animations:"disabled"});
  const signal=page.getByRole("button",{name:"SIGNAL",exact:true});await signal.click();assert.equal(await signal.getAttribute("aria-pressed"),"true");
  const systems=page.getByRole("button",{name:"SYSTEMS",exact:true});await systems.click();assert.equal(await systems.getAttribute("aria-pressed"),"true");
  await page.getByRole("button",{name:"Pause 3D motion"}).click();
  assert.equal(await page.getByRole("button",{name:"Play 3D motion"}).getAttribute("aria-pressed"),"true");
  await page.getByRole("button",{name:"Reset 3D view"}).click();
  await page.getByRole("button",{name:"Pulse visual effect"}).click();
  await page.locator("canvas").focus();await page.keyboard.press("ArrowRight");await page.keyboard.press("Home");
  item.tests.controls_and_keyboard="pass";
  await page.emulateMedia({reducedMotion:"reduce"});await page.reload({waitUntil:"networkidle"});await page.waitForTimeout(400);
  assert.equal(await page.getByRole("button",{name:"Play 3D motion"}).getAttribute("aria-pressed"),"true","reduced motion pauses by default");
  item.tests.reduced_motion="pass";
  assert.deepEqual(exceptions,[],"no JS exceptions");
  assert.ok(!messages.some(m=>/Shader failed|Link failed|Holo3D unavailable|WebGL INVALID/i.test(m)),"no shader errors");
  item.tests.javascript="pass";
 }catch(error){failures++;item.failure=String(error);try{await page.screenshot({path:output+"/"+name+"-FAILED.png",fullPage:true,timeout:5000});}catch{}}
 finally{reports.push(item);await page.close();}
}
await browser.close();
const result={status:failures?"failed":"passed",failures,reports};
await writeFile(output+"/report.json",JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if(failures)process.exitCode=1;
