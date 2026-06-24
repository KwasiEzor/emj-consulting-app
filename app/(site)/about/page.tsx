"use client";

import { motion } from "framer-motion";
import { Award, Target, Heart, Globe2, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import type { PageContent } from "@/lib/types";
import pagesData from "@/data/pages.json";

const timeline = [
  { year: "2014", title: "Fondation", desc: "EMLOR Joël crée EMJ-Consulting à Lomé avec une vision claire : rendre l'accès au voyage international accessible à tous." },
  { year: "2016", title: "Expansion services", desc: "Lancement des services de visa étudiant et d'accompagnement académique pour les jeunes Togolais." },
  { year: "2018", title: "100+ clients", desc: "Cap des 100 clients satisfaits franchi. Ouverture aux demandes de regroupement familial." },
  { year: "2020", title: "Digitalisation", desc: "Lancement des consultations en ligne pour servir les clients depuis toute l'Afrique de l'Ouest." },
  { year: "2022", title: "30 destinations", desc: "EMJ-Consulting couvre désormais 30+ destinations et 500+ visas obtenus avec succès." },
  { year: "2024", title: "Aujourd'hui", desc: "Leader reconnu en Afrique de l'Ouest, avec un taux de satisfaction client de 98%." },
];

const values = [
  { icon: Award, title: "Excellence", desc: "Nous visons l'excellence dans chaque dossier que nous traitons." },
  { icon: Heart, title: "Bienveillance", desc: "Votre réussite est notre priorité absolue. Nous mettons tout en œuvre pour vous." },
  { icon: Globe2, title: "Ouverture", desc: "Nous croyons en un monde sans frontières, accessible à tous." },
  { icon: CheckCircle, title: "Intégrité", desc: "Transparence totale dans nos démarches, honoraires et communications." },
];

export default function AboutPage() {
  const [pg, setPg] = useState<PageContent["about"]>(pagesData.about as PageContent["about"]);
  useEffect(() => {
    fetch("/api/pages").then(r => r.json()).then(d => setPg(d.about));
  }, []);
  const about = pg;
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero/business-handshake.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 navy-gradient opacity-80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-poppins font-bold text-4xl sm:text-6xl text-white mb-6"
          >
            {about.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-xl max-w-2xl mx-auto"
          >
            {about.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-[#050e1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/team/emlor-joel.jpg"
                alt="EMLOR Joël"
                className="w-full rounded-3xl object-cover aspect-[4/5]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-[#0B1F3A]/10 dark:bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-6 text-[#0B1F3A] dark:text-[#D4AF37] text-sm">
                <Users className="w-4 h-4" />
                Notre fondateur
              </div>

              <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0B1F3A] dark:text-white mb-4">
                {about.founderName}
              </h2>
              <p className="text-[#D4AF37] font-medium mb-6">{about.founderRole}</p>

              <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-8">
                {about.founderBio}
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "10+", label: "Années d'exp." },
                  { value: "500+", label: "Visas obtenus" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl border border-gray-100 dark:border-white/10">
                    <div className="font-poppins font-bold text-2xl gold-text">{stat.value}</div>
                    <div className="text-gray-500 dark:text-white/40 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-24 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: about.missionTitle, text: about.missionText },
              { icon: Globe2, title: about.visionTitle, text: about.visionText },
              { icon: Heart, title: "Nos Valeurs", text: "Excellence, intégrité, bienveillance et ouverture sur le monde. Nous traitons chaque dossier comme si c'était le nôtre." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-dark rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="font-poppins font-bold text-white text-xl mb-4">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white dark:bg-[#050e1c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl sm:text-5xl text-[#0B1F3A] dark:text-white mb-4">
              Notre <span className="gold-text">histoire</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-8 pl-20"
                >
                  <div className="absolute left-5 top-1 w-6 h-6 rounded-full bg-[#D4AF37] border-4 border-white dark:border-[#050e1c] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#0B1F3A]" />
                  </div>
                  <div>
                    <span className="text-[#D4AF37] font-bold text-sm">{item.year}</span>
                    <h3 className="font-semibold text-[#0B1F3A] dark:text-white text-lg mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-500 dark:text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl sm:text-5xl text-white mb-4">
              Nos <span className="gold-text">valeurs</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-dark rounded-2xl p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <v.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
