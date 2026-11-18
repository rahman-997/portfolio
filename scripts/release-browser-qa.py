#!/usr/bin/env python3
"""Release acceptance: real browser navigation, storage denial, reflow and WCAG."""
import json
import os
import sys
from subprocess import run
from pathlib import Path
from playwright.sync_api import expect, sync_playwright

BASE = os.environ.get("ATLAS_BASE_URL", "http://127.0.0.1:4173").rstrip("/")
OUT = Path(os.environ.get("ATLAS_QA_OUTPUT", "atlas-qa-artifacts")) / "release"
OUT.mkdir(parents=True, exist_ok=True)
# Check the server-rendered form before browser hydration can mask the race.
run([sys.executable, "scripts/verify-search-hydration.py", "out"], check=True)
passed, failed = [], []


def assert_layout(page):
    overflow = page.evaluate("document.documentElement.scrollWidth - innerWidth")
    assert overflow <= 2, f"horizontal overflow: {overflow}px"
    broken = page.evaluate("""() => [...new Set([...document.querySelectorAll('a[href^="#"]')]
      .map(a => a.getAttribute('href')).filter(h => h.length > 1))]
      .filter(h => !document.getElementById(decodeURIComponent(h.slice(1))))""")
    assert not broken, f"broken section links: {broken}"
    duplicates = page.evaluate("""() => {
      const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
      return ids.filter((id,i)=>ids.indexOf(id)!==i);
    }""")
    assert not duplicates, f"duplicate DOM IDs: {duplicates}"


def navigation(page):
    menu = page.locator("#mobile-navigation")
    summary = menu.locator("summary")
    summary.click()
    expect(menu).to_have_attribute("open", "")
    assert menu.locator('a[href="/resume/"]').count() == 1, "mobile résumé missing"
    menu.locator('a[href="#work"]').click()
    expect(menu).not_to_have_attribute("open", "")
    assert page.evaluate("location.hash") == "#work", "projects link missed full gallery"
    summary.click()
    summary.press("Escape")
    expect(menu).not_to_have_attribute("open", "")
    expect(summary).to_be_focused()
    summary.click()
    page.mouse.click(2, page.viewport_size["height"] - 2)
    expect(menu).not_to_have_attribute("open", "")


with sync_playwright() as pw:
    browser = pw.chromium.launch(channel="chrome", headless=True)
    for locale in ("en", "ar", "tr"):
        route = "/" if locale == "en" else f"/{locale}/"
        for theme in ("light", "dark"):
            for width in (320, 768, 1440):
                name = f"{locale}-{theme}-{width}"
                context = browser.new_context(viewport={"width":width,"height":900},
                                              color_scheme=theme, reduced_motion="reduce")
                context.add_init_script("localStorage.setItem('portfolio-appearance'," + json.dumps(theme) + ")")
                page = context.new_page()
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                try:
                    response = page.goto(BASE+route, wait_until="networkidle")
                    assert response.status == 200
                    expect(page.locator("html")).to_have_attribute("data-theme", theme)
                    expect(page.locator("#work article")).to_have_count(22)
                    assert_layout(page)
                    assert page.locator('meta[property="og:title"]').get_attribute("content") == page.title(), "sharing title differs from page title"
                    assert page.locator('meta[property="og:image"]').count() == 1, "sharing image missing"
                    if width == 320:
                        navigation(page)
                        page.add_script_tag(path=os.environ.get("ATLAS_AXE_SCRIPT", "node_modules/axe-core/axe.min.js"))
                        issues = page.evaluate("""async () => (await axe.run(document, {
                          runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}
                        })).violations.map(v=>({id:v.id,impact:v.impact,
                          nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))""")
                        (OUT/(name+"-accessibility.json")).write_text(json.dumps(issues,indent=2))
                        assert not issues, f"full-page WCAG: {json.dumps(issues)[:5000]}"
                        page.locator('a[href="#main"]').focus()
                        page.locator('a[href="#main"]').press("Enter")
                        expect(page.locator("#main")).to_be_focused()
                        search = page.locator("#project-search")
                        expect(search).to_be_enabled()
                        search.fill("HajarCare")
                        expect(search).to_have_value("HajarCare")
                        expect(page.locator("#work article")).to_have_count(1)
                        page.locator("#work").screenshot(path=str(OUT/(name+"-project.png")), animations="disabled")
                        page.locator("#project-search").fill("")
                        expect(page.locator("#work article")).to_have_count(22)
                    if width == 1440 and theme == "light":
                        page.locator("#work").screenshot(path=str(OUT/(name+"-gallery.png")), animations="disabled")
                    assert not errors, errors
                    passed.append({"case":name,"overflow":0,"projects":22})
                    print("PASS release", name, flush=True)
                except Exception as exc:
                    failed.append({"case":name,"error":str(exc)})
                    page.screenshot(path=str(OUT/(name+"-failure.png")), animations="disabled")
                    print("FAIL release", name, str(exc)[:1000], flush=True)
                finally:
                    context.close()

        # Denied storage must not break locale setup, themes or search.
        context = browser.new_context(viewport={"width":375,"height":812}, reduced_motion="reduce")
        context.add_init_script("""for (const method of ['getItem','setItem']) {
          Storage.prototype[method] = () => { throw new DOMException('Blocked','SecurityError'); };
        }""")
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        try:
            page.goto(BASE+route, wait_until="networkidle")
            expect(page.locator("html")).to_have_attribute("lang", locale)
            expect(page.locator("html")).to_have_attribute("dir", "rtl" if locale=="ar" else "ltr")
            expect(page.locator("html")).to_have_attribute("data-theme", "light")
            page.locator("header button").click()
            expect(page.locator("html")).to_have_attribute("data-theme", "dark")
            page.locator("#project-search").fill("LUMERA")
            expect(page.locator("#work article")).to_have_count(1)
            assert not errors, errors
            passed.append({"case":locale+"-storage-denied"})
            print("PASS release", locale+"-storage-denied", flush=True)
        except Exception as exc:
            failed.append({"case":locale+"-storage-denied","error":str(exc)})
        finally:
            context.close()

        # Half-width CSS viewport models reflow at 200% browser zoom on a 1440px display.
        context = browser.new_context(viewport={"width":720,"height":450},device_scale_factor=2,
                                      reduced_motion="reduce")
        page = context.new_page()
        try:
            page.goto(BASE+route,wait_until="networkidle")
            assert_layout(page)
            navigation(page)
            passed.append({"case":locale+"-200-percent-reflow-emulation"})
            print("PASS release",locale+"-200-percent-reflow-emulation",flush=True)
        except Exception as exc:
            failed.append({"case":locale+"-200-percent-reflow-emulation","error":str(exc)})
        finally:
            context.close()
    browser.close()

(OUT/"report.json").write_text(json.dumps({"passed":passed,"failed":failed},ensure_ascii=False,indent=2))
if failed:
    raise SystemExit(json.dumps(failed,ensure_ascii=False,indent=2))
print(f"Release browser QA: {len(passed)} passed, no failures",flush=True)
