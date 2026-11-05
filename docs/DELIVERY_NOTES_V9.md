# Portfolio V9 · Discover, decide, navigate

## What was implemented

This update builds on V8 without replacing the existing design or case studies. The existing content remains in English, following the site's current language.

1. **Project Explorer** (`/#explorer`): interactive, client-enhanced search and category filters for the four actual featured projects. The category-to-project mapping is explicitly curated in `app/project-filters.mjs`; multiword queries are tokenized and matched case-insensitively against the case-study name, thesis, summary, and stack. The UI announces the result count and offers a clear empty state and reset. Each result links to its actual case study and GitHub source.
2. **Decision Files** (`/#decisions`): four collapsible cards, each built from the first documented architectural decision in `PROJECT_LIST`. This does not invent a client engagement, metric, testimonial, or a new blog post. Each decision links to the corresponding case study.
3. **Start Here** (`/#start-here`): three purposeful navigation paths for recruiters, product teams, and engineers, using existing résumé, project explorer, and case study content.

Desktop and mobile navigation include the new destinations. Section numbers now follow 01–11 on the homepage. The mobile menu's scroll region is capped for short viewports. Layouts include four-to-two-to-one project cards, two-to-one decision cards, and three-to-two-to-one visitor cards, with keyboard focus, accessible labels, and a reduced-motion rule already established by the portfolio styles.

## Changes by file

- `app/project-explorer.tsx`: search, filters, results and reset.
- `app/project-filters.mjs` and `.d.mts`: standalone tested filter logic and TypeScript declaration.
- `app/page.tsx`: three new sections, decision data from canonical project records, section labels, navigation.
- `app/mobile-nav.tsx`: new anchors.
- `app/home.module.css`: responsive editorial styling and accessible control states.
- `tests/v9-project-explorer.test.mjs`: seven regression tests for categories, search, no matches, source integrity, anchors, UI semantics, layout, and CI paths.
- `scripts/atlas-browser-qa.py`: *new browser acceptance checks are added*, including filter interactions, zero results, decision disclosure, and explorer screenshots. **These browser checks were not run locally.**
- `.github/workflows/atlas-browser-qa.yml`: browser QA also runs when the explorer, filter model, or associated tests change.

## Verification completed locally

- RED: a new test module failed before implementation because the required filter module was missing.
- GREEN: `npm run test:ui` passed **45/45** tests across the existing and new suites.
- Syntax-only TypeScript parser check: **18 TS/TSX/MTS files**, zero parse diagnostics; this is **not** a TypeScript typecheck.
- CSS syntax parse: **6 CSS files**, zero parser errors.
- Python browser-QA script passed `python -m py_compile`; **not** a browser run.
- An **independent HTML preview** was generated outside the source archive using the portfolio CSS. It is not the Next.js app or a full production browser test.

## What could not be verified

`npm ci` could not complete in this environment because registry requests did not finish. Therefore production `next build`, dependency-based `tsc`, ESLint, static-export verification, accessibility engine, and Playwright E2E remain **unverified**. A Chromium screenshot attempt also did not complete. There is no claim of a production-tested website or pixel-perfect visual validation.

## Commands on a machine with registry and browser access

```bash
npm ci
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
# Then serve out/ and execute scripts/atlas-browser-qa.py with Playwright + axe installed.
```

## Scope and safety

Source code changes only. The live site, GitHub repository, social accounts, deployments, and external services were **not modified**.
