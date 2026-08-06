"use client";

import { useSyncExternalStore } from "react";

/**
 * Browser-state hooks built on useSyncExternalStore.
 *
 * These read values that only exist on the client (media queries, scroll
 * position, the theme class). useSyncExternalStore is the right tool rather
 * than useState + useEffect: it subscribes to the external source directly,
 * takes an explicit server snapshot so SSR and hydration agree, and avoids the
 * cascading render that setting state in an effect causes.
 */

/** Tracks a CSS media query. Server snapshot is the query's "off" state. */
export function useMediaQuery(query: string, serverSnapshot = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  );
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 12) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}

/**
 * Mirrors the `dark` class on <html>, which ThemeScript sets before paint.
 * A MutationObserver keeps it in sync no matter what flipped the class.
 * Server snapshot is null so the toggle can render a neutral placeholder
 * instead of guessing and causing a hydration mismatch.
 */
export function useThemeClass(): "light" | "dark" | null {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => (document.documentElement.classList.contains("dark") ? "dark" : "light"),
    () => null,
  );
}
