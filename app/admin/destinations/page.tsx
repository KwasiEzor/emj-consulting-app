"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import type { Destination } from "@/lib/types";
import ImageUpload from "@/components/admin/ImageUpload";

const empty: Destination = {
  id: "",
  name: "",
  flag: "🌍",
  image: "",
  description: "",
  visaTypes: [],
  avgDelay: "2-4 semaines",
  requiredDocs: [],
  featured: false,
};

export default function AdminDestinationsPage() {
  const [items, setItems] = useState<Destination[]>([]);
  const [editing, setEditing] = useState<Destination | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/destinations").then((r) => r.json()).then(setItems);
  }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const updated = editing.id
      ? items.map((d) => (d.id === editing.id ? editing : d))
      : [...items, { ...editing, id: editing.name.toLowerCase().replace(/\s+/g, "-") }];
    await fetch("/api/admin/destinations", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setItems(updated);
    setEditing(null);
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette destination ?")) return;
    const updated = items.filter((d) => d.id !== id);
    await fetch("/api/admin/destinations", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setItems(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Destinations</h1>
          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">{items.length} destinations</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold text-sm">
          <Plus className="w-4 h-4" /> Nouvelle
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((dest) => (
          <div key={dest.id} className="bg-white dark:bg-[#0B1F3A] rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10">
            <div className="relative aspect-video">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 text-2xl">{dest.flag}</span>
              {dest.featured && <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#0B1F3A] text-xs font-bold">Phare</span>}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">{dest.name}</h3>
                <div className="flex gap-1">
                  <button onClick={() => setEditing(dest)} className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 text-gray-400 hover:text-[#D4AF37] transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => remove(dest.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 dark:text-white/40 text-xs mt-1">{dest.avgDelay}</p>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white dark:bg-[#0B1F3A] rounded-3xl p-8 max-w-lg lg:max-w-[75vw] w-full shadow-2xl border border-gray-100 dark:border-white/10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-white">{editing.id ? "Modifier" : "Nouvelle destination"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: "name", label: "Nom" },
                { key: "flag", label: "Emoji drapeau" },
                { key: "avgDelay", label: "Délai moyen" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">{f.label}</label>
                  <input type="text" value={(editing as unknown as Record<string, string>)[f.key] || ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm" />
                </div>
              ))}
              <ImageUpload label="Image" value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} folder="emj-consulting/destinations" />
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Description</label>
                <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Types de visa (séparés par des virgules)</label>
                <input type="text" value={editing.visaTypes.join(", ")} onChange={(e) => setEditing({ ...editing, visaTypes: e.target.value.split(",").map((s) => s.trim()) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Documents requis (un par ligne)</label>
                <textarea rows={3} value={editing.requiredDocs.join("\n")} onChange={(e) => setEditing({ ...editing, requiredDocs: e.target.value.split("\n").filter(Boolean) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none" />
              </div>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4 accent-[#D4AF37]" />
                <span className="text-sm text-gray-600 dark:text-white/60">Destination phare (affichée sur l&apos;accueil)</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 text-sm">Annuler</button>
              <button onClick={save} disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold text-sm">
                <Save className="w-4 h-4" />{saving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
