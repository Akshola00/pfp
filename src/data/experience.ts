/**
 * Rendered as a vertical timeline, newest first.
 * `current: true` gets the pulsing marker and an "active" pill.
 */

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current?: boolean;
  kind: "Full-time" | "Founding" | "Open Source" | "Program" | "Independent";
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "studly",
    role: "Software Engineer",
    company: "Studly",
    companyUrl: "https://usestudly.com",
    period: "Present",
    current: true,
    kind: "Full-time",
    summary:
      "Building backend systems and developer tools for a social-first collaborative e-learning platform focused on studying, practice and peer-to-peer knowledge sharing.",
    highlights: [
      "Built the community feed backend in Rust with Axum — the surface that drives daily engagement.",
      "Designed cursor-based pagination so timelines stay stable while new content lands mid-scroll.",
      "Own backend developer tooling and the internal API contract the product team builds against.",
    ],
    tech: ["Rust", "Axum", "TypeScript", "Node.js", "REST API Design"],
  },
  {
    id: "web3novalabs",
    role: "Builder & Open-Source Contributor",
    company: "Web3NovaLabs",
    companyUrl: "https://github.com/Web3Novalabs",
    period: "2024 — Present",
    current: true,
    kind: "Founding",
    summary:
      "Developing decentralized applications and protocols across the Starknet and Stellar ecosystems, and contributing back to the wider open-source community.",
    highlights: [
      "Maintain PrediFi — an on-chain prediction protocol on Soroban (23★, 206 forks), driving pool lifecycle, RBAC and security work.",
      "Co-founded PayMesh and built its Rust/Axum backend for automated group payment distribution on Starknet.",
      "Active Starknet community contributor — PRs across Mediolano, StakCast and Fundable Protocol.",
    ],
    tech: ["Rust", "Cairo", "Soroban", "Solidity", "TypeScript", "Starknet", "Stellar"],
  },
  {
    id: "blockheader",
    role: "Blockchain & Web3 Course",
    company: "Collab × Blockheaderweb3",
    period: "Mid 2024 · ~4 months",
    kind: "Program",
    summary:
      "Intensive, hands-on blockchain and Web3 program taken alongside continued backend development work.",
    highlights: [
      "Blockchain fundamentals and smart contract development, taken from first principles through to deployment.",
      "Backend work in Django REST Framework alongside the protocol curriculum.",
      "Refreshed React fundamentals to keep full-stack delivery in reach.",
    ],
    tech: ["Smart Contracts", "Solidity", "Django REST Framework", "React"],
  },
  {
    id: "independent",
    role: "Personal & Open-Source Projects",
    company: "Independent",
    companyUrl: "https://github.com/Akshola00",
    period: "Ongoing",
    current: true,
    kind: "Independent",
    summary:
      "Building tools and low-level systems — CLI utilities for Git repository analysis, Rust crates and libraries, and infrastructure experiments.",
    highlights: [
      "gitchecker — a CLI tool for Git repository analysis and metadata extraction.",
      "Rust crates and libraries aimed at the foundational layer other developers build on.",
      "Systems and infrastructure experiments, expanding into high-performance and secure blockchain development.",
    ],
    tech: ["Rust", "TypeScript", "Python", "Axum", "NestJS", "Express", "React", "Next.js"],
  },
];
