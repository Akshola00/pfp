import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <Section id="projects" className="border-t border-line">
      <SectionHeading
        id="projects"
        index="03"
        kicker="selected work"
        title="Things I've built and shipped"
        description="Real products with real users, plus open-source tools other developers build on. Each one has a full write-up: what it does, who it's for, and what it achieved."
        action={
          <ButtonLink href="/projects" variant="secondary" size="sm">
            All projects
            <ArrowRight className="h-3.5 w-3.5" />
          </ButtonLink>
        }
      />

      <ProjectGrid projects={featuredProjects.slice(0, 4)} />
    </Section>
  );
}
