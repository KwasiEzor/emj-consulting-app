"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle, ChevronRight } from "lucide-react";

const services = [
  "Visa Touristique",
  "Visa Étudiant",
  "Visa Affaires",
  "Regroupement Familial",
  "Assistance Administrative",
  "Réservation d'Hôtel",
  "Billets d'Avion",
  "Assurance Voyage",
  "Conseils Immigration",
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

type Step = 1 | 2 | 3 | 4;

export default function AppointmentPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050e1c] pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="font-poppins font-bold text-3xl text-[#0B1F3A] dark:text-white mb-4">
            Rendez-vous confirmé !
          </h2>
          <p className="text-gray-500 dark:text-white/50 mb-2">
            <strong className="text-[#D4AF37]">{form.service}</strong>
          </p>
          <p className="text-gray-500 dark:text-white/50 mb-8">
            {form.date} à {form.time} — Un email de confirmation a été envoyé à {form.email}
          </p>
          <button
            onClick={() => { setSuccess(false); setStep(1); setForm({ service: "", date: "", time: "", name: "", email: "", phone: "", notes: "" }); }}
            className="px-8 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold"
          >
            Nouveau rendez-vous
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/hero/appointment-bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 navy-gradient opacity-85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="font-poppins font-bold text-4xl sm:text-6xl text-white mb-6">
            Prendre <span className="gold-text">rendez-vous</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/70 text-xl">
            Réservez votre consultation en quelques étapes.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#050e1c]">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress */}
          <div className="flex items-center justify-between mb-12">
            {[
              { n: 1, label: "Service" },
              { n: 2, label: "Date & Heure" },
              { n: 3, label: "Coordonnées" },
              { n: 4, label: "Confirmation" },
            ].map(({ n, label }, i) => (
              <div key={n} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > n ? "bg-green-500 text-white" :
                  step === n ? "bg-[#D4AF37] text-[#0B1F3A]" :
                  "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-white/30"
                }`}>
                  {step > n ? "✓" : n}
                </div>
                <span className={`text-xs hidden sm:block ${step >= n ? "text-[#0B1F3A] dark:text-white" : "text-gray-400 dark:text-white/30"}`}>{label}</span>
                {i < 3 && <ChevronRight className="w-4 h-4 text-gray-300 dark:text-white/20 mx-1" />}
              </div>
            ))}
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white mb-6">Choisissez un service</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {services.map((service) => (
                    <button
                      key={service}
                      onClick={() => { setForm({ ...form, service }); setStep(2); }}
                      className={`p-4 rounded-xl border text-left font-medium transition-all hover:scale-[1.02] ${
                        form.service === service
                          ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                          : "border-gray-200 dark:border-white/10 text-[#0B1F3A] dark:text-white hover:border-[#D4AF37]/50"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white mb-6">Choisissez une date & heure</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />Date souhaitée
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#0B1F3A] dark:text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />Heure souhaitée
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setForm({ ...form, time: slot })}
                        className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                          form.time === slot
                            ? "bg-[#D4AF37] text-[#0B1F3A]"
                            : "border border-gray-200 dark:border-white/10 text-[#0B1F3A] dark:text-white hover:border-[#D4AF37]/50"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 font-medium">Retour</button>
                  <button
                    onClick={() => form.date && form.time && setStep(3)}
                    disabled={!form.date || !form.time}
                    className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold disabled:opacity-50 hover:bg-[#b8941e] transition-colors"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white mb-6">Vos coordonnées</h2>
                <div className="space-y-4 mb-6">
                  {[
                    { name: "name", label: "Nom complet", icon: User, type: "text", placeholder: "Jean Dupont" },
                    { name: "email", label: "Email", icon: Mail, type: "email", placeholder: "jean@exemple.com" },
                    { name: "phone", label: "Téléphone", icon: Phone, type: "tel", placeholder: "+228 93 47 49 63" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-2">
                        <field.icon className="w-4 h-4 inline mr-2" />{field.label}
                      </label>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-white/60 mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />Notes (optionnel)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Informations complémentaires..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#0B1F3A] dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 font-medium">Retour</button>
                  <button
                    onClick={() => form.name && form.email && form.phone && setStep(4)}
                    disabled={!form.name || !form.email || !form.phone}
                    className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold disabled:opacity-50 hover:bg-[#b8941e] transition-colors"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white mb-6">Confirmation</h2>
                <div className="rounded-2xl border border-gray-100 dark:border-white/10 p-6 mb-8 space-y-3">
                  {[
                    { label: "Service", value: form.service },
                    { label: "Date", value: form.date },
                    { label: "Heure", value: form.time },
                    { label: "Nom", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Téléphone", value: form.phone },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-gray-500 dark:text-white/40 text-sm">{item.label}</span>
                      <span className="text-[#0B1F3A] dark:text-white font-medium text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 font-medium">Retour</button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold hover:bg-[#b8941e] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Confirmation..." : "Confirmer le RDV"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
