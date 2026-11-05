# Abdulrahman Hajar — Software Engineering Portfolio

[![Portfolio CI](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml)

A recruiter-facing engineering portfolio for **Abdulrahman Hajar** — **Software Engineer · Full-Stack Developer · AI & Interactive Systems**, and Computer Engineering student at Nişantaşı University in Istanbul, Türkiye.

The portfolio is built around **engineering evidence, not a generic skills wall**: complete products, backend architecture, API design, data systems, background work, validation, testing, security, reliability, deployment, AI integrations, and selected interactive engineering.

**Live:** [abdulrahman-hajar-portfolio.onrender.com](https://abdulrahman-hajar-portfolio.onrender.com) · **GitHub:** [rahman-997](https://github.com/rahman-997) · **LinkedIn:** [Abdulrahman Hajar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/)

---

## Positioning

```text
Build the interface.
Engineer the backend.
Own the data and failure modes.
Ship the complete system.
```

The portfolio presents the engineering layers demonstrated by the selected work:

1. **Product engineering** — React, Next.js, TypeScript, responsive UX, accessibility, and PWA behavior.
2. **Backend systems & APIs** — Node.js, Express, REST, validation, authentication, authorization, contracts, and layered service boundaries.
3. **Data & reliability** — PostgreSQL, Prisma, MongoDB, Redis, queues, background workers, health/readiness, metrics, concurrency, transactions, compensation, and failure handling.
4. **Delivery** — testing, security checks, CI/CD, static export verification, runtime/container pinning, production deployment, and operational evidence.
5. **Extended engineering toolkit** — GraphQL, WebSockets, gRPC, OpenAPI, Docker, AI/LLM/MCP, FastAPI, and Flutter.

## Selected systems

| Project | Engineering focus | Evidence |
| --- | --- | --- |
| **Eventify** | Distributed event platform | PostgreSQL/Prisma, Redis, BullMQ, authentication, bookings/waitlists, durable background work, health/readiness, metrics, CI/security |
| **BookHaven** | Full-stack commerce | Next.js + Express + MongoDB, HttpOnly BFF sessions, optimistic concurrency, conditional inventory, adaptive transactions with compensation fallback, paginated catalog/reviews/orders, admin operations, ISBN validation, dynamic SEO, Node 24.20.0 pinning, digest-pinned Node/Mongo containers, Compose validation, Dependabot supply-chain coverage |
| **FitFlow** | Installable fitness PWA | Personalized plans, guided intervals, local-first progress, accessibility, responsive UX, offline readiness, Render static delivery |
| **Venues API** | Focused backend service | Express 5, TypeScript, Zod 4, layered architecture, centralized errors, UUID resources, persistence, contract tests, live health proof |

Every featured project links to **live proof, source code, and an engineering case study**. Render-hosted demos explicitly disclose free-tier wake-up behavior where applicable so cold starts are not mistaken for broken software.

## Visual direction

The **HAJAR Abstract Signature** identity combines a charcoal-and-ivory editorial portfolio with a contrasting technical console:

- charcoal (#0E1416), ivory (#F5F1E9), muted champagne (#C9A77D), and subtle sage/slate supporting colors; the official two-fold abstract mark
- oversize editorial headline, generous breathing space, accessible contrast, and defined CTA hierarchy
- clean project evidence cards with real source/live/case-study pathways and explicitly illustrative cover art
- lazy-loaded, accessible project illustrations with responsive image sizing and visible provenance captions on both homepage and case-study pages
- dark interactive AI Atlas visually integrated with the HAJAR two-fold mark and brand colors
- consistent visual tokens across homepage, résumé, case studies, 404, PWA icons and social previews
- working mobile/tablet navigation with Escape, outside-click and link-selection dismissal
- site-wide keyboard command palette (Ctrl/⌘ + K or /), with project/technology/section search, keyboard result selection, focus return and local-only indexing
- AI Atlas keyboard roving focus (Arrow keys, Home/End), modified-key safety, flow selection synchronization, and live reduced-motion preference handling
- consistent previous/next case-study navigation across all four featured projects
- primary CI quality gate runs local UI/navigation regression tests before lint, typecheck and production build
- dependency-free static export link audit checks page anchors, responsive `srcset` candidates, video posters, CSS font/background URLs, and forbidden navigation schemes before deployment
- shared JSON-LD serializer neutralizes script-closing content without changing structured-data semantics
- V8 adds editorial capabilities cards (product UI, backend systems and automation/AI), a four-step delivery process, and a keyboard-accessible native FAQ
- V9 adds a searchable and filterable four-project explorer, expandable real-world architecture decision notes, and visitor-specific quick paths, without fabricating metrics or testimonials
- desktop/mobile navigation links to each new section, with responsive cards and visible focus styles
- reduced-motion consideration, visible keyboard focus, and responsive layouts from 320 px upward

## Recruiter-facing content

- clear **Software Engineer · Full-Stack Developer · AI & Interactive Systems** positioning
- selected projects with architecture and reliability evidence
- engineering capability map
- dedicated expertise, delivery process, and FAQ sections
- filterable project explorer, documented decision files, and guided paths for different visitors
- Computer Engineering education
- recruiter-facing web résumé
- downloadable PDF résumé (`/Abdulrahman-Hajar-Resume.pdf`)
- printable HTML résumé
- dedicated case studies
- GitHub and LinkedIn pathways
- canonical metadata and structured data
- indexable résumé and project routes

## Stack

```text
Next.js 16 · React 19 · TypeScript 5 · JavaScript
Node.js · Express · REST · GraphQL · WebSockets · gRPC · OpenAPI · Zod
PostgreSQL · Prisma · MongoDB · Redis · BullMQ
Docker · GitHub Actions · CI/CD · Netlify · Render
AI / LLM / MCP · FastAPI · Flutter
CSS Modules · Responsive CSS · Accessibility
```

## Structure

```text
app/
  portfolio-data.ts                 canonical profile + project data source
  layout.tsx                         metadata, JSON-LD, application shell
  manifest.ts                       web app metadata
  page.tsx                           engineering portfolio homepage
  mobile-nav.tsx                     accessible mobile navigation disclosure
  site-search.tsx                    server-only search index composition
  site-search-client.tsx             accessible global command palette UI
  site-search.mjs                    dependency-free ranked project/section search
  site-search.module.css             responsive dialog and floating trigger styles
  project-explorer.tsx               client-side project search and filter interface
  project-filters.mjs                tested filtering logic grounded in project data
  project-filters.d.mts              filtering types
  atlas-navigation.mjs               unit-tested atlas keyboard + mode selection logic
  project-navigation.mjs             unit-tested prev/next case-study ordering
  home.module.css                    homepage visual system
  globals.css                        minimal global reset + accessibility defaults
  not-found.tsx                      branded 404 experience
  not-found.module.css               404 presentation
  opengraph-image.tsx                generated social preview
  twitter-image.tsx                  generated X/Twitter preview
  robots.ts                          crawler policy
  sitemap.ts                         indexable route map
  resume/
    page.tsx                         recruiter-facing résumé + PDF download
    resume.module.css                résumé design system
  work/[slug]/
    page.tsx                         case studies, metadata/JSON-LD, adjacent project links
    case-study.module.css            case-study presentation
public/
  projects/                          project evidence imagery
  favicon.svg
  Abdulrahman-Hajar-Resume.pdf       downloadable résumé
  resume.html                        printable résumé
scripts/
  verify-export.mjs                  export + identity regression checks
  check-static-links.mjs             local navigation, fragment, and asset link audit
.github/workflows/
  ci.yml                             lint + typecheck + build + export + audit gate
```

## Image provenance

The original Eventify and BookHaven JPEG cover files in the supplied archive had invalid JPEG structures and could not be decoded. They have been replaced by valid, original **interface illustrations** to avoid broken images. Text, figures and layout depicted inside these illustrations are conceptual sample UI, **not screenshots of the running apps, reported KPIs, or live operational data**. Live implementations and repository links remain separate.

## Local development

```bash
git clone https://github.com/rahman-997/portfolio.git
cd portfolio
npm ci
npm run dev
```

## Previewing a verified static export

This application uses Next.js `output: "export"`, so `next start` is **not** the appropriate production preview server. Build once, then serve `out/` locally (loopback only):

```bash
npm ci
npm run build
npm run verify:export
npm run preview:export -- --port 4173 --dir out
# Open http://127.0.0.1:4173/
```

`npm start` is an alias for the same dependency-free static preview server. It supports exported trailing-slash routes (for example `/work/eventify/`), `GET` and `HEAD`, and local assets while rejecting path traversal and symlink escapes. It is intended for **local QA only**, not as a hardened internet-facing server. Use a static hosting provider with configured headers for production.

The main CI workflow publishes a downloadable **preview** `out/` artifact for pull requests, manual runs, and non-main branches. Production/deployment artifacts are created **only for pushes to `main`** after build and export validation. The Netlify deployment workflow only responds to successful `main` push events; a manual review run does not deploy. Nothing is deployed by using `npm run preview:export`.

## Quality gate

```bash
npm run test:ui
npm run check:release  # complete build/export gate once dependencies are available
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run verify:links       # optional standalone audit after build
npm run audit
```

`test:ui` runs 92 dependency-free regression checks (as of V15.2), including mobile navigation, Atlas keyboard logic, reduced-motion behavior, case-study navigation, image integrity, static export anchors, responsive-image candidates, CSS referenced assets, dangerous URL protocol normalization, and safe JSON-LD serialization. The remaining quality gate requires `npm ci` and a successful Next.js export. Set `images.unoptimized: true` when serving static Next.js output so project visuals do not depend on a server-side image optimizer. The manifest and production verification scripts import `app/brand.json` so theme assertions cannot silently diverge.

`verify:export` checks the exported homepage, branded 404, résumé, case studies, crawler files, canonical-host contract, project assets, social-preview fallbacks, manifest theme consistency, internal links, identity markers, downloadable résumé PDF, hosting header/cache rules, and guards against stale legacy production hostnames.

GitHub Actions runs the complete quality gate on pushes and pull requests and provides the final CI proof for `main`. Project/profile metadata is centralized in `app/portfolio-data.ts` so homepage cards, case studies, résumé links, sitemap routes, and structured data cannot silently drift apart.

## Production integrity

The portfolio treats deployment as a verifiable artifact, not just a successful build:

- `render.yaml` documents the primary Render static-site contract, including security and cache headers.
- `netlify.toml` remains the equivalent fallback-host contract.
- generated HTML exposes the non-secret Git commit SHA as `data-deploy-commit`, allowing CI to prove which revision is actually live.
- `.github/workflows/production-smoke.yml` verifies the production site after successful `main` CI and once daily.
- the PWA identity includes SVG, 192 px, 512 px, maskable, and Apple touch icons.

## V13 verification status (October 2026)

The V13 source contains **78 dependency-free regression tests**, including 11 tests for the global search index, keyboard shortcuts, accessible dialog markup, valid anchor destinations, and QA workflow coverage. The command palette is mounted at the layout level, so it is available from the homepage, résumé, and case study pages. It is entirely local: search terms are not sent to a server.

- `npm run test:ui`: passed in the delivery environment.
- Syntax parsing of the TS/TSX sources, CSS modules and browser-QA Python: passed.
- A separate, clearly labeled `docs/preview-v13.html` was exercised using headless Chromium at desktop and two mobile widths. This is **not** an actual compiled Next.js app and should not be interpreted as production browser evidence.
- `npm ci` cannot complete here because the npm registry DNS lookup fails with `EAI_AGAIN`. Therefore Next.js build, full ESLint, full TypeScript semantic checking and real-app browser QA remain **unverified**.

When a connected build environment is available, run:

```bash
npm ci
npm run check:release
# In a separate terminal, after building:
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
# Then install Playwright and axe-core as the QA workflow documents and run:
ATLAS_CHROMIUM_PATH=/usr/bin/chromium python3 scripts/atlas-browser-qa.py
```

The browser QA script defaults to the Chrome channel in CI and accepts `ATLAS_CHROMIUM_PATH` for local Chromium. Previous release notes remain in `docs/`.

## Deployment

The project uses a portable static Next.js export. `netlify.toml` remains available for Netlify, while the active public mirror is deployed from `main` as a Render Static Site publishing `out/`.

The deployment configuration includes long-lived caching for immutable static assets and security-oriented response headers. Because the output is static, the portfolio is not tied to one hosting vendor and can be moved between static hosts without changing the application architecture.

## SEO & accessibility

The portfolio includes canonical metadata, Open Graph/Twitter previews, sitemap and robots output, JSON-LD for the person/site/profile and project case studies, semantic landmarks, skip navigation, visible keyboard focus, strong contrast, reduced-motion support, 44px minimum interactive targets, and responsive layouts.

## Author

Designed and developed by **[Abdulrahman Hajar](https://github.com/rahman-997)** — **Software Engineer · Full-Stack Developer · AI & Interactive Systems** in Istanbul, Türkiye.

## License

Released under the [MIT License](LICENSE).

## V9 release

Three additional sections have been added: `/#explorer`, `/#decisions`, and `/#start-here`. See [V9 delivery notes](docs/DELIVERY_NOTES_V9.md) for tests and build limitations. The project still requires a successful dependency install, production build, and real browser check before deployment.

## V10: Solution routes, quality lab and brief studio

The home page now includes [`/#solutions`](./#solutions), [`/#quality-lab`](./#quality-lab) and [`/#brief-studio`](./#brief-studio). Solution routes connect visitor problems to the four actual featured case studies. Quality Lab displays existing project verification evidence via accessible native disclosures. Brief Studio runs in the browser, generates a short copyable project brief, and does **not** transmit or persist the entered text. The desktop menu groups supplementary destinations in a `More` disclosure.

For a **standalone design preview** of the newly introduced sections, open [`docs/preview-v10.html`](docs/preview-v10.html) locally. This preview is a static illustration and not a compiled Next.js build. See [`docs/DELIVERY_NOTES_V10.md`](docs/DELIVERY_NOTES_V10.md) for implementation details, local test evidence, and the unverified production checks.

## V11: Comparison desk, stack connections and interface lab

Three interactive sections enrich the homepage without replacing the V10 design: [`/#compare`](./#compare) uses real case-study details in a two-column comparison, [`/#stack-lens`](./#stack-lens) maps documented technologies to projects, and [`/#interface-lab`](./#interface-lab) offers an isolated, explicitly conceptual theme/density preview. Both desktop and mobile navigation link to each section. The helper logic has separate Node regression tests.

`npm run test:ui` currently runs **60 dependency-free checks**. For verification details and build limitations, see [`docs/DELIVERY_NOTES_V11.md`](docs/DELIVERY_NOTES_V11.md). The offline preview is at [`docs/preview-v11.html`](docs/preview-v11.html); it is not a deployed Next.js application. Earlier V8 test counts in this README describe historical releases, not V11.


## V12 release candidate

The latest usability pass improves long navigation menus, keyboard dismissals and
keyboard-first copying from the local project brief. For a complete release gate,
run `npm ci` followed by `npm run check:release`. The release script **does not deploy**.
See [`docs/RELEASE_V12.md`](docs/RELEASE_V12.md) for verified checks and
explicitly unverified build/browser steps. Do not treat the local regression tests
as a substitute for a full Next.js build and browser acceptance run.

## Safe review-branch handoff (V15.5)

A review worktree can be prepared from this release snapshot without modifying the existing `main` checkout. Start with `npm run review:prepare -- --repository /path/to/separate/portfolio-clone`. This command is **dry-run by default**. Add `--apply` only when ready to create a local review branch. See [`docs/HAJAR_V15_5_REVIEW_RELEASE_AR.md`](docs/HAJAR_V15_5_REVIEW_RELEASE_AR.md) for the safe remote review and build instructions. Internal Instagram content and environment files are excluded.
