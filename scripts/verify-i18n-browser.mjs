/** Chrome QA for localized V3 routes, Arabic RTL, translation, navigation and touch widths. */
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
const origin="http://127.0.0.1:4173",folder="artifacts/holo-browser/i18n";
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.QA_CHROME_PATH?{executablePath:process.env.QA_CHROME_PATH}:{}),args:["--enable-webgl","--enable-unsafe-swiftshader","--use-angle=swiftshader","--disable-dev-shm-usage"]});
const cases=[["ar",390,844],["ar",1440,900],["tr",360,740],["tr",1440,900]];
const reports=[];let failures=0;
for(const [locale,width,height] of cases){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:width<500?2:1,isMobile:width<500,hasTouch:width<500});
 const errors=[];page.on("pageerror",e=>errors.push(String(e)));
 const report={locale,viewport:width+"x"+height,checks:{}};
 try{
  const response=await page.goto(origin+"/"+locale+"/",{waitUntil:"networkidle",timeout:30000});
  assert.equal(response?.status(),200);
  await page.waitForTimeout(300);
  const state=await page.evaluate(()=>({
   documentLang:document.documentElement.lang,
   documentDir:document.documentElement.dir,
   wrappedLang:document.querySelector("main")?.closest("[lang]")?.getAttribute("lang"),
   heading:document.querySelector("h1")?.textContent,
   viewportWidth:document.documentElement.clientWidth,
   contentWidth:document.documentElement.scrollWidth,
   hasCanvas:!!document.querySelector("canvas"),
   projectLinks:document.querySelectorAll('a[href*="/work/"]').length,
   labels:[...document.querySelectorAll('nav[aria-label]')].map(x=>x.getAttribute("aria-label")),
  }));
  assert.equal(state.documentLang,locale,"HTML language");
  assert.equal(state.documentDir,locale==="ar"?"rtl":"ltr","HTML direction");
  const languageChoices=page.locator("nav a[lang]");
  assert.equal(await languageChoices.count(),3,"All three language links remain available");
  for(const link of await languageChoices.all()){
   const bounds=await link.boundingBox();
   const label=await link.getAttribute("aria-label");
   assert.ok(bounds&&bounds.width>=43.5&&bounds.height>=43.5,
     "Language switcher requires 44px touch targets: "+label+" "+JSON.stringify(bounds));
  }
  report.checks.language_switcher_touch_targets="pass";
  assert.equal(state.wrappedLang,locale,"SSR language on page wrapper");
  assert.ok(state.contentWidth<=state.viewportWidth+1,"no sideways page overflow");
  assert.ok(state.heading?.includes(locale==="ar"?"أبني":"Yalnızca"),"localized headline");
  assert.ok(state.hasCanvas&&state.projectLinks>=4,"V2 hologram and case studies preserved");
  // Latin product/project names must remain intact inside Arabic/Turkish card grids.
  const book=page.locator('h3[dir="ltr"]').filter({hasText:"BookHaven"}).first();
  assert.equal(await book.count(),1,"BookHaven evidence card still visible");
  const titleSize=await book.evaluate(el=>({
    actualHeight:el.getBoundingClientRect().height,
    lineHeight:parseFloat(getComputedStyle(el).lineHeight),
    width:el.getBoundingClientRect().width,
    text:el.textContent
  }));
  assert.ok(titleSize.actualHeight<=titleSize.lineHeight*1.3,"BookHaven should fit on one line at "+width+"px");
  report.checks.latin_project_names="pass";
  const inLabel=locale==="ar"?"تقريب المجسّم":"Yakınlaştır";
  const outLabel=locale==="ar"?"إبعاد المجسّم":"Uzaklaştır";
  const zoomIn=page.getByRole("button",{name:inLabel,exact:true});
  const zoomOut=page.getByRole("button",{name:outLabel,exact:true});
  assert.ok(await zoomIn.isVisible()&&await zoomOut.isVisible(),"Localized on-screen zoom controls accessible");
  await zoomIn.click();await zoomOut.click();
  report.checks.localized_touch_camera_controls="pass";
  // V3.8: proof-based sections must be visible, localized, navigable and
  // accessible with native <details> without creating horizontal overflow.
  for(const id of ["process","explore","questions"]){
    const region=page.locator('section#'+id);
    assert.equal(await region.count(),1,"One new section #"+id+" for "+locale);
    assert.ok(await region.getByRole("heading",{level:2}).isVisible(),"New section has a visible heading");
    assert.ok(await page.locator('a[href="#'+id+'"]').count()>=1,"Section "+id+" is reachable by anchor");
  }
  assert.equal(await page.locator('[data-process-step]').count(),4,"All 4 work stages visible");
  assert.equal(await page.locator('[data-focus-project]').count(),4,"All 4 engineering challenge paths visible");
  for(const slug of ["eventify","bookhaven","fitflow","venues-api"]){
    assert.equal(await page.locator('#explore a[href="/'+locale+'/work/'+slug+'/"]').count(),1,
      "Challenge must link to its localized case study");
  }
  const faq=page.locator("#questions details").first();
  assert.equal(await page.locator("#questions details").count(),3,"Three FAQs");
  await faq.locator("summary").click();
  assert.ok(await faq.getAttribute("open")!==null,"Native FAQ expands");
  assert.ok(await faq.locator("a").isVisible(),"FAQ answer contains a usable link");
  await faq.locator("summary").click();
  assert.ok(await faq.getAttribute("open")===null,"Native FAQ collapses");
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),
    "New sections must not introduce sideways scrolling");
  report.checks.process_explore_faq="pass";
  // Capture each new section directly; fullPage screenshots of very tall
  // WebGL pages can repeat composited viewport tiles in headless Chromium.
  if(locale==="ar" && (width===390||width===1440)){
    for(const id of ["process","explore","questions"]){
      await page.locator("section#"+id).screenshot({
        path:folder+"/ar-"+width+"-"+id+"-section.png",
        animations:"disabled",timeout:30000
      });
    }
  }
  report.checks.home_and_rtl="pass";report.home=state;
  await page.screenshot({path:folder+"/"+locale+"-"+width+"-home.png",fullPage:true});
  await page.getByRole("link",{name:locale==="ar"?"السيرة الذاتية":"Özgeçmiş"}).first().click();
  await page.waitForURL("**/"+locale+"/resume/**");
  assert.ok(await page.locator("h1").count());
  assert.ok((await page.locator("body").textContent())?.includes(locale==="ar"?"الملف المهني":"Profesyonel profil"),"localized resume profile heading present in HTML (independent of CSS uppercase)");
  assert.ok((await page.locator('a[href$="Resume.pdf"]').count())>=1);
  report.checks.resume="pass";
  await page.goto(origin+"/"+locale+"/work/eventify/",{waitUntil:"networkidle"});
  assert.equal(await page.locator("h1").innerText(),"Eventify");
  assert.ok((await page.locator("body").innerText()).includes(locale==="ar"?"الموثوقية":"Güvenilirlik"));
  assert.equal(await page.locator('a[lang="en"]').first().getAttribute("href"),"/work/eventify/");
  report.checks.case_study="pass";
  const html=await page.evaluate(()=>({lang:document.documentElement.lang,dir:document.documentElement.dir,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}));
  assert.equal(html.lang,locale);assert.equal(html.dir,locale==="ar"?"rtl":"ltr");
  assert.ok(html.overflow<=1,"case study no horizontal overflow");
  await page.screenshot({path:folder+"/"+locale+"-"+width+"-case.png",fullPage:false});
  report.checks.case_study_layout="pass";
  assert.deepEqual(errors,[],"No page JS errors");
  report.checks.javascript="pass";
 }catch(e){failures++;report.failure=String(e);try{await page.screenshot({path:folder+"/"+locale+"-"+width+"-FAILED.png",fullPage:false});}catch{}}
 finally{reports.push(report);await page.close();}
}
// Non-JavaScript verification: the document must be correctly localized in the
// first HTML response, not after React hydration or a client effect.
const staticContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:700},deviceScaleFactor:1});
for(const locale of ["ar","tr"]){
 for(const route of ["/","/resume/","/work/eventify/"]){
  const page=await staticContext.newPage(),report={locale,route,mode:"javascript-disabled",tests:{}};
  try{
   const response=await page.goto(origin+"/"+locale+route,{waitUntil:"load",timeout:30000});
   assert.equal(response?.status(),200,"localized route available without JavaScript");
   const raw=await response.text();
   const tag=raw.match(/<html\b[^>]*>/i)?.[0]??"";
   assert.ok(tag.includes('lang="'+locale+'"'),"raw SSR root lang "+locale+route);
   assert.ok(tag.includes('dir="'+(locale==="ar"?"rtl":"ltr")+'"'),"raw SSR root dir "+locale+route);
   assert.equal(await page.locator("html").getAttribute("lang"),locale);
   assert.equal(await page.locator("html").getAttribute("dir"),locale==="ar"?"rtl":"ltr");
   assert.ok(await page.locator("h1").isVisible(),"SSR content visible without JavaScript");
   assert.ok((await page.locator("h1").textContent())?.trim(),"SSR page has heading");
   const dimensions=await page.evaluate(()=>({
     viewport:document.documentElement.clientWidth,body:document.documentElement.scrollWidth
   }));
   assert.ok(dimensions.body<=dimensions.viewport+1,"No sideways scrolling without JavaScript on "+route);
   if(route==="/"){
     assert.equal(await page.locator('section[data-portfolio-section]').count(),3,
       "All three extra sections must render without JavaScript");
     const details=page.locator('#questions details').first();
     await details.locator("summary").click();
     assert.ok(await details.getAttribute("open")!==null,"FAQ works without JavaScript");
     report.tests.static_portfolio_sections="pass";
   }
   report.tests.raw_html_before_javascript="pass";
   report.tests.no_script_layout="pass";report.dimensions=dimensions;
   if(route==="/")await page.screenshot({path:folder+"/"+locale+"-no-js-320.png",fullPage:false});
  }catch(e){failures++;report.failure=String(e);}
  finally{reports.push(report);await page.close();}
 }
}
await staticContext.close();

