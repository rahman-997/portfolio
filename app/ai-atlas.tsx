"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ai-atlas.module.css";

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

export default function AIAtlas() {
  const [activeId, setActiveId] = useState("architecture");
  const [view, setView] = useState<"network" | "portrait">("network");
  const active = areas.find((area) => area.id === activeId) ?? areas[0];

  return (
    <section className={styles.section} id="ai-lab" aria-labelledby="ai-lab-heading">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>INTERACTIVE FEATURE / ENGINEERING ATLAS</p>
          <h2 id="ai-lab-heading">Every system is a network of decisions.</h2>
        </div>
        <p className={styles.lead}>
          An interactive map of the disciplines behind my work. Explore a node
          to inspect the engineering choices and related project evidence.
        </p>
      </div>

      <div className={styles.console}>
        <div className={styles.toolbar}>
          <div className={styles.consoleIdentity}>
            <span className={styles.pulseDot} aria-hidden="true" />
            <span>AH / SYSTEMS ATLAS</span>
            <span className={styles.visualTag}>INTERACTIVE VISUALIZATION</span>
          </div>
          <div className={styles.switcher} role="group" aria-label="Visualization mode">
            <button type="button" aria-pressed={view === "network"} className={view === "network" ? styles.modeActive : ""} onClick={() => setView("network")}>
              Network
            </button>
            <button type="button" aria-pressed={view === "portrait"} className={view === "portrait" ? styles.modeActive : ""} onClick={() => setView("portrait")}>
              Neural portrait
            </button>
          </div>
        </div>

        <div className={styles.workspace}>
          <div className={styles.visual}>
            {view === "network" ? (
              <div className={styles.network} role="group" aria-label="Select an engineering discipline">
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
                {areas.map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    style={{ left: area.x + "%", top: area.y + "%" }}
                    className={[styles.node, activeId === area.id ? styles.selected : ""].filter(Boolean).join(" ")}
                    aria-pressed={activeId === area.id}
                    aria-label={"Explore " + area.name}
                    onClick={() => setActiveId(area.id)}
                  >
                    <span className={styles.nodeIndex}>{area.short}</span>
                    <span className={styles.nodeName}>{area.name}</span>
                  </button>
                ))}
                <span className={styles.mapCorner}>SELECT A NODE TO EXPLORE</span>
              </div>
            ) : (
              <div className={styles.portraitView} role="img" aria-label="Abstract cyan and gold digital head made from contour lines; decorative visualization only">
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
                </svg>
                <div className={styles.portraitCaption}>
                  <strong>Human intelligence remains in control.</strong>
                  <span>Conceptual motion study. No camera, biometric recognition, or live AI service.</span>
                </div>
              </div>
            )}
          </div>

          <aside className={styles.inspector} aria-labelledby="atlas-inspector-title">
            <div className={styles.inspectorTop}>
              <span>DISCIPLINE INSPECTOR</span>
              <span className={styles.inspectorCount}>{String(areas.findIndex((item) => item.id === active.id) + 1).padStart(2, "0")} / {String(areas.length).padStart(2, "0")}</span>
            </div>
            <div className={styles.inspectorContent} aria-live="polite" aria-atomic="true">
              <span className={styles.inspectorKicker}>ENGINEERING FOCUS</span>
              <h3 id="atlas-inspector-title">{active.name}</h3>
              <p>{active.summary}</p>
              <div className={styles.tagSet} aria-label="Related skills">
                {active.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <Link className={styles.inspectorLink} href={active.href}>
              {active.proof} <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </div>

        <div className={styles.statusBar}>
          <span>DESIGNED FOR EXPLORATION, NOT A LIVE AGENT CONTROL PANEL</span>
          <span>NO EXTERNAL API · NO TRACKING · NO 3D DEPENDENCIES</span>
        </div>
      </div>
    </section>
  );
}
