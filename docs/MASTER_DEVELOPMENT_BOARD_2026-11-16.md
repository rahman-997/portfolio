# Engineering Portfolio — Master Development Board
**Snapshot:** 2026-11-16 · **Scope:** 18 repositories visible via the connected GitHub account `rahman-997`.

> This is a source-documentation inventory, **not** proof of current production readiness. README claims have not been independently validated by a fresh build or live E2E run. Do not publish, merge, deploy, create paid usage, or handle real patient/customer data without explicit authorization.

| Priority | Repository | Product / verified README framing | Next engineering gate |
|---|---|---|---|
| P0 | salespilot-ai | FastAPI/SQLite CRM; documented v0.6.0 money comparisons; README heading still v0.5.8 | Verify branch tests, type/static checks, database isolation, external AI opt-in |
| P0 | bookbookhaven | Next.js / Express / MongoDB bookstore | Checkout concurrency + persistence integration, API/UI build |
| P0 | portfolio | Engineering portfolio | Validate project case studies, links, accessibility, responsive and RTL |
| P1 | hajarcare-clinicos | ClinicOS technical pilot; **not approved for real patient data** | Real PostgreSQL tests, recovery, independent pentest, KVKK/legal review |
| P1 | aura-17 | Multilingual creator community; private staging only | End-to-end staging, security, native packaging |
| P1 | kivyro-movement-studio | Fitness PWA pre-commercial candidate; trademark unresolved | Full build, privacy/RLS staging checks, commercial/legal gate |
| P1 | sirahazir-core | Turkish booking/queue pilot with receipt rescheduling | Booking collisions, tenant isolation, real device E2E |
| P1 | sham | Arabic RTL mobile-first wellness and organization PWA | Regression, accessibility, health privacy, Android validation |
| P2 | digital-rug-max | Windows/Android file organizer and desktop floating rug, **not AR rug retail** | Windows + Android actual builds, backup safety |
| P2 | mizan-finance | Privacy-first bilingual offline finance planner | Restore integrity, PWA, accessibility, localization |
| P2 | sumsum | AI marketing-agents backend; **not the beauty shop itself** | Approval boundaries, queue idempotency, integrations |
| P2 | smart-qr-pager | Smart QR Pager repository; README says full v0.6 source not uploaded | Locate/recover complete source, review secrets and migration |
| P2 | eventify | React/Vite + Express/Prisma event platform | Postgres/Redis/BullMQ integration, CI security review |
| P2 | venues-api | Express/TypeScript/Zod venue API | Auth/validation tests, API contract, persistence |
| P2 | fitflow-gym | Fitness PWA, historical predecessor/related to KIVYRO | Determine canonical product; prevent duplicate maintenance |
| P2 | athrua-studio | Accessible repository; README.md returned 404 | Inspect actual file tree and source |
| P3 | rahman-997 | GitHub profile repository | Align accurate project descriptions and links |
| P3 | free-claude-code | Python CLI tool; existing README | Verify origin/license, dependencies and security before changes |

## Release acceptance gates (every repository)
- [ ] Confirm source, branch, latest commits, issue/PR status and available CI logs.
- [ ] Reproduce failing behavior before fixing; add regression tests.
- [ ] Run relevant unit/integration/E2E tests, lint, type checks, build and dependency/security checks.
- [ ] Validate localization (AR RTL / TR / EN as applicable), responsive and accessibility quality.
- [ ] Document remaining blockers and verified QA results; no unverified 'production-ready' claims.
- [ ] Work only on separate branches and review changes before opening Draft PRs that could trigger metered CI.
- [ ] Never merge into main or deploy production automatically; use zero paid services.

## Active work
- Inventory compiled from connected GitHub README files on 2026-11-16.
- First implementation target: `salespilot-ai` — defensive regression tests for external-AI opt-in.
- Draft PR deferred pending consent/free CI limits verification; no CI runs requested.

## Progress checkpoint — 2026-11-18
- **SalesPilot AI:** external AI opt-in guard and regression tests committed on `work/portfolio-project-audit-20261116`. Four focused tests passed only in a local isolated reconstruction; repository-wide tests and CI have not been run for that branch.
- **BookHaven:** checkout compensation and MongoDB connection-scoped transaction detection fixes committed on `fix/checkout-compensation-20261117`. Four new focused tests are committed but not yet executed with Jest/MongoDB. QA: `docs/QA_CHECKOUT_COMPENSATION_2026-11-17.md`.
- **Safety:** no production deployment, main-branch merge, new GitHub Actions run or paid service was triggered.
- **Next:** obtain dependency-complete disposable test environment; execute BookHaven Jest/typecheck/build and SalesPilot full pytest; only then consider a Draft PR after free CI quota checks.


## Engineering checkpoint — 2026-11-18 (follow-up)
- **BookHaven:** added missing-DB and cached-sharded-topology regression cases; branch contains **6 pending Jest integration cases**. Separately, 4 isolated VM behavior checks passed for the transaction capability module. No real MongoDB/Jest integration test executed. Branch: `fix/checkout-compensation-20261117`.
- **SalesPilot AI:** prevented whitespace-only external API credentials from enabling remote AI. **5 isolated pytest tests passed** and Python compile check passed; full repository verification still pending. Branch: `work/portfolio-project-audit-20261116`.
- No production actions, paid APIs, `main` merges or GitHub Actions triggered.
