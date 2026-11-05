"use client";

import { useState } from "react";
import styles from "./home.module.css";

/** A local style demonstration, not a screenshot or a production dashboard. */
export default function InterfaceLab() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [spacing, setSpacing] = useState<"comfortable" | "compact">("comfortable");
  const [details, setDetails] = useState(false);

  return (
    <div className={styles.labLayout}>
      <div className={styles.labSettings}>
        <div className={styles.labSettingsTop}>INTERACTION CONTROLS <span>01 / 03</span></div>
        <h3>Good interfaces respond to the person using them.</h3>
        <p>Explore a small conceptual component set. These controls change only this preview, not the website or any saved settings.</p>
        <fieldset className={styles.labFieldset}>
          <legend>Appearance</legend>
          <div className={styles.labButtonRow}>
            <button type="button" aria-pressed={mode === "light"} onClick={() => setMode("light")}>☀ Light</button>
            <button type="button" aria-pressed={mode === "dark"} onClick={() => setMode("dark")}>☾ Dark</button>
          </div>
        </fieldset>
        <fieldset className={styles.labFieldset}>
          <legend>Information density</legend>
          <div className={styles.labButtonRow}>
            <button type="button" aria-pressed={spacing === "comfortable"} onClick={() => setSpacing("comfortable")}>Comfortable</button>
            <button type="button" aria-pressed={spacing === "compact"} onClick={() => setSpacing("compact")}>Compact</button>
          </div>
        </fieldset>
        <p className={styles.labHint}>Keyboard-friendly controls · No tracking · No persistence</p>
      </div>
      <div className={`${styles.labBoard} ${mode === "dark" ? styles.labBoardDark : ""} ${spacing === "compact" ? styles.labBoardCompact : ""}`}>
        <div className={styles.labBoardHeader}><span className={styles.labSampleBadge}>Concept demo · interactive</span><span>UI / 001</span></div>
        <div className={styles.labWindow}>
          <div className={styles.labWindowHeader}><div className={styles.labBrandIcon}>◈</div><div><strong>Workspace overview</strong><small>Sample interface components</small></div><span className={styles.labActive}>● Active</span></div>
          <div className={styles.labStatRow}>
            <div><span>01 / PLAN</span><strong>Discover</strong><small>Clarify constraints</small></div>
            <div><span>02 / BUILD</span><strong>Iterate</strong><small>Make it testable</small></div>
          </div>
          <div className={styles.labTask}>
            <span className={styles.labTaskDot} aria-hidden="true" />
            <div><strong>Review interaction states</strong><p>Focus, contrast, motion, and responsive rhythm.</p></div>
            <span className={styles.labTaskLabel}>IN REVIEW</span>
          </div>
          <button type="button" className={styles.labReveal} aria-expanded={details} onClick={() => setDetails(value => !value)}>
            {details ? "Hide component notes" : "Show component notes"} <span aria-hidden="true">{details ? "−" : "+"}</span>
          </button>
          {details && <p className={styles.labRevealed}>This is a self-contained UI study. Appearance and spacing are local React state, with semantic buttons and clear selected states.</p>}
        </div>
        <div className={styles.labBoardFooter}><span>LIVE COMPONENT PREVIEW</span><span>{mode.toUpperCase()} / {spacing.toUpperCase()}</span></div>
      </div>
    </div>
  );
}
