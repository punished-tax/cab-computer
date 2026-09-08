import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";
import BlogClient from "./BlogClient";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <BlogClient
      posts={posts}
      categories={categories}
      tags={tags}
      initialCategory={params.category ?? null}
      initialTag={params.tag ?? null}
    />
  );
}
