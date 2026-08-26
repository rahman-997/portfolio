# Abdulrahman Hajar — Software Engineering Portfolio

[![Portfolio CI](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml)

A recruiter-facing engineering portfolio for **Abdulrahman Hajar** — Software Engineer, Full-Stack Developer, and Computer Engineering student at Nişantaşı University in Istanbul.

The portfolio is built around **engineering evidence, not a generic skills wall**: complete products, API design, data systems, background work, validation, testing, security, deployment, operational behavior, and selected AI/interactive engineering.

**Live:** [abdulrahman-hajar-dev.netlify.app](https://abdulrahman-hajar-dev.netlify.app) · **GitHub:** [rahman-997](https://github.com/rahman-997) · **LinkedIn:** [Abdulrahman Hajar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/)

---

## Positioning

```text
Build the interface.
Engineer the system.
Ship the whole product.
```

The portfolio presents four connected areas of engineering:

1. **Product engineering** — React, Next.js, TypeScript, responsive UX, accessibility, state, and PWA behavior.
2. **Backend & APIs** — Node.js, Express, REST, GraphQL, WebSockets, validation, authentication, and service boundaries.
3. **Data & reliability** — PostgreSQL, Prisma, MongoDB, Redis, queues, caching, health/readiness, metrics, and failure handling.
4. **AI & interactive systems** — FastAPI, LLM integrations, MCP workflows, Flutter, WebGL, Three.js, and real-time interfaces.

## Selected systems

| Project | Engineering focus | Evidence |
| --- | --- | --- |
| **Eventify** | Distributed product system | PostgreSQL/Prisma, Redis, BullMQ, durable async work, auth, bookings/waitlists, metrics, readiness, CI/security gates |
| **BookHaven** | Full-stack commerce | Next.js + Express + MongoDB, auth/RBAC, cart/wishlist, checkout, orders, inventory, admin workflows |
| **FitFlow** | Installable fitness PWA | Personalized planning, guided intervals, local-first progress, accessibility, responsive UX, offline-ready behavior |
| **Venues API** | Focused backend service | Express 5, Zod 4, layered architecture, centralized errors, UUID resources, persistence, service/HTTP contract tests |

Every featured project links to **live proof, source code, and an engineering case study**. Case-study pages also expose project-specific social metadata and structured software/technical-article data.

## Current visual direction

The active redesign uses a **premium dark engineering identity** with an editorial hierarchy instead of a generic neon developer template:

- deep charcoal / near-black application canvas with high-contrast typography
- restrained mint and blue signal accents
- oversized editorial headlines with strong scan hierarchy
- real project imagery and product evidence where available
- an engineering-system panel for interface → API → data → delivery
- structured project storytelling with generous spacing
- restrained monospaced operational details and terminal cues
- responsive layouts tuned for desktop, tablet, and mobile
- generated Open Graph / Twitter artwork synchronized with the engineering identity
- no dependency on a profile portrait to make the portfolio feel complete

The design intentionally keeps visual noise controlled so recruiters can reach **role, capabilities, projects, proof, résumé, and contact paths quickly**.

## Experience & interaction

The portfolio includes a lightweight keyboard command palette:

- press `/` outside an input
- press `⌘K` / `Ctrl+K`
- search work, capabilities, résumé, GitHub, or LinkedIn
- press `Enter` to open the first matching destination

A branded 404 experience keeps stale links inside the portfolio instead of dropping visitors into a generic framework page.

The site also includes a web app manifest with mobile theme/standalone metadata so the portfolio can be added cleanly to a device home screen without adding a heavy runtime dependency.

## Recruiter-facing content

- concise Software Engineer / Full-Stack positioning
- selected projects with architecture and reliability evidence
- technical capability map
- Computer Engineering education
- recruiter-facing web résumé
- **direct downloadable PDF résumé** (`/Abdulrahman-Hajar-Resume.pdf`)
- printable HTML résumé view
- dedicated engineering case studies
- GitHub and LinkedIn pathways
- correct canonical URL and structured metadata
- indexable résumé and case-study routes

## Stack

```text
Next.js 16 · React 19 · TypeScript 5
Node.js · Express · REST · GraphQL
PostgreSQL · Prisma · MongoDB · Redis
CSS Modules · Responsive CSS · Accessibility
GitHub Actions · Netlify · Docker-oriented workflows
```

## Structure

```text
app/
  layout.tsx                         metadata, JSON-LD, application shell
  manifest.ts                       installable web app metadata
  page.tsx                           engineering portfolio homepage
  home.module.css                    homepage visual system
  globals.css                        minimal global reset + accessibility defaults
  not-found.tsx                      branded 404 experience
  not-found.module.css               404 presentation
  components/
    CommandPalette.tsx               keyboard quick navigation
    command-palette.module.css       command palette styles
  opengraph-image.tsx                generated social preview
  twitter-image.tsx                  generated X/Twitter preview
  robots.ts                          crawler policy
  sitemap.ts                         prioritized indexable route map
  resume/
    page.tsx                         recruiter-facing résumé + PDF download
    resume.module.css                résumé design system
  work/[slug]/
    page.tsx                         case studies + project metadata/JSON-LD
    case-study.module.css            case-study presentation
public/
  projects/                          project evidence imagery
  favicon.svg
  Abdulrahman-Hajar-Resume.pdf       recruiter-ready downloadable résumé
  resume.html                        printable résumé
scripts/
  verify-export.mjs                  export + identity regression checks
.github/workflows/
  ci.yml                             lint + typecheck + build + export + audit gate
```

## Local development

```bash
git clone https://github.com/rahman-997/portfolio.git
cd portfolio
npm install
npm run dev
```

## Quality gate

```bash
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
```

`verify:export` confirms the homepage, branded 404, résumé, all four case studies, robots file, sitemap, manifest, social-preview output, and downloadable PDF are present in the static export. It also rejects stale professional-identity markers such as the previous Netlify hostname or incorrect visible surname spelling.

GitHub Actions runs the complete quality gate on pushes and pull requests to `main` and uploads deployable source after successful pushes.

## Deployment

The project uses a static Next.js export. `netlify.toml` builds with `npm run build` and publishes `out/`.

Deployment configuration applies:

- immutable caching to fingerprinted framework assets
- tuned caching to project artwork and generated social previews
- short revalidation for the web app manifest
- HSTS, `nosniff`, strict referrer policy, frame restrictions, DNS prefetch policy, and browser-permission restrictions

## SEO & discoverability

- canonical production URL: `abdulrahman-hajar-dev.netlify.app`
- generated Open Graph and Twitter previews
- project-specific Open Graph/Twitter metadata on every case study
- homepage `Person`, `WebSite`, `ProfilePage`, and selected-work `ItemList` JSON-LD
- case-study `TechArticle`, `SoftwareSourceCode`, `SoftwareApplication`, and `BreadcrumbList` JSON-LD
- sitemap freshness signals and explicit route priorities
- robots metadata with canonical host and sitemap
- indexable project case studies and résumé routes
- identity regression checks in export verification

## Accessibility

- semantic landmarks and heading hierarchy
- skip-to-content navigation
- visible keyboard focus states
- keyboard command palette
- strong contrast
- reduced-motion support
- responsive layouts across common viewport sizes
- descriptive external navigation

## Author

Designed and developed by **[Abdulrahman Hajar](https://github.com/rahman-997)** — Software Engineer and Full-Stack Developer in Istanbul, Türkiye.

## License

Released under the [MIT License](LICENSE).
