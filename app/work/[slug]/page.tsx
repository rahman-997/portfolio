import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./case-study.module.css";

const siteUrl = "https://abdulrahman-hajar-dev.netlify.app";

const studies = {
  eventify: {
    name: "Eventify",
    eyebrow: "Distributed product system · Full-stack",
    summary:
      "A production-oriented event platform with authentication, organizer workflows, bookings, waitlists, PostgreSQL durability, Redis coordination, BullMQ background jobs, observability, and operational health checks.",
    problem:
      "Event booking stops being simple once capacity, cancellation, waitlists, retries, authentication, shared cache state, and background side effects all have to remain coherent. The project needed to demonstrate those failure modes rather than hiding them behind a CRUD interface.",
    solution:
      "Eventify separates authoritative relational state from disposable infrastructure: PostgreSQL owns durable product state, Redis supports caching/rate limits/queue coordination, and a PostgreSQL outbox preserves the intent to dispatch important asynchronous work before BullMQ workers process it.",
    stack: ["React", "TypeScript", "Express 5", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Zod"],
    live: "https://eventify-web.onrender.com",
    runtime: "https://backend2-api.onrender.com/health",
    source: "https://github.com/rahman-997/eventify",
    cover: "/projects/eventify-cover.jpg",
    architecture: [
      "React/Vite PWA → HTTPS JSON → Express API",
      "route → controller → service → repository/data source",
      "PostgreSQL as authoritative state; Redis for cache, rate limits, and queue coordination",
      "PostgreSQL outbox → BullMQ worker for durable background side effects",
    ],
    decisions: [
      ["Authority before acceleration", "PostgreSQL remains the source of truth while Redis is treated as shared ephemeral infrastructure that can fail without redefining product state."],
      ["Durable async intent", "Important confirmation and waitlist work is written to a PostgreSQL outbox before queue dispatch so a Redis or worker restart does not silently erase intent."],
      ["Diagnosable runtime", "Health, readiness, metrics, request IDs, structured logs, dependency probes, and graceful shutdown make production behavior observable."],
    ],
    reliability: ["Cache-aside reads with PostgreSQL fallback", "BullMQ retries and backoff", "Waitlist promotion through durable work", "Health vs readiness separation", "Dependency latency probes", "Security analysis in CI"],
    evidence: ["Integration tests", "Dependency-cruiser architecture rules", "Semgrep + CodeQL", "API + worker runtime probes", "PWA verification", "Production build verification"],
  },
  bookhaven: {
    name: "BookHaven",
    eyebrow: "Commerce system · Full-stack",
    summary:
      "A full-stack bookstore covering product discovery, authentication, role-based operations, wishlist, cart, reviews, checkout, orders, inventory, and administration.",
    problem:
      "A bookstore portfolio project becomes credible only when customer and operational workflows agree on the same business rules. Cart state, checkout, order transitions, inventory, reviews, and admin actions need to behave as one system rather than isolated screens.",
    solution:
      "BookHaven uses Next.js for the product interface and browser-facing session boundary, while Express owns validated APIs, authorization, business rules, and MongoDB persistence. Commerce transitions include locking, compensation, guarded status changes, and inventory restoration paths.",
    stack: ["Next.js", "React", "TypeScript", "Express 5", "MongoDB", "Mongoose", "Zod"],
    live: "https://bookbookhaven-free.onrender.com",
    runtime: null,
    source: "https://github.com/rahman-997/bookbookhaven",
    cover: "/projects/bookhaven-cover.jpg",
    architecture: [
      "Browser → Next.js App Router",
      "Next.js BFF route handlers → Express 5 API",
      "Zod validation + JWT authentication + customer/admin RBAC",
      "Services and Mongoose models → MongoDB persistence",
    ],
    decisions: [
      ["Clear frontend/backend boundary", "Next.js owns product UI and browser-facing session handling while Express owns business rules, authorization, validation, and persistence."],
      ["Safer commerce transitions", "Checkout locking, guarded order-state transitions, compensation paths, and inventory restoration reduce duplicate or inconsistent commerce behavior."],
      ["Reviewable free deployment", "The deployment supports MongoDB Atlas and an embedded demo database fallback so the complete flow remains inspectable on a zero-cost portfolio stack."],
    ],
    reliability: ["Checkout concurrency lock", "Compensation on failed checkout", "Atomic order-status transitions", "Historical title/price snapshots", "Inventory restoration on valid cancellation", "Health/readiness route"],
    evidence: ["Jest + Supertest API tests", "Typecheck + frontend/backend builds", "Helmet + CORS + rate limiting", "OpenAPI 3.1 contract", "Admin operational flows", "GitHub Actions CI"],
  },
  fitflow: {
    name: "FitFlow",
    eyebrow: "Product engineering · PWA",
    summary:
      "An installable fitness product with personalized recommendations, guided intervals, weekly progress, device-local persistence, accessibility, and an offline-ready core.",
    problem:
      "A static fitness landing page does not demonstrate product behavior. The challenge was to create an end-to-end training flow with real application state, timing behavior, persistence, responsive edge cases, accessibility requirements, and offline considerations without adding unnecessary account infrastructure.",
    solution:
      "FitFlow keeps weekly progress on the device, uses an installable PWA shell for resilient access, and focuses the interaction model on discovery → recommendation → guided session → weekly progress → return with state preserved.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Web APIs", "Modern CSS"],
    live: "https://fitflow-gym-online.netlify.app",
    runtime: null,
    source: "https://github.com/rahman-997/fitflow-gym",
    cover: null,
    architecture: [
      "Next.js/React product interface",
      "Browser localStorage for device-local training progress",
      "Web App Manifest + service worker for installable/offline-ready behavior",
      "Responsive CSS system with keyboard, semantic, and reduced-motion support",
    ],
    decisions: [
      ["Local-first progress", "Device-local persistence keeps the core experience fast and private while avoiding authentication complexity that does not improve this product scope."],
      ["PWA as product behavior", "Manifest and service-worker behavior make installability and limited-connectivity use part of the experience instead of a checklist-only feature."],
      ["Accessibility in interaction design", "Keyboard-visible focus, semantic landmarks, accessible state, skip navigation, live progress feedback, and reduced-motion support are treated as system requirements."],
    ],
    reliability: ["Device-local state persistence", "Offline-ready core shell", "Reduced-motion preference support", "Responsive navigation", "Visible keyboard focus", "Production build validation"],
    evidence: ["Personalized plan builder", "Guided interval timer", "Weekly workout tracker", "PWA manifest + service worker", "ESLint + project checks", "GitHub Actions CI"],
  },
  "venues-api": {
    name: "Venues API",
    eyebrow: "Backend service · REST API",
    summary:
      "A focused Express 5 service demonstrating strict validation, layered responsibilities, predictable errors, UUID-based resources, persistence boundaries, and HTTP contract tests.",
    problem:
      "Small APIs often become difficult to extend because routing, validation, business rules, persistence, and error handling collapse into the same layer. The goal was to keep a compact CRUD service deliberately understandable while still applying production-minded boundaries.",
    solution:
      "The service uses versioned routes, Zod middleware for all external input, controllers for HTTP translation, services for business rules and persistence behavior, centralized errors, server-generated UUIDs, and an isolated JSON persistence path for tests.",
    stack: ["Node.js", "Express 5", "TypeScript", "Zod 4", "REST"],
    live: "https://venues-api-rahman.onrender.com",
    runtime: "https://venues-api-rahman.onrender.com/health",
    source: "https://github.com/rahman-997/venues-api",
    cover: null,
    architecture: [
      "HTTP request → route + validation",
      "Controller → HTTP translation only",
      "Service → business rules + persistence boundary",
      "Configurable JSON store with isolated test persistence",
    ],
    decisions: [
      ["Layered responsibilities", "Routes wire endpoints and schemas, controllers translate HTTP, and services own business rules and persistence behavior."],
      ["Validate before business logic", "Zod validates bodies, parameters, and query strings before invalid input can enter the service layer."],
      ["One error boundary", "Central error middleware owns expected and unexpected HTTP error formatting so controllers do not duplicate failure handling."],
    ],
    reliability: ["Case-insensitive uniqueness rule", "Server-generated UUIDs and timestamps", "Configurable persistence file", "Isolated test data", "Predictable HTTP error shape", "Health endpoint"],
    evidence: ["Service-level tests", "Real HTTP contract tests", "Strict TypeScript", "Typecheck/test/build workflow", "Versioned API surface", "CI-backed verification"],
  },
} as const;

