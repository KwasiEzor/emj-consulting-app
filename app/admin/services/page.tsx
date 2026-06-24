"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, X, Save, Plus } from "lucide-react";
import type { Service } from "@/lib/types";
import ImageUpload from "@/components/admin/ImageUpload";

const empty: Service = {
  id: "",
  icon: "Globe",
  title: "",
  shortDesc: "",
  description: "",
  advantages: [],
  process: [],
  image: "",
  featured: false,
};

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/services").then((r) => r.json()).then(setItems);
  }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const updated = editing.id
      ? items.map((s) => (s.id === editing.id ? editing : s))
      : [...items, { ...editing, id: editing.title.toLowerCase().replace(/\s+/g, "-") }];
    await fetch("/api/admin/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setItems(updated);
    setEditing(null);
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce service ?")) return;
    const updated = items.filter((s) => s.id !== id);
    await fetch("/api/admin/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setItems(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Services</h1>
          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">{items.length} services</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold text-sm">
          <Plus className="w-4 h-4" /> Nouveau
        </button>
      </div>

      <div className="space-y-3">
        {items.map((service) => (
          <div key={service.id} className="flex items-center gap-4 bg-white dark:bg-[#0B1F3A] rounded-2xl p-4 border border-gray-100 dark:border-white/10">
            <img src={service.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{service.title}</h3>
              <p className="text-gray-400 dark:text-white/30 text-xs mt-0.5 line-clamp-1">{service.shortDesc}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(service)} className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 text-gray-400 hover:text-[#D4AF37] transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(service.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white dark:bg-[#0B1F3A] rounded-3xl p-8 max-w-lg lg:max-w-[75vw] w-full shadow-2xl border border-gray-100 dark:border-white/10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-white">{editing.id ? "Modifier" : "Nouveau service"}</h2>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[
                { key: "title", label: "Titre" },
                { key: "icon", label: "Icône (nom Lucide)" },
                { key: "shortDesc", label: "Description courte" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">{f.label}</label>
                  <input type="text" value={(editing as unknown as Record<string, string>)[f.key] || ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm" />
                </div>
              ))}
              <div>
                <ImageUpload label="Image" value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} folder="emj-consulting/services" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Description complète</label>
                <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Avantages (un par ligne)</label>
                <textarea rows={3} value={editing.advantages.join("\n")} onChange={(e) => setEditing({ ...editing, advantages: e.target.value.split("\n").filter(Boolean) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1">Étapes du processus (une par ligne)</label>
                <textarea rows={3} value={editing.process.join("\n")} onChange={(e) => setEditing({ ...editing, process: e.target.value.split("\n").filter(Boolean) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none" />
              </div>
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
