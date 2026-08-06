import { cn } from "@/lib/utils";

/**
 * Every top-level page region. Renders a real <section> with an id so the nav
 * anchors work, and labels it by its heading for screen-reader navigation.
 */
export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Defaults to `${id}-heading`, which SectionHeading sets. */
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? `${id}-heading`}
      className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-32", className)}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/**
 * Numbered, terminal-flavoured section header.
 * `index` renders as the mono counter (01, 02, …).
 */
export function SectionHeading({
  id,
  index,
  kicker,
  title,
  description,
  action,
}: {
  /** Section id — the h2 gets `${id}-heading`. */
  id: string;
  index?: string;
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-accent uppercase">
        {index && <span className="text-subtle tabular-nums">{index}</span>}
        <span className="h-px w-6 bg-accent/50" aria-hidden="true" />
        <span>{kicker}</span>
      </div>

      <div
        className={cn(
          "mt-4 gap-6",
          action ? "flex flex-col sm:flex-row sm:items-end sm:justify-between" : "block",
        )}
      >
        <div>
          <h2
            id={`${id}-heading`}
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}
