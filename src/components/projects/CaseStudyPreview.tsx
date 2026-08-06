import Link from "next/link";
import { ProjectMockup } from "@/components/projects/ProjectMockup";
import { ArrowRight } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";

/**
 * Compact horizontal card linking into a case study. Used for the
 * "more case studies" rail at the bottom of a case-study page.
 *
 * Only one link here, so the whole card is a single <Link> — no stretched-link
 * trick needed (unlike ProjectCard, which has nested actions).
 */
export function CaseStudyPreview({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-elevated transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-black/10 sm:flex-row dark:hover:shadow-black/30"
    >
      <div className="relative aspect-16/10 w-full shrink-0 border-b border-line sm:aspect-auto sm:w-44 sm:border-r sm:border-b-0">
        <ProjectMockup project={project} />
      </div>

      <div className="flex flex-1 flex-col justify-center p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="accent">{project.status}</Tag>
          <span className="font-mono text-[0.6875rem] text-subtle">{project.period}</span>
        </div>

        <h3 className="mt-2.5 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{project.tagline}</p>

        <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-accent">
          Read case study
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
