"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

const empty: Testimonial = {
  id: "",
  name: "",
  role: "",
  country: "",
  avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
  rating: 5,
  text: "",
  date: new Date().toISOString().split("T")[0],
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/testimonials").then((r) => r.json()).then(setItems);
  }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const updated = editing.id
      ? items.map((t) => (t.id === editing.id ? editing : t))
      : [...items, { ...editing, id: Date.now().toString() }];
    await fetch("/api/admin/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setItems(updated);
    setEditing(null);
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    const updated = items.filter((t) => t.id !== id);
    await fetch("/api/admin/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setItems(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Témoignages</h1>
          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">{items.length} témoignages</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold text-sm">
          <Plus className="w-4 h-4" /> Nouveau
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t.id} className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-5 border border-gray-100 dark:border-white/10">
            <div className="flex items-start gap-4 mb-3">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                <div className="text-[#D4AF37] text-xs">{t.role} · {t.country}</div>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />)}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(t)} className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 text-gray-400 hover:text-[#D4AF37] transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => remove(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-gray-500 dark:text-white/50 text-xs line-clamp-2 italic">&ldquo;{t.text}&rdquo;</p>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditing(null)} />
          <div className="relative bg-white dark:bg-[#0B1F3A] rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-white">
                {editing.id ? "Modifier" : "Nouveau témoignage"}
              </h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: "name", label: "Nom" },
                { key: "role", label: "Rôle" },
                { key: "country", label: "Pays du visa" },
                { key: "avatar", label: "URL Avatar" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">{f.label}</label>
                  <input
                    type="text"
                    value={(editing as unknown as Record<string, string>)[f.key] || ""}
                    onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Note ({editing.rating}/5)</label>
                <input type="range" min="1" max="5" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="w-full accent-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Témoignage</label>
                <textarea rows={4} value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 text-sm">Annuler</button>
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
