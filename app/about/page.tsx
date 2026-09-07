"use client"

// ---- Design tokens (shared with home page) ----
// bg: #0b0e0f · surface: #121617 · border: #232b2d
// text: #d7dbdb · muted: #74827f · accent: #e8a33d · accent2: #5f9ea0
// mono: "IBM Plex Mono"

const SKILLS = [
  { group: "languages", items: ["Python", "Go", "TypeScript", "SQL"] },
  { group: "backend", items: ["FastAPI", "PostgreSQL", "Redis", "Docker"] },
  { group: "tools", items: ["Git", "Linux", "Nginx", "AWS"] },
];

const LOG = [
  { date: "2026", role: "Backend Developer", note: "building things that talk to other things" },
  { date: "2024", role: "CS Degree", note: "learned what not to do first" },
  { date: "2022", role: "Started coding", note: "hello world, and it stuck" },
];

const LINKS = [
  { label: "github", value: "github.com/yourname" },
  { label: "email", value: "mailto:you@example.com" },
  { label: "linkedin", value: "linkedin.com/in/yourname" },
];

export default function TerminalAbout() {
  const navItems = [
    { label: "projects", href: "/projects" },
    { label: "blog", href: "/blog" },
    { label: "about", href: "/about", active: true },
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
        <p className="text-sm mb-2" style={{ color: "#74827f" }}>
          $ about me
        </p>

        {/* bio */}
        <div
          className="mb-10 text-sm sm:text-base"
          style={{ color: "#d7dbdb", lineHeight: 1.7, maxWidth: "42rem" }}
        >
          <p>
            <span style={{ color: "#5f9ea0" }}>#</span> I'm Ahmad — a backend-leaning developer
            who likes small, focused tools over big frameworks.
          </p>
          <p className="mt-3">
            <span style={{ color: "#5f9ea0" }}>#</span> Most of what I build starts as a script
            to solve something annoying, and occasionally survives long enough to become a
            real project.
          </p>
          <p className="mt-3">
            <span style={{ color: "#5f9ea0" }}>#</span> Outside of code: reading, terminals I
            didn't need to customize but did anyway, and coffee.
          </p>
        </div>

        {/* skills */}
        <p className="text-sm mb-3" style={{ color: "#74827f" }}>
          $ skills
        </p>
        <div className="mb-10 space-y-3">
          {SKILLS.map((group) => (
            <div key={group.group} className="text-sm sm:text-base flex flex-wrap gap-x-3">
              <span style={{ color: "#5f9ea0", minWidth: "6.5rem" }}>{group.group}/</span>
              <span style={{ color: "#d7dbdb" }}>
                {group.items.map((skill, i) => (
                  <span key={skill}>
                    {skill}
                    {i < group.items.length - 1 && (
                      <span style={{ color: "#74827f" }}> · </span>
                    )}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* experience log */}
        <p className="text-sm mb-3" style={{ color: "#74827f" }}>
          $ experience
        </p>
        <div className="mb-10 space-y-2">
          {LOG.map((entry) => (
            <div key={entry.date} className="text-sm sm:text-base flex flex-wrap gap-x-3">
              <span style={{ color: "#e8a33d" }}>{entry.date}</span>
              <span style={{ color: "#d7dbdb" }}>{entry.role}</span>
              <span style={{ color: "#74827f" }}>— {entry.note}</span>
            </div>
          ))}
        </div>

        {/* contact / links */}
        <p className="text-sm mb-3" style={{ color: "#74827f" }}>
          $ contact
        </p>
        <div className="mb-10 space-y-1.5">
          {LINKS.map((link) => (
            <div key={link.label} className="text-sm sm:text-base">
              <span style={{ color: "#d7dbdb" }}>{link.label}</span>
              <span style={{ color: "#74827f" }}> -&gt; </span>
              <a href={link.value} className="term-link" style={{ color: "#e8a33d" }}>
                {link.value}
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs mt-16 text-center" style={{ color: "#3a4344" }}>
          Copyright © Gop 2026
        </p>
      </div>
    </div>
  );
}