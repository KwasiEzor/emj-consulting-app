"use client";

import { useState, useEffect } from "react";
import { Save, Home, Info, Briefcase, MapPin, Phone } from "lucide-react";
import type { PageContent } from "@/lib/types";
import ImageUpload from "@/components/admin/ImageUpload";

const TABS = [
  { key: "home", label: "Accueil", icon: Home },
  { key: "about", label: "À propos", icon: Info },
  { key: "services", label: "Services", icon: Briefcase },
  { key: "destinations", label: "Destinations", icon: MapPin },
  { key: "contact", label: "Contact", icon: Phone },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminPagesPage() {
  const [data, setData] = useState<PageContent | null>(null);
  const [tab, setTab] = useState<TabKey>("home");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/pages").then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/admin/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const set = <P extends TabKey>(page: P, field: keyof PageContent[P], value: string) => {
    if (!data) return;
    setData({ ...data, [page]: { ...data[page], [field]: value } });
  };

  if (!data) return <div className="text-gray-400 text-sm">Chargement...</div>;

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm transition-colors";
  const labelCls = "block text-sm font-medium text-gray-600 dark:text-white/60 mb-1.5";

  const Field = ({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) => (
    <div>
      <label className={labelCls}>{label}</label>
      {multiline ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} resize-none`} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Contenu des pages</h1>
          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">Modifiez le texte affiché sur chaque page du site</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold text-sm hover:bg-[#b8941e] transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saved ? "Sauvegardé ✓" : saving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t.key
                ? "bg-[#D4AF37] text-[#0B1F3A]"
                : "bg-white dark:bg-[#0B1F3A] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:border-[#D4AF37]/40"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-gray-100 dark:border-white/10 p-6 space-y-5">
        {tab === "home" && (
          <>
            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3">Section Hero</h2>
            <Field label="Badge (petite étiquette en haut)" value={data.home.badge} onChange={(v) => set("home", "badge", v)} />
            <Field label="Titre principal" value={data.home.title} onChange={(v) => set("home", "title", v)} />
            <Field label="Sous-titre" value={data.home.subtitle} onChange={(v) => set("home", "subtitle", v)} multiline />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bouton principal" value={data.home.ctaPrimary} onChange={(v) => set("home", "ctaPrimary", v)} />
              <Field label="Bouton secondaire" value={data.home.ctaSecondary} onChange={(v) => set("home", "ctaSecondary", v)} />
            </div>
            <h3 className="font-medium text-gray-700 dark:text-white/70 text-sm pt-2 border-t border-gray-100 dark:border-white/10">Statistiques</h3>
            {data.home.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-end">
                <div>
                  <label className={labelCls}>Valeur {i + 1}</label>
                  <input type="number" value={stat.value} onChange={(e) => {
                    const stats = [...data.home.stats];
                    stats[i] = { ...stats[i], value: Number(e.target.value) };
                    setData({ ...data, home: { ...data.home, stats } });
                  }} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Suffixe</label>
                  <input type="text" value={stat.suffix} onChange={(e) => {
                    const stats = [...data.home.stats];
                    stats[i] = { ...stats[i], suffix: e.target.value };
                    setData({ ...data, home: { ...data.home, stats } });
                  }} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Libellé</label>
                  <input type="text" value={stat.label} onChange={(e) => {
                    const stats = [...data.home.stats];
                    stats[i] = { ...stats[i], label: e.target.value };
                    setData({ ...data, home: { ...data.home, stats } });
                  }} className={inputCls} />
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "about" && (
          <>
            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3">Section Hero</h2>
            <Field label="Titre" value={data.about.heroTitle} onChange={(v) => set("about", "heroTitle", v)} />
            <Field label="Sous-titre" value={data.about.heroSubtitle} onChange={(v) => set("about", "heroSubtitle", v)} multiline />

            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3 pt-2">Fondateur</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nom" value={data.about.founderName} onChange={(v) => set("about", "founderName", v)} />
              <Field label="Rôle" value={data.about.founderRole} onChange={(v) => set("about", "founderRole", v)} />
            </div>
            <Field label="Biographie" value={data.about.founderBio} onChange={(v) => set("about", "founderBio", v)} multiline />
            <ImageUpload label="Photo du fondateur" value={data.about.founderImage || ""} onChange={(url) => setData({ ...data, about: { ...data.about, founderImage: url } })} folder="emj-consulting/team" />

            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3 pt-2">Mission & Vision</h2>
            <Field label="Titre Mission" value={data.about.missionTitle} onChange={(v) => set("about", "missionTitle", v)} />
            <Field label="Texte Mission" value={data.about.missionText} onChange={(v) => set("about", "missionText", v)} multiline />
            <Field label="Titre Vision" value={data.about.visionTitle} onChange={(v) => set("about", "visionTitle", v)} />
            <Field label="Texte Vision" value={data.about.visionText} onChange={(v) => set("about", "visionText", v)} multiline />
          </>
        )}

        {tab === "services" && (
          <>
            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3">Section Hero</h2>
            <Field label="Titre" value={data.services.heroTitle} onChange={(v) => set("services", "heroTitle", v)} />
            <Field label="Sous-titre" value={data.services.heroSubtitle} onChange={(v) => set("services", "heroSubtitle", v)} multiline />

            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3 pt-2">Appel à l&apos;action (bas de page)</h2>
            <Field label="Titre" value={data.services.ctaTitle} onChange={(v) => set("services", "ctaTitle", v)} />
            <Field label="Sous-titre" value={data.services.ctaSubtitle} onChange={(v) => set("services", "ctaSubtitle", v)} multiline />
          </>
        )}

        {tab === "destinations" && (
          <>
            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3">Section Hero</h2>
            <Field label="Titre" value={data.destinations.heroTitle} onChange={(v) => set("destinations", "heroTitle", v)} />
            <Field label="Sous-titre" value={data.destinations.heroSubtitle} onChange={(v) => set("destinations", "heroSubtitle", v)} multiline />

            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3 pt-2">Appel à l&apos;action (bas de page)</h2>
            <Field label="Titre" value={data.destinations.ctaTitle} onChange={(v) => set("destinations", "ctaTitle", v)} />
            <Field label="Sous-titre" value={data.destinations.ctaSubtitle} onChange={(v) => set("destinations", "ctaSubtitle", v)} multiline />
          </>
        )}

        {tab === "contact" && (
          <>
            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3">Section Hero</h2>
            <Field label="Titre" value={data.contact.heroTitle} onChange={(v) => set("contact", "heroTitle", v)} />
            <Field label="Sous-titre" value={data.contact.heroSubtitle} onChange={(v) => set("contact", "heroSubtitle", v)} multiline />

            <h2 className="font-semibold text-gray-900 dark:text-white text-base border-b border-gray-100 dark:border-white/10 pb-3 pt-2">Labels</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Titre formulaire" value={data.contact.formTitle} onChange={(v) => set("contact", "formTitle", v)} />
              <Field label="Titre bloc contact" value={data.contact.infoTitle} onChange={(v) => set("contact", "infoTitle", v)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
