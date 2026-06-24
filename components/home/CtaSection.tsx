"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Mail, Plane } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/world-travel.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 navy-gradient opacity-90" />
      </div>

      {/* Floating plane */}
      <motion.div
        animate={{ x: ["-5%", "105%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 opacity-10"
      >
        <Plane className="w-24 h-24 text-[#D4AF37]" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-[#D4AF37] text-sm"
        >
          <Plane className="w-4 h-4" />
          Votre voyage commence maintenant
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-poppins font-bold text-3xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight"
        >
          Prêt à réaliser votre{" "}
          <span className="gold-text">prochain voyage</span> ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg mb-10 max-w-2xl mx-auto"
        >
          Nos experts sont prêts à vous accompagner. Prenez rendez-vous dès aujourd&apos;hui
          et donnez vie à vos projets de voyage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/appointment"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#D4AF37] hover:bg-[#b8941e] text-[#0B1F3A] font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/30"
          >
            <Calendar className="w-5 h-5" />
            Prendre rendez-vous
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass border border-white/20 text-white font-semibold text-lg hover:border-[#D4AF37]/50 transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            Nous contacter
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
