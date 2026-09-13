import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, markdownToHtml } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const contentHtml = await markdownToHtml(post.body);

  const navItems = [
    { label: "projects", href: "/projects" },
    { label: "blog", href: "/blog", active: true },
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

        .prose-terminal { color: #d7dbdb; line-height: 1.75; max-width: 42rem; }
        .prose-terminal h1, .prose-terminal h2, .prose-terminal h3 {
          color: #e8a33d; margin-top: 2.25em; margin-bottom: 0.75em; line-height: 1.35;
        }
        .prose-terminal h2 { font-size: 1.05rem; }
        .prose-terminal h3 { font-size: 1rem; }
        .prose-terminal h1:first-child, .prose-terminal h2:first-child { margin-top: 0; }
        .prose-terminal p { margin: 1em 0; font-size: 0.95rem; }
        .prose-terminal a { color: #5f9ea0; text-decoration: none; border-bottom: 1px solid #2f3739; }
        .prose-terminal a:hover { border-bottom-color: #5f9ea0; }
        .prose-terminal ul, .prose-terminal ol { margin: 1em 0; padding-left: 1.5em; font-size: 0.95rem; }
        .prose-terminal li { margin: 0.4em 0; }
        .prose-terminal li::marker { color: #5f9ea0; }
        .prose-terminal code {
          font-family: 'IBM Plex Mono', monospace; background: #121617; color: #e8a33d;
          padding: 0.1em 0.35em; border-radius: 2px; font-size: 0.85em;
        }
        .prose-terminal pre {
          background: #0e1213; border: 1px solid #232b2d; border-radius: 3px;
          padding: 1rem; overflow-x: auto; margin: 1.25em 0; font-size: 0.82rem;
        }
        .prose-terminal pre code { background: none; color: #d7dbdb; padding: 0; }
        .prose-terminal blockquote {
          border-left: 2px solid #5f9ea0; padding-left: 1rem; color: #74827f; margin: 1.25em 0;
        }
        .prose-terminal hr { border: none; border-top: 1px solid #232b2d; margin: 2em 0; }
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

        

        {/* post meta */}
        <div className="mb-8">
          <h1
            className="text-lg sm:text-2xl mb-3"
            style={{ color: "#d7dbdb" }}
          >
            {post.title}
          </h1>
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm"
            style={{ color: "#74827f" }}
          >
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>
        </div>

        {/* content */}
        <div
          className="prose-terminal"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <div className="mt-16 pt-6" style={{ borderTop: "1px solid #232b2d" }}>
          <Link href="/blog" className="term-link text-sm" style={{ color: "#e8a33d" }}>
            ← back to blog
          </Link>
        </div>

        <p className="text-xs mt-10 text-center" style={{ color: "#3a4344" }}>
          Copyright © Gop 2026
        </p>
      </div>
    </div>
  );
}
