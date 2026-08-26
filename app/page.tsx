import Link from "next/link";

const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

const Code = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="m8 9-3 3 3 3m8-6 3 3-3 3m-2.5-9-3 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Database = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="5" rx="7" ry="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const Spark = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l1.4 5.6L19 9l-5.6 1.4L12 16l-1.4-5.6L5 9l5.6-1.4L12 2Zm6 13 .8 3.2L22 19l-3.2.8L18 23l-.8-3.2L14 19l3.2-.8L18 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const projects = [
  {
    index: "01",
    name: "Eventify",
    label: "Distributed product system",
    headline: "Reliable booking flows beyond the happy path.",
    summary:
      "A production-oriented event platform engineered around booking consistency, waitlists, background work, cache-aware reads, secure delivery, and operational visibility.",
    stack: ["TypeScript", "Express 5", "PostgreSQL", "Prisma", "Redis", "BullMQ", "PWA"],
    signals: ["Durable outbox", "Readiness + metrics", "Auth + rate limits", "CI security gates"],
    caseStudy: "/work/eventify/",
    live: "https://eventify-web.onrender.com",
    source: "https://github.com/rahman-997/eventify",
    className: "project-violet",
    visual: "EVENT SYSTEM",
  },
  {
    index: "02",
    name: "BookHaven",
    label: "Full-stack commerce",
    headline: "A complete bookstore product, not just a catalog.",
    summary:
      "Product discovery, authentication, role-based administration, cart and wishlist state, reviews, checkout, orders, and inventory workflows across a full web stack.",
    stack: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Mongoose", "Zod"],
    signals: ["JWT + RBAC", "Validated API", "Order lifecycle", "Automated tests"],
    caseStudy: "/work/bookhaven/",
    live: "https://bookbookhaven-free.onrender.com",
    source: "https://github.com/rahman-997/bookbookhaven",
    className: "project-amber",
    visual: "COMMERCE STACK",
  },
  {
    index: "03",
    name: "FitFlow",
    label: "Product-focused PWA",
    headline: "Fitness software designed to feel like a product.",
    summary:
      "An installable fitness experience with personalized planning, guided intervals, weekly progress, responsive interaction design, accessibility, and offline-ready behavior.",
    stack: ["Next.js", "React", "TypeScript", "PWA", "Web APIs"],
    signals: ["Local-first progress", "Offline core", "Accessible UX", "Responsive UI"],
    caseStudy: "/work/fitflow/",
    live: "https://fitflow-gym-online.netlify.app",
    source: "https://github.com/rahman-997/fitflow-gym",
    className: "project-lime",
    visual: "FITNESS PWA",
  },
  {
    index: "04",
    name: "Venues API",
    label: "Backend service",
    headline: "Small API. Serious engineering discipline.",
    summary:
      "A compact REST service built to demonstrate clean layering, strict validation, predictable errors, persistence boundaries, UUID resources, and HTTP contract verification.",
    stack: ["Express 5", "TypeScript", "Zod 4", "Node.js", "REST"],
    signals: ["Layered architecture", "Centralized errors", "Strict validation", "HTTP tests"],
    caseStudy: "/work/venues-api/",
    live: "https://venues-api-rahman.onrender.com",
    source: "https://github.com/rahman-997/venues-api",
    className: "project-cyan",
    visual: "BACKEND API",
  },
] as const;

const capabilities = [
  {
    icon: <Code />,
    title: "Full-stack product engineering",
    text: "I connect interface behavior, application state, backend contracts, and delivery instead of treating them as unrelated layers.",
    tools: "React · Next.js · TypeScript · Node.js · Express",
  },
  {
    icon: <Database />,
    title: "Backend, data & reliability",
    text: "APIs, persistence, caching, queues, validation, authorization, background workflows, failure handling, and operational health.",
    tools: "PostgreSQL · Prisma · MongoDB · Redis · BullMQ",
  },
  {
    icon: <Spark />,
    title: "AI & interactive systems",
    text: "LLM integrations, MCP workflows, mobile experiences, real-time interaction, and exploratory interface engineering.",
    tools: "FastAPI · LLM · MCP · Flutter · WebGL · Three.js",
  },
] as const;

