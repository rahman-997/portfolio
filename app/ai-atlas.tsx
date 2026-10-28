"use client";

import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import Link from "next/link";
import styles from "./ai-atlas.module.css";
import type { Locale } from "./experience/locale";
import { atlasCopy } from "./experience/atlas-locale";

type Area = {
  id: string;
  name: string;
  short: string;
  x: number;
  y: number;
  summary: string;
  stack: string[];
  proof: string;
  href: string;
};

const areas: Area[] = [
  {
    id: "architecture", name: "Architecture", short: "PLAN", x: 20, y: 19,
    summary: "Trace product requirements through system boundaries, ownership, and failure paths before implementation.",
    stack: ["Domain modeling", "API contracts", "Trade-offs"],
    proof: "Explore the systems thinking section", href: "#systems",
  },
  {
    id: "interface", name: "Interface", short: "UI", x: 14, y: 42,
    summary: "Build responsive, accessible user journeys with real state, meaningful feedback, and production constraints.",
    stack: ["React", "Next.js", "Accessibility"],
    proof: "BookHaven case study", href: "/work/bookhaven/",
  },
  {
    id: "backend", name: "Backend", short: "API", x: 20, y: 70,
    summary: "Keep HTTP boundaries, validation, authorization, business logic, and persistence responsibilities explicit.",
    stack: ["Express", "REST", "Zod"],
    proof: "Venues API case study", href: "/work/venues-api/",
  },
  {
    id: "data", name: "Data", short: "DB", x: 37, y: 85,
    summary: "Design durable state and deliberate cache boundaries, treating the database as the system of record.",
    stack: ["PostgreSQL", "Prisma", "Redis"],
    proof: "Eventify case study", href: "/work/eventify/",
  },
  {
    id: "ai", name: "AI / MCP", short: "AI", x: 80, y: 19,
    summary: "Explore how language-model tools and human-in-the-loop workflows can fit into accountable product architecture.",
    stack: ["LLM patterns", "MCP", "Human oversight"],
    proof: "View engineering technologies", href: "#stack",
  },
  {
    id: "async", name: "Async work", short: "JOBS", x: 86, y: 42,
    summary: "Coordinate background jobs, retry policies, idempotency, and durable intent when dependencies fail.",
    stack: ["BullMQ", "Redis", "Outbox"],
    proof: "Eventify case study", href: "/work/eventify/",
  },
  {
    id: "quality", name: "Verification", short: "QA", x: 80, y: 70,
    summary: "Verify contracts, interactions, security boundaries, accessibility, and unhappy-path behavior.",
    stack: ["TypeScript", "Tests", "CI checks"],
    proof: "Venues API case study", href: "/work/venues-api/",
  },
  {
    id: "delivery", name: "Delivery", short: "SHIP", x: 63, y: 85,
    summary: "Ship through reproducible builds, clear runtime diagnostics, deployment checks, and operational visibility.",
    stack: ["GitHub Actions", "Docker", "Health checks"],
    proof: "Eventify case study", href: "/work/eventify/",
  },
];

const journey = [
  { id: "architecture", label: "01 / DEFINE", title: "Model the domain", detail: "Clarify boundaries and failure paths before choosing tools." },
  { id: "backend", label: "02 / VALIDATE", title: "Enforce contracts", detail: "Validate inputs and authorise changes at the API boundary." },
  { id: "data", label: "03 / PERSIST", title: "Commit state", detail: "Keep durable intent in the system of record." },
  { id: "async", label: "04 / DISPATCH", title: "Process safely", detail: "Run retriable background work with clear ownership." },
  { id: "quality", label: "05 / VERIFY", title: "Prove behavior", detail: "Check failure cases, integration contracts and observability." },
] as const;

