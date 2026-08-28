import type { Metadata } from "next";
import Link from "next/link";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Résumé — Software Engineer",
  description:
    "Résumé of Abdulrahman Hajar, a Software Engineer and Computer Engineering student focused on full-stack products, backend APIs, data systems, reliability, deployment, and AI integrations.",
  alternates: { canonical: "/resume/" },
};

const skills = [
  "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express 5",
  "REST APIs", "Zod", "PostgreSQL", "Prisma", "MongoDB", "Redis", "BullMQ",
  "Testing", "Security", "GitHub Actions", "CI/CD", "Accessibility", "PWA",
  "Health/Readiness", "AI Integrations",
];

const projects = [
  {
    name: "Eventify",
    role: "Distributed event platform",
    description:
      "PostgreSQL/Prisma, Redis, BullMQ background work, authentication, bookings, waitlists, health/readiness, metrics, CI, security checks, and deployment-oriented reliability.",
    href: "/work/eventify/",
  },
  {
    name: "BookHaven",
    role: "Full-stack commerce",
    description:
      "Next.js + Express + MongoDB bookstore with authentication, RBAC, catalog, cart, wishlist, reviews, checkout, orders, inventory, administration, validation, and tests.",
    href: "/work/bookhaven/",
  },
  {
    name: "FitFlow",
    role: "Fitness PWA",
    description:
      "Installable fitness experience with personalized planning, guided intervals, progress, local-first behavior, accessibility, responsive UX, and offline readiness.",
    href: "/work/fitflow/",
  },
  {
    name: "Venues API",
    role: "Backend service",
    description:
      "Express 5 + TypeScript + Zod REST API with layered routes/controllers/services, strict validation, centralized errors, UUID resources, persistence, and tests.",
    href: "/work/venues-api/",
  },
] as const;

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Back to Abdulrahman Hajar portfolio">
          <span>AH</span>
          <strong>Abdulrahman Hajar</strong>
        </Link>
        <div className={styles.headerActions}>
          <Link href="/#work">Selected work</Link>
          <a href="/Abdulrahman-Hajar-Resume.pdf" download>Download PDF ↓</a>
          <a href="/resume.html" target="_blank" rel="noreferrer">Print view ↗</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Software Engineer · Full-Stack Developer · AI & Interactive Systems</p>
          <h1>Abdulrahman Hajar</h1>
          <p className={styles.lede}>
            Computer Engineering student building production-minded software across product interfaces, backend systems, APIs, data, asynchronous workflows, testing, security, and deployment.
          </p>
        </div>
        <aside className={styles.snapshot} aria-label="Professional snapshot">
          <div><span>Role</span><strong>Software Engineer · Full-Stack Developer</strong></div>
          <div><span>Education</span><strong>Computer Engineering · Nişantaşı University</strong></div>
          <div><span>Location</span><strong>Istanbul, Türkiye</strong></div>
          <div><span>Focus</span><strong>Full-Stack · Backend · AI & Interactive Systems</strong></div>
          <div><span>GitHub</span><a href="https://github.com/rahman-997" target="_blank" rel="noreferrer">rahman-997 ↗</a></div>
          <div><span>LinkedIn</span><a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">Profile ↗</a></div>
        </aside>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>01</span><h2>Profile</h2></div>
          <p className={styles.profile}>
            Product-minded engineer with hands-on work across React/Next.js interfaces, Express APIs, relational and document databases, caching, queues, authentication, validation, testing, security checks, CI/CD, health/readiness, and deployment. I value clear boundaries, predictable failure handling, and evidence-based delivery.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>02</span><h2>Education</h2></div>
          <div className={styles.projects}>
            <article className={styles.project}>
              <div><h3>Computer Engineering</h3><small>Nişantaşı University · Istanbul, Türkiye</small></div>
              <p>Undergraduate study alongside practical software engineering work across web products, backend services, data systems, AI integrations, and interactive applications.</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>03</span><h2>Technical capabilities</h2></div>
          <div className={styles.skills}>
            {skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionLabel}><span>04</span><h2>Project evidence</h2></div>
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
