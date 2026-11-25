#!/usr/bin/env python3
"""Focused cross-engine compatibility, not physical-device or Safari certification."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ENGINE = os.environ.get("PORTFOLIO_QA_ENGINE", "firefox")
if ENGINE not in ("firefox", "webkit"):
    raise ValueError("Only the two additional compatibility engines are supported")
BASE = "http://127.0.0.1:4173"
OUT = Path("cross-browser-evidence")
OUT.mkdir(exist_ok=True)
RESULTS = []
LABELS = {"en":"Enlarge screenshot","ar":"تكبير الصورة","tr":"Görseli büyüt"}

with sync_playwright() as pw:
    browser = getattr(pw, ENGINE).launch(headless=True)
    for locale in ("en", "ar", "tr"):
        for theme in ("dark", "light"):
            name = f"{ENGINE}-{locale}-{theme}-375"
            options = dict(viewport={"width":375,"height":812}, color_scheme=theme,
                           reduced_motion="reduce", accept_downloads=True)
            # WebKit touchscreen emulation tests tap handling, not actual iOS Safari.
            if ENGINE == "webkit":
                options.update(has_touch=True, is_mobile=True, device_scale_factor=2)
            context = browser.new_context(**options)
            context.add_init_script("localStorage.setItem('portfolio-appearance', " + json.dumps(theme) + ");")
            page = context.new_page()
            errors = []
            page.on("pageerror", lambda exc: errors.append(str(exc)))
            def activate(locator):
                if ENGINE == "webkit":
                    locator.tap(timeout=10000)
                else:
                    locator.click(timeout=10000)
            try:
                response = page.goto(BASE + ("/" if locale=="en" else f"/{locale}/"), wait_until="networkidle", timeout=45000)
                assert response and response.ok, "Homepage HTTP failure"
                expect(page.locator("html")).to_have_attribute("lang",locale)
                expect(page.locator("html")).to_have_attribute("dir","rtl" if locale=="ar" else "ltr")
                expect(page.locator("html")).to_have_attribute("data-theme",theme)
                stage = page.locator("[data-featured-showcase]")
                activate(stage.get_by_role("button",name="Mizan Finance",exact=True))
                expect(stage.locator('[data-active-project="mizan"]')).to_have_count(1)
                page.wait_for_function("""() => {
                  const img=document.querySelector('[data-active-project="mizan"] img');
                  return img && img.complete && img.naturalWidth>0;
                }""",timeout=10000)
                activate(stage.get_by_role("button",name="FitFlow",exact=True))
                activate(stage.get_by_role("button",name=LABELS[locale],exact=True))
                dialog = stage.locator("dialog")
                expect(dialog).to_be_visible()
                page.wait_for_function("""() => {
                  const img=document.querySelector('dialog[open] img');
                  return img && img.complete && img.naturalWidth>0;
                }""",timeout=10000)
                box = dialog.bounding_box()
                vw = page.evaluate("window.innerWidth")
                assert box and box["x"]>=-2 and box["x"]+box["width"]<=vw+2, "Dialog spills beyond viewport"
                activate(dialog.get_by_role("button").first)
                expect(dialog).not_to_be_visible()
                page.evaluate("window.scrollTo(0,0)")
                menu = page.locator('button[aria-controls="portfolio-mobile-links"]')
                activate(menu)
                expect(menu).to_have_attribute("aria-expanded","true")
                activate(page.locator('#portfolio-mobile-links a[href="#work"]'))
                expect(menu).to_have_attribute("aria-expanded","false")
                work=page.locator("#work")
                expect(work.locator("article")).to_have_count(7)
                work.locator("#portfolio-availability").select_option("source")
                work.get_by_role("searchbox").fill("Mizan")
                expect(work.locator("article")).to_have_count(1)
                expect(work.locator("article h3")).to_have_text("Mizan Finance")
                work.get_by_role("searchbox").fill("not-a-real-project-928364")
                activate(work.locator("[data-empty-project-results] button"))
                expect(work.locator("article")).to_have_count(7)
                faq=page.locator("#faq details").first
                activate(faq.locator("summary"))
                expect(faq).to_have_attribute("open","")
                assert page.evaluate("document.documentElement.scrollWidth-window.innerWidth")<=2, "Horizontal overflow"
                assert not errors, "Page errors: "+str(errors)
                page.evaluate("window.scrollTo(0,0)")
                page.screenshot(path=str(OUT/(name+".png")),animations="disabled",timeout=15000)
                RESULTS.append({"case":name,"status":"pass"})
                print("PASS",name,flush=True)
            except Exception as exc:
                RESULTS.append({"case":name,"status":"fail","error":str(exc)})
                print("FAIL",name,exc,flush=True)
                try:
                    page.screenshot(path=str(OUT/(name+"-failure.png")),animations="disabled",timeout=5000)
                except Exception:
                    pass
            finally:
                context.close()
    browser.close()
(OUT/"report.json").write_text(json.dumps({"engine":ENGINE,"scope":"Linux headless emulation; not real devices or Safari.","cases":RESULTS},indent=2),encoding="utf-8")
if any(case["status"]!="pass" for case in RESULTS):
    raise SystemExit(1)
