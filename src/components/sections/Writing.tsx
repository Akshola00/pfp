import { ArrowUpRight, Clock } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { articles } from "@/data/writing";
import { formatDate } from "@/lib/utils";

/** Renders nothing when there are no articles yet — see data/writing.ts. */
export function Writing() {
  if (articles.length === 0) return null;

  return (
    <Section id="writing" className="border-t border-line bg-sunken/40">
      <SectionHeading
        id="writing"
        index="05"
        kicker="writing"
        title="Notes from the work"
        description="Occasional write-ups on Rust, systems and what I learn building things."
      />

      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.id} as="li" delay={i * 80} className="flex">
            <a
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full flex-col rounded-xl border border-line bg-bg p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30"
            >
              <div className="flex items-center justify-between gap-3">
                <Tag tone="accent">{article.platform}</Tag>
                <time
                  dateTime={article.date}
                  className="font-mono text-[0.6875rem] text-subtle"
                >
                  {formatDate(article.date)}
                </time>
              </div>

              <h3 className="mt-4 text-lg leading-snug font-semibold tracking-tight transition-colors group-hover:text-accent">
                {article.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-muted">{article.excerpt}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <li key={tag}>
                    <Tag tone="muted">{tag}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between pt-5 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-subtle">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1.5 text-accent">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only">{article.title} (opens in a new tab)</span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
