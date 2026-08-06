import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Responsive project grid — 1 column on mobile, 2 from `md` up.
 * The first two cards get `priority` so their images aren't lazy-loaded.
 */
export function ProjectGrid({
  projects,
  className,
  columns = 2,
}: {
  projects: Project[];
  className?: string;
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={cn(
        "grid gap-6 sm:gap-7",
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {projects.map((project, i) => (
        <Reveal key={project.slug} as="li" delay={(i % 2) * 90} className="flex">
          <ProjectCard project={project} priority={i < 2} className="w-full" />
        </Reveal>
      ))}
    </ul>
  );
}
