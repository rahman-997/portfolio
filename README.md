# Abdulrahman Hajar — Software Engineering Portfolio

[![Portfolio CI](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rahman-997/portfolio/actions/workflows/ci.yml)

A recruiter-facing engineering portfolio for **Abdulrahman Hajar** — Software Engineer, Full-Stack Developer, and Computer Engineering student at Nişantaşı University in Istanbul.

The site is intentionally structured around **engineering evidence instead of a generic skills gallery**: complete products, backend architecture, data flows, async work, validation, testing, security, observability, deployment, and selected AI/interactive systems.

**Live:** [abdulrahman-hajjar-dev.netlify.app](https://abdulrahman-hajjar-dev.netlify.app) · **GitHub:** [rahman-997](https://github.com/rahman-997) · **LinkedIn:** [Abdulrahman Hajar](https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/)

---

## Portfolio direction

```text
Build the interface.
Engineer the system.
Ship the whole product.
```

The portfolio positions Abdulrahman around four connected engineering areas:

1. **Product engineering** — React, Next.js, TypeScript, accessibility, responsive systems, and PWA behavior.
2. **Backend & APIs** — Node.js, Express, REST, GraphQL, WebSockets, gRPC, validation, authentication, and service architecture.
3. **Data & reliability** — PostgreSQL, Prisma, MongoDB, Redis, queues, caching, health/readiness, metrics, and failure handling.
4. **AI & interactive systems** — FastAPI, LLM integrations, MCP workflows, Flutter, WebGL, Three.js, and real-time interfaces.

## Selected systems

| Project | Engineering focus | Evidence |
| --- | --- | --- |
| **Eventify** | Distributed product system | PostgreSQL/Prisma, Redis, BullMQ, durable outbox, auth, metrics, readiness, CI/security gates |
| **BookHaven** | Full-stack commerce | Next.js + Express + MongoDB, auth/RBAC, cart/wishlist, checkout, orders, inventory, admin workflows |
| **FitFlow** | Product-focused PWA | Personalized planning, intervals, local-first progress, accessibility, responsive UI, offline-ready behavior |
| **Venues API** | Backend service | Express 5, Zod 4, layered architecture, centralized errors, UUIDs, persistence, contract tests |

Each project has a dedicated case study and links to live proof and source code.

## Design system

The current portfolio uses a restrained engineering-oriented visual system:

- dark navy application shell
- electric blue signal color
- high-contrast white project surfaces
- monospaced operational details
- large editorial typography
- code/terminal-inspired engineering summary
- responsive project evidence panels
- generated Open Graph / Twitter artwork that stays synchronized with the visual identity
- reduced decorative noise compared with a conventional “developer portfolio”

The homepage deliberately avoids relying on a profile portrait so the identity is driven by work, architecture, and engineering proof.

## Recruiter-facing content

The portfolio includes:

- concise professional positioning
- selected projects with engineering evidence
- technical capability map
- engineering principles
- Computer Engineering education
- web résumé
- printable résumé
- dedicated project case studies
- GitHub and LinkedIn pathways

## Tech stack

```text
Next.js 16
React 19
TypeScript 5
Tailwind CSS 4
CSS Modules
Responsive custom CSS
GitHub Actions
Netlify
```

## Structure

```text
app/
  layout.tsx                 SEO and application shell
  page.tsx                   engineering portfolio homepage
  globals.css                primary visual system
  opengraph-image.tsx        generated social preview
  twitter-image.tsx          generated X/Twitter preview
  resume/
    page.tsx                 recruiter-facing web résumé
    resume.module.css        résumé design system
  work/[slug]/
    page.tsx                 project case-study renderer
    case-study.module.css    case-study presentation
public/
  favicon.svg
  resume.html                printable résumé
.github/workflows/
  ci.yml                     lint + production-build quality gate
```

## Local development

```bash
git clone https://github.com/rahman-997/portfolio.git
cd portfolio
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

GitHub Actions runs the quality gate on pushes and pull requests to `main`.

## Deployment

The repository includes `netlify.toml` and uses a static Next.js export. Netlify builds with `npm run build` and publishes `out/`.

## Accessibility

- semantic landmarks and heading hierarchy
- skip-to-content navigation
- keyboard-visible interactive states
- strong contrast
- reduced-motion support
- responsive layouts across desktop and mobile
- descriptive external navigation

## Author

Designed and developed by **[Abdulrahman Hajar](https://github.com/rahman-997)** — Software Engineer and Full-Stack Developer in Istanbul, Türkiye.

## License

Released under the [MIT License](LICENSE).
