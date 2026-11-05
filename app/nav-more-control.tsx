"use client";

import { useEffect } from "react";

/** Enhance the native disclosure without replacing its no-JS navigation. */
export default function NavMoreControl() {
  useEffect(() => {
    const menu = document.querySelector<HTMLDetailsElement>("details[data-desktop-more]");
    if (!menu) return;

    function close() {
      if (menu) menu.open = false;
    }
    function onPointerDown(event: PointerEvent) {
      if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) close();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && menu?.open) {
        close();
        menu.querySelector("summary")?.focus();
        event.stopPropagation();
      }
    }
    function onClick(event: MouseEvent) {
      if (event.target instanceof Element && event.target.closest("a")) close();
    }

    document.addEventListener("pointerdown", onPointerDown);
    menu.addEventListener("keydown", onKeyDown);
    menu.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      menu.removeEventListener("keydown", onKeyDown);
      menu.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
