#!/usr/bin/env python3
"""Exercise project discovery, locale continuity, clipboard and enquiry privacy."""
import json
import os
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from playwright.sync_api import expect, sync_playwright

BASE=os.environ.get("ATLAS_BASE_URL","http://127.0.0.1:4173").rstrip("/")
OUT=Path(os.environ.get("ATLAS_QA_OUTPUT","atlas-qa-artifacts"))/"evolution"
OUT.mkdir(parents=True,exist_ok=True)
passed,failed=[],[]
PRODUCT={"en":"Products","ar":"المنتجات","tr":"Ürünler"}


def audit(page,root,name):
    page.add_script_tag(path=os.environ.get("ATLAS_AXE_SCRIPT","node_modules/axe-core/axe.min.js"))
    issues=page.evaluate("""async selector => (await axe.run(document.querySelector(selector),{
      runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}
    })).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))""",root)
    (OUT/(name+"-accessibility.json")).write_text(json.dumps(issues,indent=2))
    assert not issues,issues
    assert page.evaluate("document.documentElement.scrollWidth-innerWidth")<=2,"horizontal overflow"


with sync_playwright() as pw:
    browser=pw.chromium.launch(channel="chrome",headless=True)
    for locale in ("en","ar","tr"):
        prefix="/" if locale=="en" else f"/{locale}/"
        for label,width,theme in [("mobile",320,"light"),("desktop",1440,"dark")]:
            name=f"{locale}-{label}"
            context=browser.new_context(viewport={"width":width,"height":900},reduced_motion="reduce")
            context.grant_permissions(["clipboard-read","clipboard-write"],origin=BASE)
            context.add_init_script("localStorage.setItem('portfolio-appearance',"+json.dumps(theme)+")")
            page=context.new_page()
            errors,posts=[],[]
            page.on("pageerror",lambda error:errors.append(str(error)))
            page.on("request",lambda request:posts.append(request.url) if request.method not in ("GET","HEAD","OPTIONS") else None)
            try:
                page.goto(BASE+prefix,wait_until="networkidle")
                page.locator('#project-grid[data-gallery-ready="true"]').wait_for(state="attached", timeout=15000)
                page.locator("#work").get_by_role("button",name=PRODUCT[locale],exact=True).click()
                page.locator("#project-search").fill("HajarCare")
                expect(page.locator("#work article")).to_have_count(1)
                page.locator("#share-projects").click()
                expect(page.locator("#work [role='status']")).to_be_visible()
                shared=page.evaluate("navigator.clipboard.readText()")
                parsed=urlparse(shared)
                assert parsed.path==prefix and parse_qs(parsed.query)=={"category":["product"],"q":["HajarCare"]} and parsed.fragment=="work",shared
                page.goto(shared,wait_until="networkidle")
                page.locator('#project-grid[data-gallery-ready="true"]').wait_for(state="attached", timeout=15000)
                expect(page.locator("#work article")).to_have_count(1)
                expect(page.locator("#project-search")).to_have_value("HajarCare")
                detail=prefix+"projects/hajarcare/"
                page.locator(f'#work a[href="{detail}"]').click()
                expect(page.locator('[data-project-brief="hajarcare"]')).to_be_visible()
                assert page.locator('a[href^="https://github.com/"]').count()==0,"private source linked"
                assert page.locator('a[title="Türkçe"]').get_attribute("href")=="/tr/projects/hajarcare/"
                await_dir="rtl" if locale=="ar" else "ltr"
                expect(page.locator("html")).to_have_attribute("dir",await_dir)
                audit(page,"main",name+"-project")
                page.screenshot(path=str(OUT/(name+"-project.png")),full_page=True,animations="disabled")
                if locale=="ar":
                    page.locator('a[title="Türkçe"]').click()
                    expect(page).to_have_url(BASE+"/tr/projects/hajarcare/")
                    expect(page.locator('[data-project-brief="hajarcare"]')).to_be_visible()
                    page.goto(BASE+detail,wait_until="networkidle")
                page.locator(f'a[href="{prefix}?project=hajarcare#contact-brief"]').click()
                panel=page.locator("#contact-brief")
                expect(panel).to_have_attribute("open","")
                expect(page.locator("#brief-project")).to_have_value("hajarcare")
                page.locator("#brief-goal").select_option("review")
                message="Responsive booking interface with Arabic and Turkish support."
                page.locator("#brief-details").fill(message)
                prepared=page.locator("#prepared-brief").input_value()
                assert "HajarCare" in prepared and message in prepared
                panel.locator('button[type="submit"]').click()
                expect(panel.locator('[role="status"]')).not_to_be_empty()
                assert page.evaluate("navigator.clipboard.readText()")==prepared
                assert not posts,posts
                assert message not in page.url
                stored=page.evaluate("JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))")
                assert message not in stored,"brief stored in browser storage"
                audit(page,"#contact-brief",name+"-brief")
                panel.screenshot(path=str(OUT/(name+"-brief.png")),animations="disabled")
                assert not errors,errors
                passed.append({"case":name,"share":"pass","privateSource":"pass","briefClipboard":"pass","noFormSubmission":"pass"})
                print("PASS evolution",name,flush=True)
            except Exception as exc:
                failed.append({"case":name,"error":str(exc)})
                page.screenshot(path=str(OUT/(name+"-failure.png")),animations="disabled")
                print("FAIL evolution",name,str(exc)[:1000],flush=True)
            finally:context.close()

    # Public screenshot, client contribution and fork provenance are different page branches.
    for project in ("eventify","culture-sy","free-claude-code"):
        name="ar-"+project
        context=browser.new_context(viewport={"width":375,"height":900},reduced_motion="reduce")
        page=context.new_page()
        try:
            page.goto(BASE+f"/ar/projects/{project}/",wait_until="networkidle")
            expect(page.locator(f'[data-project-brief="{project}"]')).to_be_visible()
            if project=="free-claude-code":assert page.locator('[data-upstream-credit="true"]').get_attribute("href")=="https://github.com/Alishahryar1/free-claude-code"
            if project=="eventify":assert page.locator('figure img').evaluate("async img=>{await img.decode();return img.naturalWidth>0}")
            audit(page,"main",name)
            page.screenshot(path=str(OUT/(name+".png")),full_page=True,animations="disabled")
            passed.append({"case":name})
        except Exception as exc:failed.append({"case":name,"error":str(exc)})
        finally:context.close()

    context=browser.new_context(viewport={"width":375,"height":812},reduced_motion="reduce")
    context.add_init_script("Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.reject(new Error('denied'))}})")
    page=context.new_page()
    try:
        page.goto(BASE+"/ar/?category=invalid&q="+"x"*130,wait_until="networkidle")
        page.locator('#project-grid[data-gallery-ready="true"]').wait_for(state="attached", timeout=15000)
        expect(page.locator("#project-search")).to_have_value("x"*120)
        page.locator("#project-search").fill("LUMERA")
        expect(page.locator("#work article")).to_have_count(1)
        page.locator("#share-projects").click()
        expect(page.locator("#work [role='status'] input")).to_be_visible()
        page.goto(BASE+"/ar/?project=lumera#contact-brief",wait_until="networkidle")
        expect(page.locator("#contact-brief")).to_have_attribute("open","")
        page.locator('#contact-brief button[type="submit"]').click()
        expect(page.locator('#contact-brief [role="status"]')).not_to_be_empty()
        expect(page.locator("#prepared-brief")).to_be_visible()
        passed.append({"case":"clipboard-denied-and-query-validation"})
    except Exception as exc:failed.append({"case":"clipboard-denied-and-query-validation","error":str(exc)})
    finally:context.close()
    browser.close()

(OUT/"report.json").write_text(json.dumps({"passed":passed,"failed":failed},ensure_ascii=False,indent=2))
if failed:raise SystemExit(json.dumps(failed,ensure_ascii=False,indent=2))
print(f"Evolution browser QA: {len(passed)} passed",flush=True)
