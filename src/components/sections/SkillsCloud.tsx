import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillCategories } from "@/data/skills";

/**
 * Icon grid grouped by category. No proficiency bars by design — a percentage
 * on a skill is a number nobody can actually justify.
 */
export function SkillsCloud() {
  return (
    <Section id="skills" className="border-t border-line bg-sunken/40">
      <SectionHeading
        id="skills"
        index="02"
        kicker="skills"
        title="Tools I reach for"
        description="Grouped by what I use them for, ordered roughly by depth within each group."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal
            key={category.id}
            as="article"
            delay={i * 60}
            className="flex flex-col rounded-xl border border-line bg-bg p-6 transition-colors hover:border-line-strong"
          >
            <header>
              <p className="font-mono text-[0.6875rem] tracking-widest text-accent uppercase">
                {category.kicker}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{category.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>
            </header>

            {/* Single column on very small phones — two tiles side by side is
                too cramped below ~360px. */}
            <ul className="mt-6 grid grid-cols-1 gap-2 xs:grid-cols-2">
              {category.skills.map((skill) => (
                <li key={skill.name}>
                  <div
                    className="group flex h-full items-center gap-2.5 rounded-lg border border-line bg-elevated px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-accent"
                    title={skill.note}
                  >
                    <TechIcon
                      name={skill.icon}
                      label={skill.name}
                      className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                    />
                    <span className="text-xs leading-tight font-medium text-fg">{skill.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