type StudySlug = keyof typeof studies;
type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = studies[slug as StudySlug];
  if (!study) return {};

  const title = `${study.name} Case Study — Abdulrahman Hajar`;
  const canonical = `/work/${slug}/`;
  const image = study.cover ?? "/opengraph-image";

  return {
    title,
    description: study.summary,
    alternates: { canonical },
    openGraph: {
      title,
      description: study.summary,
      type: "article",
      url: canonical,
      siteName: "Abdulrahman Hajar — Software Engineering Portfolio",
      images: [{ url: image, alt: `${study.name} software engineering case study` }],
    },
    twitter: { card: "summary_large_image", title, description: study.summary, images: [image] },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = studies[slug as StudySlug];
  if (!study) notFound();

  const canonicalUrl = `${siteUrl}/work/${slug}/`;
  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${canonicalUrl}#case-study`,
    headline: `${study.name} software engineering case study`,
    description: study.summary,
    url: canonicalUrl,
    author: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: {
      "@type": "SoftwareSourceCode",
      name: study.name,
      description: study.summary,
      codeRepository: study.source,
      runtimePlatform: "Web",
      programmingLanguage: study.stack,
      targetProduct: { "@type": "SoftwareApplication", name: study.name, applicationCategory: "WebApplication", operatingSystem: "Web", url: study.live },
    },
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Portfolio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Selected Work", item: `${siteUrl}/#work` },
      { "@type": "ListItem", position: 3, name: study.name, item: canonicalUrl },
    ],
  };

  return (
    <main className={styles.page}>
      {[caseStudyJsonLd, breadcrumbJsonLd].map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio"><span>AH</span><strong>Abdulrahman Hajar</strong></Link>
        <Link className={styles.back} href="/#work">← Selected work</Link>
      </header>

      <article className={styles.article}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{study.eyebrow}</p>
          <h1>{study.name}</h1>
          <p className={styles.summary}>{study.summary}</p>
          <div className={styles.actions}>
            <a href={study.live} target="_blank" rel="noreferrer">Open live system ↗</a>
            {study.runtime ? <a href={study.runtime} target="_blank" rel="noreferrer">Runtime health ↗</a> : null}
            <a href={study.source} target="_blank" rel="noreferrer">Inspect source ↗</a>
          </div>
          <div className={styles.stack}>{study.stack.map((item) => <span key={item}>{item}</span>)}</div>
          {study.cover ? <figure className={styles.cover}><Image src={study.cover} alt={`${study.name} product interface preview`} width={1200} height={630} priority /></figure> : null}
        </section>

        <section className={styles.splitSection}>
          <div><span>01</span><h2>Problem</h2></div>
          <p>{study.problem}</p>
        </section>

        <section className={styles.splitSection}>
          <div><span>02</span><h2>Solution</h2></div>
          <p>{study.solution}</p>
        </section>

        <section className={styles.architectureSection}>
          <div className={styles.sectionTitle}><span>03</span><h2>Architecture</h2></div>
          <div className={styles.architectureFlow}>{study.architecture.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><span>04</span><h2>Engineering decisions</h2></div>
          <div className={styles.decisionGrid}>{study.decisions.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section className={styles.dualSection}>
          <div>
            <div className={styles.sectionTitle}><span>05</span><h2>Reliability</h2></div>
            <div className={styles.signalList}>{study.reliability.map((item) => <div key={item}><i>✓</i><span>{item}</span></div>)}</div>
          </div>
          <div>
            <div className={styles.sectionTitle}><span>06</span><h2>Evidence</h2></div>
            <div className={styles.signalList}>{study.evidence.map((item) => <div key={item}><i>↗</i><span>{item}</span></div>)}</div>
          </div>
        </section>

        <section className={styles.next}>
          <div><span>VERIFY IT</span><h2>The implementation is public.</h2><p>Review the live behavior, source code, tests, architecture, and deployment details directly.</p></div>
          <div className={styles.nextLinks}><a href={study.live} target="_blank" rel="noreferrer">Live system ↗</a><a href={study.source} target="_blank" rel="noreferrer">GitHub source ↗</a><Link href="/#work">More case studies →</Link></div>
        </section>
      </article>
    </main>
  );
}