const workflow = [
  ["01", "Understand", "Start from the product and system constraints, not the framework."],
  ["02", "Architect", "Make boundaries, data ownership, contracts, and failure modes explicit."],
  ["03", "Build", "Ship vertical slices that connect UI, APIs, persistence, and workflows."],
  ["04", "Verify", "Use types, validation, tests, CI, security checks, and production signals."],
] as const;

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Abdulrahman Hajar — home">
          <span className="brand-mark">AH</span>
          <span className="brand-copy">
            <strong>Abdulrahman Hajar</strong>
            <small>Software Engineer</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#expertise">Expertise</a>
          <a href="#about">About</a>
          <Link href="/resume/">Résumé</Link>
        </nav>

        <a className="header-cta" href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">
          Let&apos;s connect <ArrowUpRight size={15} />
        </a>
      </header>

      <div id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="availability"><span /> Open to software engineering opportunities</div>
            <p className="hero-kicker">FULL-STACK · BACKEND · SYSTEMS · AI</p>
            <h1>
              I turn complex ideas into
              <span className="gradient-text"> complete software systems.</span>
            </h1>
            <p className="hero-lede">
              I&apos;m Abdulrahman Hajar — a software engineer in Istanbul building polished interfaces, robust APIs, reliable data flows, automation, and production-ready delivery as one coherent product.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore selected work <ArrowRight /></a>
              <Link className="button button-secondary" href="/resume/">View résumé</Link>
            </div>
            <div className="hero-socials" aria-label="Social profiles">
              <a href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github /> GitHub</a>
              <a href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
              <span>Istanbul, Türkiye</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Engineering stack overview">
            <div className="visual-halo halo-a" />
            <div className="visual-halo halo-b" />

            <div className="code-window">
              <div className="window-bar">
                <div className="window-dots"><span /><span /><span /></div>
                <span>abdulrahman.engineer.ts</span>
                <small>● main</small>
              </div>
              <div className="code-body" aria-hidden="true">
                <p><i>01</i><span className="code-purple">const</span> engineer = &#123;</p>
                <p><i>02</i>&nbsp;&nbsp;name: <span className="code-green">&quot;Abdulrahman Hajar&quot;</span>,</p>
                <p><i>03</i>&nbsp;&nbsp;focus: [</p>
                <p><i>04</i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">&quot;products&quot;</span>, <span className="code-green">&quot;APIs&quot;</span>,</p>
                <p><i>05</i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">&quot;data&quot;</span>, <span className="code-green">&quot;reliability&quot;</span></p>
                <p><i>06</i>&nbsp;&nbsp;],</p>
                <p><i>07</i>&nbsp;&nbsp;core: <span className="code-green">&quot;TypeScript&quot;</span>,</p>
                <p><i>08</i>&nbsp;&nbsp;mode: <span className="code-green">&quot;build end-to-end&quot;</span></p>
                <p><i>09</i>&#125;;</p>
              </div>
              <div className="window-status">
                <span><b /> SYSTEM READY</span>
                <span>UTF-8</span>
                <span>TypeScript</span>
              </div>
            </div>

            <div className="float-card float-card-one">
              <span className="float-icon"><Code /></span>
              <div><small>PRIMARY STACK</small><strong>TypeScript + React</strong></div>
            </div>
            <div className="float-card float-card-two">
              <span className="float-icon"><Database /></span>
              <div><small>BACKEND</small><strong>APIs + Data Systems</strong></div>
            </div>
            <div className="float-card float-card-three">
              <span className="pulse-dot" />
              <div><small>ENGINEERING MODE</small><strong>Build · Verify · Ship</strong></div>
            </div>
          </div>
        </section>

        <section className="signal-bar" aria-label="Engineering strengths">
          <div><span>01</span><strong>Product engineering</strong><small>Interface → infrastructure</small></div>
          <div><span>02</span><strong>Backend systems</strong><small>APIs → data → queues</small></div>
          <div><span>03</span><strong>Production quality</strong><small>Tests → CI → security</small></div>
          <div><span>04</span><strong>Emerging tech</strong><small>AI → mobile → real-time</small></div>
        </section>

        <section className="work-section section-shell" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span>01</span> SELECTED WORK</p>
              <h2>Projects built as systems, not screenshots.</h2>
            </div>
            <p className="section-note">Each project highlights architecture, product behavior, reliability, and the engineering decisions behind the interface.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.className}`} key={project.name}>
                <div className="project-preview">
                  <div className="preview-noise" />
                  <div className="preview-header">
                    <span>{project.visual}</span>
                    <span>{project.index} / 04</span>
                  </div>
                  <div className="preview-center">
                    <span className="preview-orbit orbit-one" />
                    <span className="preview-orbit orbit-two" />
                    <span className="preview-core">{project.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div className="preview-metrics">
                    {project.signals.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-meta"><span>{project.index}</span><p>{project.label}</p></div>
                  <h3>{project.name}</h3>
                  <h4>{project.headline}</h4>
                  <p>{project.summary}</p>
                  <div className="stack-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <div className="project-actions">
                    <Link href={project.caseStudy}>Read case study <ArrowUpRight /></Link>
                    <a href={project.live} target="_blank" rel="noreferrer">Live <ArrowUpRight /></a>
                    <a href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`}><Github /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="expertise-section" id="expertise">
          <div className="section-shell">
            <div className="section-heading inverted">
              <div>
                <p className="eyebrow"><span>02</span> EXPERTISE</p>
                <h2>One engineer. The whole delivery path.</h2>
              </div>
              <p className="section-note">Strongest in TypeScript systems, with enough range to connect product experience, backend architecture, data, infrastructure, and emerging interfaces.</p>
            </div>

            <div className="capability-grid">
              {capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <div className="capability-top"><span className="capability-icon">{capability.icon}</span><small>0{index + 1}</small></div>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                  <strong>{capability.tools}</strong>
                </article>
              ))}
            </div>

            <div className="tech-marquee" aria-label="Technology stack">
              <div>
                {[
                  "TypeScript", "React", "Next.js", "Node.js", "Express 5", "PostgreSQL", "Prisma", "MongoDB", "Redis", "GraphQL", "WebSockets", "Docker", "GitHub Actions", "FastAPI", "Flutter", "MCP"
                ].map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="process-section section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span>03</span> HOW I ENGINEER</p>
              <h2>Clarity before complexity.</h2>
            </div>
            <p className="section-note">The goal is not maximum technology. It is a system that is understandable, testable, secure, and useful.</p>
          </div>

          <div className="process-grid">
            {workflow.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                <ArrowUpRight size={20} />
              </article>
            ))}
          </div>
        </section>

        <section className="about-section section-shell" id="about">
          <div className="about-card-large">
            <div className="about-intro">
              <p className="eyebrow"><span>04</span> ABOUT</p>
              <h2>Engineering beyond the assignment.</h2>
              <p>
                I study Computer Engineering at Nişantaşı University in Istanbul and use real products to go deeper into architecture, backend engineering, data systems, frontend experience, deployment, and AI-assisted workflows.
              </p>
              <p>
                I&apos;m especially interested in teams where I can own meaningful product surfaces, solve real engineering problems, and keep growing in system design and production-quality software development.
              </p>
              <div className="about-actions">
                <Link className="button button-primary" href="/resume/">Open full résumé <ArrowRight /></Link>
                <a className="text-action" href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github /> Explore my GitHub</a>
              </div>
            </div>

            <div className="profile-panel">
              <div className="profile-monogram">AH</div>
              <div className="profile-status"><span /> AVAILABLE FOR OPPORTUNITIES</div>
              <dl>
                <div><dt>ROLE</dt><dd>Software Engineer · Full-Stack Developer</dd></div>
                <div><dt>EDUCATION</dt><dd>Computer Engineering · Nişantaşı University</dd></div>
                <div><dt>LOCATION</dt><dd>Istanbul, Türkiye</dd></div>
                <div><dt>FOCUS</dt><dd>Full-Stack · Backend · Systems · AI</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <div className="contact-glow" aria-hidden="true" />
          <p className="eyebrow"><span>05</span> CONTACT</p>
          <h2>Have a product, backend, or system worth building?</h2>
          <p>Take a look at the code, read the case studies, or start a conversation about an engineering opportunity.</p>
          <div className="contact-actions">
            <a className="button button-primary" href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer"><LinkedIn /> Connect on LinkedIn <ArrowUpRight /></a>
            <a className="button button-secondary" href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><Github /> GitHub profile</a>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="brand">
          <span className="brand-mark">AH</span>
          <span className="brand-copy"><strong>Abdulrahman Hajar</strong><small>Software Engineer · Istanbul</small></span>
        </div>
        <p>Built with Next.js, TypeScript, and attention to the details.</p>
        <div className="footer-links">
          <a href="#top">Back to top ↑</a>
          <Link href="/resume/">Résumé</Link>
          <a href="https://github.com/rahman-997" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
