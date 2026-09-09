import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectMeta = {
  slug: string;
  title: string;
  date: string;
  stack: string[];
  excerpt: string;
  github?: string;
  demo?: string;
  screenshots: string[];
  body: string;
};

let cache: ProjectMeta[] | null = null;

export function getAllProjects(): ProjectMeta[] {
  if (cache) return cache;

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".md"));

  const projects = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      stack: (data.stack as string[]) ?? [],
      excerpt: (data.excerpt as string) ?? "",
      github: (data.github as string) || undefined,
      demo: (data.demo as string) || undefined,
      screenshots: (data.screenshots as string[]) ?? [],
      body: content,
    };
  });

  cache = projects.sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
