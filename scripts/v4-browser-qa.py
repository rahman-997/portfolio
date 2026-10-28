#!/usr/bin/env python3
"""V5 end-to-end QA for languages, themes, projects and four new portfolio sections."""
import json
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get("ATLAS_BASE_URL", "http://127.0.0.1:4173").rstrip("/")
OUT = Path(os.environ.get("ATLAS_QA_OUTPUT", "atlas-qa-artifacts")) / "v4"
OUT.mkdir(parents=True, exist_ok=True)
COPY = {
    "en": {"backend": "Backend", "tools": "Tools & open source", "all": "All projects", "flow":"System flow", "network":"Network", "portrait":"Neural portrait"},
    "ar": {"backend": "الخلفية", "tools": "الأدوات والمصادر المفتوحة", "all": "كل المشاريع", "flow":"تدفق النظام", "network":"الشبكة", "portrait":"الوجه الرقمي"},
    "tr": {"backend": "Backend", "tools": "Araçlar ve açık kaynak", "all": "Tüm projeler", "flow":"Sistem akışı", "network":"Ağ", "portrait":"Dijital portre"},
}
CASES = [("desktop", 1280, 800), ("mobile", 375, 812)]
report, failures = [], []


def check(expression, message):
    if not expression:
        raise AssertionError(message)


