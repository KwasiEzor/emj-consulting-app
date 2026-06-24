"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#D4AF37] blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#D4AF37] blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-bold text-3xl sm:text-5xl text-white mb-4"
          >
            Ce que disent nos <span className="gold-text">clients</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="glass-dark rounded-3xl p-8 sm:p-12 text-center"
            >
              <Quote className="w-10 h-10 text-[#D4AF37]/40 mx-auto mb-6" />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 italic max-w-3xl mx-auto">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/40"
                />
                <div className="text-left">
                  <div className="font-semibold text-white">{testimonials[current].name}</div>
                  <div className="text-[#D4AF37] text-sm">
                    {testimonials[current].role} · Visa {testimonials[current].country}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full glass text-white hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-[#D4AF37] w-8" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full glass text-white hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
