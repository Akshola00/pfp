# Project screenshots

Drop project images here, then reference them from `src/data/projects.ts`:

```ts
{
  slug: "predifi",
  image: "/projects/predifi.webp",   // <- add this line
  ...
}
```

Without an `image`, the card renders a generated `<ProjectMockup />` (a code-window
graphic built from the project's `snippet` and `accent` colours), so the grid never
shows a broken or missing thumbnail. Adding a real screenshot is a straight upgrade,
never a requirement.

## Specs

| Property   | Value                                                  |
| ---------- | ------------------------------------------------------ |
| Aspect     | **16:10** — cards and case-study headers both use it   |
| Size       | **1200 × 750** (2× of the largest render size)         |
| Format     | `.webp` preferred, `.png`/`.jpg` fine                  |
| Weight     | Aim under 300 KB — `next/image` re-encodes to AVIF/WebP anyway |

`next/image` handles the rest: responsive `srcset` from the `sizes` prop, lazy
loading below the fold, `priority` on the first two cards, and AVIF/WebP
negotiation configured in `next.config.ts`.

## Taking good screenshots

- Capture at 2× (retina) with the browser window at ~1440px wide.
- Crop to the product, not the whole browser — the card already draws chrome.
- Keep them visually consistent: same zoom, same theme across all projects.
