import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the workspace root. Without this, Turbopack walks up and picks up a
  // stray package-lock.json outside the repo.
  turbopack: { root: path.resolve(".") },

  images: {
    // AVIF first, WebP fallback — next/image negotiates per request.
    formats: ["image/avif", "image/webp"],
    // Matches the ProjectCard/case-study `sizes` breakpoints.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },

  // Sent on every route. Static site, so nothing here needs to be per-request.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
