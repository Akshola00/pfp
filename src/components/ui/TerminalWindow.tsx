import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";

/**
 * Chrome-only shell: traffic lights + a title bar. Used for the hero decoration
 * and the generated project mockups. Purely decorative, so the chrome is
 * aria-hidden and only the code content is exposed to assistive tech.
 */
export function TerminalWindow({
  title,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-elevated/90 shadow-2xl shadow-black/20 backdrop-blur",
        className,
      )}
    >
      <div
        className="flex items-center gap-2 border-b border-line bg-sunken/80 px-3.5 py-2.5"
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-term-rose/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-term-green/70" />
        <span className="ml-2 truncate font-mono text-[0.6875rem] text-subtle">{title}</span>
      </div>
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
    </div>
  );
}

/** Syntax-highlighted, horizontally scrollable code block. */
export function CodeBlock({
  code,
  className,
  showLineNumbers = false,
}: {
  code: string;
  className?: string;
  showLineNumbers?: boolean;
}) {
  const lines = code.split("\n");

  return (
    <pre
      className={cn(
        "overflow-x-auto font-mono text-[0.6875rem] leading-[1.7] sm:text-xs",
        className,
      )}
      tabIndex={0}
    >
      <code>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {showLineNumbers && (
              <span className="mr-4 inline-block w-5 text-right text-subtle/60 select-none tabular-nums">
                {i + 1}
              </span>
            )}
            {line ? highlight(line) : " "}
          </span>
        ))}
      </code>
    </pre>
  );
}
