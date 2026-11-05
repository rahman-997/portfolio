"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PROJECT_LIST } from "./portfolio-data";
import { filterProjects, PROJECT_AREAS } from "./project-filters.mjs";
import styles from "./home.module.css";

const filters = [
  { id: "all", label: "All projects" },
  { id: "product", label: "Product" },
  { id: "backend", label: "Backend" },
  { id: "reliability", label: "Reliability" },
  { id: "offline", label: "Offline / PWA" },
] as const;

/** Project discovery with a server-rendered starting state and client-side enhancements. */
export default function ProjectExplorer() {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterProjects(PROJECT_LIST, category, query), [category, query]);

  function resetFilters() {
    setCategory("all");
    setQuery("");
  }

  return (
    <div className={styles.explorerInner}>
      <div className={styles.explorerControls}>
        <label className={styles.explorerSearch}>
          <span className={styles.explorerSearchIcon} aria-hidden="true">⌕</span>
          <span className={styles.visuallyHidden}>Search projects</span>
          <input
            type="search"
            aria-label="Search projects"
            placeholder="Search projects, tools, and problems…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className={styles.explorerFilters} role="group" aria-label="Filter projects by focus area">
          {filters.map((option) => (
            <button
              type="button"
              className={styles.explorerFilter}
              key={option.id}
              aria-pressed={category === option.id}
              onClick={() => setCategory(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.explorerMeta} aria-live="polite" role="status">
        <span>{results.length} {results.length === 1 ? "project" : "projects"} matched</span>
        <span>CURATED / REAL REPOSITORIES</span>
      </div>
      {results.length > 0 ? (
        <div className={styles.explorerGrid}>
          {results.map((project) => (
            <article className={styles.explorerCard} key={project.slug}>
              <div className={styles.explorerCardTop}>
                <span className={styles.explorerIndex}>{project.index} / 04</span>
                <span className={styles.explorerAreas}>
                  {PROJECT_AREAS[project.slug]?.slice(0, 2).join(" · ")}
                </span>
              </div>
              <div className={styles.explorerCardSymbol} aria-hidden="true"><span>{project.name.slice(0, 2).toUpperCase()}</span></div>
              <h3>{project.name}</h3>
              <p>{project.thesis}</p>
              <div className={styles.explorerTech}>
                {project.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <div className={styles.explorerCardLinks}>
                <Link href={`/work/${project.slug}/`}>Case study <span aria-hidden="true">↗</span></Link>
                <a href={project.source} target="_blank" rel="noopener noreferrer">Source <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.explorerEmpty}>
          <strong>No matching projects</strong>
          <p>Try another technology, topic, or focus area.</p>
          <button type="button" onClick={resetFilters}>Clear filters</button>
        </div>
      )}
    </div>
  );
}
