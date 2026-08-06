import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Full-stack and backend engineering projects by ${site.name} — on-chain protocols, Rust APIs and production products, each with a detailed case study.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects · ${site.name}`,
    description: `On-chain protocols, Rust APIs and production products — each with a detailed case study.`,
    url: "/projects",
  },
};

/** Deduped stack list, used as a quick "what's in here" summary. */
const allTech = [...new Set(projects.flatMap((p) => p.stack))].sort();

export default function ProjectsPage() {
  return (
    <>
      <section aria-labelledby="projects-page-heading" className="border-b border-line">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="text-subtle tabular-nums">/projects</span>
            <span className="h-px w-6 bg-accent/50" aria-hidden="true" />
            <span>{projects.length} shipped</span>
          </div>

          <h1
            id="projects-page-heading"
            className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Protocols, backends and products I&apos;ve built
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Every project here has a case study covering the problem, the architecture, the parts
            that were genuinely hard, and what came out the other side. Source is linked wherever
            it&apos;s public.
          </p>

          <ul className="mt-8 flex flex-wrap gap-1.5">
            {allTech.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page py-16 sm:py-20">
        <ProjectGrid projects={projects} />

        <Reveal className="mt-16 rounded-xl border border-line bg-elevated p-8 text-center sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Got something you need built?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted">
            I&apos;m open to freelance work, full-time backend and systems roles, and consulting on
            Rust services or smart contract architecture.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/#contact">
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/#experience" variant="secondary">
              See my experience
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </>
  );
}
