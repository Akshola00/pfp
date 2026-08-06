import { CodeBlock } from "@/components/ui/TerminalWindow";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Generated stand-in for a project screenshot.
 *
 * Renders whenever a project has no `image`, so the grid never shows a broken
 * or missing thumbnail. Drop a real screenshot into /public/projects/ and set
 * `image` in data/projects.ts and this is replaced by an optimised next/image.
 *
 * Strictly flat: per-project identity comes from a solid accent rule and the
 * accent-tinted chrome, never a colour wash. Purely decorative — the card
 * already exposes the title and description.
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

      <div className="relative flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="ml-2 truncate font-mono text-[0.625rem] text-subtle">
            {project.slug}/{project.snippet.lang === "rust" ? "src/lib.rs" : "src/index.ts"}
          </span>
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-lg border border-line bg-bg p-3">
          <CodeBlock code={project.snippet.code} className="text-[0.5625rem] sm:text-[0.625rem]" />
        </div>

        <div className="mt-3 flex items-center justify-between font-mono text-[0.625rem] text-subtle">
          <span style={{ color: accent }}>{project.snippet.lang}</span>
          <span>{project.status}</span>
        </div>
      </div>
    </div>
  );
}
