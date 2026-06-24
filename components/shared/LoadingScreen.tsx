"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] navy-gradient flex flex-col items-center justify-center"
        >
          {/* Airplane animation */}
          <motion.div
            initial={{ x: "-100vw", y: 30, rotate: -10 }}
            animate={{ x: "100vw", y: -30, rotate: 10 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute"
          >
            <Plane className="w-12 h-12 text-[#D4AF37]" />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mb-4">
              <Plane className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h1 className="font-poppins font-bold text-3xl text-white">
              EMJ<span className="gold-text">-Consulting</span>
            </h1>
            <p className="text-white/50 text-sm mt-2">Votre voyage commence ici</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-12 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-[#D4AF37] rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
