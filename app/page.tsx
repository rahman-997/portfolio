import Link from "next/link";

const ArrowUpRight = ({ size = 18 }: { size?: number }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GithubMark = () => (
  <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.57.1.78-.25.78-.55v-2.24c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.3-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.5 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Abdulrahman Hajar — home">
          <span className="brand-mark">AH</span>
          <span className="brand-copy">
            Abdulrahman Hajar
            <small>Software Engineer</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <Link href="/resume/">Resume</Link>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-link" href="https://github.com/rahman-997" target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={16} />
        </a>
      </header>

      <div id="content">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-main">
            <div className="availability"><span /> Open to software engineering opportunities</div>
            <h1>
              I engineer products and systems that feel
              <em> clear, reliable, and complete.</em>
            </h1>
            <p className="hero-lede">
              Software engineer and full-stack developer building production-ready web, backend, API, AI-assisted, mobile, and interactive systems — with TypeScript, React/Next.js, Node.js, data infrastructure, and modern deployment at the core.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowUpRight /></a>
              <Link className="button button-secondary" href="/resume/">View résumé</Link>
              <a className="button button-secondary" href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">Connect on LinkedIn</a>
            </div>
          </div>

          <aside className="profile-card" aria-label="Profile summary">
            <div className="profile-topline">
              <span>Based in</span>
              <strong>Istanbul, Türkiye</strong>
            </div>
            <div className="profile-portrait">
              {/* Public GitHub avatar; kept as a direct image to avoid a proxy dependency. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://avatars.githubusercontent.com/u/316491264?v=4" alt="Abdulrahman Hajar" width="360" height="360" />
              <span className="portrait-code">01 / AH</span>
            </div>
            <div className="profile-bottomline">
              <span>Engineering focus</span>
              <strong>Full-stack systems &amp; product architecture</strong>
            </div>
          </aside>
        </section>

        <section className="signal-strip" aria-label="Core strengths">
          <span>Full-Stack TypeScript</span>
          <span>React &amp; Next.js</span>
          <span>Backend &amp; APIs</span>
          <span>Production systems</span>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <div><span className="section-number">01</span><p>Selected work</p></div>
            <h2>Systems built to work in the real world.</h2>
          </div>

          <article className="project-card project-eventify">
            <div className="project-index">01</div>
            <div className="project-copy">
              <div className="project-tags"><span>TypeScript</span><span>PostgreSQL</span><span>Redis + BullMQ</span></div>
              <h3>Eventify</h3>
              <p>A production-oriented event platform with secure auth, bookings and waitlists, Redis caching and rate limits, durable background jobs, metrics, health/readiness checks, and installable PWA support.</p>
              <div className="project-links">
                <Link href="/work/eventify/">Case study <ArrowUpRight size={16} /></Link>
                <a href="https://eventify-web.onrender.com" target="_blank" rel="noreferrer">Live product <ArrowUpRight size={16} /></a>
                <a href="https://backend2-api.onrender.com/health" target="_blank" rel="noreferrer">API health <ArrowUpRight size={16} /></a>
                <a href="https://github.com/rahman-997/eventify" target="_blank" rel="noreferrer"><GithubMark /> Source code</a>
              </div>
            </div>
            <div className="project-signal eventify-signal" aria-hidden="true">
              <span>PLAN</span>
              <strong>GO.</strong>
              <i>Events, engineered.</i>
            </div>
          </article>

          <article className="project-card project-fitflow">
            <div className="project-index">02</div>
            <div className="project-copy">
              <div className="project-tags"><span>Next.js</span><span>TypeScript</span><span>PWA</span></div>
              <h3>FitFlow</h3>
              <p>A premium fitness experience with personalized plans, guided workout intervals, weekly progress, accessibility, and offline support.</p>
              <div className="project-links">
                <Link href="/work/fitflow/">Case study <ArrowUpRight size={16} /></Link>
                <a href="https://fitflow-gym-online.netlify.app" target="_blank" rel="noreferrer">Live product <ArrowUpRight size={16} /></a>
                <a href="https://github.com/rahman-997/fitflow-gym" target="_blank" rel="noreferrer"><GithubMark /> Source code</a>
              </div>
            </div>
            <div className="project-signal" aria-hidden="true">
              <span>FIT</span>
              <strong>FLOW</strong>
              <i>Move with purpose.</i>
            </div>
          </article>

          <div className="project-pair">
            <article className="mini-project project-bookhaven">
              <div className="mini-project-top">
                <span>03 / Commerce</span>
                <ArrowUpRight />
              </div>
              <div className="mini-signal book-signal" aria-hidden="true">
                <span>BOOK</span><strong>HAVEN</strong>
              </div>
              <div className="mini-project-copy">
                <div className="project-tags"><span>Next.js</span><span>MongoDB</span><span>Express</span></div>
                <h3>BookHaven</h3>
                <p>A full-stack bookstore with JWT auth and RBAC, catalog discovery, cart and wishlist, reviews, concurrency-safe checkout, order history, inventory handling, and an operational admin dashboard.</p>
                <div className="project-links">
                  <Link href="/work/bookhaven/">Case study <ArrowUpRight size={16} /></Link>
                  <a href="https://bookbookhaven-free.onrender.com" target="_blank" rel="noreferrer">Live product <ArrowUpRight size={16} /></a>
                  <a href="https://github.com/rahman-997/bookbookhaven" target="_blank" rel="noreferrer"><GithubMark /> Code</a>
                </div>
              </div>
            </article>

            <article className="mini-project project-venues">
              <div className="mini-project-top">
                <span>04 / Backend</span>
                <ArrowUpRight />
              </div>
              <div className="mini-signal api-signal" aria-hidden="true">
                <span>REST / V1</span>
                <strong>200</strong>
                <i>STATUS OK</i>
              </div>
              <div className="mini-project-copy">
                <div className="project-tags"><span>Express 5</span><span>TypeScript</span><span>Zod 4</span></div>
                <h3>Venues API</h3>
                <p>A clean, versioned REST API with strict validation, layered architecture, centralized predictable errors, persistence, UUIDs, and service plus HTTP contract tests.</p>
                <div className="project-links">
                  <Link href="/work/venues-api/">Case study <ArrowUpRight size={16} /></Link>
                  <a href="https://venues-api-rahman.onrender.com" target="_blank" rel="noreferrer">Live API <ArrowUpRight size={16} /></a>
                  <a href="https://venues-api-rahman.onrender.com/health" target="_blank" rel="noreferrer">Health check <ArrowUpRight size={16} /></a>
                  <a href="https://github.com/rahman-997/venues-api" target="_blank" rel="noreferrer"><GithubMark /> Code</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-heading section-heading-light">
            <div><span className="section-number">02</span><p>How I engineer</p></div>
            <h2>Product craft.<br /><em>System depth.</em></h2>
          </div>

          <div className="about-intro">
            <p className="about-statement">I care about the complete system — from the first interaction to the architecture that keeps it reliable.</p>
            <p className="about-detail">My work combines thoughtful UI, strong TypeScript foundations, backend and API architecture, secure data flows, testing, observability, and production delivery. I&apos;m also a Computer Engineering student at Nişantaşı University, expanding that foundation into real-time, mobile, AI-assisted, and interactive systems.</p>
          </div>

          <div className="principles-grid">
            <article>
              <span>01</span>
              <h3>Design the whole system</h3>
              <p>Clear product UX, maintainable boundaries, reliable APIs, and purposeful infrastructure should reinforce each other.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Engineer for reality</h3>
              <p>Loading, empty, error, offline, security, failure, recovery, and operational states are part of the product.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Ship with evidence</h3>
              <p>Typed contracts, pragmatic tests, CI/CD, security controls, health checks, and observable behavior before release.</p>
            </article>
          </div>

          <div className="stack-section">
            <p className="stack-label">Engineering toolkit</p>
            <div className="stack-groups">
              <div><span>Full-stack</span><p>React · Next.js · TypeScript · Node.js · Express · REST · GraphQL</p></div>
              <div><span>Data &amp; systems</span><p>PostgreSQL · MongoDB · Prisma · Mongoose · Redis · WebSockets</p></div>
              <div><span>Interactive &amp; AI</span><p>Flutter · Flame · FastAPI · WebGL · Three.js · LLM / MCP workflows</p></div>
              <div><span>Production</span><p>Docker · Testing · CI/CD · Accessibility · Security · Observability</p></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-kicker"><span /> Available for the right opportunity</div>
          <h2>Let&apos;s engineer something<br /><em>worth using.</em></h2>
          <p>If you&apos;re looking for a software engineer who can move across product UI, APIs, backend architecture, data, testing, and delivery, let&apos;s talk.</p>
          <div className="contact-actions">
            <a className="button button-primary button-large" href="https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/" target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight /></a>
            <Link className="button button-secondary button-large" href="/resume/">View résumé</Link>
            <a className="button button-secondary button-large" href="https://github.com/rahman-997" target="_blank" rel="noreferrer"><GithubMark /> View GitHub</a>
          </div>
        </section>

        <footer>
          <div className="brand">
            <span className="brand-mark">AH</span>
            <span className="brand-copy">Abdulrahman Hajar<small>Software Engineer · Full-Stack Developer</small></span>
          </div>
          <p>Built with care in Istanbul · 2026</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
