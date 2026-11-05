"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./home.module.css";

/** A native, keyboard-friendly disclosure that also closes after navigation. */
export default function MobileNav() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target) && menuRef.current) {
        menuRef.current.open = false;
      }
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  return (
    <details className={styles.mobileMenu} ref={menuRef} onKeyDown={(event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuRef.current?.querySelector("summary")?.focus();
      }
    }}>
      <summary aria-label="Navigation menu">
        <span className={styles.menuIcon} aria-hidden="true"><i /><i /><i /></span>
        Menu
      </summary>
      <nav aria-label="Mobile navigation" onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) closeMenu();
      }}>
        <h2 className={styles.mobileNavGroup}>Featured</h2>
        <a href="#work">Selected work</a>
        <a href="#explorer">Project explorer</a>
        <a href="#ai-lab">AI Lab</a>
        <a href="#solutions">Solution routes</a>
        <a href="#compare">Compare projects</a>
        <a href="#stack-lens">Stack connections</a>
        <a href="#interface-lab">Interface lab</a>
        <h2 className={styles.mobileNavGroup}>Engineering</h2>
        <a href="#expertise">Expertise</a>
        <a href="#systems">Systems</a>
        <a href="#decisions">Decision files</a>
        <a href="#quality-lab">Quality lab</a>
        <a href="#process">Process</a>
        <a href="#about">About</a>
        <a href="#faq">FAQ</a>
        <h2 className={styles.mobileNavGroup}>Connect</h2>
        <a href="#start-here">Start here</a>
        <a href="#brief-studio">Brief studio</a>
        <a href="#contact">Contact</a>
        <Link href="/resume/">Résumé</Link>
      </nav>
    </details>
  );
}
