"use client"

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

// ---- Design tokens (shared with home page) ----
// bg: #0b0e0f · surface: #121617 · border: #232b2d
// text: #d7dbdb · muted: #74827f · accent: #e8a33d · accent2: #5f9ea0
// mono: "IBM Plex Mono"

type Props = {
  posts: PostMeta[];
};

export default function BlogClient({ posts }: Props) {
  const [query, setQuery] = useState("");

  const navItems = [
    { label: "projects", href: "/projects" },
    { label: "blog", href: "/blog", active: true },
    { label: "about", href: "/about" },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      return (
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q)
      );
    });
  }, [posts, query]);

  const hasActiveFilters = query !== "";

  const clearFilters = () => {
    setQuery("");
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center px-4 py-10 sm:py-16"
      style={{ background: "#0b0e0f", fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <style>{`
        a.term-link { text-decoration: none; border-bottom: 1px solid transparent; }
        a.term-link:hover { border-bottom: 1px solid #e8a33d; }
        a.term-link:focus-visible, button.term-link:focus-visible { outline: 2px solid #e8a33d; outline-offset: 3px; }
        .post-row { transition: background 0.12s ease; }
        .post-row:hover { background: #121617; }
        .search-input::placeholder { color: #4a5456; }
        .search-input:focus { outline: none; }
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
          $ blog
        </p>
        <p className="text-xs mb-6" style={{ color: "#3a4344" }}>
          total {posts.length}
        </p>

        {/* search */}
        <div className="mb-5">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-sm text-sm"
            style={{ border: "1px solid #232b2d", background: "#121617" }}
          >
            <span style={{ color: "#5f9ea0" }}></span>
            <span style={{ color: "#74827f" }}></span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='"search title or article text..."'
              aria-label="Search blog posts"
              className="search-input flex-1 bg-transparent text-sm min-w-0"
              style={{ color: "#d7dbdb", border: "none" }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-xs"
                style={{ color: "#74827f" }}
              >
                clear
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mb-8 flex items-center text-sm">
            <button
              onClick={clearFilters}
              className="text-xs"
              style={{ color: "#af3b18" }}
            >
              reset filters
            </button>
          </div>
        )}

        {/* column labels — desktop only */}
        {filtered.length > 0 && (
          <div
            className="hidden sm:grid text-xs mb-2 px-3"
            style={{
              gridTemplateColumns: "7rem 1fr",
              color: "#4a5456",
              borderBottom: "1px solid #1a2021",
              paddingBottom: "0.5rem",
            }}
          >
            <span>date</span>
            <span>name</span>
          </div>
        )}

        {/* post list */}
        <div>
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="post-row block rounded-sm px-3 py-3 sm:py-2"
              style={{ textDecoration: "none" }}
            >
              <div
                className="grid sm:grid-cols-none gap-y-1 text-sm"
                style={{ gridTemplateColumns: "1fr" }}
              >
                <div
                  className="flex flex-col gap-1 sm:grid sm:items-center sm:gap-0"
                  style={{ gridTemplateColumns: "7rem 1fr" }}
                >
                  <span className="text-xs sm:text-sm" style={{ color: "#74827f" }}>
                    {post.date}
                  </span>
                  <span style={{ color: "#d7dbdb" }}>{post.title}</span>
                </div>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="px-3 py-8 text-sm" style={{ color: "#74827f" }}>
              <span style={{ color: "#af3b18" }}>grep:</span> no matches found
              <button
                onClick={clearFilters}
                className="term-link block mt-2"
                style={{ color: "#e8a33d" }}
              >
                reset filters
              </button>
            </div>
          )}
        </div>

        <p className="text-xs mt-16 text-center" style={{ color: "#3a4344" }}>
          Copyright © Gop 2026
        </p>
      </div>
    </div>
  );
}
