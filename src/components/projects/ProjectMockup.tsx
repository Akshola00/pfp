import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Generated stand-in for a project screenshot.
 *
 * Renders whenever a project has no `image`, so the grid never shows a broken
 * or missing thumbnail. Drop a real screenshot into /public/projects/ and set
 * `image` in data/projects.ts and this is replaced by an optimised next/image.
 *
 * Deliberately shows the project's name, plain-English pitch and headline
 * numbers — not code. A wall of Rust as a thumbnail reads as noise to the
 * recruiters and founders who make up most of this site's audience.
 *
 * Strictly flat: per-project identity comes from a solid accent rule, never a
 * colour wash. Purely decorative — the card already exposes all of this text.
 */
export function ProjectMockup({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const { accent } = project;

  return (
    <div
      aria-hidden="true"
      className={cn("relative h-full w-full overflow-hidden bg-sunken", className)}
    >
      {/* Fine grid — hard-stop 1px rules, matches the page's blueprint motif. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Solid accent rule — the one piece of per-project colour. */}
      <div className="absolute inset-x-0 top-0 h-0.5" style={{ backgroundColor: accent }} />

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span className="font-mono text-[0.625rem] tracking-widest text-subtle uppercase">
              {project.status}
            </span>
          </div>

          <p className="mt-3 text-lg leading-tight font-semibold tracking-tight text-fg sm:text-xl">
            {project.title}
          </p>
          <p className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">{project.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {project.impact.slice(0, 3).map((item) => (
            <div key={item.label}>
              <span className="block text-sm leading-none font-semibold sm:text-base" style={{ color: accent }}>
                {item.value}
              </span>
              <span className="mt-1 block text-[0.625rem] leading-tight text-subtle">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
