"use client";

import { useRef, useState } from "react";
import { BRIEF_TRACKS, BRIEF_STAGES, BRIEF_PRIORITIES, createBrief } from "./brief-utils.mjs";
import type { BriefTrack, BriefStage, BriefPriority } from "./brief-utils.mjs";
import styles from "./home.module.css";

/** A local-only collaboration prompt: visitors can copy, not submit or auto-send. */
export default function BriefStudio() {
  const [track, setTrack] = useState<BriefTrack>("product");
  const [stage, setStage] = useState<BriefStage>("idea");
  const [priority, setPriority] = useState<BriefPriority>("accessibility");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const brief = createBrief({ track, stage, priority, details });

  async function copyBrief() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(brief);
      setStatus("Copied. You can paste this brief into a message.");
    } catch {
      previewRef.current?.focus();
      previewRef.current?.select();
      setStatus("Text selected. Press Ctrl+C (or Command+C on Mac) to copy it.");
    }
  }

  return (
    <div className={styles.briefLayout}>
      <div className={styles.briefForm}>
        <div className={styles.briefFormHeader}><span>01 / YOUR CONTEXT</span><span>PRIVATE UNTIL YOU SHARE IT</span></div>
        <div className={styles.briefFields}>
          <div className={styles.briefField}>
            <label htmlFor="brief-track">What are you building?</label>
            <select id="brief-track" value={track} onChange={(event) => { setTrack(event.target.value as BriefTrack); setStatus(""); }}>
              {BRIEF_TRACKS.map(item => <option value={item.id} key={item.id}>{item.label}</option>)}
            </select>
          </div>
          <div className={styles.briefField}>
            <label htmlFor="brief-stage">Where are you now?</label>
            <select id="brief-stage" value={stage} onChange={(event) => { setStage(event.target.value as BriefStage); setStatus(""); }}>
              {BRIEF_STAGES.map(item => <option value={item.id} key={item.id}>{item.label}</option>)}
            </select>
          </div>
          <div className={styles.briefField}>
            <label htmlFor="brief-priority">What matters most?</label>
            <select id="brief-priority" value={priority} onChange={(event) => { setPriority(event.target.value as BriefPriority); setStatus(""); }}>
              {BRIEF_PRIORITIES.map(item => <option value={item.id} key={item.id}>{item.label}</option>)}
            </select>
          </div>
          <div className={styles.briefField}>
            <label htmlFor="brief-details">A little context <span>(optional)</span></label>
            <textarea id="brief-details" rows={3} maxLength={240} placeholder="Describe the challenge in a sentence or two…" value={details} onChange={(event) => { setDetails(event.target.value); setStatus(""); }} />
            <small>{details.length} / 240 characters</small>
          </div>
        </div>
        <div className={styles.briefPrivacy}>Nothing is uploaded or saved. The brief is generated on this page only.</div>
      </div>
      <div className={styles.briefPreview}>
        <div className={styles.briefPreviewHead}><span>02 / LIVE PREVIEW</span><span className={styles.briefPreviewDot} aria-hidden="true" /></div>
        <h3>A clearer first conversation.</h3>
        <p>Start with the problem, the stage, and what you need to get right.</p>
        <textarea id="brief-preview" ref={previewRef} aria-label="Generated project brief" className={styles.briefOutput} value={brief} readOnly rows={9} spellCheck={false} />
        <button type="button" onClick={copyBrief} className={styles.briefCopy}>Copy project brief <span aria-hidden="true">↗</span></button>
        <p className={styles.briefStatus} role="status" aria-live="polite">{status || "Preview updates as you make choices."}</p>
      </div>
    </div>
  );
}
