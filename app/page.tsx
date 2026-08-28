import Link from "next/link";
import styles from "./home.module.css";

const Arrow = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 18 18 6M8 6h10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Github = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.57.1.78-.25.78-.55v-2.24c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.3-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.5 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

const LinkedIn = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.4 7.3H1.8V22h3.6V7.3ZM3.6 2C2.4 2 1.4 3 1.4 4.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2S4.8 2 3.6 2ZM22.6 13.6c0-4.4-2.3-6.5-5.4-6.5-2.5 0-3.6 1.4-4.2 2.3V7.3H9.4V22H13v-7.3c0-1.9.4-3.8 2.8-3.8 2.3 0 2.4 2.2 2.4 4V22h3.6v-8.4h.8Z" />
  </svg>
);

const projects = [
  {
    index: "01",
    name: "Eventify",
    eyebrow: "Distributed event platform",
    headline: "Booking flows engineered for real-world failure modes.",
    description: "Authentication, organizer tooling, bookings, waitlists, background jobs, caching, metrics, and production-minded system behavior across one connected platform.",
    stack: ["TypeScript", "Express 5", "PostgreSQL", "Prisma", "Redis", "BullMQ"],
    caseStudy: "/work/eventify/",
    live: "https://eventify-web.onrender.com",
    source: "https://github.com/rahman-997/eventify",
    image: "/projects/eventify-cover.jpg",
    className: "eventify",
  },
  {
    index: "02",
    name: "BookHaven",
    eyebrow: "Full-stack commerce",
    headline: "A bookstore built as a complete product, not a demo screen.",
    description: "Catalog discovery, authentication, roles, cart, wishlist, reviews, checkout, orders, inventory, and administration in a cohesive full-stack experience.",
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Zod"],
    caseStudy: "/work/bookhaven/",
    live: "https://bookbookhaven-free.onrender.com",
    source: "https://github.com/rahman-997/bookbookhaven",
    image: "/projects/bookhaven-cover.jpg",
    className: "bookhaven",
  },
  {
    index: "03",
    name: "FitFlow",
    eyebrow: "Installable fitness PWA",
    headline: "Product-focused fitness software with offline-ready flows.",
    description: "Personalized planning, guided intervals, weekly progress, accessibility, local-first behavior, and a responsive installable experience.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Web APIs"],
    caseStudy: "/work/fitflow/",
    live: "https://fitflow-gym-online.netlify.app",
    source: "https://github.com/rahman-997/fitflow-gym",
    image: "/projects/fitflow-cover.svg",
    className: "fitflow",
  },
  {
    index: "04",
    name: "Venues API",
    eyebrow: "Backend engineering",
    headline: "A compact REST API with disciplined architecture.",
    description: "Versioned routes, strict Zod validation, clean controller/service boundaries, centralized errors, UUID resources, and contract-level testing.",
    stack: ["Node.js", "Express 5", "TypeScript", "Zod 4", "REST"],
    caseStudy: "/work/venues-api/",
    live: "https://venues-api-rahman.onrender.com/health",
    source: "https://github.com/rahman-997/venues-api",
    image: null,
    className: "venues",
  },
] as const;

const skills = [
  { title: "Frontend systems", text: "React, Next.js, TypeScript, responsive UI, accessibility, state, PWA behavior and performance." },
  { title: "Backend & APIs", text: "Node.js, Express, REST, GraphQL, validation, auth, caching, background jobs and real-time patterns." },
  { title: "Data & architecture", text: "PostgreSQL, Prisma, MongoDB, Redis, schema design, service boundaries and reliability-minded modeling." },
  { title: "Delivery & AI", text: "Docker, CI/CD, deployment, observability basics, LLM integrations, MCP workflows and automation." },
] as const;

