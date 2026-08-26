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
    number: "01",
    name: "Eventify",
    category: "Distributed product system",
    headline: "Booking infrastructure built for real failure modes.",
    description: "A production-oriented event platform with waitlists, background jobs, cache-aware reads, durable workflows, authentication, metrics, and operational visibility.",
    stack: ["TypeScript", "Express 5", "PostgreSQL", "Prisma", "Redis", "BullMQ"],
    caseStudy: "/work/eventify/",
    live: "https://eventify-web.onrender.com",
    source: "https://github.com/rahman-997/eventify",
    tone: "blue",
  },
  {
    number: "02",
    name: "BookHaven",
    category: "Full-stack commerce",
    headline: "A bookstore engineered as a complete product.",
    description: "Discovery, authentication, role-based administration, cart and wishlist state, reviews, checkout, orders, and inventory workflows across one full stack.",
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Zod"],
    caseStudy: "/work/bookhaven/",
    live: "https://bookbookhaven-free.onrender.com",
    source: "https://github.com/rahman-997/bookbookhaven",
    tone: "orange",
  },
  {
    number: "03",
    name: "FitFlow",
    category: "Product-focused PWA",
    headline: "Fitness software with product-level interaction design.",
    description: "An installable fitness experience with personalized planning, guided intervals, weekly progress, accessibility, local-first behavior, and offline-ready core flows.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Web APIs"],
    caseStudy: "/work/fitflow/",
    live: "https://fitflow-gym-online.netlify.app",
    source: "https://github.com/rahman-997/fitflow-gym",
    tone: "lime",
  },
  {
    number: "04",
    name: "Venues API",
    category: "Backend service",
    headline: "A compact API with serious engineering discipline.",
    description: "Strict validation, clean layering, centralized errors, UUID resources, persistence boundaries, and HTTP contract verification in a deliberately focused backend service.",
    stack: ["Express 5", "TypeScript", "Zod 4", "Node.js", "REST"],
    caseStudy: "/work/venues-api/",
    live: "https://venues-api-rahman.onrender.com",
    source: "https://github.com/rahman-997/venues-api",
    tone: "ink",
  },
] as const;

const capabilities = [
  ["01", "Full-stack product engineering", "Interfaces, state, APIs, persistence, deployment, and product behavior treated as one connected system."],
  ["02", "Backend systems & reliability", "REST and GraphQL APIs, validation, auth, queues, caching, data modeling, failure handling, and production health."],
  ["03", "AI & interactive systems", "LLM integrations, MCP workflows, real-time experiences, mobile interfaces, WebGL, and exploratory product engineering."],
] as const;

const tech = ["TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB", "Redis", "GraphQL", "Docker", "FastAPI", "Flutter", "MCP"];

