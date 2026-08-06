import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  // Makes every relative URL below (OG images, canonicals) absolute.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: `${site.name} is a full-stack software engineer specializing in backend and systems engineering — Rust, TypeScript and blockchain. Portfolio of production APIs, protocols and open-source work.`,
  keywords: [
    "developer portfolio",
    "full-stack developer portfolio",
    "backend engineer portfolio",
    "Rust developer",
    "Rust backend engineer",
    "TypeScript developer",
    "blockchain developer",
    "smart contract developer",
    "Starknet developer",
    "Stellar Soroban developer",
    "Axum developer",
    "NestJS developer",
    "open source contributor",
    "software engineer portfolio",
    "Akinshola Akinniyi",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  applicationName: `${site.name} — Portfolio`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description: `Backend & systems engineer. Rust, TypeScript and blockchain — production APIs, on-chain protocols and open-source infrastructure.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: `Backend & systems engineer. Rust, TypeScript and blockchain — production APIs, on-chain protocols and open-source infrastructure.`,
    creator: "@akshola00",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
  ],
};

/**
 * Person schema for rich results. Kept in the layout so it appears on every
 * page; case studies add their own CreativeWork schema on top.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: site.tagline,
  knowsAbout: [
    "Rust",
    "TypeScript",
    "Backend Engineering",
    "Systems Programming",
    "Smart Contracts",
    "Starknet",
    "Stellar Soroban",
    "Solidity",
    "API Design",
  ],
  sameAs: [
    "https://github.com/Akshola00",
    "https://www.linkedin.com/in/akinshola-akinniyi/",
    "https://x.com/akshola00",
    "https://medium.com/@akshola00",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        {/* First tab stop — lets keyboard users jump the nav. */}
        <a
          href="#main"
          className="sr-only rounded-lg bg-accent px-4 py-2 font-mono text-sm text-accent-fg focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
