import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./case-study.module.css";

const siteUrl = "https://abdulrahman-hajar-dev.netlify.app";

const studies = {
  fitflow: {
    name: "FitFlow",
    eyebrow: "Product engineering · PWA",
    summary:
      "An installable fitness product that turns program discovery into a usable weekly routine with personalized recommendations, guided intervals, local-first progress, accessibility, and offline-ready behavior.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Modern CSS"],
    live: "https://fitflow-gym-online.netlify.app",
    runtime: null,
    cover: "/projects/fitflow-cover.svg",
    source: "https://github.com/rahman-997/fitflow-gym",
    goal:
      "Make the core fitness journey useful without account friction: choose a plan, run a focused session, preserve progress, and return with context intact.",
    decisions: [
      ["Device-local progress", "Weekly progress uses localStorage so the core experience stays fast and private without introducing authentication and backend state that do not improve the product goal."],
      ["Offline-ready core", "A manifest and conservative service worker make the product installable and keep the core experience useful when connectivity is limited."],
      ["Accessible interaction", "Keyboard focus, semantic landmarks, reduced-motion support, explicit control state, and live progress feedback are treated as engineering requirements."],
    ],
    quality: ["Responsive layouts", "ESLint + production build", "Installable PWA", "Reduced-motion support", "Accessible controls", "CI on every push"],
  },
  eventify: {
    name: "Eventify",
    eyebrow: "Distributed product system · Full-stack",
    summary:
      "A production-oriented event platform with authentication, organizer workflows, bookings, waitlists, background jobs, caching, observability, operational health, and an installable React PWA.",
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "Prisma", "Redis", "BullMQ"],
    live: "https://eventify-web.onrender.com",
    runtime: "https://backend2-api.onrender.com/health",
    cover: "/projects/eventify-cover.jpg",
    source: "https://github.com/rahman-997/eventify",
    goal:
      "Keep event discovery simple while making capacity, booking state, waitlist promotion, and asynchronous side effects reliable under real operational constraints.",
    decisions: [
      ["PostgreSQL as authority", "Bookings and event state remain durable in PostgreSQL; Redis is reserved for ephemeral concerns such as caching, throttling, worker heartbeat, and queue coordination."],
      ["Durable async workflow", "A PostgreSQL outbox preserves the intent to dispatch confirmation and waitlist work even when Redis or workers restart."],
      ["Operational visibility", "Health, readiness, metrics, request IDs, structured logs, dependency probes, and graceful shutdown make the runtime diagnosable instead of opaque."],
    ],
    quality: ["Strict TypeScript", "Integration tests", "Architecture rules", "Security scanning", "CodeQL / Semgrep", "CI + runtime probes"],
  },
  bookhaven: {
    name: "BookHaven",
    eyebrow: "Commerce system · Full-stack",
    summary:
      "A full-stack bookstore covering product discovery, authentication, role-based operations, wishlist, cart, checkout, reviews, orders, inventory, and administration.",
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Mongoose", "Zod"],
    live: "https://bookbookhaven-free.onrender.com",
    runtime: null,
    cover: "/projects/bookhaven-cover.jpg",
    source: "https://github.com/rahman-997/bookbookhaven",
    goal:
      "Build a complete commerce flow that works as both a customer product and an operational system while remaining reviewable on a zero-cost portfolio stack.",
    decisions: [
      ["Clear frontend/backend boundary", "Next.js owns product UI and BFF route handlers while Express owns validated APIs, authentication, authorization, business rules, and persistence."],
      ["Safer order transitions", "Checkout locking, guarded order-state transitions, compensation paths, and inventory restoration reduce duplicate or inconsistent commerce behavior."],
      ["Demo-friendly hosting", "The project supports durable MongoDB Atlas storage and an embedded demo database fallback so the full system can still be reviewed on free hosting."],
    ],
    quality: ["JWT + RBAC", "Zod validation", "Jest / Supertest", "Security headers", "Typecheck + build CI", "Admin operational flows"],
  },
  "venues-api": {
    name: "Venues API",
    eyebrow: "Backend service · REST API",
    summary:
      "A focused Express 5 service demonstrating strict validation, layered responsibilities, predictable errors, UUID-based resources, persistence boundaries, and contract-level tests.",
    stack: ["Node.js", "Express 5", "TypeScript", "Zod 4"],
    live: "https://venues-api-rahman.onrender.com",
    runtime: "https://venues-api-rahman.onrender.com/health",
    cover: null,
    source: "https://github.com/rahman-997/venues-api",
    goal:
      "Keep a small CRUD service deliberately understandable while still applying the boundaries and verification expected in a production-minded API.",
    decisions: [
      ["Layered responsibilities", "Routes connect validation and controllers; controllers translate HTTP; services own business rules and persistence behavior."],
      ["Centralized validation and errors", "Zod validates body, params, and query input before business logic runs, while one error layer keeps response shapes predictable."],
      ["Portable persistence", "JSON-file persistence keeps setup lightweight while tests use isolated temporary data and exercise real HTTP contracts."],
    ],
    quality: ["Strict TypeScript", "Service tests", "HTTP contract tests", "Health endpoint", "Automated CI", "Case-insensitive uniqueness rules"],
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
  const image = study.cover?.endsWith(".svg") ? "/opengraph-image" : study.cover ?? "/opengraph-image";

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
    twitter: {
      card: "summary_large_image",
      title,
      description: study.summary,
      images: [image],
    },
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
      targetProduct: {
        "@type": "SoftwareApplication",
        name: study.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url: study.live,
      },
    },
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Portfolio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Selected Work",
        item: `${siteUrl}/#work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className={styles.page}>
      {[caseStudyJsonLd, breadcrumbJsonLd].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio">
          <span>AH</span>
          <strong>Abdulrahman Hajar</strong>
        </Link>
        <Link className={styles.back} href="/#work">← Selected systems</Link>
      </header>

      <article>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{study.eyebrow}</p>
          <h1>{study.name}</h1>
          <p className={styles.summary}>{study.summary}</p>
          <div className={styles.actions}>
            <a href={study.live} target="_blank" rel="noreferrer">Open live system ↗</a>
            {study.runtime ? <a href={study.runtime} target="_blank" rel="noreferrer">Runtime health ↗</a> : null}
            <a href={study.source} target="_blank" rel="noreferrer">Inspect source ↗</a>
          </div>
          <div className={styles.stack} aria-label="Technology stack">
            {study.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
          {study.cover ? (
            <figure className={styles.cover}>
              <Image src={study.cover} alt={`${study.name} product presentation across desktop and mobile screens`} width={900} height={472} priority />
            </figure>
          ) : null}
        </section>

        <section className={styles.goal}>
          <div><span>01</span><p>System goal</p></div>
          <h2>{study.goal}</h2>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><span>02</span><h2>Engineering decisions</h2></div>
          <div className={styles.decisionGrid}>
            {study.decisions.map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}><span>03</span><h2>Quality signals</h2></div>
          <div className={styles.qualityGrid}>
            {study.quality.map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>
            ))}
          </div>
        </section>

        <section className={styles.next}>
          <p>The repository contains the implementation, architecture, verification, and release details behind this system.</p>
          <div>
            <a href={study.source} target="_blank" rel="noreferrer">GitHub repository ↗</a>
            <Link href="/#work">More systems →</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
