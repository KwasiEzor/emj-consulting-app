"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Destination } from "@/lib/types";

function DestinationCard({ dest, index }: { dest: Destination; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
    >
      {/* Image */}
      <img
        src={dest.image}
        alt={dest.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />

      {/* Flag */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg">
        {dest.flag}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-poppins font-bold text-white text-xl mb-1">{dest.name}</h3>
        <p className="text-white/60 text-xs mb-3 line-clamp-2">{dest.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
            <MapPin className="w-3 h-3" />
            {dest.avgDelay}
          </div>
          <Link
            href={`/destinations#${dest.id}`}
            className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-lg text-white text-xs font-medium hover:border-[#D4AF37]/40 transition-colors group/btn"
          >
            Découvrir
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationsSection({ destinations }: { destinations: Destination[] }) {
  const featured = destinations.filter((d) => d.featured);

  return (
    <section className="py-24 bg-white dark:bg-[#050e1c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#0B1F3A]/10 dark:bg-[#D4AF37]/10 px-4 py-2 rounded-full mb-4 text-[#0B1F3A] dark:text-[#D4AF37] text-sm font-medium"
          >
            <MapPin className="w-4 h-4" />
            Explorez le monde
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0B1F3A] dark:text-white mb-4"
          >
            Destinations <span className="gold-text">phares</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-white/50 max-w-2xl mx-auto"
          >
            Canada, France, États-Unis et plus — nous vous ouvrons les portes du monde.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featured.map((dest, i) => (
            <DestinationCard key={dest.id} dest={dest} index={i} />
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
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-white dark:text-[#0B1F3A] font-semibold hover:scale-105 transition-all"
          >
            Toutes les destinations
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
