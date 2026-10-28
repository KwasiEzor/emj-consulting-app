import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  return <BlogPostClient slug={slug} />;
}
