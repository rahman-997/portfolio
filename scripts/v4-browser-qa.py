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
                    stage = page.locator('[data-featured-showcase]')
                    check(stage.count() == 1, f"{name}: interactive project theatre missing")
                    visual_layout = stage.evaluate("""el => {
                        const screen = el.querySelector('[data-active-project]').getBoundingClientRect();
                        const details = el.querySelector('[class*="projectDetails"]').getBoundingClientRect();
                        return {screenBottom: screen.bottom, detailsTop: details.top};
                    }""")
                    check(visual_layout["detailsTop"] >= visual_layout["screenBottom"] - 2,
                          f"{name}: project copy obscures the real application screenshot")
                    fitflow_tab = stage.get_by_role("button", name="FitFlow", exact=True)
                    mizan_tab = stage.get_by_role("button", name="Mizan Finance", exact=True)
                    check(fitflow_tab.count() == 1 and mizan_tab.count() == 1,
                          f"{name}: project preview controls missing")
                    check(fitflow_tab.get_attribute("aria-pressed") == "true",
                          f"{name}: featured project initial state missing")
                    mizan_tab.click()
                    check(mizan_tab.get_attribute("aria-pressed") == "true" and
                          fitflow_tab.get_attribute("aria-pressed") == "false",
                          f"{name}: featured tab did not switch")
                    check(stage.locator('[data-active-project="mizan"]').count() == 1 and
                          stage.locator('img[src="/projects/mizan-live-dashboard.png"]').count() == 1 and
                          stage.locator('a[href="/work/mizan/"]').count() == 1,
                          f"{name}: Mizan featured preview missing screenshot or study")
                    fitflow_tab.focus()
                    fitflow_tab.press("Enter")
                    check(stage.locator('[data-active-project="fitflow"]').count() == 1 and
                          stage.locator('img[src="/projects/fitflow-real-interface.webp"]').count() == 1 and
                          stage.locator('a[href="/work/fitflow/"]').count() == 1,
                          f"{name}: keyboard could not restore FitFlow preview")
                    check(fitflow_tab.get_attribute("aria-pressed") == "true",
                          f"{name}: featured tab state not restored")
                    for project_id, screenshot in [
                        ("fitflow", "/projects/fitflow-real-interface.webp"),
                        ("mizan", "/projects/mizan-live-dashboard.png"),
                    ]:
                        if project_id == "mizan":
                            mizan_tab.click()
                        cover = stage.locator(f'img[src="{screenshot}"]')
                        check(cover.count() == 1 and cover.evaluate(
                            "(el) => el.complete && el.naturalWidth > 0"),
                            f"{name}: {project_id} real screenshot not loaded")
                        check(stage.locator(f'a[href="{screenshot}"]').count() == 1,
                            f"{name}: {project_id} full-resolution capture link missing")
                    fitflow_tab.click()
                    enlarge = {
                        "en": "Enlarge screenshot",
                        "ar": "تكبير الصورة",
                        "tr": "Görseli büyüt",
                    }[locale]
                    enlarge_button = stage.get_by_role("button", name=enlarge, exact=True)
                    enlarge_button.click()
                    dialog = stage.locator("dialog")
                    check(dialog.count() == 1 and dialog.evaluate("(el) => el.open"),
                          f"{name}: full-image preview did not open")
                    full_image = dialog.locator('img[src="/projects/fitflow-real-interface.webp"]')
                    full_image.wait_for(state="visible", timeout=5000)
                    page.wait_for_function("""() => {
                      const img = document.querySelector('dialog[open] img');
                      return Boolean(img && img.complete && img.naturalWidth > 0);
                    }""", timeout=5000)
                    check(dialog.locator('a[href="/projects/fitflow-real-interface.webp"]').count() == 1,
                          f"{name}: lightbox missing original image link")
                    page.keyboard.press("Escape")
                    check(not dialog.evaluate("(el) => el.open"),
                          f"{name}: native Escape did not close full-image preview")
                    if label == "mobile":
                        vw = page.evaluate("window.innerWidth")
                        bounds = page.locator("#top h1").evaluate("""(el) => {
                            const range = document.createRange();
                            range.selectNodeContents(el);
                            const r = range.getBoundingClientRect();
                            return {left:r.left,right:r.right};
                        }""")
                        check(bounds["left"] >= -2 and bounds["right"] <= vw + 2,
                              f"{name}: visible hero heading text spills outside mobile viewport ({bounds}, width={vw})")
                        header_box = page.locator("header").bounding_box()
                        check(header_box is not None and header_box["height"] <= 90,
                              f"{name}: mobile header still takes multiple rows")
                        github_metric = page.locator('section[class*="metrics"] > a[href="https://github.com/rahman-997"]')
                        github_box = github_metric.bounding_box()
                        check(github_box is not None and github_box["height"] <= 76 and
                              github_metric.evaluate("(el) => getComputedStyle(el).whiteSpace") == "nowrap",
                              f"{name}: GitHub metric URL wraps on mobile")
                        check(page.locator("header button[title]").first.is_visible(),
                              f"{name}: theme toggle hidden on mobile")
                        menu = page.locator('button[aria-controls="portfolio-mobile-links"]')
                        check(menu.is_visible() and menu.get_attribute("aria-expanded") == "false",
                              f"{name}: mobile navigation trigger unavailable")
                        menu.click()
                        check(menu.get_attribute("aria-expanded") == "true" and
                              page.locator("#portfolio-mobile-links a[href='#work']").count() == 1,
                              f"{name}: mobile navigation did not reveal project link")
                        check(page.locator("#portfolio-mobile-links a[href='/ar/']").count() == 1 and
                              page.locator("#portfolio-mobile-links a[href='/tr/']").count() == 1,
                              f"{name}: mobile language switcher missing")
                        page.locator("#portfolio-mobile-links a[href='#work']").click()
                        check(menu.get_attribute("aria-expanded") == "false",
                              f"{name}: mobile navigation remains open after selection")
                        menu.click()
                        page.keyboard.press("Escape")
                        check(menu.get_attribute("aria-expanded") == "false" and
                              menu.evaluate("(el) => document.activeElement === el"),
                              f"{name}: Escape failed to dismiss mobile menu and return focus")
                        menu.click()
                        page.mouse.click(width / 2, height - 20)
                        check(menu.get_attribute("aria-expanded") == "false",
                              f"{name}: outside click failed to close mobile menu")
                        # Keyboard-only disclosure: ArrowDown opens and moves focus
                        # to the first link, then Shift+Tab out should dismiss it.
                        menu.focus()
                        menu.press("ArrowDown")
                        first_link = page.locator("#portfolio-mobile-links a[href='#work']")
                        check(menu.get_attribute("aria-expanded") == "true" and
                              first_link.evaluate("(el) => document.activeElement === el"),
                              f"{name}: ArrowDown did not open menu and focus first link")
                        page.keyboard.press("Shift+Tab")
                        check(menu.evaluate("(el) => document.activeElement === el"),
                              f"{name}: tab navigation could not return to menu")
                        page.keyboard.press("Shift+Tab")
                        check(menu.get_attribute("aria-expanded") == "false",
                              f"{name}: menu remained open after focus left navigation")
                    expected_dir = "rtl" if locale == "ar" else "ltr"
                    check(page.locator("html").get_attribute("dir") == expected_dir,
                          f"{name}: wrong document direction")
                    work = page.locator("#work")
                    check(work.locator("article").count() == 7,
                          f"{name}: missing public repositories")
                    check(page.locator("#ai-lab").count() == 1, f"{name}: Atlas missing")
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
                    search = page.get_by_role("searchbox")
                    check(search.count() == 1 and search.is_visible(),
                          f"{name}: project search unavailable")
                    page.keyboard.press("/")
                    check(search.evaluate("(el) => document.activeElement === el"),
                          f"{name}: slash shortcut did not focus project search")
                    search.fill("Mizan")
                    check(work.locator("article").count() == 1 and
                          work.locator("article h3").first.inner_text() == "Mizan Finance",
                          f"{name}: project search failed to find Mizan")
                    search.fill("not-a-real-project-928364")
                    check(work.locator("article").count() == 0 and
                          work.locator("[data-empty-project-results]").is_visible(),
                          f"{name}: empty-state search regression")
                    work.locator("[data-empty-project-results] button").click()
                    check(work.locator("article").count() == 7 and search.input_value() == "",
                          f"{name}: clearing project search failed")
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
                        for section_id in ("header", "top", "work", "highlights", "process", "collaborate", "faq"):
                            violations = page.evaluate("""async (section) => {
                                const root = section === "header" ? document.querySelector("header") : document.getElementById(section);
                                const issues = await axe.run(root, {
                                    runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']},
                                    rules: {'region': {enabled: false}},
                                });
                                return issues.violations.map(v => ({
                                    id: v.id, nodes: v.nodes.map(n => n.target),
                                }));
                            }""", section_id)
                            check(not violations, f"{name}: {section_id} accessibility: {violations}")
                    # Atlas is interactive below the fold, but it must remain painted
                    # in exported full-page screenshots as well. CSS content-visibility:
                    # auto on its ancestor creates a blank rectangle in CI evidence.
                    atlas_paint = page.locator("#ai-lab").evaluate(
                        "(el) => getComputedStyle(el.parentElement).contentVisibility")
                    check(atlas_paint != "auto",
                          f"{name}: Atlas would render as a blank offscreen region in full-page capture")
                    overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                    check(overflow <= 2, f"{name}: horizontal overflow {overflow}px")
                    check(not errors, f"{name}: browser exceptions {errors}")
                    if label == "mobile":
                        # Scroll to top before a full-page capture. Sticky headers otherwise
                        # appear at the previous scrolled viewport, misleading visual review.
                        page.evaluate("window.scrollTo({top: 0, left: 0, behavior: 'instant'})")
                        page.wait_for_timeout(100)
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
    # Case-study QA: project pages are part of the portfolio experience.
    # Check the actual rendered heading text bounds, not only document scrollWidth
    # (overflow:hidden could otherwise hide a clipped heading).
    for width in (320, 390, 820):
        context = browser.new_context(viewport={"width": width, "height": 820}, reduced_motion="reduce")
        page = context.new_page()
        for slug in ("fitflow", "mizan", "bookhaven", "eventify", "venues-api"):
            name = f"case-study-{slug}-{width}"
            try:
                response = page.goto(BASE + "/work/" + slug + "/", wait_until="networkidle", timeout=60000)
                check(response is not None and response.status == 200,
                      f"{name}: page did not load")
                title = page.locator("article h1")
                check(title.count() == 1 and title.is_visible(),
                      f"{name}: missing visible title")
                text_bounds = title.evaluate("""(el) => {
                    const range = document.createRange();
                    range.selectNodeContents(el);
                    const rect = range.getBoundingClientRect();
                    return {left:rect.left, right:rect.right, width:rect.width};
                }""")
                check(text_bounds["left"] >= -2 and text_bounds["right"] <= width + 2,
                      f"{name}: clipped case study heading {text_bounds}")
                check(page.locator('a[href^="https://github.com/rahman-997/"]').count() >= 1,
                      f"{name}: no verifiable source link")
                if slug in ("mizan", "fitflow"):
                    img = page.locator("article figure img")
                    check(img.count() == 1 and img.evaluate("(el) => el.complete && el.naturalWidth > 0"),
                          f"{name}: project image did not load")
                    src = img.get_attribute("src") or ""
                    check(src.startswith("/projects/"),
                          f"{name}: static export must use a local asset, got {src}")
                    caption = page.locator("article figure figcaption")
                    check(caption.count() == 1 and len(caption.inner_text().strip()) > 12,
                          f"{name}: missing project image description")
                if slug in ("bookhaven", "eventify"):
                    check(page.locator("article figure img").count() == 0,
                          f"{name}: unverified preview image should stay hidden")
                overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                check(overflow <= 2, f"{name}: horizontal overflow {overflow}px")
                if width == 390 and slug in ("mizan", "fitflow"):
                    page.screenshot(path=str(OUT/(name+".png")), animations="disabled")
                report.append({"case":name,"status":"pass","overflow":overflow})
                print("PASS", name, flush=True)
            except Exception as exc:
                failures.append({"case":name,"error":str(exc)})
                print("FAIL", name, exc, file=sys.stderr, flush=True)
                try:
                    page.screenshot(path=str(OUT/(name+"-failure.png")), animations="disabled")
                except Exception:
                    pass
        context.close()
    browser.close()
(OUT/"report.json").write_text(json.dumps({"passed":report,"failed":failures},ensure_ascii=False,indent=2))
if failures:
    raise SystemExit(1)
print("Portfolio V5 browser QA passed: languages, themes, workflow, FAQ and WCAG, no-JS RTL",flush=True)
