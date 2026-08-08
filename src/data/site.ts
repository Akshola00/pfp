/**
 * Single source of truth for identity, links and contact details.
 * Change values here and they propagate to metadata, nav, footer and CTAs.
 */

export const site = {
  name: "Akinshola Akinniyi",
  shortName: "Akinshola",
  initials: "AA",
  role: "Full-Stack Software Engineer",
  /** Used in <title> templates, OG tags and structured data. */
  tagline: "Backend & systems engineer building reliable, production-ready infrastructure",
  /** No trailing slash. Set NEXT_PUBLIC_SITE_URL in production to override. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://akinshola.dev",
  locale: "en_US",
  location: "Remote · Nigeria",
  availability: "Open to work",
  yearsExperience: 4,
  /** Drop your PDF at public/resume.pdf — see README "Adding your resume". */
  resumePath: "/resume.pdf",
  email: "akinniyisholla07@gmail.com",
  /** Roles cycled by the hero typing effect. */
  roles: ["Full-Stack Developer", "Open Source Contributor", "Blockchain Developer"],
} as const;

/**
 * Headline numbers for the hero. Most of this site's traffic is recruiters,
 * founders and hiring managers — they scan numbers, not stack names. Keep these
 * to outcomes a non-technical reader can judge.
 */
export const impactStats = [
  { value: "3,000+", label: "People using what I've built" },
  { value: "$3K+", label: "Processed through my systems" },
  { value: "4", label: "Products shipped end to end" },
  { value: "4 yrs", label: "Building professionally" },
];

/** Plain-English capabilities. No jargon — the stack is listed elsewhere. */
export const whatIDo = [
  {
    title: "Build the engine behind the app",
    detail:
      "The servers, databases and connections that make a product work — the part users never see but always feel when it's slow or broken.",
  },
  {
    title: "Take products from idea to live",
    detail:
      "I've co-founded two companies and shipped both, handling everything from first design decision to real users in production.",
  },
  {
    title: "Make systems people can trust",
    detail:
      "Software that handles real money and thousands of users without falling over, losing data or needing someone to babysit it.",
  },
];

export type SocialLink = {
  label: string;
  href: string;
  /** Handle shown next to the icon where there is room. */
  handle: string;
  icon: "github" | "linkedin" | "x" | "telegram" | "whatsapp" | "mail" | "medium";
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Akshola00",
    handle: "@akshola00",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akinshola-akinniyi/",
    handle: "akinshola-akinniyi",
    icon: "linkedin",
  },
  {
    label: "X",
    href: "https://x.com/akshola00",
    handle: "@akshola00",
    icon: "x",
  },
  {
    label: "Telegram",
    href: "https://t.me/akshola00",
    handle: "@akshola00",
    icon: "telegram",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2349161223200",
    handle: "+234 916 122 3200",
    icon: "whatsapp",
  },
  {
    label: "Medium",
    href: "https://medium.com/@akshola00",
    handle: "@akshola00",
    icon: "medium",
  },
];

/** Shown in the header and mobile menu, in order. */
export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Open Source", href: "/#open-source" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;

export const contact = {
  heading: "Interested in working together?",
  intro:
    "I'm currently open to work — freelance builds, full-time backend and systems roles, and consulting on Rust services or smart contract architecture. Tell me what you're building and I'll tell you straight whether I'm the right person for it.",
  responseTime: "Usually replies within 24 hours",
  /**
   * Where the contact form posts. Leave empty to fall back to a pre-filled
   * mailto: draft (no backend required). To collect submissions instead, paste a
   * Formspree endpoint (https://formspree.io/f/xxxxxxx) into
   * NEXT_PUBLIC_CONTACT_ENDPOINT — the form auto-switches to fetch POST.
   */
  formEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
  lookingFor: [
    { label: "Freelance", detail: "Backend services, APIs and smart contracts, scoped and shipped." },
    { label: "Full-time", detail: "Backend / systems / protocol engineering on a team that ships." },
    { label: "Consulting", detail: "Architecture reviews, Rust adoption, on-chain design and audits prep." },
  ],
} as const;

/** GitHub stats surfaced in the open-source section. Update after milestones. */
export const githubStats = {
  username: "akshola00",
  profileUrl: "https://github.com/Akshola00",
  repos: 69,
  starsGiven: 53,
  achievements: ["Starstruck", "Pull Shark ×3", "Pair Extraordinaire"],
} as const;
