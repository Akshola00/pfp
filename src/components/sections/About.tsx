import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { site } from "@/data/site";

const stats = [
  { value: `${site.yearsExperience}+`, label: "Years building", detail: "Backend, systems and on-chain" },
  { value: "3", label: "Chain ecosystems", detail: "Ethereum · Starknet · Stellar" },
  { value: "7+", label: "OSS contributions", detail: "Merged across protocol repos" },
  { value: "206", label: "Forks on PrediFi", detail: "Protocol I maintain" },
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
        title="I work at the layer everything else sits on"
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>
            I&apos;m a full-stack software engineer with a strong specialization in{" "}
            <strong className="font-medium text-fg">backend systems and infrastructure</strong>.
            I&apos;ve worked across the full development lifecycle — architecting scalable,
            high-performance backend services, building polished frontend interfaces, and shipping
            cross-platform mobile applications.
          </p>
          <p>
            My core passion sits at the foundational layers: the crates, libraries, APIs and
            infrastructure that other systems and developers depend on. That&apos;s the work I find
            most interesting and the work I&apos;m best at — the parts where correctness, failure
            modes and clear boundaries matter more than surface polish.
          </p>
          <p>
            Right now that means Rust services on Axum, TypeScript APIs with NestJS and Express, and
            smart contracts across Ethereum, Starknet and Stellar. I maintain{" "}
            <strong className="font-medium text-fg">PrediFi</strong>, an open-source prediction
            protocol on Soroban, and co-founded{" "}
            <strong className="font-medium text-fg">PayMesh</strong>, where I own the backend.
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
              Daily stack
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
