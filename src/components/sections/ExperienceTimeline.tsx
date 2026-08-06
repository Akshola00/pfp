import { ArrowUpRight } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/data/experience";

/**
 * Vertical timeline. The rail is a decorative absolutely-positioned line, and
 * the entries are a real <ol> so the chronology is conveyed to screen readers
 * rather than only visually.
 */
export function ExperienceTimeline() {
  return (
    <Section id="experience" className="border-t border-line">
      <SectionHeading
        id="experience"
        index="06"
        kicker="experience"
        title="Where I've been building"
        description="Roles, founding work and the programs that got me here — most recent first."
      />

      <ol className="relative">
        {/* Timeline rail — flat 1px line, stops at the last entry. */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-0 left-[7px] w-px bg-line-strong sm:left-[9px]"
        />

        {experience.map((entry, i) => (
          <Reveal
            key={entry.id}
            as="li"
            delay={i * 70}
            className="relative pb-10 pl-8 last:pb-0 sm:pl-12"
          >
            {/* Node marker. */}
            <span
              aria-hidden="true"
              className={
                entry.current
                  ? "absolute top-1.5 left-0 flex h-4 w-4 items-center justify-center sm:h-5 sm:w-5"
                  : "absolute top-2 left-[1px] h-3 w-3 rounded-full border-2 border-line-strong bg-bg sm:left-[3px]"
              }
            >
              {entry.current && (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                  <span className="relative h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                </>
              )}
            </span>

            <div className="rounded-xl border border-line bg-elevated p-5 transition-colors hover:border-line-strong sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone={entry.current ? "accent" : "default"}>{entry.period}</Tag>
                <Tag tone="muted">{entry.kind}</Tag>
              </div>

              <h3 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">
                {entry.role}
                <span className="text-subtle"> · </span>
                {entry.companyUrl ? (
                  <a
                    href={entry.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    {entry.company}
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="text-accent">{entry.company}</span>
                )}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
                {entry.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {entry.tech.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
