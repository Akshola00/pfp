import Link from "next/link";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { navLinks, site, socials } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sunken/50">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="font-mono text-sm">
              <span className="text-accent">~/</span>
              <span className="text-fg">{site.shortName.toLowerCase()}</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {site.tagline}. Currently {site.availability.toLowerCase()}.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block font-mono text-sm text-accent underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">Navigate</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <SocialIcon icon={social.icon} className="h-3.5 w-3.5" />
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js &amp; Tailwind CSS<span aria-hidden="true"> · </span>
            <span className="text-term-green">deployed on Vercel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
