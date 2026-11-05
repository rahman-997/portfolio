# Portfolio V8 · New sections and navigation

## What changed

- **Expertise** `/#expertise`: Three designed capability panels for product interfaces, backend/platform systems, and automation/AI. Each card links to an existing relevant section.
- **Process** `/#process`: A dark editorial four-stage process (Discover, Architect, Build, Verify & ship) with concise expected deliverables. This describes a working approach, not an unverified client history.
- **FAQ** `/#faq`: Four accessible, native `<details>` disclosures addressing code access, conceptual previews, technical focus, and cold-start behavior on free hosting.
- Updated desktop and mobile navigation to surface the new sections while preserving all existing anchors and résumé links.
- Renumbered homepage section labels consistently (01 through 08).
- Responsive layouts: expertise cards collapse to one column at 800 px, process stages to two at 1180 px and one at 600 px, FAQ uses a single column at 800 px.
- Maintained reduced-motion preference and keyboard focus styling; no client-side dependency added to the FAQ.
- Updated portfolio content modification timestamp for SEO.

## Testing and limitations

1. RED: added `tests/v8-sections.test.mjs`, verified five failures before implementing the features.
2. GREEN: `node --test tests/*.test.mjs` passed 38/38 in the development folder.
3. Syntax: parsed application TSX/TS and CSS files using the globally installed TypeScript and PostCSS parsers, without claiming a full typecheck.
4. A standalone static HTML showcase of the three new sections was created separately (`portfolio-v8-sections-preview.html`). It is not the full Next.js app and does not substitute for live-browser verification.
5. The npm registry was unreachable with DNS error `EAI_AGAIN`. Build, package-driven lint/typecheck, actual static export, and browser E2E were not run successfully.

## Commands to run on a network-connected machine

```bash
npm ci
npm run test:ui
npm run typecheck
npm run lint
npm run build
npm run verify:export
```

## Deployment

Nothing deployed; no remote GitHub changes or account actions were made.
