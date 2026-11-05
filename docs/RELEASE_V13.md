# V13 · Navigation & Release Hardening

## Scope

This is a continuation of V12. No existing projects, résumé content, case studies, or sections were removed. The deliverable is source code plus a standalone interaction preview, not a deployed website.

### Implemented

1. **Site-wide command palette.** A fixed Search site trigger is available on every page because the component is mounted in `app/layout.tsx`. Visitors can open it with `Ctrl/⌘ + K` or `/` when not typing in a field.
2. **Search backed by the real portfolio data.** The `buildSearchIndex` selector derives project results from `PROJECT_LIST`; `SEARCH_SECTIONS` contains stable destinations with homepage-absolute fragment links for use on nested pages. Queries normalize accents, match multiple words safely, rank matches, and cap results.
3. **Keyboard and accessibility.** Labeled dialog, combobox and listbox, arrow navigation, Enter to open, Escape to dismiss, focus trap, return focus, no-scroll modal, visible focus states, mobile design and reduced-motion overrides.
4. **Browser QA coverage.** Existing CI browser acceptance now includes project keyword lookup, empty state and Escape dismissal. Its workflow watches component, index, styles, layout, data and tests. The runner optionally accepts `ATLAS_CHROMIUM_PATH` for Linux distributions without Google Chrome.
5. **Standalone interactive preview.** `docs/preview-v13.html` inlines the same pure search selector and presentation CSS, uses local example project metadata, and shows the interaction without installing dependencies. It is deliberately labeled as a preview rather than a real Next.js build.

### Verification evidence

- Source tests: **78/78 passed**, including all 67 inherited V12 tests and 11 V13 tests.
- TypeScript / TSX syntax parsing: passed, without claiming a semantic typecheck.
- CSS syntax and Python QA syntax: passed.
- Headless Chromium interaction preview at 1440×900, 390×844 and 320×700: search query, Escape dismissal, zero horizontal overflow and no JavaScript errors all passed.
- **Production not verified:** npm registry responds with DNS `EAI_AGAIN`; no `next build`, ESLint or end-to-end QA against the real exported site was completed.

### Next required production gate

```bash
npm ci
npm run check:release
```

The CI workflow also covers real-app browser acceptance with the exported static files. Do not publish without a green build and reviewing the resulting site in a real browser. No remote repository, website or account was changed.
