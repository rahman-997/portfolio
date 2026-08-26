import Link from "next/link";

const Arrow = ({ size = 17 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 19 19 5M9 5h10v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Github = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.57.1.78-.25.78-.55v-2.24c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.3-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.5 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

const projects = [
  {
    index: "01",
    name: "Eventify",
    type: "Distributed product system",
    summary:
      "A production-oriented event platform designed around reliable bookings, waitlists, background work, cache-aware reads, operational health, and secure delivery.",
    stack: ["TypeScript", "Express 5", "PostgreSQL", "Prisma", "Redis", "BullMQ", "PWA"],
    evidence: ["Durable outbox", "Readiness + metrics", "Auth + rate limits", "CI + security gates"],
    caseStudy: "/work/eventify/",
    live: "https://eventify-web.onrender.com",
    source: "https://github.com/rahman-997/eventify",
  },
  {
    index: "02",
    name: "BookHaven",
    type: "Full-stack commerce",
    summary:
      "A bookstore system spanning product discovery, authentication, role-based administration, cart and wishlist state, reviews, checkout, orders, and inventory workflows.",
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Mongoose", "Zod"],
    evidence: ["JWT + RBAC", "API validation", "Order workflows", "Automated tests"],
    caseStudy: "/work/bookhaven/",
    live: "https://bookbookhaven-free.onrender.com",
    source: "https://github.com/rahman-997/bookbookhaven",
  },
  {
    index: "03",
    name: "FitFlow",
    type: "Product-focused PWA",
    summary:
      "An installable fitness experience with personalized planning, guided intervals, weekly progress, responsive interaction design, accessibility, and offline-ready behavior.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Web APIs"],
    evidence: ["Local-first progress", "Offline core", "Accessible UX", "Responsive product UI"],
    caseStudy: "/work/fitflow/",
    live: "https://fitflow-gym-online.netlify.app",
    source: "https://github.com/rahman-997/fitflow-gym",
  },
  {
    index: "04",
    name: "Venues API",
    type: "Backend service",
    summary:
      "A compact REST service built to demonstrate clean layering, strict validation, predictable errors, persistence boundaries, UUID-based resources, and HTTP contract verification.",
    stack: ["Express 5", "TypeScript", "Zod 4", "Node.js", "REST"],
    evidence: ["Layered architecture", "Centralized errors", "Strict validation", "Service + HTTP tests"],
    caseStudy: "/work/venues-api/",
    live: "https://venues-api-rahman.onrender.com",
    source: "https://github.com/rahman-997/venues-api",
  },
] as const;

const capabilities = [
  {
    number: "01",
    title: "Product engineering",
    text: "React, Next.js, TypeScript, accessible UI, responsive systems, PWA behavior, interaction design, and frontend architecture.",
  },
  {
    number: "02",
    title: "Backend & APIs",
    text: "Node.js, Express, REST, GraphQL, WebSockets, gRPC, validation, authentication, authorization, service boundaries, and API contracts.",
  },
  {
    number: "03",
    title: "Data & reliability",
    text: "PostgreSQL, Prisma, MongoDB, Mongoose, Redis, queues, caching, background jobs, health/readiness, metrics, and predictable failure handling.",
  },
  {
    number: "04",
    title: "AI & interactive systems",
    text: "FastAPI, LLM integrations, MCP workflows, Flutter, Flame, WebGL, Three.js, real-time experiences, and emerging interface architecture.",
  },
] as const;

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="topbar">
        <a className="identity" href="#top" aria-label="Abdulrahman Hajar — home">
          <span className="identity-mark">AH</span>
          <span>
            <strong>Abdulrahman Hajar</strong>
            <small>Software Engineer · Istanbul</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
          <Link href="/resume/">Résumé</Link>
        </nav>

        <a className="topbar-action" href="https://github.com/rahman-997" target="_blank" rel="noreferrer">
          <Github /> GitHub
        </a>
      </header>

      <div id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="status-line"><span /> Available for software engineering opportunities</div>
            <p className="hero-kicker">FULL-STACK · BACKEND · SYSTEMS · AI</p>
            <h1>
              I build the
              <span>whole system.</span>
            </h1>
            <p className="hero-lede">
              Full-stack software engineer building product interfaces, backend services, APIs, data systems, asynchronous workflows, automated verification, and production delivery — with TypeScript and system clarity at the center.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">See selected systems <Arrow /></a>
              <Link className="button button-ghost" href="/resume/">Open résumé</Link>
              <a className="text-link" href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">LinkedIn <Arrow size={14} /></a>
            </div>
          </div>

          <aside className="terminal" aria-label="Engineering profile summary">
            <div className="terminal-bar">
              <span className="terminal-dot" />
              <span>engineer.profile.ts</span>
              <span>main</span>
            </div>
            <pre><code>{`const engineer = {
  name: "Abdulrahman Hajar",
  role: "Software Engineer",
  focus: [
    "full-stack products",
    "backend + APIs",
    "reliable data flows",
    "AI-assisted systems"
  ],
  core: "TypeScript",
  mindset: "ship complete systems",
  location: "Istanbul, Türkiye"
};`}</code></pre>
            <div className="terminal-foot">
              <span>STATUS</span>
              <strong>READY TO BUILD</strong>
            </div>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Engineering signals">
          <div><span>STACK</span><strong>TypeScript · React · Node</strong></div>
          <div><span>BACKEND</span><strong>APIs · Data · Queues</strong></div>
          <div><span>QUALITY</span><strong>Tests · CI/CD · Security</strong></div>
          <div><span>EDGE</span><strong>AI · Mobile · Interactive</strong></div>
        </section>

        <section className="work" id="work">
          <div className="section-intro">
            <p><span>01</span> Selected systems</p>
            <div>
              <h2>Proof over buzzwords.</h2>
              <p>Projects are presented by the engineering decisions they contain: architecture, data, reliability, testing, and product behavior.</p>
            </div>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.name}>
                <div className="project-rail">
                  <span>{project.index}</span>
                  <small>{project.type}</small>
                </div>
                <div className="project-main">
                  <h3>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="chip-row">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <div className="project-links">
                    <Link href={project.caseStudy}>Case study <Arrow size={15} /></Link>
                    <a href={project.live} target="_blank" rel="noreferrer">Live <Arrow size={15} /></a>
                    <a href={project.source} target="_blank" rel="noreferrer"><Github /> Source</a>
                  </div>
                </div>
                <div className="project-evidence">
                  <p>ENGINEERING EVIDENCE</p>
                  {project.evidence.map((item) => <div key={item}><span>+</span>{item}</div>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilities" id="capabilities">
          <div className="section-intro light">
            <p><span>02</span> Capabilities</p>
            <div>
              <h2>From interface to infrastructure.</h2>
              <p>I work across the stack, but the goal stays the same: a system that is understandable, testable, secure, and useful.</p>
            </div>
          </div>

          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article key={capability.title}>
                <span>{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
              </article>
            ))}
          </div>

          <div className="stack-board">
            <div>
              <span>PRIMARY</span>
              <strong>TypeScript · React · Next.js · Node.js · Express</strong>
            </div>
            <div>
              <span>DATA</span>
              <strong>PostgreSQL · Prisma · MongoDB · Mongoose · Redis</strong>
            </div>
            <div>
              <span>SYSTEMS</span>
              <strong>REST · GraphQL · WebSockets · gRPC · BullMQ · OpenAPI</strong>
            </div>
            <div>
              <span>DELIVERY</span>
              <strong>Jest · Supertest · Docker · GitHub Actions · Security · Observability</strong>
            </div>
            <div>
              <span>EXTENDED</span>
              <strong>Python · FastAPI · Flutter · Flame · WebGL · Three.js · LLM · MCP</strong>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-intro">
            <p><span>03</span> Engineering mindset</p>
            <div>
              <h2>Build clearly. Verify aggressively. Ship responsibly.</h2>
            </div>
          </div>

          <div className="principles">
            <article>
              <span>ARCHITECTURE</span>
              <h3>Make boundaries obvious.</h3>
              <p>Keep HTTP concerns, business rules, persistence, background work, and product state understandable instead of hiding complexity in giant files.</p>
            </article>
            <article>
              <span>RELIABILITY</span>
              <h3>Design for failure states.</h3>
              <p>Validation, safe errors, retries, health checks, readiness, cache failure, offline behavior, and recovery are engineering requirements — not polish.</p>
            </article>
            <article>
              <span>DELIVERY</span>
              <h3>Ship with evidence.</h3>
              <p>Type checking, tests, CI/CD, security controls, operational signals, and deployment verification provide confidence that the system actually works.</p>
            </article>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p className="eyebrow">ABOUT</p>
              <h3>Computer Engineering student building beyond coursework.</h3>
              <p>
                I study Computer Engineering at Nişantaşı University in Istanbul and use real projects to deepen my understanding of software architecture, backend systems, data, frontend product engineering, deployment, and AI-assisted workflows.
              </p>
              <p>
                I am especially interested in roles where I can own meaningful parts of the product while continuing to grow in system design, backend engineering, and production-quality full-stack development.
              </p>
            </div>
            <div className="about-card">
              <div><span>EDUCATION</span><strong>Computer Engineering · Nişantaşı University</strong></div>
              <div><span>LOCATION</span><strong>Istanbul, Türkiye</strong></div>
              <div><span>FOCUS</span><strong>Full-Stack · Backend · Systems · AI</strong></div>
              <div><span>WORK MODE</span><strong>Product-minded engineering</strong></div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="eyebrow">04 · CONTACT</p>
          <h2>Need an engineer who can see the whole system?</h2>
          <p>Explore the code, read the case studies, or start a conversation.</p>
          <div className="contact-actions">
            <a className="button button-primary" href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">Connect on LinkedIn <Arrow /></a>
            <a className="button button-ghost" href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github /> Explore GitHub</a>
            <Link className="text-link" href="/resume/">Résumé <Arrow size={14} /></Link>
          </div>
        </section>

        <footer>
          <div className="identity">
            <span className="identity-mark">AH</span>
            <span><strong>Abdulrahman Hajar</strong><small>Software Engineer · Full-Stack Developer</small></span>
          </div>
          <p>Engineering portfolio · Istanbul · 2026</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
