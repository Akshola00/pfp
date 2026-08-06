import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Generated social card for the site root — no static asset to keep in sync.
 * Next serves this at /opengraph-image and wires the meta tags automatically.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* Flat accent rule across the top — no gradients anywhere in the design. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 8,
            background: "#f59e0b",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#f59e0b", fontSize: 26 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              border: "1px solid #2d323a",
              background: "#101216",
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ display: "flex", color: "#6b665f" }}>~/{site.shortName.toLowerCase()}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#9c968d", fontSize: 34 }}>Hi, I&apos;m</div>
          <div
            style={{
              display: "flex",
              color: "#ece9e4",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: -2,
              marginTop: 6,
            }}
          >
            {site.name}
          </div>
          <div style={{ display: "flex", color: "#f59e0b", fontSize: 36, marginTop: 18 }}>
            &gt; {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 22,
            color: "#9c968d",
            borderTop: "1px solid #1e2127",
            paddingTop: 28,
          }}
        >
          {["Rust", "TypeScript", "Axum", "Starknet", "Stellar", "Solidity"].map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "6px 16px",
                borderRadius: 8,
                border: "1px solid #1e2127",
                background: "#0b0d10",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
