import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  body: string;
};

function readTimeFromContent(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

let cache: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (cache) return cache;

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      category: (data.category as string) ?? "uncategorized",
      tags: (data.tags as string[]) ?? [],
      excerpt: (data.excerpt as string) ?? "",
      readTime: (data.readTime as string) ?? readTimeFromContent(content),
      body: content,
    };
  });

  cache = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category))).sort();
}

export function getAllTags(): string[] {
  return Array.from(new Set(getAllPosts().flatMap((p) => p.tags))).sort();
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
