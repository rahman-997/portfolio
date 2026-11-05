# Portfolio V10 · Solution Routes, Quality Lab, Brief Studio

## What changed

V10 extends V9 with three homepage sections while retaining the four original projects, project explorer, AI Atlas, decision files, expertise, process, FAQ and previous routes.

1. **Solution Routes (`/#solutions`)**: four differentiated paths matching Eventify, BookHaven, FitFlow, and Venues API. Each card references a real case study and real project technologies without claiming external client metrics or invented deployments.
2. **Quality Lab (`/#quality-lab`)**: four keyboard-accessible native disclosure cards. Their verification lists are rendered from `PROJECT_LIST` project `evidence` fields, not from fabricated statistics.
3. **Brief Studio (`/#brief-studio`)**: an interactive, client-only builder allowing a visitor to choose a project type, delivery stage, primary concern, and optional context. A copy button generates a simple draft. Nothing is submitted or stored. When clipboard permission is unavailable the UI offers a manual-copy fallback.

The desktop navigation now groups secondary links in a native `More` disclosure to reduce header crowding. Mobile navigation includes all three new destinations. Section numbers on the homepage run 01–14.

## Key files

- `app/page.tsx`: three sections, real project mappings, compact desktop navigation, section numbering.
- `app/brief-studio.tsx`: React client component for the local-only brief generator.
- `app/brief-utils.mjs` and `.d.mts`: independent generator with controlled options, validation, normalized and length-limited free text, TypeScript declarations.
- `app/mobile-nav.tsx`: mobile links to new sections.
- `app/home.module.css`: responsive sections, visible focus, native disclosure, dark evidence panels and the brief studio.
- `tests/v10-new-sections.test.mjs`: eight new regression tests written before implementation (initial run failed due to the missing utility module).
- `scripts/atlas-browser-qa.py`: added checks for real case-study links, dossier expansion, live brief preview, copy status, desktop `More` menu, and screenshots. **These browser checks were not executed locally.**
- `.github/workflows/atlas-browser-qa.yml`: changed paths trigger browser QA when V10 code or tests change.
- `docs/preview-v10.html`: standalone, independent V10 section preview, with a demonstration of client-side input updates. It is not the production-rendered Next.js page.

## Checks completed

- `node --test tests/*.test.mjs`: **53/53 passing**.
- TypeScript/TSX/MTS syntax-only parsing: **20 files**, zero diagnostics. This is NOT a dependency-backed typecheck.
- PostCSS syntax parsing: **6 CSS files**, zero parse errors.
- YAML parsing: **5 workflow files**.
- Python browser-QA source syntax: `python -m py_compile` succeeded.
- `next build --webpack`: **not run to completion**, as the `next` executable is missing from the environment and npm dependencies were not available. No claim of a successful production build.
- Chromium local preview capture: **incomplete** because the browser process timed out in the current environment. No claim of pixel-perfect visual QA or completed browser E2E.

## Before deployment

With network access and a compatible runtime:

```bash
npm ci
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
# Serve out/ on localhost:4173, install Playwright + axe-core, and run scripts/atlas-browser-qa.py
```

No external site, repository, account or deployment was modified.
