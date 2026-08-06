import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { CodeBlock, TerminalWindow } from "@/components/ui/TerminalWindow";

const SNIPPET = `$ curl -I https://akinshola.dev/that-page
HTTP/2 404
// route not found — but the rest of the site is fine`;

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-sm tracking-widest text-accent uppercase">Error 404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The link is broken or the page has moved. Here&apos;s the way back.
      </p>

      <TerminalWindow title="~/404" className="mt-10 w-full max-w-lg text-left">
        <CodeBlock code={SNIPPET} />
      </TerminalWindow>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">
          Back home
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          Browse projects
        </ButtonLink>
      </div>
    </div>
  );
}
