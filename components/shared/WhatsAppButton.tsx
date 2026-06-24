"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "22890000000";
  const message = encodeURIComponent("Bonjour EMJ-Consulting, je souhaite des informations sur vos services.");

  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/30 flex items-center justify-center text-white"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold">1</span>
    </motion.a>
  );
}
