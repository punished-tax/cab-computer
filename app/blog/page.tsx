import { getAllPosts, getAllTags } from "@/lib/posts";
import BlogClient from "./BlogClient";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const params = await searchParams;
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <BlogClient
      posts={posts}
      tags={tags}
      initialTag={params.tag ?? null}
    />
  );
}
