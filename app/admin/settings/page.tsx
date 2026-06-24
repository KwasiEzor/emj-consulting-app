"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { SiTiktok } from "@react-icons/all-files/si/SiTiktok";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import type { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then(setSettings);
  }, []);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!settings) return <div className="text-gray-400">Chargement...</div>;

  const Field = ({ label, icon: Icon, field, type = "text" }: { label: string; icon: React.ComponentType<{className?: string}>; field: string; type?: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1.5 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5" />{label}
      </label>
      <input
        type={type}
        value={(settings as unknown as Record<string, unknown>)[field] as string || ""}
        onChange={(e) => setSettings({ ...settings, [field]: e.target.value })}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm"
      />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Paramètres</h1>
          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">Configuration du site EMJ-Consulting</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold text-sm hover:bg-[#b8941e] transition-colors">
          <Save className="w-4 h-4" />
          {saved ? "Sauvegardé ✓" : saving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact */}
        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Informations de contact</h2>
          <div className="space-y-4">
            <Field label="Nom du site" icon={Globe} field="siteName" />
            <Field label="Email" icon={Mail} field="email" type="email" />
            <Field label="Téléphone" icon={Phone} field="phone" />
            <Field label="WhatsApp" icon={FaWhatsapp} field="whatsapp" />
            <Field label="Adresse courte" icon={MapPin} field="address" />
            <Field label="Adresse complète" icon={MapPin} field="addressFull" />
          </div>
        </div>

        {/* Social */}
        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Réseaux sociaux</h2>
          <div className="space-y-4">
            {[
              { label: "Facebook", icon: FaFacebookF, key: "facebook" },
              { label: "Instagram", icon: FaInstagram, key: "instagram" },
              { label: "TikTok", icon: SiTiktok, key: "tiktok" },
            ].map((s) => (
              <div key={s.key}>
                <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1.5 flex items-center gap-1.5">
                  <s.icon className="w-3.5 h-3.5" />{s.label}
                </label>
                <input
                  type="url"
                  value={settings.social[s.key as keyof typeof settings.social] || ""}
                  onChange={(e) => setSettings({ ...settings, social: { ...settings.social, [s.key]: e.target.value } })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10 lg:col-span-2">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1.5">Titre par défaut</label>
              <input
                type="text"
                value={settings.seo.defaultTitle}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, defaultTitle: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1.5">Description par défaut</label>
              <textarea
                rows={2}
                value={settings.seo.defaultDescription}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, defaultDescription: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1.5">Mots-clés</label>
              <input
                type="text"
                value={settings.seo.keywords}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, keywords: e.target.value } })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-1.5">Google Maps Embed URL</label>
              <input
                type="text"
                value={settings.googleMapsEmbed}
                onChange={(e) => setSettings({ ...settings, googleMapsEmbed: e.target.value })}
                placeholder="https://maps.google.com/maps?q=..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37] text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
