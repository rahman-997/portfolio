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

Every featured project links to **live proof, source code, and an engineering case study**.

## Current visual direction

The current redesign uses a **premium editorial engineering identity** rather than a conventional dark developer template:

- warm white / porcelain canvas with deep ink and slate typography
- restrained blue/green signal accents instead of neon-heavy decoration
- oversized editorial headlines with strong scan hierarchy
- real project imagery and product evidence where available
- a compact engineering-system panel for interface → API → data → delivery
- generous whitespace and structured full-width project storytelling
- restrained monospaced operational details
- responsive layouts tuned for desktop, tablet, and mobile
- generated Open Graph / Twitter artwork synchronized with the identity
- no dependency on a profile portrait to make the portfolio feel complete

The design intentionally keeps visual noise low so recruiters can reach **role, capabilities, projects, proof, résumé, and contact paths quickly**.

## Experience & interaction

The portfolio includes a lightweight keyboard command palette:

- press `/` outside an input
- press `⌘K` / `Ctrl+K`
- search work, capabilities, résumé, GitHub, or LinkedIn
- press `Enter` to open the first matching destination

A branded 404 experience keeps stale links inside the portfolio instead of dropping visitors into a generic framework page.

## Recruiter-facing content

- concise Software Engineer / Full-Stack positioning
- selected projects with architecture and reliability evidence
- technical capability map
- Computer Engineering education
- web résumé and printable résumé
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
  layout.tsx                         SEO, JSON-LD, application shell
  page.tsx                           editorial engineering homepage
  home.module.css                    homepage visual system
  globals.css                        global tokens and shared rules
  not-found.tsx                      branded 404 experience
  not-found.module.css               404 presentation
  components/
    CommandPalette.tsx               keyboard quick navigation
    command-palette.module.css       command palette styles
  opengraph-image.tsx                generated social preview
  twitter-image.tsx                  generated X/Twitter preview
  robots.ts                          crawler policy
  sitemap.ts                         indexable route map
  resume/
    page.tsx                         recruiter-facing web résumé
    resume.module.css                résumé design system
  work/[slug]/
    page.tsx                         project case-study renderer
    case-study.module.css            case-study presentation
public/
  projects/                          project evidence imagery
  favicon.svg
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

`verify:export` confirms required recruiter-facing routes exist in the static export and rejects stale professional-identity markers such as the previous Netlify hostname or incorrect visible surname spelling.

GitHub Actions runs the complete quality gate on pushes and pull requests to `main` and uploads deployable source after successful pushes.

## Deployment

The project uses a static Next.js export. `netlify.toml` builds with `npm run build` and publishes `out/`.

Deployment configuration also applies immutable caching to framework static assets and security-focused response headers including HSTS, `nosniff`, referrer restrictions, frame restrictions, and browser permission restrictions.

## SEO & discoverability

- canonical production URL: `abdulrahman-hajar-dev.netlify.app`
- generated Open Graph and Twitter previews
- `Person` and `WebSite` JSON-LD
- dynamic sitemap and robots metadata
- descriptive page metadata
- indexable project case studies and résumé routes
- identity regression checks in the export verification step

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
