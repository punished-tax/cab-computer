import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { markdownToHtml } from "@/lib/posts";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.excerpt,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const contentHtml = await markdownToHtml(project.body);

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

        .spec-terminal { color: #b7bdbd; line-height: 1.6; }
        .spec-terminal h1, .spec-terminal h2, .spec-terminal h3 {
          color: #5f9ea0; margin-top: 1.75em; margin-bottom: 0.6em; line-height: 1.3;
          font-size: 1rem; text-transform: lowercase; letter-spacing: 0.02em;
          padding-bottom: 0.4em; border-bottom: 1px solid #1a2021;
        }
        .spec-terminal h2::before, .spec-terminal h3::before { content: "$ "; color: #3a4344; }
        .spec-terminal h1:first-child, .spec-terminal h2:first-child { margin-top: 0; }
        .spec-terminal p { margin: 0.75em 0; font-size: 1.20rem; }
        .spec-terminal a { color: #5f9ea0; text-decoration: none; border-bottom: 1px solid #2f3739; }
        .spec-terminal a:hover { border-bottom-color: #5f9ea0; }
        .spec-terminal ul, .spec-terminal ol { margin: 0.75em 0; padding-left: 1.25em; font-size: 0.92rem; }
        .spec-terminal li { margin: 0.3em 0; }
        .spec-terminal li::marker { color: #5f9ea0; }
        .spec-terminal code {
          font-family: 'IBM Plex Mono', monospace; background: #171c1d; color: #e8a33d;
          padding: 0.1em 0.35em; border-radius: 2px; font-size: 0.82em;
        }
        .spec-terminal pre {
          background: #0b0e0f; border: 1px solid #1a2021; border-radius: 3px;
          padding: 0.85rem; overflow-x: auto; margin: 1em 0; font-size: 0.78rem;
        }
        .spec-terminal pre code { background: none; color: #d7dbdb; padding: 0; }
        .spec-terminal hr { border: none; border-top: 1px solid #1a2021; margin: 1.5em 0; }

        .shot-placeholder {
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
        {/* nav */}
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

        {/* breadcrumb */}
        <p className="text-sm mb-6" style={{ color: "#74827f" }}>
          <Link href="/projects" className="term-link" style={{ color: "#74827f" }}>
            
          </Link>{" "}
          
        </p>

        {/* project meta */}
        <div className="mb-8">
          <h1 className="text-lg sm:text-2xl mb-4" style={{ color: "#d7dbdb" }}>
            {project.title}
          </h1>

          <div
            className="text-xs sm:text-sm rounded-sm"
            style={{ border: "1px solid #232b2d", background: "#121617" }}
          >
            <div className="flex" style={{ borderBottom: "1px solid #1a2021" }}>
              <span className="px-3 py-2 w-20 shrink-0" style={{ color: "#74827f" }}>date</span>
              <span className="px-3 py-2" style={{ color: "#d7dbdb" }}>{project.date}</span>
            </div>
            {project.stack.length > 0 && (
              <div
                className="flex"
                style={{ borderBottom: project.github || project.demo ? "1px solid #1a2021" : "none" }}
              >
                <span className="px-3 py-2 w-20 shrink-0" style={{ color: "#74827f" }}>stack</span>
                <span className="px-3 py-2" style={{ color: "#d7dbdb" }}>{project.stack.join(" · ")}</span>
              </div>
            )}
            {(project.github || project.demo) && (
              <div className="flex">
                <span className="px-3 py-2 w-20 shrink-0" style={{ color: "#74827f" }}>links</span>
                <span className="px-3 py-2 flex gap-4">
                  {project.github && (
                    <a href={project.github} className="term-link" style={{ color: "#e8a33d" }}>
                      github
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} className="term-link" style={{ color: "#e8a33d" }}>
                      demo
                    </a>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* screenshots */}
        <div className="mb-10">
          {project.screenshots.length > 0 ? (
            <div className="grid sm:grid-cols-1 gap-3">
              {project.screenshots.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full rounded-sm"
                  style={{ border: "1px solid #232b2d" }}
                />
              ))}
            </div>
          ) : (
            <div
              className="shot-placeholder w-full flex items-center justify-center rounded-sm"
              style={{ height: "12rem", border: "1px solid #232b2d" }}
            >
              <span className="text-xs" style={{ color: "#3a4344" }}>
                screenshots coming soon
              </span>
            </div>
          )}
        </div>

        {/* content */}
        <div
          className="spec-terminal rounded-sm"
          style={{background: "#0e1213", padding: "1.25rem 1.5rem" }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="mt-16 pt-6" style={{ borderTop: "1px solid #232b2d" }}>
          <Link href="/projects" className="term-link text-sm" style={{ color: "#e8a33d" }}>
            ← back to projects
          </Link>
        </div>

        <p className="text-xs mt-10 text-center" style={{ color: "#3a4344" }}>
          Copyright © Gop 2026
        </p>
      </div>
    </div>
  );
}