// V3.7: 200% root text enlargement (font-size accessibility setting).
// Test both text-bearing home and resume routes without relying on a hidden
// overflow-x clip to mask unreadable headings or unreachable navigation.
for(const locale of ["en","ar","tr"]){
 for(const route of ["/","/resume/"]){
  const page=await browser.newPage({viewport:{width:360,height:740},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const report={locale,route,mode:"200-percent-text",tests:{}};
  try{
   const prefix=locale==="en"?"":"/"+locale;
   await page.goto(origin+prefix+route,{waitUntil:"networkidle",timeout:30000});
   await page.addStyleTag({content:"html { font-size: 200% !important; }"});
   await page.evaluate(()=>document.fonts.ready);
   const state=await page.evaluate(()=>{
    const width=document.documentElement.clientWidth;
    const heading=document.querySelector("h1");
    const links=[...document.querySelectorAll('nav a[lang]')].filter(el=>getComputedStyle(el).display!=="none");
    const r=heading?.getBoundingClientRect();
    const linkRects=links.map(el=>{
      const rect=el.getBoundingClientRect();
      return {text:el.textContent,x:rect.x,right:rect.right,y:rect.y,bottom:rect.bottom};
    });
    const projectName=document.querySelector('h3[dir="ltr"]');
    return {
      viewport:width,scrollWidth:document.documentElement.scrollWidth,
      heading:{text:heading?.textContent??"",left:r?.left??0,right:r?.right??0,
        scrollWidth:heading?.scrollWidth??0,clientWidth:heading?.clientWidth??0},
      project:projectName?{text:projectName.textContent,scrollWidth:projectName.scrollWidth,clientWidth:projectName.clientWidth}:null,
      links:linkRects,
      layoutDebug:{
        scrollX:window.scrollX,
        direction:document.documentElement.dir,
        body:(()=>{const r=document.body.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width}})(),
        main:(()=>{const r=document.querySelector("main")?.getBoundingClientRect();return {left:r?.left,right:r?.right,width:r?.width}})(),
        hero:(()=>{const r=document.querySelector("h1")?.closest("section")?.getBoundingClientRect();return {left:r?.left,right:r?.right,width:r?.width}})(),
        h1Style:(()=>{const el=document.querySelector("h1");return {size:el?getComputedStyle(el).fontSize:"",direction:el?getComputedStyle(el).direction:""}})()
      },
      headerLinks:[...document.querySelectorAll("header a")].map(el=>{
        const rect=el.getBoundingClientRect();
        return {text:el.textContent?.trim(),x:rect.x,right:rect.right,y:rect.y,bottom:rect.bottom,
          width:rect.width,height:rect.height,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth};
      }).filter(el=>el.width>0&&el.height>0)
    };
   });
   report.metrics=state;
   assert.ok(state.heading.text.trim(),"Heading exists after text enlargement");
   assert.ok(state.heading.left>=-1&&state.heading.right<=state.viewport+1,"H1 bounding box fits 360px viewport");
   assert.ok(state.heading.scrollWidth<=state.heading.clientWidth+1,
     "H1 text is not clipped at 200% text: "+JSON.stringify(state.heading));
   assert.ok(state.scrollWidth<=state.viewport+1,"No sideways scroll with enlarged text");
   if(route==="/"&&state.project){
     assert.ok(state.project.scrollWidth<=state.project.clientWidth+1,
       "Project name stays fully readable at 200% root text size: "+JSON.stringify(state.project));
   }
   assert.equal(state.links.length,3,"All three language links present");
   for(const link of state.links){
     assert.ok(link.x>=-1&&link.right<=state.viewport+1,"Language choice remains reachable: "+JSON.stringify(link));
   }
   // All visible navigation items must remain both fully reachable and distinct
   // at 200% text, including the brand and print/PDF actions on résumé pages.
   for(const link of state.headerLinks){
     assert.ok(link.x>=-1&&link.right<=state.viewport+1,
       "Header link must stay within the viewport: "+JSON.stringify(link));
     assert.ok(link.scrollWidth<=link.clientWidth+1,
       "Header link label must not be clipped: "+JSON.stringify(link));
   }
   for(let i=0;i<state.headerLinks.length;i++)for(let j=i+1;j<state.headerLinks.length;j++){
     const a=state.headerLinks[i],b=state.headerLinks[j];
     assert.ok(a.right<=b.x+.5||b.right<=a.x+.5||a.bottom<=b.y+.5||b.bottom<=a.y+.5,
       "Header links cannot overlap at 200% text: "+JSON.stringify([a,b]));
   }
   for(let i=0;i<state.links.length;i++)for(let j=i+1;j<state.links.length;j++){
     const a=state.links[i],b=state.links[j];
     assert.ok(a.right<=b.x+1||b.right<=a.x+1||a.bottom<=b.y+1||b.bottom<=a.y+1,
       "Language links must not overlap at 200% text: "+JSON.stringify([a,b]));
   }
   if(route==="/"){
     assert.equal(await page.locator('section[data-portfolio-section]').count(),3,
       "All added portfolio sections survive 200% enlarged text in "+locale);
     const newSections=await page.locator('section[data-portfolio-section]').evaluateAll(els=>
       els.map(el=>{const r=el.getBoundingClientRect();return {id:el.id,left:r.left,right:r.right};}));
     for(const bounds of newSections)assert.ok(bounds.left>=-1&&bounds.right<=state.viewport+1,
       "Added section fits enlarged mobile viewport: "+JSON.stringify(bounds));
     report.tests.enlarged_portfolio_sections="pass";
   }
   report.tests.readable_enlarged_text="pass";report.metrics=state;
   await page.screenshot({path:folder+"/"+locale+"-"+(route==="/resume/"?"resume":"home")+"-text-200.png",animations:"disabled"});
  }catch(e){failures++;report.failure=String(e);try{await page.screenshot({path:folder+"/"+locale+"-"+(route==="/resume/"?"resume":"home")+"-text-200-FAILED.png",animations:"disabled"});}catch{}}
  finally{reports.push(report);await page.close();}
 }
}
await browser.close();
const result={status:failures?"failed":"passed",failures,reports};
await writeFile(folder+"/report.json",JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
if(failures)process.exitCode=1;
