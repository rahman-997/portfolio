"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECT_LIST } from "./portfolio-data";
import { compareProjects, normalizeComparisonSelection } from "./portfolio-lenses.mjs";
import styles from "./home.module.css";

/** A direct comparison of documented case studies, without speculative scores. */
export default function ProjectCompare() {
  const [leftSlug, setLeftSlug] = useState<string>(PROJECT_LIST[0].slug);
  const [rightSlug, setRightSlug] = useState<string>(PROJECT_LIST[1].slug);
  const [left, right] = compareProjects(PROJECT_LIST, leftSlug, rightSlug);

  function chooseLeft(slug: string) {
    const [first, second] = normalizeComparisonSelection(PROJECT_LIST, slug, slug === rightSlug ? "" : rightSlug);
    setLeftSlug(first);
    setRightSlug(second);
  }

  function chooseRight(slug: string) {
    setRightSlug(slug);
    if (slug === leftSlug) {
      const replacement = PROJECT_LIST.find(project => project.slug !== slug);
      if (replacement) setLeftSlug(replacement.slug);
    }
  }

  if (!left || !right) return null;

  return (
    <div className={styles.comparisonShell}>
      <div className={styles.comparisonControls}>
        <div>
          <label htmlFor="compare-left">First project</label>
          <select id="compare-left" value={left.slug} onChange={event => chooseLeft(event.target.value)}>
            {PROJECT_LIST.map(project => <option key={project.slug} value={project.slug}>{project.name}</option>)}
          </select>
        </div>
        <span className={styles.compareVersus} aria-hidden="true">VS</span>
        <div>
          <label htmlFor="compare-right">Second project</label>
          <select id="compare-right" value={right.slug} onChange={event => chooseRight(event.target.value)}>
            {PROJECT_LIST.map(project => <option key={project.slug} value={project.slug}>{project.name}</option>)}
          </select>
        </div>
      </div>
      <p className={styles.comparisonStatus} role="status" aria-live="polite">Comparing {left.name} and {right.name}</p>
      <div className={styles.comparisonGrid}>
        {[left, right].map((project, index) => (
          <article key={project.slug} className={styles.comparisonCard}>
            <div className={styles.compareCardTop}><span>0{index + 1} / CASE FILE</span><span>{project.label}</span></div>
            <h3>{project.name}</h3>
            <div className={styles.comparisonFacts}>
              <div><strong>THE CHALLENGE</strong><p>{project.problem}</p></div>
              <div><strong>THE APPROACH</strong><p>{project.solution}</p></div>
              <div><strong>WHAT TO INSPECT</strong><ul>{project.proof.slice(0, 3).map(point => <li key={point}>{point}</li>)}</ul></div>
              <div><strong>TECHNOLOGIES</strong><div className={styles.compareChips}>{project.stack.slice(0, 6).map(tech => <span key={tech}>{tech}</span>)}</div></div>
            </div>
            <div className={styles.comparisonLinks}>
              <Link href={`/work/${project.slug}/`}>Case study ↗</Link>
              <a href={project.source} target="_blank" rel="noopener noreferrer">Source ↗</a>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.comparisonNote}>Comparison uses documented project descriptions, not performance rankings or unverified live metrics.</p>
    </div>
  );
}
