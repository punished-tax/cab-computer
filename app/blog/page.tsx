import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return <BlogClient posts={posts} />;
}
