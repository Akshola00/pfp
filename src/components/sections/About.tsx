import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { site } from "@/data/site";

/** Plain-language stats — no acronyms, no ecosystem names. */
const stats = [
  {
    value: `${site.yearsExperience}+`,
    label: "Years building",
    detail: "Professionally, across the full stack",
  },
  { value: "2", label: "Companies co-founded", detail: "Both shipped and live" },
  { value: "206", label: "Developers built on my code", detail: "Forks of my open-source work" },
  { value: "7+", label: "Open-source contributions", detail: "Merged into other teams' projects" },
];

/** The stack strip — a quick visual read of what I work in day to day. */
const stackHighlights = [
  { name: "Rust", icon: "rust" },
  { name: "Axum", icon: "axum" },
  { name: "TypeScript", icon: "typescript" },
  { name: "NestJS", icon: "nestjs" },
  { name: "Cairo", icon: "cairo" },
  { name: "Solidity", icon: "solidity" },
  { name: "Stellar", icon: "stellar" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Docker", icon: "docker" },
  { name: "Redis", icon: "redis" },
];

export function About() {
  return (
    <Section id="about" className="border-t border-line">
      <SectionHeading
        id="about"
        index="01"
        kicker="about"
        title="I build the part you never see"
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            Most of what I build is invisible. When an app loads instantly, handles a thousand
            people at once, or moves money without losing a penny, that&apos;s the part I work on —{" "}
            <strong className="font-medium text-fg">
              the systems underneath that everything else depends on
            </strong>
            .
          </p>
          <p>
            I&apos;ve done this across the whole product: the servers and databases that do the
            heavy lifting, the screens people actually touch, and mobile apps in between. But the
            foundations are where I&apos;m strongest and where I choose to spend my time — because
            that&apos;s the layer that decides whether a product holds up once real users arrive.
          </p>
          <p>
            I&apos;ve co-founded two companies and shipped both.{" "}
            <strong className="font-medium text-fg">PayMesh</strong> moves real money between groups
            of people automatically, and <strong className="font-medium text-fg">Studly</strong> is
            used by over 3,000 students. Alongside that I maintain open-source software that
            hundreds of other developers have forked and built on.
          </p>

          {/* Kept deliberately separate and quieter — engineers want this, nobody else does. */}
          <p className="!mt-7 rounded-lg border border-line bg-sunken/60 p-4 font-mono text-xs leading-relaxed text-subtle sm:text-xs">
            <span className="text-muted">For the engineers reading:</span> Rust services on Axum,
            TypeScript APIs with NestJS and Express, and smart contracts across Ethereum (Solidity),
            Starknet (Cairo) and Stellar (Soroban). Interested in the foundational layer — crates,
            libraries, APIs and infrastructure other systems build on.
          </p>

          <div className="!mt-8 rounded-xl border border-line bg-elevated/60 p-5">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-subtle uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-term-green" aria-hidden="true" />
              Currently
            </div>
            <p className="mt-3 text-base leading-relaxed text-fg">
              Software Engineer at <strong className="font-medium">Studly</strong>, building backend
              systems and developer tools — and{" "}
              <strong className="font-medium text-accent">{site.availability.toLowerCase()}</strong>{" "}
              for backend, systems and protocol engineering roles.
            </p>
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={80}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-bg p-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-mono text-3xl font-semibold text-accent tabular-nums">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-sm font-medium text-fg">{stat.label}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-subtle">
                      {stat.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={160}>
            <h3 className="font-mono text-xs tracking-widest text-subtle uppercase">
              Tools I work with
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stackHighlights.map((tech) => (
                <li
                  key={tech.name}
                  className="group flex items-center gap-2 rounded-lg border border-line bg-elevated px-3 py-2 transition hover:-translate-y-0.5 hover:border-accent"
                >
                  <TechIcon
                    name={tech.icon}
                    label={tech.name}
                    className="h-4 w-4 text-muted transition-colors group-hover:text-accent"
                  />
                  <span className="font-mono text-xs text-fg">{tech.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
