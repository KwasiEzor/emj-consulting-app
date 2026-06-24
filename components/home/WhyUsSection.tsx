"use client";

import { motion } from "framer-motion";
import { UserCheck, Zap, Globe2, TrendingUp, HeadphonesIcon, Award } from "lucide-react";

const reasons = [
  {
    icon: UserCheck,
    title: "Accompagnement personnalisé",
    desc: "Chaque client est unique. Nous adaptons notre approche à votre situation et vos objectifs.",
  },
  {
    icon: Zap,
    title: "Réponse rapide",
    desc: "Notre équipe vous répond dans les 24h et traite votre dossier avec la plus grande réactivité.",
  },
  {
    icon: Globe2,
    title: "Expertise internationale",
    desc: "10+ années d'expérience dans les procédures consulaires de 30+ pays à travers le monde.",
  },
  {
    icon: TrendingUp,
    title: "Taux élevé de réussite",
    desc: "98% de nos clients obtiennent leur visa grâce à notre expertise et notre rigueur documentaire.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support 7j/7",
    desc: "Disponibles 7 jours sur 7 pour répondre à vos questions et inquiétudes, même le week-end.",
  },
  {
    icon: Award,
    title: "Certification & confiance",
    desc: "Agence certifiée et reconnue pour la qualité et l'intégrité de nos services depuis 10 ans.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#050e1c] relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=50"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#0B1F3A]/10 dark:bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 text-[#0B1F3A] dark:text-[#D4AF37] text-sm font-medium"
            >
              <Award className="w-4 h-4" />
              Pourquoi nous choisir
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-poppins font-bold text-3xl sm:text-5xl text-[#0B1F3A] dark:text-white leading-tight mb-6"
            >
              L&apos;excellence au service de{" "}
              <span className="gold-text">vos projets</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-white/50 text-lg leading-relaxed mb-8"
            >
              Depuis Lomé, nous ouvrons les portes du monde à nos clients avec une
              expertise reconnue et un engagement sans faille pour votre succès.
            </motion.p>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden h-64"
            >
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                alt="Équipe EMJ-Consulting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1F3A]/60 to-transparent" />
              <div className="absolute bottom-4 left-4 glass px-4 py-3 rounded-xl">
                <div className="text-white font-bold text-lg">EMLOR Joël</div>
                <div className="text-[#D4AF37] text-sm">Fondateur & Directeur</div>
              </div>
            </motion.div>
          </div>

          {/* Right — grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-5 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B1F3A]/10 dark:bg-[#D4AF37]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <reason.icon className="w-5 h-5 text-[#0B1F3A] dark:text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold text-[#0B1F3A] dark:text-white text-sm mb-1">
                  {reason.title}
                </h3>
                <p className="text-gray-500 dark:text-white/40 text-xs leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
