import type { Metadata } from "next";
import Link from "next/link";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume — Abdulrahman Hajjar",
  description:
    "Abdulrahman Hajjar — Frontend Engineer focused on React, Next.js, TypeScript, accessible product experiences, and production-ready delivery.",
  alternates: { canonical: "/resume/" },
};

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Modern CSS",
  "Accessibility",
  "PWA",
  "Node.js",
  "Express",
  "Zod",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Redis",
  "BullMQ",
  "REST APIs",
  "Authentication & RBAC",
  "Testing",
  "CI/CD",
  "Docker",
  "Performance",
  "Security",
  "Observability",
];

const projects = [
  {
    name: "FitFlow",
    description:
      "Next.js fitness PWA with personalized plans, guided workout intervals, weekly progress, responsive accessibility, and offline-ready behavior.",
    href: "/work/fitflow/",
  },
  {
    name: "Eventify",
    description:
      "Production-oriented event platform with PostgreSQL/Prisma, Redis caching and rate limits, BullMQ background jobs, durable outbox workflows, metrics, health/readiness checks, and PWA support.",
    href: "/work/eventify/",
  },
  {
    name: "BookHaven",
    description:
      "Full-stack bookstore with Next.js, Express, MongoDB, JWT auth/RBAC, cart and wishlist, reviews, concurrency-safe checkout, inventory handling, orders, admin workflows, and API tests.",
    href: "/work/bookhaven/",
  },
  {
    name: "Venues API",
    description:
      "Express 5 + Zod 4 REST API with strict validation, layered architecture, centralized predictable errors, persistence, UUIDs, and service plus HTTP contract tests.",
    href: "/work/venues-api/",
  },
] as const;

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajjar portfolio">
          <span>AH</span>
          <strong>Abdulrahman Hajjar</strong>
        </Link>
        <div className={styles.headerActions}>
          <Link href="/#work">View work</Link>
          <a href="/resume.html" target="_blank" rel="noreferrer">Printable résumé ↗</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Resume · Frontend Engineering</p>
          <h1>Abdulrahman Hajjar</h1>
          <p className={styles.lede}>
            Frontend engineer focused on React, Next.js, and TypeScript, building polished, accessible,
            production-ready product experiences with the full-stack depth to own reliable delivery end to end.
          </p>
        </div>
        <aside className={styles.snapshot} aria-label="Professional snapshot">
          <div><span>Role</span><strong>Frontend Engineer</strong></div>
          <div><span>Based in</span><strong>Istanbul, Türkiye</strong></div>
          <div><span>GitHub</span><a href="https://github.com/rahman-997" target="_blank" rel="noreferrer">rahman-997 ↗</a></div>
          <div><span>LinkedIn</span><a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">Connect ↗</a></div>
        </aside>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>01</span><h2>Profile</h2></div>
          <p className={styles.profile}>
            I build interfaces that are clear to use and systems that are dependable to ship. My work combines
            accessible product UI, strong TypeScript boundaries, production-minded backend integration, secure APIs,
            automated testing, observability, and CI/CD.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>02</span><h2>Core skills</h2></div>
          <div className={styles.skills}>
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>03</span><h2>Selected work</h2></div>
          <div className={styles.projects}>
            {projects.map((project) => (
              <article className={styles.project} key={project.name}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <Link href={project.href}>Case study →</Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>Portfolio résumé · Abdulrahman Hajjar · 2026</p>
        <Link href="/">Back to portfolio ↑</Link>
      </footer>
    </main>
  );
}
