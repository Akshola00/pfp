"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/client-hooks";

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 1600;

/**
 * Types each role out, holds, deletes, moves on.
 *
 * Accessibility: the animated text is aria-hidden (a screen reader announcing
 * one character at a time is unusable) and the full list is exposed once,
 * statically, in an sr-only node. Users who ask for reduced motion get the
 * first role rendered plainly, with no timers running at all.
 */
export function TypingRoles({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Server snapshot is `true` so SSR renders the static role and hydration matches.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", true);

  useEffect(() => {
    if (reducedMotion) return;

    const role = roles[index];
    const finishedTyping = !deleting && text === role;
    const finishedDeleting = deleting && text === "";

    // Every state change happens inside the timeout, never in the effect body.
    const timer = setTimeout(
      () => {
        if (finishedTyping) {
          setDeleting(true);
        } else if (finishedDeleting) {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        } else {
          setText(deleting ? role.slice(0, text.length - 1) : role.slice(0, text.length + 1));
        }
      },
      finishedTyping ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS,
    );

    return () => clearTimeout(timer);
  }, [reducedMotion, deleting, index, roles, text]);

  return (
    <span className="relative inline-block align-bottom">
      {/* Invisible sizer: reserves the width of the longest role so the layout
          never shifts as characters are typed. */}
      <span className="invisible block whitespace-nowrap" aria-hidden="true">
        {roles.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      <span
        className="absolute inset-0 flex items-center whitespace-nowrap text-accent"
        aria-hidden="true"
      >
        {reducedMotion ? roles[0] : text}
        {!reducedMotion && <span className="caret ml-0.5" />}
      </span>

      <span className="sr-only">{roles.join(", ")}</span>
    </span>
  );
}
