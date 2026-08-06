/**
 * Notable open-source contributions, newest/most notable first.
 * `kind` drives the badge colour on the card.
 */

export type Contribution = {
  id: string;
  project: string;
  repo: string;
  repoUrl: string;
  /** What the project is, in one line. */
  context: string;
  ecosystem: "Starknet" | "Stellar" | "Multi-chain";
  kind: "PR" | "Issue" | "Branch";
  title: string;
  href: string;
  stars?: number;
  forks?: number;
};

export const contributions: Contribution[] = [
  {
    id: "stakcast-tests",
    project: "StakCast",
    repo: "gear5labs/StakCast",
    repoUrl: "https://github.com/gear5labs/StakCast",
    context: "Prediction market protocol on Starknet",
    ecosystem: "Starknet",
    kind: "PR",
    title: "Comprehensive prediction market test suite",
    href: "https://github.com/gear5labs/StakCast/pull/187",
    stars: 9,
    forks: 33,
  },
  {
    id: "stakcast-faucet",
    project: "StakCast",
    repo: "gear5labs/StakCast",
    repoUrl: "https://github.com/gear5labs/StakCast",
    context: "Prediction market protocol on Starknet",
    ecosystem: "Starknet",
    kind: "Issue",
    title: "Token faucet test utility",
    href: "https://github.com/gear5labs/StakCast/issues/153",
    stars: 9,
    forks: 33,
  },
  {
    id: "fundable-multi-asset",
    project: "Fundable Protocol",
    repo: "Fundable-Protocol/fundable",
    repoUrl: "https://github.com/Fundable-Protocol/fundable",
    context: "Payment streaming and crowdfunding on Starknet",
    ecosystem: "Starknet",
    kind: "Branch",
    title: "Added donation_token param for multi-asset campaigns",
    href: "https://github.com/Fundable-Protocol/fundable/compare/main...Akshola00:mltpl-asset-type",
    stars: 3,
    forks: 37,
  },
  {
    id: "supo-tooling",
    project: "Stellar Unified Price Oracle",
    repo: "Stellar-Unified-Price-Oracle/…-Aggregator-API-Contract",
    repoUrl:
      "https://github.com/Stellar-Unified-Price-Oracle/Stellar-Unified-Price-Oracle-Aggregator-API-Contract",
    context: "Soroban price oracle aggregator contract",
    ecosystem: "Stellar",
    kind: "PR",
    title: "Dockerfile, debug module and test helpers",
    href: "https://github.com/Stellar-Unified-Price-Oracle/Stellar-Unified-Price-Oracle-Aggregator-API-Contract/pull/125",
  },
  {
    id: "mediolano-profile",
    project: "Mediolano",
    repo: "mediolano-app/mediolano-app",
    repoUrl: "https://github.com/mediolano-app/mediolano-app",
    context: "Intellectual property protocol on Starknet",
    ecosystem: "Starknet",
    kind: "PR",
    title: "Profile updates and settings refactor",
    href: "https://github.com/mediolano-app/mediolano-app/pull/243",
  },
  {
    id: "paymesh-monitoring",
    project: "PayMesh",
    repo: "Web3Novalabs/PayMesh",
    repoUrl: "https://github.com/Web3Novalabs/PayMesh",
    context: "Own project — automated group payments on Starknet",
    ecosystem: "Starknet",
    kind: "PR",
    title: "Redis, Prometheus and Grafana monitoring integration",
    href: "https://github.com/Web3Novalabs/PayMesh/pull/53",
  },
  {
    id: "paymesh-volume",
    project: "PayMesh",
    repo: "Web3Novalabs/PayMesh",
    repoUrl: "https://github.com/Web3Novalabs/PayMesh",
    context: "Own project — automated group payments on Starknet",
    ecosystem: "Starknet",
    kind: "PR",
    title: "Volume dynamics update",
    href: "https://github.com/Web3Novalabs/PayMesh/pull/62",
  },
];
