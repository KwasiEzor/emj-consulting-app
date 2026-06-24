"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Mail, Phone, MapPin, Send } from "lucide-react";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { SiTiktok } from "@react-icons/all-files/si/SiTiktok";

const footerLinks = {
  services: [
    { label: "Visa Touristique", href: "/services#visa-touristique" },
    { label: "Visa Étudiant", href: "/services#visa-etudiant" },
    { label: "Visa Affaires", href: "/services#visa-affaires" },
    { label: "Regroupement familial", href: "/services#regroupement-familial" },
    { label: "Assurance voyage", href: "/services#assurance-voyage" },
  ],
  destinations: [
    { label: "Canada", href: "/destinations#canada" },
    { label: "France", href: "/destinations#france" },
    { label: "États-Unis", href: "/destinations#etats-unis" },
    { label: "Royaume-Uni", href: "/destinations#royaume-uni" },
    { label: "Dubaï", href: "/destinations#dubai" },
  ],
  company: [
    { label: "À propos", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Prendre RDV", href: "/appointment" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#050e1c] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1a3a6b] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Newsletter */}
        <div className="glass rounded-2xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-poppins font-bold text-xl mb-1">Restez informé</h3>
            <p className="text-white/60 text-sm">Recevez nos conseils visa et actualités voyage.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
            />
            <button className="px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#b8941e] text-[#0B1F3A] font-semibold transition-all hover:scale-105 flex items-center gap-2 text-sm">
              <Send className="w-4 h-4" />
              S&apos;abonner
            </button>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl navy-gradient flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="font-poppins font-bold text-lg">
                EMJ<span className="gold-text">-Consulting</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Votre partenaire de confiance pour vos voyages et demandes de visa depuis Lomé, Togo.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors">
                <SiTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-[#D4AF37]">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold mb-4 text-[#D4AF37]">Destinations</h4>
            <ul className="space-y-2">
              {footerLinks.destinations.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#D4AF37]">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">Lomé, République Togolaise</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:info@emj-consulting.fr" className="text-white/50 hover:text-white text-sm transition-colors">
                  info@emj-consulting.fr
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+22893474963" className="text-white/50 hover:text-white text-sm transition-colors">
                  +228 93 47 49 63
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} EMJ-Consulting. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
