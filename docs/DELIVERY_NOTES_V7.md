# Portfolio V7 — Export Integrity & Structured-Data Hardening

## Continuity

V7 continues directly from V6. The Atelier 26 design, four case-study pages, résumé, AI Atlas, imagery, accessible navigation, existing workflows, and all prior tests remain intact. The main changes strengthen the security and completeness of the static-export audit; the UI's appearance has not been redesigned in this release.

## Confirmed and fixed issues

1. **Obfuscated navigation schemes were not caught.** The V6 auditor checked raw attribute text for unsafe URL schemes. WHATWG URL parsing strips certain whitespace characters from scheme names, so a link like `java\nscript:` could evade that text check. V7 validates the *parsed* URL scheme and decodes supported HTML character references before parsing. Regression coverage includes numeric and named HTML entities.
2. **Responsive image URLs were not checked.** V7 checks each local `srcset` / `imagesrcset` candidate, including within `<picture><source>`, without treating embedded `data:` URLs as missing files.
3. **Video posters and CSS assets were not checked.** V7 includes `<video poster>` and recursively inspects exported CSS `url(...)` and quoted `@import` references for local images and fonts. URLs are resolved relative to the stylesheet, not the HTML page.
4. **Empty exports could report success.** When there are zero HTML pages, the auditor now raises an error instead of incorrectly returning an empty list.
5. **JSON-LD was injected without HTML-script escaping.** Both the root layout and case studies now use a shared JSON serializer that escapes `<`, `>`, `&`, and U+2028/U+2029 while preserving the original JSON values. This hardens future content integrations.

## Testing

- Existing V6 regression tests: 25 retained.
- New V7 tests: 8.
- Total automated Node tests: 33.
- All 33 tests passed locally after the change.
- Targeted new regression tests were observed failing before their corresponding fixes.
- Global TypeScript parser, PostCSS parser, Python syntax checker, image decoding, and ZIP integrity checks were run separately; see the accompanying report.

## Verification limits

- `npm ping` failed with `EAI_AGAIN registry.npmjs.org`; the dependencies are not installed in the extracted archive.
- A real `next build`, `npm run lint`, full `npm run typecheck`, exported-page verification, and Playwright runtime screenshot checks **could not be completed** here.
- These are *not* claimed to be passing; the test suite exercises repository logic, source contracts, and fixture-based audits, not a built Next.js application.
- No live website, GitHub repository, or hosting settings were modified.

## Production commands (in an environment with npm registry access)

```bash
npm ci --no-audit --no-fund
npm run test:ui
npm run lint
npm run typecheck
npm run build
npm run verify:export
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

For the full browser QA, follow `.github/workflows/atlas-browser-qa.yml`, including the Playwright and axe-core installation steps. Do not run `next start` for a static-export deployment; serve the generated `out/` directory.
