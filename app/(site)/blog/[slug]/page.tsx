import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <BlogPostClient slug={slug} />;
}
