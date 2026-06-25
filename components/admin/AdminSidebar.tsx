"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard, FileText, Star, MapPin, Briefcase, Settings, Globe, ExternalLink, LayoutTemplate, CalendarCheck, BarChart2,
} from "lucide-react";
import PushNotificationManager from "./PushNotificationManager";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/admin/analytics", icon: BarChart2, label: "Analytiques" },
  { href: "/admin/appointments", icon: CalendarCheck, label: "Rendez-vous" },
  { href: "/admin/pages", icon: LayoutTemplate, label: "Pages" },
  { href: "/admin/blog", icon: FileText, label: "Articles" },
  { href: "/admin/testimonials", icon: Star, label: "Témoignages" },
  { href: "/admin/destinations", icon: MapPin, label: "Destinations" },
  { href: "/admin/services", icon: Briefcase, label: "Services" },
  { href: "/admin/settings", icon: Settings, label: "Paramètres" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0B1F3A] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <div className="font-poppins font-bold text-white text-sm">EMJ Admin</div>
            <div className="text-white/40 text-xs">Panel de gestion</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#D4AF37] text-[#0B1F3A]"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <PushNotificationManager />
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Voir le site
        </Link>
        <div className="flex items-center gap-3">
          <UserButton />
          <span className="text-white/40 text-xs">EMLOR Joël</span>
        </div>
      </div>
    </aside>
  );
}