export default function AIAtlas({locale="en"}:{locale?:Locale}) {
  const t=atlasCopy[locale];
  const [activeId, setActiveId] = useState("architecture");
  const [view, setView] = useState<"network" | "portrait" | "flow">("network");
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = areas.findIndex((area) => area.id === activeId);
  const active = areas[activeIndex] ?? areas[0];

  function selectAdjacent(direction: number) {
    setActiveId(areas[(activeIndex + direction + areas.length) % areas.length].id);
  }

  function handleNodeKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % areas.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + areas.length - 1) % areas.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = areas.length - 1;
    else return;
    event.preventDefault();
    setActiveId(areas[next].id);
    nodeRefs.current[next]?.focus();
  }

  return (
    <section className={styles.section} id="ai-lab" aria-labelledby="ai-lab-heading">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 id="ai-lab-heading">{t.title}</h2>
        </div>
        <p className={styles.lead}>
          {t.lead}
        </p>
      </div>

      <div className={styles.atlasFacts} aria-label="Atlas summary">
        <span><strong>08</strong> {t.disciplines}</span>
        <span><strong>03</strong> {t.modesLabel}</span>
        <span><strong>04</strong> {t.systems}</span>
        <span className={styles.factStatement}>{t.fact}</span>
      </div>

      <div className={styles.console}>
        <div className={styles.toolbar}>
          <div className={styles.consoleIdentity}>
            <span className={styles.pulseDot} aria-hidden="true" />
            <span>AH / SYSTEMS ATLAS</span>
            <span className={styles.visualTag}>{t.visualTag}</span>
          </div>
          <div className={styles.switcher} role="group" aria-label={t.modeGroup}>
            <button type="button" aria-pressed={view === "network"} className={view === "network" ? styles.modeActive : ""} onClick={() => setView("network")}>
              {t.modeNetwork}
            </button>
            <button type="button" aria-pressed={view === "portrait"} className={view === "portrait" ? styles.modeActive : ""} onClick={() => setView("portrait")}>
              {t.modePortrait}
            </button>
            <button type="button" aria-pressed={view === "flow"} className={view === "flow" ? styles.modeActive : ""} onClick={() => setView("flow")}>
              {t.modeFlow}
            </button>
          </div>
        </div>

        <div className={styles.workspace}>
          <div className={`${styles.visual} ${view === "network" ? styles.visualNetwork : ""}`}>
            {view === "network" ? (
              <div className={styles.network} role="group" aria-label={t.nodeGroup}>
                <svg className={styles.wires} viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="atlas-wire" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#47d6f8" stopOpacity=".18" />
                      <stop offset=".52" stopColor="#47d6f8" stopOpacity=".65" />
                      <stop offset="1" stopColor="#e6bd6c" stopOpacity=".3" />
                    </linearGradient>
                  </defs>
                  {areas.map((area) => (
                    <g key={area.id}>
                      <line x1="500" y1="300" x2={area.x * 10} y2={area.y * 6} stroke="url(#atlas-wire)" strokeWidth={activeId === area.id ? 2.8 : 1.1} opacity={activeId === area.id ? 1 : .5} />
                      {activeId === area.id && (
                        <circle r="4" fill="#f6cc84" className={styles.signalParticle}>
                          <animateMotion dur="3s" repeatCount="indefinite" path={`M500 300 L${area.x * 10} ${area.y * 6}`} />
                        </circle>
                      )}
                      <circle cx={area.x * 10} cy={area.y * 6} r={activeId === area.id ? 5.5 : 3} fill={activeId === area.id ? "#e6bd6c" : "#47d6f8"} opacity=".8" />
                    </g>
                  ))}
                  <ellipse cx="500" cy="300" rx="246" ry="157" fill="none" stroke="#47d6f8" strokeOpacity=".08" />
                  <ellipse cx="500" cy="300" rx="315" ry="207" fill="none" stroke="#e6bd6c" strokeOpacity=".055" />
                </svg>
                <div className={styles.core} aria-hidden="true">
                  <div className={styles.coreGlow} />
                  <div className={styles.coreRing} />
                  <div className={styles.coreInner}><span>AH</span><small>SYSTEMS</small></div>
                </div>
                {areas.map((area, index) => (
                  <button
                    key={area.id}
                    ref={(node) => { nodeRefs.current[index] = node; }}
                    onKeyDown={(event) => handleNodeKeyDown(event, index)}
                    type="button"
                    style={{ "--node-x": `${area.x}%`, "--node-y": `${area.y}%` } as CSSProperties}
                    className={[styles.node, activeId === area.id ? styles.selected : ""].filter(Boolean).join(" ")}
                    aria-pressed={activeId === area.id}
                    aria-label={t.explore + " " + t.nodes[area.id].name}
                    onClick={() => setActiveId(area.id)}
                  >
                    <span className={styles.nodeIndex}>{area.short}</span>
                    <span className={styles.nodeName}>{t.nodes[area.id].name}</span>
                  </button>
                ))}
                <span className={styles.mapCorner}>{t.nodeHint}</span>
              </div>
            ) : view === "portrait" ? (
              <div className={styles.portraitView} role="img" aria-label={t.portraitAlt}>
                <svg viewBox="0 0 520 500" className={styles.portraitSvg} aria-hidden="true">
                  <defs>
                    <linearGradient id="portrait-contour" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#54e2ff" />
                      <stop offset=".58" stopColor="#1694d7" />
                      <stop offset="1" stopColor="#e6ad53" />
                    </linearGradient>
                    <clipPath id="portrait-mask">
                      <path d="M138 448 Q148 391 210 371 L226 335 C196 305 181 266 180 216 C179 111 217 66 261 66 C311 65 343 116 343 215 C343 264 327 306 299 336 L315 371 Q379 393 392 448Z" />
                    </clipPath>
                  </defs>
                  <path d="M138 448 Q148 391 210 371 L226 335 C196 305 181 266 180 216 C179 111 217 66 261 66 C311 65 343 116 343 215 C343 264 327 306 299 336 L315 371 Q379 393 392 448" fill="none" stroke="url(#portrait-contour)" strokeWidth="3" />
                  <g clipPath="url(#portrait-mask)">
                    {Array.from({ length: 64 }, (_, i) => (
                      <path key={i} d={"M100 " + (80 + i * 6) + " Q260 " + (28 + i * 6) + " 420 " + (80 + i * 6)} stroke="url(#portrait-contour)" strokeOpacity={.24 + (i % 5) * .09} fill="none" strokeWidth=".95" />
                    ))}
                  </g>
                  <path d="M260 94 Q251 183 261 304 M200 214 Q225 201 245 215 M277 215 Q302 199 326 213 M235 291 Q260 301 285 291" fill="none" stroke="#53dfff" strokeOpacity=".5" />
                  <circle cx="260" cy="254" r="160" fill="none" stroke="#53dfff" strokeOpacity=".09" strokeDasharray="2 12" />
                  <g className={styles.portraitSignals}>
                    {Array.from({ length: 22 }, (_, i) => {
                      const angle = (i * Math.PI * 2) / 22;
                      const radius = 187 + (i % 3) * 13;
                      return (
                        <circle
                          key={i}
                          cx={260 + Math.cos(angle) * radius}
                          cy={250 + Math.sin(angle) * radius}
                          r={i % 5 === 0 ? 2.7 : 1.4}
                          fill={i % 4 === 0 ? "#efc777" : "#50d6f5"}
                          opacity={i % 3 === 0 ? ".8" : ".35"}
                        />
                      );
                    })}
                  </g>
                </svg>
                <div className={styles.portraitCaption}>
                  <strong>{t.portraitTitle}</strong>
                  <span>{t.portraitDetail}</span>
                </div>
              </div>
            ) : (
              <div className={styles.flowView} aria-label="Illustrative five-stage engineering flow">
                <div className={styles.flowHeading}>
                  <span>{t.flowHeading}</span>
                  <strong>{t.flowTitle}</strong>
                  <p>{t.flowSummary}</p>
                </div>
                <div className={styles.flowSteps}>
                  {journey.map((step, index) => (
                    <button
                      key={step.id}
                      type="button"
                      className={activeId === step.id ? styles.flowStepSelected : styles.flowStep}
                      aria-pressed={activeId === step.id}
                      onClick={() => setActiveId(step.id)}
                    >
                      <span className={styles.flowNumber}>{t.stages[index].label}</span>
                      <span className={styles.flowTitle}>{t.stages[index].title}</span>
                      <span className={styles.flowDetail}>{t.stages[index].detail}</span>
                      <span className={styles.flowArrow} aria-hidden="true">{index === journey.length - 1 ? "✓" : "↳"}</span>
                    </button>
                  ))}
                </div>
                <span className={styles.flowFootnote}>{t.flowFootnote}</span>
              </div>
            )}
          </div>

          <aside className={styles.inspector} aria-labelledby="atlas-inspector-title">
            <div className={styles.inspectorTop}>
              <span>{t.inspector}</span>
              <span className={styles.inspectorCount}>{String(activeIndex + 1).padStart(2, "0")} / {String(areas.length).padStart(2, "0")}</span>
            </div>
            <div className={styles.inspectorContent} aria-live="polite" aria-atomic="true">
              <span className={styles.inspectorKicker}>{t.focus}</span>
              <h3 id="atlas-inspector-title">{t.nodes[active.id].name}</h3>
              <p>{t.nodes[active.id].summary}</p>
              <div className={styles.tagSet} aria-label={t.related}>
                {active.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className={styles.inspectorNavigation} aria-label={t.browse}>
              <button type="button" onClick={() => selectAdjacent(-1)} aria-label={t.previous+" "+t.disciplines}>← <span>{t.previous}</span></button>
              <span>{String(activeIndex + 1).padStart(2, "0")} OF {String(areas.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => selectAdjacent(1)} aria-label={t.next+" "+t.disciplines}><span>{t.next}</span> →</button>
            </div>
            <Link className={styles.inspectorLink} href={active.href}>
              {t.nodes[active.id].proof} <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </div>

        <div className={styles.statusBar}>
          <span>{t.statusOne}</span>
          <span>{t.statusTwo}</span>
        </div>
      </div>
    </section>
  );
}
