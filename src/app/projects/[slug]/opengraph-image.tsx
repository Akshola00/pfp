import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "@/data/projects";
import { site } from "@/data/site";

/** One generated social card per case study, built at the same time as the page. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#08090b",
            color: "#ece9e4",
            fontSize: 56,
          }}
        >
          {site.name}
        </div>
      ),
      size,
    );
  }

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
            background: project.accent,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: 999,
              border: `1px solid ${project.accent}`,
              color: project.accent,
            }}
          >
            Case study
          </div>
          <div style={{ display: "flex", color: "#6b665f" }}>{project.period}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#ece9e4",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              display: "flex",
              color: "#9c968d",
              fontSize: 32,
              marginTop: 16,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {project.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1e2127",
            paddingTop: 28,
            fontSize: 22,
            color: "#9c968d",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {project.stack.slice(0, 4).map((tech) => (
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
          <div style={{ display: "flex", color: "#6b665f" }}>{site.name}</div>
        </div>
      </div>
    ),
    size,
  );
}
