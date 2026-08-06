"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Close, Menu } from "@/components/ui/Icon";
import { navLinks, site } from "@/data/site";
import { useScrolled } from "@/lib/client-hooks";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Solid background once the page has scrolled past the hero's top edge.
  const scrolled = useScrolled(12);

  // Close the menu on navigation. Adjusting state during render (rather than in
  // an effect) is React's recommended pattern for reacting to a changed prop —
  // it avoids the extra render pass an effect would cause.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // While the mobile menu is open: lock scroll, close on Escape, and trap focus
  // inside the panel so keyboard users can't tab into the page behind it.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium"
          aria-label={`${site.name} — home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong bg-elevated text-xs font-semibold text-accent transition-colors group-hover:border-accent">
            {site.initials}
          </span>
          <span className="hidden sm:inline">
            <span className="text-accent">~/</span>
            <span className="text-fg">{site.shortName.toLowerCase()}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 font-mono text-[0.8125rem] transition-colors",
                isActive(link.href)
                  ? "text-accent"
                  : "text-muted hover:bg-elevated hover:text-fg",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="hidden h-9 items-center rounded-lg border border-accent bg-accent px-4 font-mono text-[0.8125rem] font-medium text-accent-fg transition hover:brightness-110 sm:inline-flex"
          >
            Get in touch
          </Link>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            {open ? <Close className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel. Rendered only when open so its links stay out of the tab order otherwise. */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="border-t border-line bg-bg/95 backdrop-blur-xl md:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 border-b border-line py-3.5 font-mono text-sm text-fg transition-colors hover:text-accent"
                  >
                    <span className="text-xs text-subtle tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-5 flex h-11 items-center justify-center rounded-lg bg-accent font-mono text-sm font-medium text-accent-fg"
            >
              Get in touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
