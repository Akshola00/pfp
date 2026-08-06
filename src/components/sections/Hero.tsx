import { TypingRoles } from "@/components/hero/TypingRoles";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { ArrowRight, Download } from "@/components/ui/Icon";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { StatusPill } from "@/components/ui/Tag";
import { CodeBlock, TerminalWindow } from "@/components/ui/TerminalWindow";
import { marqueeSkills } from "@/data/skills";
import { site, socials } from "@/data/site";

const HERO_SNIPPET = `// engineer.rs
pub struct Engineer {
    focus: &'static str,
    stacks: [&'static str; 3],
    shipping: bool,
}

impl Engineer {
    pub fn akinshola() -> Self {
        Self {
            focus: "backend & systems",
            stacks: ["rust", "typescript", "web3"],
            shipping: true,
        }
    }
}`;

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

            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              I build reliable, production-ready infrastructure — high-performance APIs and
              decentralized applications across the <strong className="font-medium text-fg">Rust</strong>,{" "}
              <strong className="font-medium text-fg">TypeScript</strong> and blockchain ecosystems.
              From backend services with Axum and NestJS to smart contracts on Ethereum, Starknet and
              Stellar, my focus is the foundational layer other developers and applications depend on.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects">
                View projects
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

          {/* Terminal decoration. Hidden from assistive tech — it repeats the copy above. */}
          <div className="relative" aria-hidden="true">
            <TerminalWindow title="~/akinshola/src/engineer.rs" className="rotate-[0.5deg]">
              <CodeBlock code={HERO_SNIPPET} showLineNumbers />
            </TerminalWindow>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-elevated/70 px-4 py-3 font-mono text-xs backdrop-blur">
              <span className="text-term-green">$</span>
              <span className="text-muted">cargo build --release</span>
              <span className="ml-auto text-term-green">Finished in 0.42s</span>
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
