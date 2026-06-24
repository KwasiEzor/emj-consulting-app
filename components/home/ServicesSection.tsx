"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plane, GraduationCap, Briefcase, Users, FileText, Hotel, Ticket, Shield, Globe } from "lucide-react";
import type { Service } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane, GraduationCap, Briefcase, Users, FileText, Hotel, Ticket, Shield, Globe,
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative glass-dark rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-2xl" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#D4AF37]/25 transition-all duration-300">
          <Icon className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <h3 className="font-poppins font-semibold text-white text-lg mb-2 group-hover:text-[#D4AF37] transition-colors">
          {service.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4">{service.shortDesc}</p>
        <Link
          href={`/services#${service.id}`}
          className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-medium group/link"
        >
          En savoir plus
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1a3a6b]/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 text-[#D4AF37] text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            Nos expertises
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
          >
            Nos <span className="gold-text">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto"
          >
            Une gamme complète de services pour accompagner tous vos projets de voyage et d&apos;immigration.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#D4AF37]/40 text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-[#0B1F3A] transition-all hover:scale-105"
          >
            Voir tous nos services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
