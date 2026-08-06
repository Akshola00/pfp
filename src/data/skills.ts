/**
 * Skills render as an icon grid grouped by category — deliberately no
 * percentage bars, which imply a precision nobody can actually claim.
 *
 * `icon` maps to a key in components/ui/TechIcon.tsx. Unmapped names fall back
 * to a monogram tile, so you can add a skill here without touching the icon set.
 */

export type Skill = {
  name: string;
  icon?: string;
  /** Optional short note shown on hover / focus. */
  note?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  /** Mono label shown above the category title. */
  kicker: string;
  description: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    kicker: "core",
    description: "The languages I reach for first, in rough order of depth.",
    skills: [
      { name: "Rust", icon: "rust", note: "Primary language — services, contracts, CLI tooling" },
      { name: "TypeScript", icon: "typescript", note: "Backend APIs and full-stack product work" },
      { name: "Solidity", icon: "solidity", note: "EVM smart contracts" },
      { name: "Cairo", icon: "cairo", note: "Starknet smart contracts" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    kicker: "specialty",
    description: "Where I do my strongest work — services, APIs and the layers underneath them.",
    skills: [
      { name: "Axum", icon: "axum", note: "Rust web framework, tower middleware" },
      { name: "NestJS", icon: "nestjs" },
      { name: "Express", icon: "express" },
      { name: "Node.js", icon: "nodejs" },
      { name: "REST API Design", icon: "api" },
      { name: "Systems Programming", icon: "systems" },
      { name: "Low-Level Infrastructure", icon: "infra" },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    kicker: "protocol",
    description: "Smart contracts and dApp architecture across three ecosystems.",
    skills: [
      { name: "Smart Contracts", icon: "contract" },
      { name: "Ethereum (EVM)", icon: "ethereum" },
      { name: "Starknet", icon: "starknet" },
      { name: "Stellar / Soroban", icon: "stellar" },
      { name: "dApp Architecture", icon: "dapp" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    kicker: "interface",
    description: "Enough frontend to ship a product end to end without waiting on anyone.",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Cross-Platform Mobile", icon: "mobile" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Tooling",
    kicker: "delivery",
    description: "Getting it built, tested and out the door repeatably.",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Vercel", icon: "vercel" },
      { name: "Prometheus / Grafana", icon: "metrics" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    id: "practice",
    title: "Practice",
    kicker: "how i work",
    description: "The habits that shape how the code above gets written.",
    skills: [
      { name: "Open Source Contribution", icon: "opensource" },
      { name: "Full-Stack Development", icon: "fullstack" },
      { name: "Scalable System Design", icon: "scale" },
      { name: "Code Review", icon: "review" },
    ],
  },
];

/** Flat marquee strip under the hero. */
export const marqueeSkills = [
  "Rust",
  "Axum",
  "TypeScript",
  "NestJS",
  "Cairo",
  "Starknet",
  "Soroban",
  "Solidity",
  "Next.js",
  "React",
  "Node.js",
  "Docker",
  "Redis",
  "Tailwind CSS",
  "GitHub Actions",
];
