import { ContactForm } from "@/components/contact/ContactForm";
import { ArrowUpRight, Clock } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contact, site, socials } from "@/data/site";

export function ContactCTA() {
  return (
    <Section id="contact" className="border-t border-line">
      <SectionHeading
        id="contact"
        index="07"
        kicker="contact"
        title={contact.heading}
        description={contact.intro}
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal className="space-y-8">
          <div>
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">
              Email me directly
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block text-xl font-medium tracking-tight break-all text-accent underline-offset-4 hover:underline sm:text-2xl"
            >
              {site.email}
            </a>
            <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
              <Clock className="h-3.5 w-3.5 text-term-green" />
              {contact.responseTime}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">
              What I&apos;m open to
            </p>
            <ul className="mt-4 space-y-3">
              {contact.lookingFor.map((item) => (
                <li key={item.label} className="flex gap-3 rounded-lg border border-line bg-elevated p-4">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm font-medium text-fg">{item.label}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted">
                      {item.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest text-subtle uppercase">
              Or reach me on
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-line bg-elevated px-3.5 py-2.5 transition hover:-translate-y-0.5 hover:border-accent"
                  >
                    <SocialIcon
                      icon={social.icon}
                      className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-fg">{social.label}</span>
                      <span className="block truncate font-mono text-[0.6875rem] text-subtle">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
