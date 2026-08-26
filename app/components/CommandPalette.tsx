"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./command-palette.module.css";

type CommandId = "work" | "expertise" | "about" | "resume" | "github" | "linkedin";

type Command = {
  id: CommandId;
  label: string;
  description: string;
  keywords: string;
};

const commands: readonly Command[] = [
  {
    id: "work",
    label: "Selected work",
    description: "Open the featured engineering projects.",
    keywords: "projects work eventify bookhaven fitflow venues",
  },
  {
    id: "expertise",
    label: "Technical expertise",
    description: "Review the full-stack, backend, data, and AI capability map.",
    keywords: "skills expertise stack backend frontend ai data",
  },
  {
    id: "about",
    label: "About Abdulrahman",
    description: "Read the engineering profile and current direction.",
    keywords: "about profile education university istanbul",
  },
  {
    id: "resume",
    label: "Open résumé",
    description: "View the recruiter-facing web résumé.",
    keywords: "resume cv experience education skills",
  },
  {
    id: "github",
    label: "GitHub profile",
    description: "Browse source code and engineering repositories.",
    keywords: "github source code repositories",
  },
  {
    id: "linkedin",
    label: "LinkedIn profile",
    description: "Connect with Abdulrahman Hajar on LinkedIn.",
    keywords: "linkedin contact connect career",
  },
] as const;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function CommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  }, []);

  const openPalette = useCallback(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    close();
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }, [close]);

  const runCommand = useCallback((id: CommandId) => {
    switch (id) {
      case "work":
      case "expertise":
      case "about":
        scrollToSection(id);
        break;
      case "resume":
        close();
        router.push("/resume/");
        break;
      case "github":
        close();
        window.open("https://github.com/rahman-997", "_blank", "noopener,noreferrer");
        break;
      case "linkedin":
        close();
        window.open("https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/", "_blank", "noopener,noreferrer");
        break;
    }
  }, [close, router, scrollToSection]);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return commands;

    return commands.filter((command) =>
      `${command.label} ${command.description} ${command.keywords}`.toLowerCase().includes(value),
    );
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else openPalette();
        return;
      }

      if (!typing && event.key === "/") {
        event.preventDefault();
        openPalette();
        return;
      }

      if (event.key === "Escape" && open) close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open, openPalette]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const trapFocus = useCallback((event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter(
      (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <>
      <button className={styles.trigger} type="button" onClick={openPalette} aria-label="Open quick navigation">
        <span>Quick nav</span>
        <kbd>Ctrl/⌘ K</kbd>
      </button>

      {open && (
        <div className={styles.backdrop} role="presentation" onMouseDown={close}>
          <section
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            onKeyDown={trapFocus}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.searchRow}>
              <span aria-hidden="true">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && filtered[0]) runCommand(filtered[0].id);
                }}
                placeholder="Search work, skills, résumé..."
                aria-label="Search portfolio navigation"
              />
              <kbd>ESC</kbd>
            </div>

            <div className={styles.results} aria-live="polite">
              <p className={styles.label}>NAVIGATE</p>
              {filtered.length > 0 ? (
                filtered.map((command) => (
                  <button type="button" key={command.id} onClick={() => runCommand(command.id)}>
                    <span>
                      <strong>{command.label}</strong>
                      <small>{command.description}</small>
                    </span>
                    <span className={styles.arrow} aria-hidden="true">↗</span>
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
