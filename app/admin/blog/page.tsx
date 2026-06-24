"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import ImageUpload from "@/components/admin/ImageUpload";

const emptyPost: BlogPost = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Conseils voyage",
  tags: [],
  image: "",
  author: "EMLOR Joël",
  authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  publishedAt: new Date().toISOString().split("T")[0],
  readTime: "5 min",
  featured: false,
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/blog").then((r) => r.json()).then(setPosts);
  }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    let updated: BlogPost[];
    if (editing.id) {
      updated = posts.map((p) => (p.id === editing.id ? editing : p));
    } else {
      const newPost = {
        ...editing,
        id: Date.now().toString(),
        slug: editing.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      };
      updated = [...posts, newPost];
    }
    await fetch("/api/admin/blog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setPosts(updated);
    setEditing(null);
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    const updated = posts.filter((p) => p.id !== id);
    await fetch("/api/admin/blog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setPosts(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Articles de blog</h1>
          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">{posts.length} articles</p>
        </div>
        <button onClick={() => setEditing({ ...emptyPost })} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold text-sm">
          <Plus className="w-4 h-4" /> Nouvel article
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center gap-4 bg-white dark:bg-[#0B1F3A] rounded-2xl p-4 border border-gray-100 dark:border-white/10">
            <img src={post.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{post.title}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-white/30 mt-0.5">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.publishedAt}</span>
                {post.featured && <span className="text-[#D4AF37]">★ À la une</span>}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEditing(post)} className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 text-gray-400 hover:text-[#D4AF37] transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(post.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white dark:bg-[#0B1F3A] rounded-3xl p-8 max-w-2xl lg:max-w-[75vw] w-full shadow-2xl border border-gray-100 dark:border-white/10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-white">
                {editing.id ? "Modifier l'article" : "Nouvel article"}
              </h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: "title", label: "Titre", type: "text" },
                { key: "publishedAt", label: "Date", type: "date" },
                { key: "readTime", label: "Temps de lecture", type: "text" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={(editing as unknown as Record<string, string>)[f.key] || ""}
                    onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>
              ))}
              <ImageUpload label="Image de couverture" value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} folder="emj-consulting/blog" />
              <ImageUpload label="Avatar auteur" value={editing.authorAvatar} onChange={(url) => setEditing({ ...editing, authorAvatar: url })} folder="emj-consulting/avatars" />
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Catégorie</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1F3A] text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm"
                >
                  {["Conseils voyage", "Visa étudiant", "Immigration", "Actualités internationales"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Extrait</label>
                <textarea rows={2} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Contenu</label>
                <textarea rows={5} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none" />
              </div>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 accent-[#D4AF37]" />
                <span className="text-sm text-gray-600 dark:text-white/60">Article à la une</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 text-sm">
                Annuler
              </button>
              <button onClick={save} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold text-sm">
                <Save className="w-4 h-4" />
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
