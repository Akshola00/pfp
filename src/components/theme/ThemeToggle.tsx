"use client";

import { Moon, Sun } from "@/components/ui/Icon";
import { useThemeClass } from "@/lib/client-hooks";

/**
 * The `dark` class is already on <html> before hydration (see ThemeScript), so
 * this component reads that class as its source of truth rather than holding
 * its own copy of the theme. Clicking flips the class and persists the choice;
 * the MutationObserver in useThemeClass re-renders the icon.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useThemeClass();

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}
    >
      {/* Neutral placeholder until the client knows the theme — avoids a
          hydration mismatch on the icon. */}
      {theme === null ? (
        <span className="h-4 w-4" aria-hidden="true" />
      ) : theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
