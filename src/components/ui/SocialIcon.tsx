import { siGithub, siMedium, siTelegram, siWhatsapp, siX } from "simple-icons";
import type { SocialLink } from "@/data/site";

/**
 * simple-icons doesn't ship LinkedIn (trademark policy) and has no mail glyph,
 * so those two are inline paths. The rest come from the package.
 */
const paths: Record<SocialLink["icon"], string> = {
  github: siGithub.path,
  x: siX.path,
  telegram: siTelegram.path,
  whatsapp: siWhatsapp.path,
  medium: siMedium.path,
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  mail: "M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75a2.25 2.25 0 0 1-2.25-2.25V5.25Zm2.7.75 8.2 6.15a1 1 0 0 0 1.2 0L21.8 6H3.7Zm17.3 1.9-6.85 5.14a3 3 0 0 1-3.6 0L4.2 7.9v10.85h16.3V7.9Z",
};

export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialLink["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={paths[icon]} />
    </svg>
  );
}
