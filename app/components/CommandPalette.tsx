"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./command-palette.module.css";

type Command = {
  label: string;
  description: string;
  keywords: string;
  shortcut?: string;
  action: () => void;
};

export default function CommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const scrollTo = (id: string) => {
    close();
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const commands: Command[] = useMemo(
    () => [
      {
        label: "Selected work",
        description: "Open the featured engineering projects.",
        keywords: "projects work eventify bookhaven fitflow venues",
        shortcut: "W",
        action: () => scrollTo("work"),
      },
      {
        label: "Technical expertise",
        description: "Review the full-stack, backend, data, and AI capability map.",
        keywords: "skills expertise stack backend frontend ai data",
        shortcut: "E",
        action: () => scrollTo("expertise"),
      },
      {
        label: "About Abdulrahman",
        description: "Read the engineering profile and current direction.",
        keywords: "about profile education university istanbul",
        shortcut: "A",
        action: () => scrollTo("about"),
      },
      {
        label: "Open résumé",
        description: "View the recruiter-facing web résumé.",
        keywords: "resume cv experience education skills",
        shortcut: "R",
        action: () => {
          close();
          router.push("/resume/");
        },
      },
      {
        label: "GitHub profile",
        description: "Browse source code and engineering repositories.",
        keywords: "github source code repositories",
        action: () => {
          close();
          window.open("https://github.com/rahman-997", "_blank", "noopener,noreferrer");
        },
      },
      {
        label: "LinkedIn profile",
        description: "Connect with Abdulrahman Hajar on LinkedIn.",
        keywords: "linkedin contact connect career",
        action: () => {
          close();
          window.open("https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/", "_blank", "noopener,noreferrer");
        },
      },
    ],
    [router],
  );

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return commands;

    return commands.filter((command) =>
      `${command.label} ${command.description} ${command.keywords}`.toLowerCase().includes(value),
    );
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }

      if (!typing && event.key === "/") {
        event.preventDefault();
        setOpen(true);
        return;
      }

      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button className={styles.trigger} type="button" onClick={() => setOpen(true)} aria-label="Open quick navigation">
        <span>Quick nav</span>
        <kbd>⌘K</kbd>
      </button>

      {open && (
        <div className={styles.backdrop} role="presentation" onMouseDown={close}>
          <section
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.searchRow}>
              <span aria-hidden="true">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && filtered[0]) filtered[0].action();
                }}
                placeholder="Search work, skills, résumé..."
                aria-label="Search portfolio navigation"
              />
              <kbd>ESC</kbd>
            </div>

            <div className={styles.results}>
              <p className={styles.label}>NAVIGATE</p>
              {filtered.length > 0 ? (
                filtered.map((command) => (
                  <button type="button" key={command.label} onClick={command.action}>
                    <span>
                      <strong>{command.label}</strong>
                      <small>{command.description}</small>
                    </span>
                    {command.shortcut ? <kbd>{command.shortcut}</kbd> : <span className={styles.arrow}>↗</span>}
                  </button>
                ))
              ) : (
                <div className={styles.empty}>No matching destination. Try “work”, “backend”, or “resume”.</div>
              )}
            </div>

            <footer className={styles.footer}>
              <span><kbd>↵</kbd> open first result</span>
              <span><kbd>/</kbd> open anywhere</span>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
