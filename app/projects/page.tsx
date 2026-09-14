import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

// ---- Design tokens (shared with home page) ----
// bg: #0b0e0f · surface: #121617 · border: #232b2d
// text: #d7dbdb · muted: #74827f · accent: #e8a33d · accent2: #5f9ea0
// mono: "IBM Plex Mono"

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = getAllProjects();

  const navItems = [
    { label: "projects", href: "/projects", active: true },
    { label: "blog", href: "/blog" },
    { label: "about", href: "/about" },
  ];

  return (
    <div
      className="min-h-screen w-full flex justify-center px-4 py-10 sm:py-16"
      style={{ background: "#0b0e0f", fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <style>{`
        a.term-link { text-decoration: none; border-bottom: 1px solid transparent; }
        a.term-link:hover { border-bottom: 1px solid #e8a33d; }
        a.term-link:focus-visible { outline: 2px solid #e8a33d; outline-offset: 3px; }
        .project-card { transition: border-color 0.12s ease, background 0.12s ease; }
        .project-card:hover { border-color: #5f9ea0; background: #121617; }
        .thumb-placeholder {
          background-image:
            linear-gradient(45deg, #171c1d 25%, transparent 25%),
            linear-gradient(-45deg, #171c1d 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #171c1d 75%),
            linear-gradient(-45deg, transparent 75%, #171c1d 75%);
          background-size: 16px 16px;
          background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
        }
      `}</style>

      <div className="w-full max-w-4xl">
        {/* nav — identical pattern to home */}
        <div
          className="pb-4 mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          style={{ borderBottom: "1px solid #232b2d", color: "#d7dbdb" }}
        >
          <Link href="/" className="term-link" style={{ color: "#e8a33d" }}>
            home
          </Link>
          <span style={{ color: "#74827f" }}>:</span>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="term-link"
              style={{ color: item.active ? "#e8a33d" : "#d7dbdb" }}
            >
              {item.active ? `[${item.label}]` : item.label}
            </a>
          ))}
        </div>

        {/* header */}
        <p className="text-sm mb-1" style={{ color: "#74827f" }}>
          $ projects
        </p>
        <p className="text-xs mb-8" style={{ color: "#3a4344" }}>
          total {projects.length}
        </p>

        {/* project grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="project-card block rounded-sm overflow-hidden"
              style={{ border: "1px solid #232b2d", textDecoration: "none" }}
            >
              <div
                className="thumb-placeholder w-full flex items-center justify-center"
                style={{ height: "9rem", borderBottom: "1px solid #232b2d" }}
              >
                {project.screenshots[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.screenshots[0]}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs" style={{ color: "#3a4344" }}>
                    no preview
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="text-sm" style={{ color: "#d7dbdb" }}>
                    {project.title}
                  </span>
                  <span className="text-xs shrink-0" style={{ color: "#4a5456" }}>
                    {project.date}
                  </span>
                </div>
                <p className="text-xs mb-3" style={{ color: "#74827f", lineHeight: 1.5 }}>
                  {project.excerpt}
                </p>
                {project.stack.length > 0 && (
                  <p className="text-xs" style={{ color: "#5f9ea0" }}>
                    {project.stack.join(" · ")}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <p className="text-xs mt-16 text-center" style={{ color: "#3a4344" }}>
          Copyright © Gop 2026
        </p>
      </div>
    </div>
  );
}