export default function Home() {
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#content">Skip to content</a>

      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Abdulrahman Hajar — home">
          <span className={styles.brandMark}>AH</span>
          <span className={styles.brandText}>Abdulrahman Hajar</span>
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#expertise">Expertise</a>
          <a href="#about">About</a>
          <Link href="/resume/">Résumé</Link>
        </nav>

        <a className={styles.headerCta} href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">
          Connect <Arrow size={15} />
        </a>
      </header>

      <main id="content">
        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <div className={styles.availability}><span /> Open to software engineering opportunities</div>
            <p className={styles.kicker}>SOFTWARE ENGINEER · FULL-STACK · BACKEND · AI</p>
            <h1>
              <span>ABDULRAHMAN</span>
              <span className={styles.nameAccent}>HAJAR</span>
            </h1>
            <p className={styles.heroText}>
              I build complete software products — from sharp interfaces to robust APIs, reliable data flows, automation, and production delivery.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#work">See selected work <Arrow /></a>
              <Link className={styles.secondaryButton} href="/resume/">View résumé</Link>
            </div>
          </div>

          <div className={styles.heroArt} aria-label="Engineering profile card">
            <div className={styles.artTopline}>
              <span>ENGINEER PROFILE</span>
              <span>ISTANBUL · TR</span>
            </div>
            <div className={styles.orbit} aria-hidden="true">
              <span className={styles.orbitOne} />
              <span className={styles.orbitTwo} />
              <span className={styles.orbitCore}>AH</span>
            </div>
            <div className={styles.artCode}>
              <span>01</span><p>PRODUCTS</p>
              <span>02</span><p>APIs + DATA</p>
              <span>03</span><p>RELIABILITY</p>
              <span>04</span><p>AI SYSTEMS</p>
            </div>
            <div className={styles.artFooter}>
              <span><i /> SYSTEM READY</span>
              <strong>TypeScript first</strong>
            </div>
          </div>
        </section>

        <section className={styles.signalStrip} aria-label="Profile highlights">
          <div><strong>04</strong><span>Selected systems</span></div>
          <div><strong>FULL</strong><span>Interface → infrastructure</span></div>
          <div><strong>BUILD</strong><span>Architecture → production</span></div>
          <div><strong>2026</strong><span>Portfolio edition</span></div>
        </section>

        <section className={styles.work} id="work">
          <div className={styles.sectionIntro}>
            <p><span>01</span> SELECTED WORK</p>
            <h2>Software that proves the engineering.</h2>
            <div>Not screenshots. Not toy demos. Each project shows product behavior, architecture, technical decisions, and live proof.</div>
          </div>

          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article className={`${styles.projectCard} ${styles[project.tone]}`} key={project.name}>
                <div className={styles.projectVisual}>
                  <div className={styles.projectVisualTop}><span>{project.category}</span><span>{project.number} / 04</span></div>
                  <div className={styles.projectGlyph}>{project.name.slice(0, 2).toUpperCase()}</div>
                  <div className={styles.projectStackMini}>{project.stack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div>
                </div>

                <div className={styles.projectBody}>
                  <div className={styles.projectNumber}>{project.number}</div>
                  <h3>{project.name}</h3>
                  <h4>{project.headline}</h4>
                  <p>{project.description}</p>
                  <div className={styles.stack}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className={styles.projectLinks}>
                    <Link href={project.caseStudy}>Case study <Arrow size={15} /></Link>
                    <a href={project.live} target="_blank" rel="noreferrer">Live <Arrow size={15} /></a>
                    <a href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`}><Github size={17} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.expertise} id="expertise">
          <div className={styles.expertiseInner}>
            <div className={styles.sectionIntroDark}>
              <p><span>02</span> EXPERTISE</p>
              <h2>One engineer.<br />The whole delivery path.</h2>
            </div>

            <div className={styles.capabilityList}>
              {capabilities.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <Arrow size={22} />
                </article>
              ))}
            </div>

            <div className={styles.techRail}>
              {tech.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className={styles.about} id="about">
          <div className={styles.aboutLabel}><span>03</span> ABOUT</div>
          <div className={styles.aboutHeadline}>
            <h2>Engineering beyond the assignment.</h2>
          </div>
          <div className={styles.aboutCopy}>
            <p>I&apos;m Abdulrahman Hajar, a Computer Engineering student at Nişantaşı University in Istanbul and a software engineer focused on building complete, production-minded systems.</p>
            <p>My strongest work sits where product design, backend architecture, data, reliability, and delivery meet. I care about clear boundaries, useful abstractions, measurable quality, and software that behaves well outside the happy path.</p>
            <div className={styles.aboutActions}>
              <Link href="/resume/">Open résumé <Arrow size={15} /></Link>
              <a href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
            </div>
          </div>
        </section>

        <section className={styles.contact}>
          <div className={styles.contactNoise} aria-hidden="true">AH</div>
          <p>04 · CONTACT</p>
          <h2>Let&apos;s build something worth shipping.</h2>
          <div className={styles.contactRow}>
            <span>Software engineering opportunities · product builds · backend systems</span>
            <div>
              <a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer"><LinkedIn size={18} /> LinkedIn <Arrow size={15} /></a>
              <a href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <Arrow size={15} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><strong>Abdulrahman Hajar</strong><span>Software Engineer · Istanbul, Türkiye</span></div>
        <p>Designed to show the work, not decorate it.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
