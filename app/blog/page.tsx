import { getAllPosts } from "@/lib/posts";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const posts = getAllPosts();

  return <BlogClient posts={posts} />;
}
