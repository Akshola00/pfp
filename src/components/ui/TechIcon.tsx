import {
  siDocker,
  siEthereum,
  siExpress,
  siGithub,
  siGithubactions,
  siGrafana,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPrometheus,
  siReact,
  siRedis,
  siRust,
  siSolidity,
  siStellar,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

/**
 * Brand marks come from simple-icons (official paths, tree-shaken).
 * Everything else — concepts, and brands simple-icons doesn't carry
 * (Starknet, Cairo, Axum) — is a hand-drawn stroke glyph below.
 *
 * Adding a skill icon: add a key here and reference it as `icon` in
 * data/skills.ts. Unknown keys fall back to a monogram tile, so nothing breaks.
 */
const brandIcons: Record<string, SimpleIcon> = {
  rust: siRust,
  typescript: siTypescript,
  solidity: siSolidity,
  react: siReact,
  nextjs: siNextdotjs,
  tailwind: siTailwindcss,
  docker: siDocker,
  redis: siRedis,
  nodejs: siNodedotjs,
  nestjs: siNestjs,
  express: siExpress,
  ethereum: siEthereum,
  vercel: siVercel,
  githubactions: siGithubactions,
  prometheus: siPrometheus,
  grafana: siGrafana,
  stellar: siStellar,
  github: siGithub,
  metrics: siGrafana,
};

/** Shared props for the stroke glyphs — keeps them visually consistent. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const glyphIcons: Record<string, React.ReactNode> = {
  // REST API — request/response between two endpoints.
  api: (
    <>
      <rect x="2.5" y="7" width="6" height="10" rx="1.8" {...stroke} />
      <rect x="15.5" y="7" width="6" height="10" rx="1.8" {...stroke} />
      <path d="M8.5 10h7" {...stroke} />
      <path d="m13.5 8 2 2-2 2" {...stroke} />
      <path d="M15.5 14h-7" {...stroke} />
      <path d="m10.5 12-2 2 2 2" {...stroke} />
    </>
  ),
  // Starknet — nested chevrons suggesting recursive proofs.
  starknet: (
    <>
      <path d="M3 9.5 12 4l9 5.5" {...stroke} />
      <path d="M6.5 13 12 9.5l5.5 3.5" {...stroke} />
      <path d="M9.5 16.5 12 15l2.5 1.5" {...stroke} />
      <circle cx="12" cy="20" r="1.4" {...stroke} />
    </>
  ),
  // Cairo — a pyramid, for the obvious reason.
  cairo: (
    <>
      <path d="M12 3.5 21 20H3z" {...stroke} />
      <path d="M12 3.5V20" {...stroke} />
      <path d="M7.5 12h9" {...stroke} />
    </>
  ),
  // Axum — layered request pipeline.
  axum: (
    <>
      <rect x="3" y="4" width="18" height="4.5" rx="1.5" {...stroke} />
      <rect x="3" y="10" width="18" height="4" rx="1.5" {...stroke} />
      <path d="M3 17.5h18" {...stroke} />
      <path d="M15.5 20 18 17.5 15.5 15" {...stroke} />
    </>
  ),
  systems: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" {...stroke} />
      <path d="M10 10h4v4h-4z" {...stroke} />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" {...stroke} />
    </>
  ),
  infra: (
    <>
      <rect x="3" y="4" width="18" height="5" rx="1.5" {...stroke} />
      <rect x="3" y="15" width="18" height="5" rx="1.5" {...stroke} />
      <path d="M7 6.5h.01M7 17.5h.01" {...stroke} />
      <path d="M8 9v6M16 9v6" {...stroke} />
    </>
  ),
  contract: (
    <>
      <path d="M6 3h8l4 4v14H6z" {...stroke} />
      <path d="M14 3v4h4" {...stroke} />
      <path d="M9 12h6M9 16h4" {...stroke} />
    </>
  ),
  dapp: (
    <>
      <circle cx="12" cy="12" r="2.2" {...stroke} />
      <circle cx="5" cy="6" r="1.8" {...stroke} />
      <circle cx="19" cy="6" r="1.8" {...stroke} />
      <circle cx="5" cy="18" r="1.8" {...stroke} />
      <circle cx="19" cy="18" r="1.8" {...stroke} />
      <path d="m6.4 7.2 4 3.4M17.6 7.2l-4 3.4M6.4 16.8l4-3.4M17.6 16.8l-4-3.4" {...stroke} />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" {...stroke} />
      <path d="M10.5 5.5h3" {...stroke} />
      <path d="M11 18.5h2" {...stroke} />
    </>
  ),
  cicd: (
    <>
      <path d="M4 12a8 8 0 0 1 13.7-5.6" {...stroke} />
      <path d="M20 12a8 8 0 0 1-13.7 5.6" {...stroke} />
      <path d="M18 3v3.8h-3.8M6 21v-3.8h3.8" {...stroke} />
    </>
  ),
  opensource: (
    <>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <path d="M9.6 19.2 12 13.2l2.4 6" {...stroke} />
      <circle cx="12" cy="10" r="2.6" {...stroke} />
    </>
  ),
  fullstack: (
    <>
      <path d="M3 7.5 12 3l9 4.5-9 4.5z" {...stroke} />
      <path d="m3 12 9 4.5L21 12" {...stroke} />
      <path d="m3 16.5 9 4.5 9-4.5" {...stroke} />
    </>
  ),
  scale: (
    <>
      <path d="M3 20V9M9 20V4M15 20v-8M21 20v-5" {...stroke} />
      <path d="M2 20h20" {...stroke} />
    </>
  ),
  review: (
    <>
      <path d="m9 10-3 2.5L9 15" {...stroke} />
      <path d="m15 10 3 2.5-3 2.5" {...stroke} />
      <rect x="3" y="4" width="18" height="17" rx="2.5" {...stroke} />
      <path d="M3 8h18" {...stroke} />
    </>
  ),
};

export function hasIcon(name?: string) {
  return Boolean(name && (brandIcons[name] || glyphIcons[name]));
}

type Props = {
  /** Key from data/skills.ts. Falls back to a monogram when unknown. */
  name?: string;
  /** Used for the monogram fallback. */
  label: string;
  className?: string;
};

export function TechIcon({ name, label, className }: Props) {
  const brand = name ? brandIcons[name] : undefined;

  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className={className}
        fill="currentColor"
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const glyph = name ? glyphIcons[name] : undefined;

  if (glyph) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
        {glyph}
      </svg>
    );
  }

  // Monogram fallback — first letters of the first two words.
  const monogram = label
    .split(/[\s/]+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" {...stroke} opacity="0.5" />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8.5"
        fontFamily="var(--font-geist-mono), monospace"
        fontWeight="600"
        fill="currentColor"
      >
        {monogram}
      </text>
    </svg>
  );
}
