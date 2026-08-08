import { ExternalButton } from "@/components/ui/Button";
import { ArrowUpRight, Fork, Star } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Tag } from "@/components/ui/Tag";
import { contributions } from "@/data/open-source";
import { githubStats } from "@/data/site";

const kindTone: Record<string, string> = {
  PR: "border-term-violet/30 bg-term-violet/10 text-term-violet",
  Issue: "border-term-green/30 bg-term-green/10 text-term-green",
  Branch: "border-term-cyan/30 bg-term-cyan/10 text-term-cyan",
};

export function OpenSource() {
  return (
    <Section id="open-source" className="border-t border-line bg-sunken/40">
      <SectionHeading
        id="open-source"
        index="04"
        kicker="open source"
        title="Building in public"
        description="Open source means the code is public and free for anyone to use. I write and maintain it, and I contribute to projects other teams depend on — a good measure of whether work holds up under outside scrutiny."
        action={
          <ExternalButton href={githubStats.profileUrl} variant="secondary" size="sm">
            <SocialIcon icon="github" className="h-3.5 w-3.5" />
            View GitHub profile
          </ExternalButton>
        }
      />

      <Reveal className="overflow-hidden rounded-xl border border-line bg-bg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <SocialIcon icon="github" className="h-4 w-4 text-muted" />
            <span className="text-fg">@{githubStats.username}</span>
            <span className="text-subtle">— contribution activity</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-subtle">
            <span>{githubStats.repos} repos</span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-accent" />
              {githubStats.starsGiven} given
            </span>
          </div>
        </div>

        <div className="overflow-x-auto p-5">
          {/*
            Contribution graph is rendered by ghchart.rshah.org from the public
            GitHub profile — no API token or build step needed. A plain <img> is
            used rather than next/image: the source is a remote SVG whose
            dimensions vary, so there's nothing for the optimizer to do.
            If the service is ever unavailable the alt text stands in.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/f59e0b/${githubStats.username}`}
            alt={`GitHub contribution graph for @${githubStats.username} over the past year`}
            loading="lazy"
            width={720}
            height={112}
            className="h-auto w-full min-w-[42rem]"
          />
        </div>

        <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4">
          {githubStats.achievements.map((achievement) => (
            <Tag key={achievement} tone="accent">
              {achievement}
            </Tag>
          ))}
        </div>
      </Reveal>

      <h3 className="mt-14 font-mono text-xs tracking-widest text-subtle uppercase">
        Notable contributions
      </h3>

      <ul className="mt-5 grid gap-3 lg:grid-cols-2">
        {contributions.map((item, i) => (
          <Reveal key={item.id} as="li" delay={(i % 2) * 70}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-line bg-bg p-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-md border px-2 py-0.5 font-mono text-[0.625rem] tracking-wide ${kindTone[item.kind]}`}
                >
                  {item.kind}
                </span>
                <span className="font-mono text-xs text-fg">{item.project}</span>
                <Tag tone="muted">{item.ecosystem}</Tag>
                {typeof item.stars === "number" && (
                  <span className="flex items-center gap-2 font-mono text-[0.6875rem] text-subtle">
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3" />
                      {item.stars}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Fork className="h-3 w-3" />
                      {item.forks}
                    </span>
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-snug font-medium text-fg transition-colors group-hover:text-accent">
                {item.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.context}</p>

              <div className="mt-auto flex items-center gap-1.5 pt-4 font-mono text-[0.6875rem] text-subtle">
                <span className="truncate">{item.repo}</span>
                <ArrowUpRight className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
