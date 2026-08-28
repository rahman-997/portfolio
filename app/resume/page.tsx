import type { Metadata } from "next";
import Link from "next/link";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Résumé — Abdulrahman Hajar | Software Engineer",
  description:
    "Recruiter-ready résumé for Abdulrahman Hajar: Software Engineer, Full-Stack Developer, and Computer Engineering student in Istanbul.",
  alternates: { canonical: "/resume/" },
};

const skills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express 5", "REST APIs", "Zod",
  "PostgreSQL", "Prisma", "MongoDB", "Mongoose", "Redis", "BullMQ",
  "Jest", "Supertest", "GitHub Actions", "CI/CD", "Security", "Observability", "Accessibility", "PWA",
] as const;

const projects = [
  {
    name: "Eventify",
    role: "Distributed event platform",
    description:
      "Express/TypeScript event system with PostgreSQL/Prisma, Redis, BullMQ, durable outbox workflows, authentication, bookings/waitlists, metrics, health/readiness checks, and security-focused CI.",
    href: "/work/eventify/",
  },
  {
    name: "BookHaven",
    role: "Full-stack commerce",
    description:
      "Next.js + Express + MongoDB bookstore with JWT/RBAC, catalog, cart, wishlist, reviews, checkout, orders, inventory, admin operations, validation, and API tests.",
    href: "/work/bookhaven/",
  },
  {
    name: "FitFlow",
    role: "Installable fitness PWA",
    description:
      "Responsive training product with personalized plans, guided intervals, weekly progress, device-local persistence, accessibility, installability, and offline-ready behavior.",
    href: "/work/fitflow/",
  },
  {
    name: "Venues API",
    role: "Backend REST service",
    description:
      "Express 5 + TypeScript + Zod API with routes → controllers → services, strict input validation, centralized errors, UUID resources, persistence, and HTTP contract tests.",
    href: "/work/venues-api/",
  },
] as const;

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio">
          <span>AH</span><strong>Abdulrahman Hajar</strong>
        </Link>
        <div className={styles.headerActions}>
          <Link href="/#work">Selected work</Link>
          <a href="/resume.html" target="_blank" rel="noreferrer">Print view ↗</a>
          <a href="/Abdulrahman-Hajar-Resume.pdf" download>Download PDF ↓</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>SOFTWARE ENGINEER · FULL-STACK DEVELOPER · AI & INTERACTIVE SYSTEMS</p>
          <h1>Abdulrahman Hajar</h1>
          <p className={styles.lede}>
            Software engineer and Computer Engineering student building complete products across frontend, backend, APIs, data, asynchronous workflows, testing, security, and deployment.
          </p>
        </div>
        <aside className={styles.snapshot} aria-label="Professional snapshot">
          <div><span>Role</span><strong>Software Engineer · Full-Stack Developer</strong></div>
          <div><span>Education</span><strong>Computer Engineering · Nişantaşı University</strong></div>
          <div><span>Location</span><strong>Istanbul, Türkiye</strong></div>
          <div><span>GitHub</span><a href="https://github.com/rahman-997" target="_blank" rel="noreferrer">github.com/rahman-997 ↗</a></div>
          <div><span>LinkedIn</span><a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">LinkedIn profile ↗</a></div>
        </aside>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>01</span><h2>Profile</h2></div>
          <p className={styles.profile}>
            Product-minded engineer with hands-on work across TypeScript interfaces, backend APIs, relational and document data, caching, queues, authentication, validation, automated tests, runtime health, security checks, CI/CD, and production deployment.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>02</span><h2>Education</h2></div>
          <div className={styles.education}>
            <div><h3>Computer Engineering</h3><p>Nişantaşı University · Istanbul, Türkiye</p></div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>03</span><h2>Technical capabilities</h2></div>
          <div className={styles.skills}>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>04</span><h2>Selected engineering work</h2></div>
          <div className={styles.projects}>
            {projects.map((project) => (
              <article className={styles.project} key={project.name}>
                <div><h3>{project.name}</h3><small>{project.role}</small></div>
                <p>{project.description}</p>
                <Link href={project.href}>Case study →</Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>Abdulrahman Hajar · Software Engineer · Istanbul, Türkiye</p>
        <Link href="/">Back to portfolio ↑</Link>
      </footer>
    </main>
  );
}
