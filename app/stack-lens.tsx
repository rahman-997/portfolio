"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECT_LIST } from "./portfolio-data";
import { buildStackIndex } from "./portfolio-lenses.mjs";
import styles from "./home.module.css";

const technologies = buildStackIndex(PROJECT_LIST);

/** Visual connection between technologies and projects that actually list them. */
export default function StackLens() {
  const [selected, setSelected] = useState(technologies[0]?.name ?? "");
  const selection = technologies.find(item => item.name === selected);
  const related = PROJECT_LIST.filter(project => selection?.projects.includes(project.slug));

  return (
    <div className={styles.lensLayout}>
      <div className={styles.lensCatalog}>
        <div className={styles.lensCatalogTop}><span>TECHNOLOGY INDEX</span><span>{technologies.length} tools</span></div>
        <div className={styles.lensChips} role="group" aria-label="Select a technology">
          {technologies.map(technology => (
            <button key={technology.name} type="button" aria-pressed={selected === technology.name} className={styles.lensChip} onClick={() => setSelected(technology.name)}>
              <span>{technology.name}</span><small>{technology.projects.length}</small>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.lensDetail}>
        <p className={styles.lensEyebrow}>CONNECTED CASE STUDIES <span aria-hidden="true">↗</span></p>
        <h3>{selected}</h3>
        <p className={styles.lensDescription}>Projects that explicitly list this technology in their documented stack. Select another tool to trace its connections.</p>
        <div className={styles.lensResults} aria-live="polite" aria-atomic="true">
          {related.map((project, index) => (
            <Link key={project.slug} href={`/work/${project.slug}/`} className={styles.lensResult}>
              <span>0{index + 1}</span><strong>{project.name}</strong><small>{project.label}</small><b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
        <p className={styles.lensFoot}>{related.length} of {PROJECT_LIST.length} featured projects use {selected}.</p>
      </div>
    </div>
  );
}
