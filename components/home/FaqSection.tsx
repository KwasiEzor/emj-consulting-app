"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Combien de temps prend une demande de visa ?",
    a: "Les délais varient selon la destination et le type de visa. En général, comptez 2 à 4 semaines pour un visa Schengen, 4 à 8 semaines pour le Canada ou les États-Unis. Nous vous donnons une estimation précise lors de la consultation.",
  },
  {
    q: "Quels documents sont nécessaires pour une demande de visa ?",
    a: "Les documents de base incluent un passeport valide, des photos biométriques, un justificatif de domicile, des relevés bancaires et une assurance voyage. Nous vous fournirons une liste complète et personnalisée selon votre destination.",
  },
  {
    q: "Puis-je réserver et démarrer ma demande en ligne ?",
    a: "Oui ! Vous pouvez prendre rendez-vous directement sur notre site. Notre équipe vous contactera ensuite pour démarrer le processus. Des consultations en visioconférence sont également disponibles.",
  },
  {
    q: "Quels pays proposez-vous pour les visas ?",
    a: "Nous couvrons 30+ destinations dont le Canada, la France, les États-Unis, le Royaume-Uni, l'Allemagne, la Belgique, l'Italie, l'Espagne, Dubaï et bien d'autres. Contactez-nous pour votre destination spécifique.",
  },
  {
    q: "Que se passe-t-il si mon visa est refusé ?",
    a: "En cas de refus, nous analysons les raisons et vous accompagnons dans une nouvelle demande renforcée. Notre taux de succès en appel est très élevé grâce à notre expertise consulaire.",
  },
  {
    q: "Quels sont vos tarifs ?",
    a: "Nos honoraires varient selon le type de service et la complexité du dossier. Nous proposons des consultations initiales gratuites pour vous donner une estimation précise et transparente.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 bg-white dark:bg-[#0B1F3A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-bold text-3xl sm:text-5xl text-[#0B1F3A] dark:text-white mb-4"
          >
            Questions <span className="gold-text">fréquentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-white/50"
          >
            Tout ce que vous devez savoir avant de démarrer votre démarche visa.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-colors ${
                open === i
                  ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                  : "border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-[#0B1F3A] dark:text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-500 dark:text-white/60 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
