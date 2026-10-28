import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    if (!post) notFound();
  } catch {
    // DB not available at build time; client will fetch dynamically
  }
  return <BlogPostClient slug={slug} />;
}
