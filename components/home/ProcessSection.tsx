"use client";

import { motion } from "framer-motion";
import { MessageSquare, FolderOpen, Send, Eye, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Consultation", desc: "Discussion de votre projet et analyse de votre situation personnelle." },
  { icon: FolderOpen, title: "Préparation du dossier", desc: "Collecte et organisation minutieuse de tous vos documents requis." },
  { icon: Send, title: "Soumission", desc: "Dépôt officiel de votre dossier auprès des autorités compétentes." },
  { icon: Eye, title: "Suivi", desc: "Monitoring en temps réel et communication continue sur l'avancement." },
  { icon: CheckCircle2, title: "Obtention du visa", desc: "Félicitations ! Votre visa est obtenu. Bon voyage !" },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#D4AF37]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#D4AF37]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-bold text-3xl sm:text-5xl text-white mb-4"
          >
            Notre <span className="gold-text">processus</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            5 étapes simples pour obtenir votre visa en toute sérénité.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-all duration-300 relative z-10"
                  >
                    <step.icon className="w-7 h-7 text-[#D4AF37]" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0B1F3A] text-xs font-bold shadow-lg">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-poppins font-semibold text-white text-base mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
