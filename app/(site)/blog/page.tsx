"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Calendar, Clock, Search, Tag, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/data";

const categories = ["Tous", "Conseils voyage", "Visa étudiant", "Immigration", "Actualités internationales"];

export default function BlogPage() {
  const posts = getBlogPosts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Tous" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "Tous" || search);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/hero/blog-bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 navy-gradient opacity-85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="font-poppins font-bold text-4xl sm:text-6xl text-white mb-6">
            <span className="gold-text">Blog</span> & Conseils
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/70 text-xl mb-8">
            Actualités visa, conseils voyage et guides immigration par nos experts.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[#050e1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#D4AF37] text-[#0B1F3A]"
                    : "glass-dark text-white/60 hover:text-white hover:border-[#D4AF37]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && activeCategory === "Tous" && !search && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-[#D4AF37]/40 transition-colors">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 lg:p-12 bg-gray-50 dark:bg-[#0B1F3A]/50 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 text-[#D4AF37] text-sm mb-3">
                    <Tag className="w-3.5 h-3.5" />{featured.category}
                  </span>
                  <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 dark:text-white/50 mb-6 leading-relaxed">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-white/30">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.publishedAt}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory !== "Tous" || search ? filtered : rest).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:border-[#D4AF37]/40 transition-colors bg-white dark:bg-[#0B1F3A]/30">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[#D4AF37] text-xs mb-2">{post.category}</span>
                    <h3 className="font-semibold text-[#0B1F3A] dark:text-white mb-3 group-hover:text-[#D4AF37] transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 dark:text-white/50 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-white/30">
                      <span>{post.publishedAt}</span>
                      <span className="flex items-center gap-1 text-[#D4AF37]">
                        Lire <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 dark:text-white/30">
              Aucun article trouvé pour votre recherche.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
