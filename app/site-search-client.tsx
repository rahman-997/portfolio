"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { searchItems, shouldOpenSearch, moveSelection } from "./site-search.mjs";
import type { SearchEntry } from "./site-search.mjs";
import styles from "./site-search.module.css";

/** Site-wide project/section navigation. All search is in-memory, with no tracking. */
export default function SiteSearchClient({ items }: { items: readonly SearchEntry[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const results = useMemo(() => searchItems(items, query, 8), [items, query]);
  const selected = results.length ? Math.min(active, results.length - 1) : 0;

  function openSearch() {
    if (!isOpen) lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActive(0);
    setIsOpen(true);
  }

  function closeSearch() {
    setIsOpen(false);
    lastFocus.current?.focus();
  }

  useEffect(() => {
    function onShortcut(event: globalThis.KeyboardEvent) {
      if (event.defaultPrevented) return;
      const target = event.target;
      const editable = target instanceof HTMLElement && Boolean(target.closest('input, textarea, select, [contenteditable="true"], [contenteditable=""], [role="textbox"]'));
      if (!shouldOpenSearch({ key: event.key, ctrlKey: event.ctrlKey, metaKey: event.metaKey, altKey: event.altKey, editable })) return;
      event.preventDefault();
      if (!isOpen) {
        lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setQuery("");
        setActive(0);
        setIsOpen(true);
      }
    }
    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = before; };
  }, [isOpen]);

  function onDialogKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive(moveSelection(selected, results.length, event.key === "ArrowDown" ? 1 : -1));
      inputRef.current?.focus();
      return;
    }
    if (event.key === "Enter" && results.length && document.activeElement === inputRef.current) {
      event.preventDefault();
      document.getElementById(`site-result-${selected}`)?.click();
      return;
    }
    if (event.key === "Tab") {
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('input, button:not([disabled]), a[href]');
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <>
      <button type="button" className={styles.floatingTrigger} onClick={openSearch} aria-keyshortcuts="Control+K Meta+K" aria-haspopup="dialog">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.8" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        <span>Search site</span><kbd>⌘ K</kbd>
      </button>
      {isOpen && (
        <div className={styles.overlay}>
          <button className={styles.backdrop} type="button" aria-label="Close search" onClick={closeSearch} tabIndex={-1} />
          <section role="dialog" aria-modal="true" aria-labelledby="site-search-title" className={styles.dialog} ref={dialogRef} onKeyDown={onDialogKeyDown}>
            <div className={styles.heading}>
              <div><p className={styles.eyebrow}>QUICK NAVIGATION</p><h2 id="site-search-title">Search portfolio</h2></div>
              <button className={styles.closeButton} type="button" onClick={closeSearch} aria-label="Close search dialog">✕</button>
            </div>
            <div className={styles.inputWrap}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.7" cy="10.7" r="6.8" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              <input
                ref={inputRef}
                type="search"
                role="combobox"
                aria-label="Search sections and projects"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls="site-search-results"
                aria-activedescendant={results.length ? `site-result-${selected}` : undefined}
                value={query}
                placeholder="Try Redis, testing, résumé, Eventify…"
                onChange={event => { setQuery(event.target.value); setActive(0); }}
                autoComplete="off"
              />
              <span className={styles.escapeHint}>ESC</span>
            </div>
            <div className={styles.resultSummary} role="status" aria-live="polite">
              {results.length ? `${query.trim() ? "Matches" : "Suggested destinations"} · ${results.length} shown` : "No matching destinations"}
            </div>
            <div id="site-search-results" role="listbox" aria-label="Search results" className={styles.results}>
              {results.length ? results.map((item, index) => (
                <a
                  key={item.href}
                  id={`site-result-${index}`}
                  className={styles.result}
                  data-active={selected === index}
                  href={item.href}
                  role="option"
                  aria-selected={selected === index}
                  onMouseEnter={() => setActive(index)}
                  onClick={closeSearch}
                >
                  <span className={styles.resultGlyph} aria-hidden="true">{item.kind === "project" ? "◇" : item.kind === "page" ? "▤" : "↗"}</span>
                  <span className={styles.resultCopy}><strong>{item.title}</strong><small>{item.description}</small></span>
                  <span className={styles.resultType}>{item.kind}</span>
                </a>
              )) : (
                <div className={styles.emptyState}><strong>Nothing found</strong><p>Try a technology, project name or section.</p></div>
              )}
            </div>
            <div className={styles.footer}><span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span><span><kbd>Esc</kbd> Close</span><span>Local search · no data sent</span></div>
          </section>
        </div>
      )}
    </>
  );
}
