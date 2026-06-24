"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plane, GraduationCap, Briefcase, Users, FileText, Hotel, Ticket, Shield, Globe, Check } from "lucide-react";
import { getServices } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane, GraduationCap, Briefcase, Users, FileText, Hotel, Ticket, Shield, Globe,
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero/documents-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 navy-gradient opacity-85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="font-poppins font-bold text-4xl sm:text-6xl text-white mb-6">
            Nos <span className="gold-text">Services</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/70 text-xl">
            Une gamme complète pour tous vos besoins de voyage et d&apos;immigration.
          </motion.p>
        </div>
      </section>

      {/* Services detailed */}
      <section className="py-24 bg-white dark:bg-[#050e1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:grid-flow-col-dense"}`}
              >
                {/* Image */}
                <div className={isEven ? "" : "lg:col-start-2"}>
                  <div className="relative rounded-3xl overflow-hidden aspect-video">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1F3A]/60 to-transparent" />
                    <div className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-[#D4AF37]/20 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={isEven ? "" : "lg:col-start-1"}>
                  <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-[#0B1F3A] dark:text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-6">{service.description}</p>

                  {/* Advantages */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#0B1F3A] dark:text-white mb-3">Avantages</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {service.advantages.map((adv) => (
                        <div key={adv} className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60">
                          <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          {adv}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-[#0B1F3A] dark:text-white mb-3">Processus</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.process.map((step, si) => (
                        <div key={step} className="flex items-center gap-1.5 glass-dark rounded-full px-3 py-1.5 text-xs text-white/70">
                          <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-[#0B1F3A] flex items-center justify-center text-[10px] font-bold shrink-0">
                            {si + 1}
                          </span>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/appointment"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#b8941e] text-[#0B1F3A] font-semibold transition-all hover:scale-105"
                  >
                    Commencer ce service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
