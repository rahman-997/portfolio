# Professional identity consistency review — 2026-11-19

## Verified reason for change
Actual screenshots from [successful browser QA #44523490245](https://github.com/rahman-997/portfolio/actions/runs/44523490245) show the HAJAR header/footer label in EN as `SOFTWARE ENGINEER` and TR as `YAZILIM MÜHENDİSİ`, despite about paragraphs and education stating Computer Engineering. The Arabic about text and SEO route title also used `عبدالرحمن حجار` without the intended spacing.

## Scope
- Primary professional identity is **Computer Engineer** and **Full-Stack Developer** in all three languages: English, Arabic `مهندس كمبيوتر`, Turkish `Bilgisayar Mühendisi`.
- The header/footer now share a single `TEXT[locale].brandRole`, instead of two duplicated ternaries.
- Root English SEO title, OpenGraph, Twitter and schema.org Person jobTitle lead with Computer Engineer; keep Software Engineer as a relevant secondary professional keyword/skill.
- Arabic name in site copy/metadata is spelled `عبد الرحمن حجار`. Latin name remains **Abdulrahman Hajar** with one J.
- Online résumé HTML role, page title and professional snapshot updated; the downloadable pre-existing PDF file is **not silently modified** in this change.
- Add five source-level Node regressions plus a postbuild HTML export validator for header and footer role in three languages, localized page title and online résumé. This prevents an off-by-one localization/SEO regression.

## Safety
Exact PR54 review branch only; no main update, production release, paid services or access to private repositories. The existing npm audit, CodeQL, Semgrep, Playwright, SEO and 320px search acceptance gates remain fully enabled. Verify the published static output through CI before the branch is considered ready; keep PR54 Draft.
