import { cn } from "@/lib/utils";

/** Tech-stack chip. Mono type is what makes it read as "code", not "marketing". */
export function Tag({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[0.6875rem] tracking-tight whitespace-nowrap",
        tone === "default" && "border-line bg-sunken text-muted",
        tone === "accent" && "border-accent/30 bg-accent-soft text-accent",
        tone === "muted" && "border-transparent bg-sunken text-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Status pill with an optional live dot (used for "Open to work", "Live"). */
export function StatusPill({
  children,
  live = false,
  className,
}: {
  children: React.ReactNode;
  live?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-elevated/80 px-3 py-1 font-mono text-xs text-muted backdrop-blur",
        className,
      )}
    >
      {live && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-term-green opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-term-green" />
        </span>
      )}
      {children}
    </span>
  );
}
