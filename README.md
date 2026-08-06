# Akinshola Akinniyi — Developer Portfolio

Production-ready portfolio built with **Next.js 16 (App Router)**, **React 19**,
**TypeScript** and **Tailwind CSS v4**. Fully statically generated, dark/light
themed, mobile-first and keyboard accessible.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender of every route
npm run start    # serve the production build
npm run lint
```

---

## Quick start: the 4 things to change first

| # | What | Where | Status |
| - | ---- | ----- | ------ |
| 1 | Resume PDF | `public/resume.pdf` | ✅ installed |
| 2 | Set your live domain | `NEXT_PUBLIC_SITE_URL` in `.env.local` / host env | ⬜ **do before deploying** |
| 3 | Project screenshots | `public/projects/` | PayMesh + AgroMart ✅ · Studly ⬜ |

---

## Adding your resume

The hero's **Download resume** button links to `site.resumePath`, which defaults
to `/resume.pdf`.

1. Export your resume as a PDF.
2. Name it `resume.pdf`.
3. Drop it in the **`public/`** folder — so the final path is
   `public/resume.pdf`.
4. That's it. Anything in `public/` is served from the site root, so
   `public/resume.pdf` is reachable at `https://yoursite.com/resume.pdf`.

**Until you add the file, that button 404s.** If you'd rather host it elsewhere
(Google Drive, Notion, Dropbox), point `resumePath` at the full URL instead:

```ts
// src/data/site.ts
resumePath: "https://drive.google.com/file/d/…/view",
```

A different filename works too — just keep the two in sync:

```ts
resumePath: "/akinshola-akinniyi-cv.pdf",
```

---

## Content lives in `src/data/` — you should rarely touch a component

| File | Drives |
| ---- | ------ |
| `site.ts` | Name, roles, bio, email, socials, nav links, GitHub stats, contact copy |
| `projects.ts` | Project cards, `/projects` grid **and** every case-study page |
| `skills.ts` | Skills grid categories + the hero marquee |
| `experience.ts` | Vertical timeline entries |
| `open-source.ts` | Notable contributions list |
| `writing.ts` | Articles — the whole section hides itself when this is empty |

**Adding a project** = append one object to `projects.ts`. The card, the
`/projects` entry, the case-study page at `/projects/<slug>`, its OG image, and
its sitemap entry are all generated from it. No component or route edits.

---

## Implementation notes

### Component boundaries

```
src/components/
├── layout/      SiteHeader (nav + hamburger + focus trap), SiteFooter
├── sections/    Hero · About · SkillsCloud · FeaturedProjects
│                OpenSource · Writing · ExperienceTimeline · ContactCTA
├── projects/    ProjectGrid · ProjectCard · CaseStudyPreview · ProjectMockup
├── contact/     ContactForm
├── hero/        TypingRoles
├── theme/       ThemeScript · ThemeToggle
└── ui/          Section · Button · Tag · Reveal · TerminalWindow
                 Icon · TechIcon · SocialIcon
```

Sections are **server components**. Only five things ship JS: the header,
theme toggle, typing effect, scroll-reveal and contact form. Everything else is
static HTML.

### Reusable project cards

`ProjectCard` takes a single `Project` and renders image-top / content-bottom
with a lift-and-shadow hover. The link structure is the part worth knowing
about: the whole card is clickable via a **stretched link** on the title
(`after:absolute after:inset-0`) rather than by wrapping the card in an `<a>` —
nesting the GitHub and demo anchors inside another anchor is invalid HTML and
breaks keyboard navigation. Those action links sit at `relative z-10` so they
stay above the overlay and remain independently focusable.

### Case-study routing

- Route: `src/app/projects/[slug]/page.tsx`
- `generateStaticParams()` prerenders one page per project at build time.
- `dynamicParams = false` → unknown slugs 404 instead of rendering an empty shell.
- `generateMetadata()` produces per-project title, description, canonical and OG tags.
- `src/app/projects/[slug]/opengraph-image.tsx` generates a unique social card
  per case study using the project's accent colour.
- Each page emits `CreativeWork` JSON-LD; the root layout emits `Person`.

### Image optimization

- `next/image` with `fill` + explicit `sizes` on every project image, so the
  browser downloads a correctly sized variant instead of the full-resolution file.
- `priority` on the first two cards (above the fold); everything else lazy-loads.
- AVIF → WebP negotiation configured in `next.config.ts`.
- **No image? No problem.** Projects without an `image` render `<ProjectMockup />`,
  a flat code-window graphic built from the project's `accent` colour and code
  snippet — so the grid is never broken or empty. See `public/projects/README.md`.

