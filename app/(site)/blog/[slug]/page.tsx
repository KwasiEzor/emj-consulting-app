import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/data";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = getBlogPosts().filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050e1c]">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050e1c] via-black/40 to-black/20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#D4AF37] text-sm mb-6 hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" /> Retour au blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 dark:text-white/40 mb-4">
          <span className="flex items-center gap-1.5 text-[#D4AF37]">
            <Tag className="w-3.5 h-3.5" />{post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />{post.publishedAt}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />{post.readTime} de lecture
          </span>
        </div>

        <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0B1F3A] dark:text-white mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100 dark:border-white/10">
          <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]/40" />
          <div>
            <div className="font-semibold text-[#0B1F3A] dark:text-white">{post.author}</div>
            <div className="text-gray-400 dark:text-white/40 text-sm">Expert visa & immigration</div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <p className="text-gray-600 dark:text-white/70 leading-relaxed text-lg">{post.excerpt}</p>
          <p className="text-gray-600 dark:text-white/70 leading-relaxed">{post.content}</p>
          <blockquote className="border-l-4 border-[#D4AF37] pl-6 my-8 italic text-gray-500 dark:text-white/50">
            &ldquo;L&apos;expertise d&apos;EMJ-Consulting fait la différence dans chaque demande de visa. Notre approche personnalisée garantit les meilleurs résultats pour nos clients.&rdquo;
            <footer className="mt-2 not-italic text-sm text-[#D4AF37]">— EMLOR Joël, Fondateur</footer>
          </blockquote>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-16">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-[#0B1F3A]/10 dark:bg-[#D4AF37]/10 text-[#0B1F3A] dark:text-[#D4AF37] text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl navy-gradient p-8 mb-16 text-center">
          <h3 className="font-poppins font-bold text-white text-2xl mb-3">Besoin d&apos;aide pour votre visa ?</h3>
          <p className="text-white/60 mb-6">Nos experts sont disponibles pour vous accompagner.</p>
          <Link href="/appointment" className="inline-block px-8 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold hover:bg-[#b8941e] transition-colors">
            Prendre rendez-vous
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mb-16">
            <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white mb-8">Articles similaires</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-[#D4AF37]/40 transition-colors">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#0B1F3A] dark:text-white text-sm line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
