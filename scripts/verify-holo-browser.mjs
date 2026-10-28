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
  if(name.includes("mobile"))assert.ok(metrics.canvasWidth<=width*1.45,"mobile GPU raster should be capped");
  assert.ok(metrics.documentWidth<=metrics.viewportWidth+1,"no horizontal overflow");
  assert.ok(metrics.hero&&metrics.work&&metrics.resume&&metrics.projects>=4,"original portfolio preserved");
  item.tests.layout_and_gpu="pass";
  await page.screenshot({path:output+"/"+name+".png",fullPage:true,animations:"disabled"});

  const label=page.locator('[class*="projectVisualLegend"]').first();
  assert.ok(await label.count(),"project artwork label exists");
  assert.equal(await label.isVisible(),true,"project labels are displayed");
  assert.ok((await label.innerText()).includes("Eventify"),"actual project identity is visible");
  await label.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  const legendInfo=await label.evaluate(el=>({
    rect:{top:Math.round(el.getBoundingClientRect().top),bottom:Math.round(el.getBoundingClientRect().bottom)},
    opacity:getComputedStyle(el).opacity,
    display:getComputedStyle(el).display,
    background:getComputedStyle(el).backgroundImage
  }));
  item.projectLabel=legendInfo;
  assert.equal(legendInfo.display,"flex","project legend must stack labels vertically");
  assert.notEqual(legendInfo.background,"none","project label needs contrast gradient");

  assert.ok(legendInfo.rect.top>=-4&&legendInfo.rect.top<height,"project evidence is in viewport");
  await page.screenshot({path:output+"/"+name+"-project.png",animations:"disabled"});
  item.tests.project_readability="pass";

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
// Force a device with no WebGL2, validating useful accessible static artwork.
const fallbackPage=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
await fallbackPage.addInitScript(()=>{
  const getContext=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...args){
    if(type==="webgl2")return null;
    return getContext.call(this,type,...args);
  };
});
const fallbackReport={viewport:"no-webgl2",tests:{}};
try {
  await fallbackPage.goto(origin,{waitUntil:"networkidle",timeout:30000});
  const label=fallbackPage.getByText("STATIC · 2D");
  await label.waitFor({state:"visible",timeout:10000});
  assert.equal(await fallbackPage.getByRole("button",{name:"SIGNAL",exact:true}).count(),0,"3D-only controls hidden in fallback");
  assert.equal(await fallbackPage.getByRole("status").count(),1,"fallback state accessible");
  const data=await fallbackPage.locator("canvas").evaluate(canvas=>{
    const ctx=canvas.getContext("2d");
    const image=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let nonEmpty=0;
    for(let i=3;i<image.length;i+=128){if(image[i]>0)nonEmpty++;}
    return {mode:!!ctx,pixels:nonEmpty,tabIndex:canvas.tabIndex};
  });
  assert.equal(data.mode,true,"2D canvas initialized");
  assert.ok(data.pixels>30,"static artwork should contain visible particles");
  assert.equal(data.tabIndex,-1,"non-interactive artwork removed from tab sequence");
  fallbackReport.tests.static_fallback="pass";
  fallbackReport.metrics=data;
  await fallbackPage.screenshot({path:output+"/no-webgl2.png",fullPage:false});
} catch(error){failures++;fallbackReport.failure=String(error);}
finally {reports.push(fallbackReport);await fallbackPage.close();}
// V3.2 usability: normal wheel must scroll the page; zoom is explicit and
// accessible on mouse, keyboard, and touch. Query the actual GPU zoom uniform.
const gesturePage=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
const gestureReport={viewport:"wheel-zoom-accessibility",tests:{}};
try {
 await gesturePage.goto(origin,{waitUntil:"networkidle",timeout:30000});
 const canvas=gesturePage.locator("canvas");
 await canvas.scrollIntoViewIfNeeded();
 const sampleZoom=()=>canvas.evaluate(c=>{
   const gl=c.getContext("webgl2"),program=gl?.getParameter(gl.CURRENT_PROGRAM);
   const location=program&&gl.getUniformLocation(program,"uZoom");
   return location?gl.getUniform(program,location):null;
 });
 const rect=await canvas.boundingBox();
 assert.ok(rect,"3D canvas visible");
 await gesturePage.mouse.move(rect.x+rect.width/2,rect.y+rect.height/2);
 const beforeScroll=await gesturePage.evaluate(()=>scrollY);
 await gesturePage.mouse.wheel(0,320);
 await gesturePage.waitForTimeout(280);
 const afterScroll=await gesturePage.evaluate(()=>scrollY);
 assert.ok(afterScroll>beforeScroll+25,"Ordinary wheel over 3D canvas should scroll the document");
 gestureReport.tests.natural_page_scroll="pass";
 await canvas.scrollIntoViewIfNeeded();
 const z0=await sampleZoom();
 assert.ok(typeof z0==="number","Actual GPU zoom uniform readable");
 await gesturePage.getByRole("button",{name:"Zoom in",exact:true}).click();
 await gesturePage.waitForTimeout(160);
 const z1=await sampleZoom();
 assert.ok(z1<z0-.1,"Zoom in button changes the GPU camera");
 await gesturePage.getByRole("button",{name:"Zoom out",exact:true}).click();
 await gesturePage.waitForTimeout(160);
 const z2=await sampleZoom();
 assert.ok(z2>z1+.1,"Zoom out button changes GPU zoom");
 gestureReport.tests.touch_friendly_zoom_buttons="pass";
 await canvas.focus();
 await gesturePage.keyboard.press("+");
 await gesturePage.waitForTimeout(160);
 const z3=await sampleZoom();
 assert.ok(z3<z2-.1,"Plus keyboard shortcut zooms in");
 await gesturePage.keyboard.press("-");
 await gesturePage.waitForTimeout(160);
 const z4=await sampleZoom();
 assert.ok(z4>z3+.1,"Minus keyboard shortcut zooms out");
 gestureReport.tests.keyboard_zoom="pass";
 await canvas.scrollIntoViewIfNeeded();
 const rect2=await canvas.boundingBox();
 await gesturePage.mouse.move(rect2.x+rect2.width/2,rect2.y+rect2.height/2);
 await gesturePage.keyboard.down("Alt");
 await gesturePage.mouse.wheel(0,-140);
 await gesturePage.keyboard.up("Alt");
 await gesturePage.waitForTimeout(160);
 const z5=await sampleZoom();
 assert.ok(z5<z4-.1,"Alt+Wheel zooms GPU camera");
 gestureReport.tests.modifier_wheel_zoom="pass";
 await gesturePage.screenshot({path:output+"/zoom-accessibility.png",animations:"disabled"});
}catch(e){failures++;gestureReport.failure=String(e);}
finally{reports.push(gestureReport);await gesturePage.close();}
const touchPage=await browser.newPage({viewport:{width:360,height:740},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const touchReport={viewport:"mobile-zoom-controls",tests:{}};
try{
 await touchPage.goto(origin,{waitUntil:"networkidle",timeout:30000});
 const canvas=touchPage.locator("canvas");
 const gesture=await canvas.evaluate(c=>getComputedStyle(c).touchAction);
 assert.ok(gesture.includes("pan-y"),"Touch canvas preserves vertical swipe navigation");
 const plus=touchPage.getByRole("button",{name:"Zoom in",exact:true});
 const minus=touchPage.getByRole("button",{name:"Zoom out",exact:true});
 assert.ok(await plus.isVisible()&&await minus.isVisible(),"Zoom controls remain visible on small phones");
 const bbox=await plus.boundingBox();
 assert.ok(bbox&&bbox.width>=36&&bbox.height>=36,"Zoom controls remain touch targetable");
 await plus.click();await minus.click();
 assert.ok(await touchPage.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),"Mobile zoom controls do not overflow layout");
 touchReport.tests.touch_zoom_and_scroll="pass";
}catch(e){failures++;touchReport.failure=String(e);}
finally{reports.push(touchReport);await touchPage.close();}
// V3.3: native two-finger pinch should zoom the actual GPU camera on touch
// devices without taking away ordinary single-finger vertical page swipes.
const pinchPage=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const pinchReport={viewport:"touch-pinch-to-zoom",tests:{}};
const pinchErrors=[];pinchPage.on("pageerror",e=>pinchErrors.push(String(e)));
try{
 await pinchPage.goto(origin,{waitUntil:"networkidle",timeout:30000});
 const canvas=pinchPage.locator("canvas");
 await canvas.scrollIntoViewIfNeeded();
 await pinchPage.waitForTimeout(250);
 const sample=()=>canvas.evaluate(c=>{
   const gl=c.getContext("webgl2"),program=gl?.getParameter(gl.CURRENT_PROGRAM);
   const loc=program&&gl.getUniformLocation(program,"uZoom");
   return loc?gl.getUniform(program,loc):null;
 });
 const initial=await sample();
 assert.equal(typeof initial,"number","GPU zoom available for touch test");
 const bounds=await canvas.boundingBox();
 assert.ok(bounds,"Canvas has nonzero touch bounds");
 const x=bounds.x+bounds.width/2,y=bounds.y+bounds.height/2;
 const cdp=await pinchPage.context().newCDPSession(pinchPage);
 const fingers=(span)=>[{x:x-span,y,id:11},{x:x+span,y,id:22}];
 await cdp.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:fingers(28)});
 for(const span of [38,55,75,90]){
   await cdp.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:fingers(span)});
   await pinchPage.waitForTimeout(35);
 }
 await cdp.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
 await pinchPage.waitForTimeout(180);
 const pinched=await sample();
 assert.ok(pinched<initial-.20,
   "Pinch spread should zoom the real GPU bust, not the document: "+initial+" -> "+pinched);
 pinchReport.tests.two_finger_gpu_zoom="pass";
 await pinchPage.getByRole("button",{name:"Reset 3D view"}).click();
 await pinchPage.waitForTimeout(120);
 const reset=await sample();
 assert.ok(Math.abs(reset-4.15)<.03,"Reset returns zoom to baseline after pinch");
 pinchReport.tests.reset_after_pinch="pass";
 const after=await pinchPage.evaluate(()=>({
   overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
   viewportScale:window.visualViewport?.scale??1,
   touchAction:getComputedStyle(document.querySelector("canvas")).touchAction,
 }));
 assert.ok(after.overflow<=1,"Pinch must not cause horizontal overflow");
 assert.ok(Math.abs(after.viewportScale-1)<.01,"Pinch should not unexpectedly zoom the whole page");
 assert.ok(after.touchAction.includes("pan-y"),"Single-finger vertical page swipe remains enabled");
 assert.deepEqual(pinchErrors,[],"No uncaught errors during touch gestures");
 pinchReport.tests.viewport_and_accessibility="pass";
 pinchReport.metrics={before:initial,pinched,reset,...after};
 await pinchPage.screenshot({path:output+"/mobile-pinch.png",animations:"disabled"});
}catch(e){failures++;pinchReport.failure=String(e);}
finally{reports.push(pinchReport);await pinchPage.close();}
await browser.close();
const result={status:failures?"failed":"passed",failures,reports};
await writeFile(output+"/report.json",JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if(failures)process.exitCode=1;
