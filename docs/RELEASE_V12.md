# Portfolio V12 | Finalization candidate

## Scope

V12 builds on V11 without removing any portfolio projects, case studies, AI Atlas modes, filtering, comparison, brief generation, or visual sections. This release concentrates on usability and a repeatable production-readiness gate, rather than adding another redundant section.

### Implemented changes

1. **Desktop More navigation:** the existing native `details` menu now closes when a link is chosen, when Escape is pressed, or when the visitor clicks outside. Keyboard focus returns to the summary after Escape. It remains a functional native disclosure without client JavaScript.
2. **Compact-screen navigation:** 18 existing destinations are grouped visually and semantically under Featured / Engineering / Connect headings. The pre-existing outside click, Escape, and link-selection dismissal remain intact.
3. **Long-menu containment:** the desktop overflow menu is capped at viewport-relative height and scrolls when necessary. The mobile menu already has a viewport-height cap.
4. **Project brief fallback:** the generated text is now in a labeled, read-only, keyboard-selectable text area. Clipboard denial automatically focuses and selects the text, followed by instructions for Ctrl+C / Command+C. Nothing is automatically sent or stored.
5. **Browser acceptance updates:** verify new menu dismissal paths and read the live value of the preview text area, not the now-inaccurate `innerText`. Browser tests are included but not claimed to have executed locally.
6. **Release-quality command:** `npm run check:release` gates readiness on UI tests, ESLint, TypeScript, Next.js production build, and the static export audit in sequence. It performs no deployment.

### Verification performed in this workspace

| Gate | Result |
| --- | --- |
| Node UI and regression suite | 67/67 PASS |
| TypeScript/TSX syntactic parsing (global TypeScript compiler API) | 25 files, no parse errors |
| CSS parsing | 6 files, no parse errors |
| GitHub Actions YAML parsing | 5 files, no parse errors |
| Python browser-acceptance script syntactic compilation | PASS |
| JPEG/PNG integrity | PASS |
| npm registry network check | FAIL (DNS `EAI_AGAIN`) |
| `npm run check:release` | BLOCKED after successful 67 tests because local `eslint` is missing |
| Next.js production build and static export | NOT VERIFIED; dependencies not installed |
| Live-browser end-to-end / visual regression | NOT VERIFIED locally |
| Production publication and smoke test | NOT PERFORMED, no deployment authorization |

**Important:** Source parsing is not TypeScript typechecking, and test success is not proof of a successful Next.js build. Do not mark V12 production-ready until every remaining gate has passed in an environment with dependencies and a working browser.

### Exact release commands (run in a normal network-enabled environment)

```bash
node --version                   # use .node-version (22.13.0)
npm ci --no-audit --no-fund
npm run check:release
npm run audit
```

For local manual review, after the build succeeds:

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
# Open http://127.0.0.1:4173/ and check all pages at 320, 390, 820, 1440px.
```

For the automated browser checks, run the existing **Atlas Browser QA** GitHub Actions workflow on a branch or pull request; it installs its own Playwright and accessibility checks, takes screenshots, and tests the interactive page. Inspect the published CI artifacts before deciding to ship.

**Release decision:** Hold publication until a green `check:release` and browser QA. Publishing, branch changes, DNS edits, and account actions are outside this archive and have not been performed.
