"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, TrendingUp, Globe2, Star, Clock } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Visas obtenus", icon: TrendingUp },
  { value: 30, suffix: "+", label: "Destinations", icon: Globe2 },
  { value: 98, suffix: "%", label: "Clients satisfaits", icon: Star },
  { value: 10, suffix: "+", label: "Années d'expérience", icon: Clock },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(target / 80);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 20);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — priority load, no JS animation */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/airplane-sky.jpg"
          alt="Avion en vol"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/80 via-[#0B1F3A]/60 to-[#0B1F3A]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-[#D4AF37] text-sm font-medium"
        >
          <Globe2 className="w-4 h-4" />
          Agence de voyage & visa certifiée — Lomé, Togo
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-poppins font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-6 max-w-5xl mx-auto"
        >
          Votre partenaire de confiance pour vos{" "}
          <span className="gold-text">voyages</span> et{" "}
          <span className="gold-text">demandes de visa</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          EMJ-Consulting accompagne particuliers, étudiants et professionnels dans
          leurs démarches de voyage et d&apos;immigration avec expertise et sérénité.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/services"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#D4AF37] hover:bg-[#b8941e] text-[#0B1F3A] font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/30"
          >
            Commencer maintenant
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/appointment"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass border border-white/20 text-white font-semibold text-lg hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Prendre rendez-vous
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 text-center hover:border-[#D4AF37]/30 transition-colors group"
            >
              <stat.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-poppins font-bold text-2xl lg:text-3xl text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/50 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[#D4AF37] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
