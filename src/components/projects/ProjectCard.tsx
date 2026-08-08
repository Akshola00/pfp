import Image from "next/image";
import Link from "next/link";
import { ProjectMockup } from "@/components/projects/ProjectMockup";
import { ArrowUpRight, Fork, Star } from "@/components/ui/Icon";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";
import { cn, compactNumber } from "@/lib/utils";

/**
 * Reusable project card: image on top, content below, lift-and-shadow on hover.
 *
 * Link structure matters here. The whole card is clickable via a "stretched
 * link" on the title (`after:absolute after:inset-0`) rather than by wrapping
 * the card in an <a>, because nesting the GitHub/demo anchors inside another
 * anchor is invalid HTML and breaks keyboard navigation. Those action links
 * sit at `relative z-10` so they stay above the stretched overlay and remain
 * independently clickable and focusable.
 */
export function ProjectCard({
  project,
  priority = false,
  className,
}: {
  project: Project;
  /** Set on above-the-fold cards so their image isn't lazy-loaded. */
  priority?: boolean;
  className?: string;
}) {
  const { links } = project;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-line bg-elevated",
        "transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-1 hover:border-line-strong hover:shadow-xl hover:shadow-black/10",
        "focus-within:border-accent dark:hover:shadow-black/40",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-16/10 w-full overflow-hidden border-b border-line",
          // Portrait captures are letterboxed, so the frame needs its own fill.
          project.imageFit === "contain" && "bg-sunken",
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.tagline}`}
            fill
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className={cn(
              "transition-transform duration-500 group-hover:scale-[1.03]",
              project.imageFit === "contain" ? "object-contain p-3" : "object-cover",
            )}
          />
        ) : (
          <ProjectMockup
            project={project}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        <div className="pointer-events-none absolute top-3 right-3 flex gap-1.5">
          <Tag tone="accent" className="bg-bg/80 backdrop-blur">
            {project.status}
          </Tag>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-[''] hover:text-accent focus-visible:text-accent"
            >
              {project.title}
            </Link>
          </h3>

          {project.openSource && typeof project.stars === "number" && (
            <div className="relative z-10 flex shrink-0 items-center gap-3 font-mono text-xs text-subtle">
              <span className="flex items-center gap-1" title={`${project.stars} GitHub stars`}>
                <Star className="h-3.5 w-3.5 text-accent" />
                {compactNumber(project.stars)}
                <span className="sr-only">stars</span>
              </span>
              {typeof project.forks === "number" && (
                <span className="flex items-center gap-1" title={`${project.forks} forks`}>
                  <Fork className="h-3.5 w-3.5" />
                  {compactNumber(project.forks)}
                  <span className="sr-only">forks</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Plain-English first. The technical description sits underneath it,
            smaller, so engineers still get the signal without it leading. */}
        <p className="mt-2 text-sm leading-snug font-medium text-accent">{project.tagline}</p>
        <p className="mt-1 font-mono text-[0.6875rem] text-subtle">{project.techLine}</p>

        <p className="mt-3.5 text-sm leading-relaxed text-muted">{project.summary}</p>

        {/* Headline numbers — the part a non-technical reader actually scans. */}
        <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
          {project.impact.map((item) => (
            <div key={item.label} className="bg-sunken px-3 py-2.5">
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="block text-base leading-none font-semibold text-fg">
                  {item.value}
                </span>
                <span className="mt-1.5 block text-[0.6875rem] leading-tight text-subtle">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        {/* Pushed to the bottom so cards of different heights line up. */}
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-accent hover:underline"
          >
            Case study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              <SocialIcon icon="github" className="h-3.5 w-3.5" />
              GitHub
              <span className="sr-only">
                — {project.title} repository (opens in a new tab)
              </span>
            </a>
          )}

          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-term-green" aria-hidden="true" />
              Live demo
              <span className="sr-only">— {project.title} (opens in a new tab)</span>
            </a>
          )}

          {!links.demo && links.note && (
            <span className="font-mono text-xs text-subtle">{links.note}</span>
          )}
        </div>
      </div>
    </article>
  );
}