const toolkit = ["TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB", "Redis", "GraphQL", "Docker", "FastAPI", "Flutter", "MCP"];

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#main">Skip to content</a>
      <div className={styles.ambient} aria-hidden="true" />

      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Abdulrahman Hajar — home">
          <span className={styles.brandMark}>AH</span>
          <span className={styles.brandCopy}>
            <strong>Abdulrahman Hajar</strong>
            <small>Software Engineer</small>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
        </nav>

        <Link className={styles.navCta} href="/resume/">Résumé <Arrow size={14} /></Link>
      </header>

      <main id="main">
        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <div className={styles.availability}><span /> Open to software engineering opportunities</div>
            <p className={styles.eyebrow}>FULL-STACK · BACKEND · PRODUCT · AI</p>
            <h1>
              I engineer software that feels
              <span> finished.</span>
            </h1>
            <p className={styles.heroLead}>
              I build complete digital products — from polished interfaces and robust APIs to data systems, automation, deployment, and the details that make software dependable in production.
            </p>

            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#work">Explore selected work <Arrow /></a>
              <a className={styles.iconButton} href="https://github.com/rahman-997" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
              <a className={styles.iconButton} href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
            </div>

            <div className={styles.heroMeta}>
              <div><span>Location</span><strong>Istanbul, Türkiye</strong></div>
              <div><span>Education</span><strong>Computer Engineering</strong></div>
              <div><span>Focus</span><strong>Production-minded systems</strong></div>
            </div>
          </div>

          <div className={styles.heroPanel} aria-label="Engineering system overview">
            <div className={styles.panelBar}>
              <span className={styles.windowDots}><i /><i /><i /></span>
              <span>engineering.profile</span>
              <span className={styles.online}><i /> online</span>
            </div>

            <div className={styles.panelBody}>
              <div className={styles.panelIntro}>
                <span>BUILD MODE / 2026</span>
                <strong>FULL-STACK<br />SYSTEMS</strong>
              </div>

              <div className={styles.systemGrid}>
                <div><span>01</span><strong>Interface</strong><small>React · Next.js</small></div>
                <div><span>02</span><strong>API</strong><small>Node · Express</small></div>
                <div><span>03</span><strong>Data</strong><small>SQL · Mongo · Redis</small></div>
                <div><span>04</span><strong>Delivery</strong><small>Docker · CI/CD</small></div>
              </div>

              <div className={styles.terminal}>
                <p><span>$</span> profile --status</p>
                <p><b>✓</b> frontend craftsmanship</p>
                <p><b>✓</b> backend architecture</p>
                <p><b>✓</b> production delivery</p>
                <p><b>✓</b> AI-assisted workflows</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.toolkit} aria-label="Selected technologies">
          <span className={styles.toolkitLabel}>SELECTED TOOLKIT</span>
          <div className={styles.toolkitTrack}>{toolkit.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className={styles.work} id="work">
          <div className={styles.sectionHeading}>
            <div>
              <p>01 / SELECTED WORK</p>
              <h2>Projects with actual engineering behind them.</h2>
            </div>
            <p className={styles.sectionNote}>Live products, source code, architecture decisions, and case studies — not decorative portfolio mockups.</p>
          </div>

          <div className={styles.projectList}>
            {projects.map((project, projectIndex) => (
              <article className={`${styles.project} ${styles[project.className]} ${projectIndex === 0 ? styles.featured : ""}`} key={project.name}>
                <div className={styles.projectVisual}>
                  {project.image ? (
                    <div className={styles.projectImage} style={{ backgroundImage: `url(${project.image})` }} aria-hidden="true" />
                  ) : (
                    <div className={styles.apiVisual} aria-hidden="true">
                      <div><span>GET</span><code>/v1/venues</code><b>200</b></div>
                      <pre>{`{\n  "service": "venues-api",\n  "status": "healthy",\n  "validation": "zod",\n  "architecture": "layered"\n}`}</pre>
                    </div>
                  )}
                  <div className={styles.visualOverlay} />
                  <span className={styles.projectIndex}>{project.index}</span>
                  <span className={styles.projectType}>{project.eyebrow}</span>
                </div>

                <div className={styles.projectContent}>
                  <p className={styles.projectEyebrow}>{project.eyebrow}</p>
                  <h3>{project.name}</h3>
                  <h4>{project.headline}</h4>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.stack}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className={styles.projectLinks}>
                    <Link href={project.caseStudy}>Case study <Arrow size={15} /></Link>
                    <a href={project.live} target="_blank" rel="noreferrer">Live <Arrow size={15} /></a>
                    <a href={project.source} target="_blank" rel="noreferrer"><Github size={16} /> Source</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.capabilities} id="capabilities">
          <div className={styles.sectionHeadingCompact}>
            <p>02 / CAPABILITIES</p>
            <h2>From interface to infrastructure.</h2>
          </div>

          <div className={styles.skillGrid}>
            {skills.map((skill, index) => (
              <article key={skill.title}>
                <span>0{index + 1}</span>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.about} id="about">
          <div className={styles.aboutLabel}>03 / ABOUT</div>
          <div className={styles.aboutTitle}>
            <p>SOFTWARE ENGINEER · COMPUTER ENGINEERING STUDENT</p>
            <h2>Strong products come from understanding the whole system.</h2>
          </div>
          <div className={styles.aboutCopy}>
            <p>I&apos;m Abdulrahman Hajar, based in Istanbul and studying Computer Engineering at Nişantaşı University. I work across frontend, backend, APIs, databases, deployment, and AI-assisted product workflows.</p>
            <p>I care about software that is clear to use, easy to reason about, resilient outside the happy path, and built with enough engineering discipline to keep improving after launch.</p>
            <div className={styles.aboutLinks}>
              <Link href="/resume/">View résumé <Arrow size={15} /></Link>
              <a href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            </div>
          </div>
        </section>

        <section className={styles.contact}>
          <div className={styles.contactGlow} aria-hidden="true" />
          <p>04 / CONTACT</p>
          <h2>Have a role, product, or hard technical problem?</h2>
          <p className={styles.contactLead}>I&apos;m open to software engineering opportunities and serious product collaborations.</p>
          <div className={styles.contactActions}>
            <a className={styles.primaryButton} href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow /></a>
            <a className={styles.secondaryButton} href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github /> View GitHub</a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><span className={styles.brandMark}>AH</span><strong>Abdulrahman Hajar</strong></div>
        <span>Software Engineer · Istanbul · 2026</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
