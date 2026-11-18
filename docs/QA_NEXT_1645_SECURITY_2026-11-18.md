# 2026-11-18 — Next.js dependency security update (portfolio)

## Scope
Branch: `fix/portfolio-next-security-1645-20261118`
Base: `fix/search-hydration-gate-20261118`
Security patch: Next.js `16.4.3` -> `16.4.5`, matched `eslint-config-next` and related React/Tailwind/types versions from an existing trusted Dependabot lock tree.

## Provenance / safety
Preserved existing targeted minimatch override (11.0.1) that Dependabot omitted. This restores the extra nested dependency guard but does not address every picomatch occurrence.
- Updated `package.json` and `package-lock.json` as a consistent pair.
- Added `tests/dependency-lock-integrity.test.mjs` with Node built-in tests to prevent manifest/lock drift or accidental downgrade.
- GitHub round-trip static inspection confirmed root package identity, direct dependencies, Next version, and SHA-512 integrity strings.

## Verified and remaining
- **Verified:** 445 package-lock package entries; no declared direct-dependency version mismatches; Next 16.4.5 is present.
- **Not yet executed:** full project `npm ci`, committed `node --test tests/dependency-lock-integrity.test.mjs`, lint, TypeScript, build, Playwright, npm audit on this new branch. No CI was triggered.
- **Known unresolved:** `picomatch` v2.3.2 and v4.0.7 still appear in the lockfile. GHSA-fc5q-39xc-vjpf remains subject to upstream mitigation; a passing metadata test is **not** a clean vulnerability audit.
- **Policy:** do not ignore npm audit failures, claim a secure production release, merge or deploy until full QA and security review. No paid actions or billable APIs used.

## Free local verification
```bash
npm ci --no-fund --no-audit
node --test tests/dependency-lock-integrity.test.mjs
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=high
```