### Metadata / SEO

- Title template `%s · Akinshola Akinniyi`, keyword set targeting *developer
  portfolio*, *full-stack developer portfolio* and *backend/Rust/blockchain engineer*.
- `metadataBase` from `NEXT_PUBLIC_SITE_URL` → all canonicals and OG URLs absolute.
- Generated `sitemap.xml` and `robots.txt` (`src/app/sitemap.ts`, `robots.ts`),
  both driven by the project data so new projects appear automatically.
- Dynamic OG images at `/opengraph-image` and per case study — nothing to keep in sync.
- `Person` + `CreativeWork` JSON-LD for rich results.

### Accessibility

- Semantic landmarks throughout: one `<h1>` per page, `<section aria-labelledby>`,
  `<nav aria-label>`, `<ol>` for the chronological timeline.
- Skip-to-content link as the first tab stop.
- Mobile menu traps focus, closes on `Escape`, restores focus to its trigger,
  and locks background scroll.
- The typing effect is `aria-hidden` with an `sr-only` static list — a screen
  reader announcing one character at a time is unusable.
- Every external link carries `rel="noopener noreferrer"` and an
  "opens in a new tab" hint for screen readers.
- Visible focus ring on all interactive elements; full `prefers-reduced-motion`
  support (reveals, marquee and typing all stand down).
- Skills use an icon grid, not progress bars — a percentage on a skill is a
  number nobody can justify.

### Responsive breakpoints

Mobile-first. Tailwind defaults plus a custom `xs` at 30rem.

| Token | Width | Main effect |
| ----- | ----- | ----------- |
| base | < 640px | Single column, hamburger menu, stacked hero |
| `sm` | 640px | Two-up stats, larger type scale |
| `md` | 768px | Desktop nav replaces hamburger, 2-col project grid |
| `lg` | 1024px | Split hero with terminal, sticky case-study TOC |
| `xl` | 1280px | 3-col skills and writing grids |

### Theming

`ThemeScript` sets the `dark` class on `<html>` **before first paint** from
`localStorage` or the OS preference, so there's no flash of the wrong theme.
`ThemeToggle` reads that class as its source of truth via a `MutationObserver`
(`src/lib/client-hooks.ts`) rather than holding a second copy of the state.

Colours are CSS custom properties in `globals.css` mapped into Tailwind via
`@theme inline`. To re-skin the site, change the `--accent` values in `:root`
and `.dark` — nothing else.

**The design uses no gradients.** Every surface is a flat fill, and colour
accents are solid rules and borders. The only `linear-gradient()` in the
codebase draws the 1px blueprint grid (hard colour stops, so it renders as
crisp lines, not a wash). Keep it that way — soft radial glows are the fastest
way to make a portfolio look generated.

---

## Contact form

Works with **no backend** by default: it validates client-side, then opens a
pre-filled mail draft to `site.email`.

To collect submissions properly, create a form at
[formspree.io](https://formspree.io) and set:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

The form detects the endpoint and POSTs JSON to it instead. It includes a
honeypot field, inline field-level validation, focus management on error, and
`aria-live` status announcements.

---

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is detected,
   no build configuration needed.
3. Add env vars under **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://akinshola.dev`)
   - `NEXT_PUBLIC_CONTACT_ENDPOINT` (optional)
4. Add your custom domain under **Settings → Domains**.
5. Redeploy after setting `NEXT_PUBLIC_SITE_URL` — canonicals and OG image URLs
   are baked in at build time.

### Anywhere else

Every route is static (`○`/`●` in the build output), so `next build` output works
on any Node host. For a pure static export, add `output: "export"` to
`next.config.ts` — note that disables the `next/image` optimizer, so also set
`images.unoptimized: true`.

### Post-deploy checklist

- [ ] `public/resume.pdf` exists and downloads
- [ ] `NEXT_PUBLIC_SITE_URL` set, then redeployed
- [ ] `/sitemap.xml` and `/robots.txt` show the right domain
- [ ] OG card looks right in [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] Contact form reaches you
- [ ] Lighthouse run on `/` and one case study

---

## Notable dependencies

Only one beyond the Next.js scaffold: **`simple-icons`** — a data-only package
of official brand SVG paths, tree-shaken to just the ~19 marks used.
LinkedIn (not carried, trademark policy), Starknet, Cairo and Axum are
hand-drawn in `src/components/ui/TechIcon.tsx`, alongside the concept glyphs.

No animation library. Scroll reveals use `IntersectionObserver`, the typing
effect and marquee are CSS + timers.
