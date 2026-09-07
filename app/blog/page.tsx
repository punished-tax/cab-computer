"use client"

// ---- Design tokens (shared with home page) ----
// bg: #0b0e0f · surface: #121617 · border: #232b2d
// text: #d7dbdb · muted: #74827f · accent: #e8a33d · accent2: #5f9ea0
// mono: "IBM Plex Mono"

const POSTS = [
  {
    date: "2026-08-14",
    slug: "why-i-rewrote-my-scheduler-in-go",
    title: "why-i-rewrote-my-scheduler-in-go.md",
    tags: ["go", "backend"],
    readTime: "6 min",
  },
  {
    date: "2026-07-02",
    slug: "notes-on-postgres-indexing",
    title: "notes-on-postgres-indexing.md",
    tags: ["postgres", "notes"],
    readTime: "4 min",
  },
  {
    date: "2026-05-19",
    slug: "a-week-with-nvim",
    title: "a-week-with-nvim.md",
    tags: ["tools"],
    readTime: "3 min",
  },
  {
    date: "2026-03-30",
    slug: "building-pyassistant",
    title: "building-pyassistant.md",
    tags: ["python", "ai", "project"],
    readTime: "8 min",
  },
];

export default function TerminalBlog() {
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
        .post-row { transition: background 0.12s ease; }
        .post-row:hover { background: #121617; }
      `}</style>

      <div className="w-full max-w-4xl">
        {/* nav — identical pattern to home */}
        <div
          className="pb-4 mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          style={{ borderBottom: "1px solid #232b2d", color: "#d7dbdb" }}
        >
          <span style={{ color: "#e8a33d" }}>home</span>
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
          $ blog
        </p>
        <p className="text-xs mb-6" style={{ color: "#3a4344" }}>
          total {POSTS.length}
        </p>

        {/* column labels — desktop only */}
        <div
          className="hidden sm:grid text-xs mb-2 px-3"
          style={{
            gridTemplateColumns: "7rem 1fr 10rem 5rem",
            color: "#4a5456",
            borderBottom: "1px solid #1a2021",
            paddingBottom: "0.5rem",
          }}
        >
          <span>date</span>
          <span>name</span>
          <span>tags</span>
          <span className="text-right">size</span>
        </div>

        {/* post list */}
        <div>
          {POSTS.map((post) => (
            <a
              key={post.slug}
              href={`#blog/${post.slug}`}
              className="post-row block rounded-sm px-3 py-3 sm:py-2"
              style={{ textDecoration: "none" }}
            >
              <div
                className="grid sm:grid-cols-none gap-y-1 text-sm"
                style={{ gridTemplateColumns: "1fr" }}
              >
                <div
                  className="sm:grid sm:items-center"
                  style={{ gridTemplateColumns: "7rem 1fr 10rem 5rem" }}
                >
                  <span
                    className="block sm:inline text-xs sm:text-sm mb-1 sm:mb-0"
                    style={{ color: "#74827f" }}
                  >
                    {post.date}
                  </span>
                  <span style={{ color: "#d7dbdb" }}>{post.title}</span>
                  <span className="text-xs sm:text-sm mt-1 sm:mt-0" style={{ color: "#5f9ea0" }}>
                    {post.tags.map((t) => `#${t}`).join("  ")}
                  </span>
                  <span
                    className="text-xs sm:text-sm mt-1 sm:mt-0 sm:text-right"
                    style={{ color: "#4a5456" }}
                  >
                    {post.readTime}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-xs mt-16 text-center" style={{ color: "#3a4344" }}>
          Copyright © Gop 2026
        </p>
      </div>
    </div>
  );
}