with sync_playwright() as pw:
    browser = pw.chromium.launch(channel="chrome", headless=True)
    for locale in ("en", "ar", "tr"):
        route = "/" if locale == "en" else "/" + locale + "/"
        for theme in ("light", "dark"):
            for label, width, height in CASES:
                name = f"{locale}-{theme}-{label}"
                context = browser.new_context(viewport={"width":width, "height":height},
                    color_scheme=theme, reduced_motion="reduce")
                context.add_init_script("if (!localStorage.getItem('portfolio-appearance')) localStorage.setItem('portfolio-appearance', " + json.dumps(theme) + ");")
                page = context.new_page()
                errors = []
                page.on("pageerror", lambda err: errors.append(str(err)))
                page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
                try:
                    response = page.goto(BASE + route, wait_until="networkidle", timeout=60000)
                    check(response is not None and response.status == 200, f"{name}: HTTP failure")
                    page.locator(f'html[data-theme="{theme}"]').wait_for(timeout=15000)
                    check(page.locator("html").get_attribute("lang") == locale,
                          f"{name}: wrong html lang")
                    expected_dir = "rtl" if locale == "ar" else "ltr"
                    check(page.locator("html").get_attribute("dir") == expected_dir,
                          f"{name}: wrong document direction")
                    work = page.locator("#work")
                    check(work.locator("article").count() == 7,
                          f"{name}: missing public repositories")
                    check(page.locator("#ai-lab").count() == 1, f"{name}: Atlas missing")
                    # Cinematic V6: real featured media and two new user-directed systems.
                    check(page.locator('[data-cinematic-scene="true"]').count() == 1,
                          f"{name}: cinematic scene missing")
                    check(page.locator("#featured [data-featured-system]").count() == 3,
                          f"{name}: three visual project stories missing")
                    for slug in ("eventify", "bookhaven", "fitflow"):
                        check(page.locator(f'#featured a[href="/work/{slug}/"]').count() == 1,
                              f"{name}: featured case study {slug} missing")
                    check(page.locator('#mission-paths [data-mission-path]').count() == 3,
                          f"{name}: guided mission paths missing")
                    blueprints = page.locator("#blueprint-lab [data-blueprint-selector]")
                    check(blueprints.get_by_role("button").count() == 3,
                          f"{name}: missing architecture choices")
                    for project in ("BookHaven", "FitFlow", "Eventify"):
                        button = blueprints.get_by_role("button", name=project)
                        button.click()
                        check(button.get_attribute("aria-pressed") == "true",
                              f"{name}: selection didn't update for {project}")
                        check(page.locator("#blueprint-lab [role='img']").count() == 1,
                              f"{name}: accessible diagram missing for {project}")
                    check(page.locator("#blueprint-lab [aria-live='polite']").count() == 1,
                          f"{name}: inspector has no announcement region")
                    # Semantic deep links must lead to real on-page navigation destinations.
                    for section in ("featured", "blueprint-lab", "work", "collaborate", "contact"):
                        check(page.locator("#" + section).count() == 1, f"{name}: missing #{section}")
                    # V5: new sections must stay navigable and complete in all locales/themes.
                    for section in ("highlights", "process", "collaborate", "faq"):
                        check(page.locator("#" + section).count() == 1,
                              f"{name}: missing #{section}")
                    for slug in ("eventify", "bookhaven", "fitflow", "venues-api"):
                        check(page.locator(f'#highlights a[href="/work/{slug}/"]').count() == 1,
                              f"{name}: evidence link missing for {slug}")
                    check(page.locator("#process [data-workflow-step]").count() == 4,
                          f"{name}: wrong process step count")
                    check(page.locator("#collaborate [data-collaboration-card]").count() == 3,
                          f"{name}: wrong collaboration card count")
                    check(page.locator("#faq details").count() == 4,
                          f"{name}: FAQ details unavailable")
                    faq_first = page.locator("#faq details").first
                    faq_first.locator("summary").click()
                    check(faq_first.evaluate("(el) => el.open"),
                          f"{name}: native FAQ did not open")
                    faq_first.locator("summary").press("Enter")
                    check(not faq_first.evaluate("(el) => el.open"),
                          f"{name}: keyboard could not close FAQ")
                    check(page.locator("#work").get_by_role("link", name="Source code" if locale == "en" else "الكود المصدري" if locale == "ar" else "Kaynak kod").count() == 7,
                          f"{name}: project source links missing")
                    allowed_public = {"eventify","bookbookhaven","fitflow-gym","venues-api","mizan-finance","portfolio","free-claude-code"}
                    repository_links = page.locator('a[href^="https://github.com/rahman-997/"]').evaluate_all(
                        "(links) => links.map(a => a.getAttribute('href')).filter(Boolean)")
                    for link in repository_links:
                        repo_id = link.split("https://github.com/rahman-997/", 1)[1].split("/", 1)[0]
                        check(repo_id in allowed_public, f"{name}: unexpected GitHub repository link")
                    for count,kind in [(1,"backend"),(2,"tools"),(7,"all")]:
                        page.get_by_role("button", name=COPY[locale][kind], exact=True).click()
                        check(work.locator("article").count() == count,
                              f"{name}: {kind} filter expected {count} projects")
                    page.locator("#ai-lab").scroll_into_view_if_needed()
                    page.get_by_role("button", name=COPY[locale]["flow"], exact=True).click()
                    check(page.get_by_label("Illustrative five-stage engineering flow").count() == 1,
                          f"{name}: atlas mode switch broken")
                    page.get_by_role("button", name=COPY[locale]["network"], exact=True).click()
                    check(page.locator("#ai-lab [role='group'] button[aria-label][aria-pressed]").count() == 8,
                          f"{name}: Atlas network lost nodes")
                    page.get_by_role("button", name=COPY[locale]["portrait"], exact=True).click()
                    check(page.locator("#ai-lab [role='img']").count() == 1,
                          f"{name}: portrait view missing")
                    page.get_by_role("button", name=COPY[locale]["network"], exact=True).click()
                    # Theme toggle must work and persist after page navigation.
                    button = page.locator('button[title*="theme"], button[title*="الوضع"], button[title*="temaya"]')
                    if button.count() == 0:
                        button = page.locator("header button").first
                    button.click()
                    next_theme = "light" if theme == "dark" else "dark"
                    page.locator(f'html[data-theme="{next_theme}"]').wait_for(timeout=5000)
                    check(page.evaluate("localStorage.getItem('portfolio-appearance')") == next_theme,
                          f"{name}: theme not saved")
                    page.reload(wait_until="networkidle")
                    page.locator(f'html[data-theme="{next_theme}"]').wait_for(timeout=15000)
                    # Toggle back to initial state before taking the reference screenshot.
                    page.locator("header button").first.click()
                    page.locator(f'html[data-theme="{theme}"]').wait_for(timeout=5000)
                    if label == "mobile":
                        page.add_script_tag(path=os.environ.get("ATLAS_AXE_SCRIPT", "node_modules/axe-core/axe.min.js"))
                        for section_id in ("highlights", "process", "collaborate", "faq", "blueprint-lab", "mission-paths", "featured"):
                            violations = page.evaluate("""async (section) => {
                                const issues = await axe.run(document.getElementById(section), {
                                    runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']},
                                    rules: {'region': {enabled: false}},
                                });
                                return issues.violations.map(v => ({
                                    id: v.id, nodes: v.nodes.map(n => n.target),
                                }));
                            }""", section_id)
                            check(not violations, f"{name}: {section_id} accessibility: {violations}")
                    overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                    check(overflow <= 2, f"{name}: horizontal overflow {overflow}px")
                    check(not errors, f"{name}: browser exceptions {errors}")
                    if label == "mobile":
                        page.screenshot(path=str(OUT / (name + ".png")), full_page=True,
                                        animations="disabled")
                    report.append({"case":name,"status":"pass","projects":7,
                                   "overflow":overflow,"themePersistence":"pass"})
                    print("PASS", name, "RTL", expected_dir, "filter / theme / Atlas", flush=True)
                except Exception as exc:
                    failures.append({"case":name,"error":str(exc)})
                    print("FAIL", name, exc, file=sys.stderr, flush=True)
                    try:
                        page.screenshot(path=str(OUT/(name+"-failure.png")), full_page=True, timeout=8000)
                    except Exception:
                        pass
                finally:
                    context.close()
    # True no-JavaScript test: verify localized direction is present on raw static HTML.
    for locale in ("ar","tr"):
        context = browser.new_context(java_script_enabled=False)
        page = context.new_page()
        try:
            page.goto(BASE + "/" + locale + "/", wait_until="domcontentloaded")
            check(page.locator("html").get_attribute("lang") == locale, f"{locale}: no-JS lang")
            check(page.locator("html").get_attribute("dir") == ("rtl" if locale == "ar" else "ltr"),
                  f"{locale}: no-JS dir")
            check(page.locator("#work article").count() == 7, f"{locale}: no-JS projects")
        except Exception as exc:
            failures.append({"case":locale+"-no-js","error":str(exc)})
        finally:
            context.close()
    browser.close()
(OUT/"report.json").write_text(json.dumps({"passed":report,"failed":failures},ensure_ascii=False,indent=2))
if failures:
    raise SystemExit(1)
print("Portfolio V5 browser QA passed: languages, themes, workflow, FAQ and WCAG, no-JS RTL",flush=True)
