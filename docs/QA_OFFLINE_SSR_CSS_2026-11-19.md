# Offline SSR + CSS visual smoke test

This script checks the real **compiled static HTML and CSS** of the Portfolio with Chromium without navigation, network calls or React hydration.

Run after a build, on a clean review checkout:

```powershell
npm run build
npm run qa:ssr
npm run qa:full
```

Or run against an archived GitHub Actions static artifact:

```powershell
python scripts/offline-ssr-qa.py --zip ./portfolio-static-ARTIFACT.zip
```

Coverage: 18 cases (EN/AR/TR x light/dark x 320/768/1440), 22 project cards, HTML lang and Arabic RTL, no horizontal overflow, no duplicate DOM ids, valid internal fragment links, rendered gallery width. Default English LTR is valid without an explicit `dir` attribute.

Evidence on OLD baseline PR #47 static artifact at db70cec767c16222794f4f4220e5aea9c2b8bb4c: **18/18 PASS**. When a duplicate ID was intentionally inserted in Turkish markup, **6 cases failed**, exit code 1 (fail-closed). This only establishes CSS/SSR presentation on that old baseline; it is **not an E2E of the new unified PR** or the Turkish interactive search.

The local full QA gate now requires this SSR test IN ADDITION TO its three hydrated Playwright suites. It remains NO-GO until exact-commit Next.js dependency security, npm audit, build, CodeQL/Semgrep and Playwright are cleared.

No merge, public deploy, data changes, or paid services.
