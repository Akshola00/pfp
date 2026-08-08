import { TypingRoles } from "@/components/hero/TypingRoles";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { ArrowRight, Download } from "@/components/ui/Icon";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { StatusPill } from "@/components/ui/Tag";
import { marqueeSkills } from "@/data/skills";
import { impactStats, site, socials, whatIDo } from "@/data/site";

/** Profiles surfaced in the hero — the rest live in the footer and contact section. */
const HERO_SOCIALS = ["GitHub", "LinkedIn", "X"];

export function Hero() {
  const heroSocials = socials.filter((s) => HERO_SOCIALS.includes(s.label));

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-16 pb-20 sm:pt-24 lg:pt-28 lg:pb-28"
    >
      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <StatusPill live>
              <span className="text-term-green">{site.availability}</span>
              <span className="text-subtle" aria-hidden="true">
                ·
              </span>
              <span>{site.location}</span>
            </StatusPill>

            <h1
              id="hero-heading"
              className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              <span className="block text-muted">Hi, I&apos;m</span>
              <span className="mt-1 block">{site.name}</span>
            </h1>

            <p className="mt-5 flex items-baseline gap-2 font-mono text-lg sm:text-xl lg:text-2xl">
              <span className="text-term-green" aria-hidden="true">
                &gt;
              </span>
              <TypingRoles roles={site.roles} />
            </p>

            {/* Plain English, no stack names. The technical detail follows below
                in smaller type so engineers still get the signal. */}
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              I build the engine room of software — the part people never see but always feel. Over
              the past four years I&apos;ve shipped products that get real use: a study platform
              with <strong className="font-medium text-fg">3,000+ students</strong>, a payments tool
              moving <strong className="font-medium text-fg">real money</strong>, and open-source
              tools that <strong className="font-medium text-fg">hundreds of other developers</strong>{" "}
              have built on.
            </p>

            <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-subtle">
              Backend &amp; systems engineering · Rust, TypeScript, Axum, NestJS · smart contracts on
              Ethereum, Starknet and Stellar
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects">
                See what I&apos;ve built
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ExternalButton href={site.resumePath} download>
                <Download className="h-4 w-4" />
                Download resume
              </ExternalButton>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <span className="font-mono text-xs tracking-widest text-subtle uppercase">
                Find me
              </span>
              <span className="h-px flex-1 bg-line sm:max-w-16" aria-hidden="true" />
              <ul className="flex items-center gap-2">
                {heroSocials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      <SocialIcon icon={social.icon} className="h-4 w-4" />
                      <span className="sr-only">
                        {social.label} — {social.handle} (opens in a new tab)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/*
            Right column: outcomes, not code. This slot used to hold a Rust
            snippet, which reads as noise to the recruiters and founders who make
            up most of this site's traffic.
          */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-xl border border-line bg-elevated">
              <div className="border-b border-line px-5 py-3">
                <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">
                  Impact so far
                </h2>
              </div>
              <dl className="grid grid-cols-2 gap-px bg-line">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="bg-elevated p-5">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                        {stat.value}
                      </span>
                      <span className="mt-1.5 block text-xs leading-snug text-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-xl border border-line bg-elevated p-5">
              <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">
                What that means in practice
              </h2>
              <ul className="mt-4 space-y-4">
                {whatIDo.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-fg">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite tech marquee. Duplicated track + 50% translate = seamless loop. */}
      <div
        className="marquee relative mt-16 flex overflow-hidden border-y border-line py-4 lg:mt-20"
        aria-hidden="true"
      >
        <div className="marquee-track flex shrink-0 gap-8 pr-8">
          {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
            <span key={i} className="flex items-center gap-8 font-mono text-sm text-subtle">
              {skill}
              <span className="text-accent/40">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
