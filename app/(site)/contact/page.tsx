"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0B1F3A]/5 dark:bg-white/5">
      <div className="text-center text-gray-400">
        <MapPin className="w-8 h-8 mx-auto mb-2 animate-pulse text-[#D4AF37]" />
        <p className="text-sm">Chargement de la carte...</p>
      </div>
    </div>
  ),
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", country: "", message: "" });
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/hero/contact-bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 navy-gradient opacity-85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="font-poppins font-bold text-4xl sm:text-6xl text-white mb-6">
            <span className="gold-text">Contactez</span>-nous
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/70 text-xl">
            Notre équipe vous répond dans les 24 heures.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#050e1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white mb-6">Informations de contact</h2>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: "Adresse", value: "Lomé, République Togolaise" },
                    { icon: Mail, label: "Email", value: "info@emj-consulting.fr", href: "mailto:info@emj-consulting.fr" },
                    { icon: Phone, label: "Téléphone", value: "+228 93 47 49 63", href: "tel:+22893474963" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-white/40 mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-[#0B1F3A] dark:text-white font-medium hover:text-[#D4AF37] transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-[#0B1F3A] dark:text-white font-medium">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold text-[#0B1F3A] dark:text-white mb-4">Réseaux sociaux</h3>
                <div className="flex gap-3">
                  {[
                    { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/14389515445", color: "bg-[#25D366]/10 text-[#25D366]" },
                    { icon: FaFacebookF, label: "Facebook", href: "#", color: "bg-blue-500/10 text-blue-500" },
                    { icon: FaInstagram, label: "Instagram", href: "#", color: "bg-pink-500/10 text-pink-500" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${s.color} border border-current/20 text-sm font-medium hover:scale-105 transition-all`}
                    >
                      <s.icon className="w-4 h-4" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Interactive map */}
              <div className="rounded-2xl overflow-hidden h-64 border border-gray-100 dark:border-white/10">
                <LeafletMap lat={6.1375} lng={1.2123} zoom={14} />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-gray-100 dark:border-white/10 p-8">
                <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white mb-8">Envoyez-nous un message</h2>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-poppins font-bold text-xl text-[#0B1F3A] dark:text-white mb-2">Message envoyé !</h3>
                    <p className="text-gray-500 dark:text-white/50">Nous vous répondrons dans les 24 heures.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { name: "name", label: "Nom complet", type: "text", placeholder: "Jean Dupont" },
                        { name: "email", label: "Email", type: "email", placeholder: "jean@exemple.com" },
                        { name: "phone", label: "Téléphone", type: "tel", placeholder: "+228 93 47 49 63" },
                        { name: "country", label: "Pays de destination", type: "text", placeholder: "France, Canada..." },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-2">{field.label}</label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={(form as unknown as Record<string, string>)[field.name]}
                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#0B1F3A] dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-2">Message</label>
                      <textarea
                        rows={5}
                        placeholder="Décrivez votre projet de voyage ou votre demande..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#0B1F3A] dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#D4AF37] hover:bg-[#b8941e] text-[#0B1F3A] font-bold transition-all hover:scale-[1.02] disabled:opacity-60"
                    >
                      {loading ? "Envoi en cours..." : (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
