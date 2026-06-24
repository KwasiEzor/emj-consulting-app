"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Clock, FileText, Plane, Search } from "lucide-react";
import { getDestinations } from "@/lib/data";

export default function DestinationsPage() {
  const destinations = getDestinations();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedDest = destinations.find((d) => d.id === selected);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1569530510519-3cd40a86d7ff?w=1920&q=70" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 navy-gradient opacity-85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="font-poppins font-bold text-4xl sm:text-6xl text-white mb-6">
            Nos <span className="gold-text">Destinations</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/70 text-xl mb-8">
            30+ destinations disponibles. Choisissez la vôtre.
          </motion.p>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Rechercher une destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-white dark:bg-[#050e1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest, i) => (
              <motion.div
                key={dest.id}
                id={dest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelected(dest.id === selected ? null : dest.id)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />

                {/* Flag */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg">
                  {dest.flag}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-poppins font-bold text-white text-2xl mb-2">{dest.name}</h3>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">{dest.description}</p>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{dest.avgDelay}</span>
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{dest.visaTypes.length} types</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail modal */}
          <AnimatePresence>
            {selectedDest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setSelected(null)}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div
                  initial={{ scale: 0.9, y: 40 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 40 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-white dark:bg-[#0B1F3A] rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-gray-100 dark:border-white/10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{selectedDest.flag}</span>
                    <div>
                      <h2 className="font-poppins font-bold text-2xl text-[#0B1F3A] dark:text-white">{selectedDest.name}</h2>
                      <div className="flex items-center gap-1 text-[#D4AF37] text-sm">
                        <Clock className="w-3 h-3" />
                        Délai moyen : {selectedDest.avgDelay}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-white/60 mb-6">{selectedDest.description}</p>
                  <div className="mb-4">
                    <h3 className="font-semibold text-[#0B1F3A] dark:text-white mb-2">Types de visa</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDest.visaTypes.map((v) => (
                        <span key={v} className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs">{v}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#0B1F3A] dark:text-white mb-2">Documents requis</h3>
                    <ul className="space-y-1">
                      {selectedDest.requiredDocs.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/appointment"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-semibold hover:bg-[#b8941e] transition-colors"
                    onClick={() => setSelected(null)}
                  >
                    <Plane className="w-4 h-4" />
                    Demander un visa {selectedDest.name}
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
