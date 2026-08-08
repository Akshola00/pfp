import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyPreview } from "@/components/projects/CaseStudyPreview";
import { ProjectMockup } from "@/components/projects/ProjectMockup";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, ArrowUpRight, Fork, Star } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Tag } from "@/components/ui/Tag";
import { CodeBlock, TerminalWindow } from "@/components/ui/TerminalWindow";
import { getProjectBySlug, projects } from "@/data/projects";
import { site } from "@/data/site";

/** Pre-renders every case study at build time — each page is fully static. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Unknown slugs 404 instead of rendering an empty shell. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const description = `${project.tagline}. ${project.outcome}`;

  return {
    title: `${project.title} — Case Study`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — Case Study · ${site.name}`,
      description,
      url: `/projects/${project.slug}`,
      ...(project.image && { images: [{ url: project.image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description,
    },
  };
}

/**
 * Order matters: impact lands before any technical detail, because most readers
 * here are recruiters and founders who want the outcome, not the architecture.
 * `technical: true` sections sit below a divider they can stop at.
 */
const sections = [
  { id: "overview", label: "What it is" },
  { id: "problem", label: "The problem" },
  { id: "results", label: "The impact" },
  { id: "approach", label: "What I built" },
  { id: "architecture", label: "How it works", technical: true },
  { id: "challenges", label: "Hard parts", technical: true },
  { id: "learnings", label: "What I took away" },
];

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { caseStudy, links } = project;
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — ${project.tagline}`,
    description: project.summary,
    url: `${site.url}/projects/${project.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: project.stack.join(", "),
    ...(links.github && { codeRepository: links.github }),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ---------- Header ---------- */}
      <header className="relative overflow-hidden border-b border-line">
        {/* Flat accent rule instead of a glow — no colour washes anywhere. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ backgroundColor: project.accent }}
        />

        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone="accent">{project.status}</Tag>
                <Tag tone="muted">{project.period}</Tag>
                {project.openSource && <Tag tone="muted">Open source</Tag>}
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-xl text-lg leading-snug font-medium text-accent sm:text-xl">
                {project.tagline}
              </p>
              <p className="mt-2 font-mono text-xs text-subtle">{project.techLine}</p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {project.summary}
              </p>

              {/* Headline numbers up top, before any technical framing. */}
              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                {project.impact.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block text-2xl font-semibold tracking-tight text-fg">
                        {item.value}
                      </span>
                      <span className="mt-1 block text-xs text-muted">{item.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <dt className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{project.role}</dd>
                </div>
                {project.openSource && typeof project.stars === "number" && (
                  <div>
                    <dt className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
                      Community
                    </dt>
                    <dd className="mt-1 flex items-center gap-3 font-mono text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-accent" />
                        {project.stars}
                        <span className="sr-only">stars</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Fork className="h-3.5 w-3.5 text-muted" />
                        {project.forks}
                        <span className="sr-only">forks</span>
                      </span>
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {links.demo && (
                  <ExternalButton href={links.demo} variant="primary">
                    Live demo
                    <ArrowUpRight className="h-4 w-4" />
                  </ExternalButton>
                )}
                {links.github && (
                  <ExternalButton href={links.github} variant="secondary">
                    <SocialIcon icon="github" className="h-4 w-4" />
                    Source
                  </ExternalButton>
                )}
                {links.note && (
                  <span className="font-mono text-xs text-subtle">{links.note}</span>
                )}
              </div>

              <ul className="mt-8 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`relative aspect-16/10 overflow-hidden rounded-xl border border-line ${
                project.imageFit === "contain" ? "bg-sunken" : ""
              }`}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.tagline}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                  className={project.imageFit === "contain" ? "object-contain p-4" : "object-cover"}
                />
              ) : (
                <ProjectMockup project={project} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Body ---------- */}
      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
          {/* Sticky in-page nav — hidden on smaller screens where it'd just push content down. */}
          <nav aria-label="Case study sections" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
                On this page
              </p>
              <ul className="mt-4 space-y-1 border-l border-line">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    {/* Label the technical group once, at its first entry. */}
                    {section.technical && !sections[i - 1]?.technical && (
                      <span className="mt-3 mb-1 block pl-4 font-mono text-[0.625rem] tracking-widest text-subtle uppercase">
                        Technical
                      </span>
                    )}
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="min-w-0 max-w-3xl space-y-14">
            <CaseSection id="overview" title="What it is">
              <p>{caseStudy.overview}</p>
            </CaseSection>

            <CaseSection id="problem" title="The problem">
              <ul className="space-y-3">
                {caseStudy.problem.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-term-rose"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </CaseSection>

            <CaseSection id="results" title="The impact">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {caseStudy.results.map((result) => (
                  <div key={result.label} className="bg-bg p-5">
                    <dt className="sr-only">{result.label}</dt>
                    <dd>
                      <span className="block font-mono text-2xl font-semibold text-accent sm:text-3xl">
                        {result.metric}
                      </span>
                      <span className="mt-1.5 block text-xs leading-snug text-muted sm:text-sm">
                        {result.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-start gap-3 rounded-lg border border-term-green/25 bg-term-green/5 p-4">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-term-green"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-fg">
                  <span className="font-mono text-xs text-subtle">outcome: </span>
                  {project.outcome}
                </p>
              </div>
            </CaseSection>
            <CaseSection id="approach" title="What I built">
              <ol className="space-y-6">
                {caseStudy.approach.map((item, i) => (
                  <li key={item.title} className="rounded-xl border border-line bg-elevated p-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-semibold tracking-tight text-fg">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </CaseSection>

            {/*
              Everything below is for engineers. Flagged explicitly so a recruiter
              or founder knows they've already read the part that matters to them.
            */}
            <Reveal className="flex items-center gap-4 pt-2">
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
                Technical detail below
              </span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </Reveal>

            <CaseSection id="architecture" title="How it works">
              <TerminalWindow
                title={`${project.slug}/ARCHITECTURE.md`}
                bodyClassName="p-0"
                className="not-prose"
              >
                <ul className="divide-y divide-line">
                  {caseStudy.architecture.map((item, i) => (
                    <li key={item} className="flex gap-3 px-5 py-3.5 text-sm leading-relaxed">
                      <span className="font-mono text-xs text-subtle tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </TerminalWindow>

              <div className="mt-6">
                <p className="mb-3 font-mono text-[0.6875rem] tracking-widest text-subtle uppercase">
                  Representative code
                </p>
                <TerminalWindow
                  title={`${project.snippet.lang === "rust" ? "src/lib.rs" : "src/index.ts"}`}
                >
                  <CodeBlock code={project.snippet.code} showLineNumbers />
                </TerminalWindow>
              </div>
            </CaseSection>

            <CaseSection id="challenges" title="The hard parts">
              <div className="space-y-5">
                {caseStudy.challenges.map((item) => (
                  <div
                    key={item.title}
                    className="border-l-2 border-accent/40 pl-5 transition-colors hover:border-accent"
                  >
                    <h3 className="text-base font-semibold tracking-tight text-fg">{item.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </CaseSection>


            <CaseSection id="learnings" title="What I took away">
              <ul className="space-y-3">
                {caseStudy.learnings.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </CaseSection>
          </div>
        </div>
      </div>

      {/* ---------- More work ---------- */}
      <section aria-labelledby="more-heading" className="border-t border-line bg-sunken/40">
        <div className="container-page py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="more-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              More case studies
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {related.map((item) => (
              <CaseStudyPreview key={item.slug} project={item} />
            ))}
          </div>

          <div className="mt-14 rounded-xl border border-line bg-bg p-8 text-center sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Working on something similar?
            </h2>
            <p className="mx-auto mt-2.5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              I&apos;m open to freelance, full-time and consulting work on backend systems, Rust
              services and on-chain protocols.
            </p>
            <ButtonLink href="/#contact" className="mt-6">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}

/** Numbered case-study section with a consistent heading and prose rhythm. */
function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="scroll-mt-24">
      <h2
        id={id}
        className="mb-5 flex items-center gap-3 text-xl font-semibold tracking-tight sm:text-2xl"
      >
        <span className="h-px w-6 bg-accent" aria-hidden="true" />
        {title}
      </h2>
      <div className="text-[0.9375rem] leading-relaxed text-muted sm:text-base">{children}</div>
    </Reveal>
  );
}
