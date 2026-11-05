# HAJAR Portfolio V14 — verification & handoff

**Scope:** integrate the approved HAJAR Abstract Signature identity into the **personal Next.js portfolio V13**, independently of the FolioGrid commercial product.

## Implemented
- Used the approved two-fold, no-letter SVG from Portfolio1 unchanged as `public/brand/hajar-mark.svg`.
- Applied charcoal `#0E1416`, ivory `#F5F1E9`, champagne `#C9A77D` with readable brown accents `#745131`.
- Branded home navigation and footer, hero signature, résumé and case-study headers, 404 styling, favicon and PWA app icons.
- Updated page/OG metadata and added Instagram `@eng.rahman97` as a verified account link from the supplied HAJAR project context.
- Preserved personal project content, live/source links, and PDF résumé. No personal content was inserted into the FolioGrid product.
- Kept the internal Instagram calendar, captions and social templates **out of the public website source**.

## Tests performed
- Full Node test suite: **82/82 passed** (`node --test tests/*.test.mjs`).
- 7 CSS files parsed without syntax errors (tinycss2).
- 36 source TS/TSX/MJS/MTS files parsed without syntax errors (TypeScript parser, not full semantic typechecking).
- PWA icon PNGs opened and verified. Approved original SVG and generated favicon included.
- Static HTML preview rendered with Chromium using in-memory HTML at **1440, 390, and 320 px**; no horizontal overflow at the tested sizes. Preview is not full Next.js runtime.
- ZIP archive integrity and test rerun from extracted release recorded at packaging stage.

## Not verified
- Full Next.js production build and deployed app browser flows: project dependencies are absent (Next.js module not installed in the execution environment). No production-ready claim.
- Public repository, DNS, server configuration or live social account were not changed.
- This task did not recreate the attached PDF résumé; the existing file is preserved, and its visual content wasn't revalidated.

## How to run on a machine with npm network access
```bash
cd portfolio-main
npm ci
npm run check:release
npm run dev
```
For a static build, run `npm run build` and review `out/` before deploying. Ensure links and contact information remain current.

## What to copy into ChatGPT Project Portfolio1
Upload `Portfolio1_HAJAR_Integrated_V3.zip`, which contains the original identity/social plan package and `03_Personal_Portfolio_HAJAR_V14/`. This does not automatically modify a ChatGPT Project or publish any files.
