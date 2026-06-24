import { getServices, getDestinations, getTestimonials, getBlogPosts } from "@/lib/data";
import { FileText, Star, MapPin, Briefcase, TrendingUp, Users, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { readFileSync } from "fs";
import path from "path";
import type { Appointment } from "@/lib/types";

export const dynamic = "force-dynamic";

function getAppointments(): Appointment[] {
  try {
    return JSON.parse(readFileSync(path.join(process.cwd(), "data", "appointments.json"), "utf-8"));
  } catch { return []; }
}

export default function AdminDashboard() {
  const posts = getBlogPosts();
  const testimonials = getTestimonials();
  const destinations = getDestinations();
  const services = getServices();
  const appointments = getAppointments();
  const pendingCount = appointments.filter(a => a.status === "pending").length;

  const stats = [
    { label: "Rendez-vous", value: appointments.length, icon: CalendarCheck, href: "/admin/appointments", color: "bg-amber-500/10 text-amber-500", badge: pendingCount > 0 ? pendingCount : undefined },
    { label: "Articles", value: posts.length, icon: FileText, href: "/admin/blog", color: "bg-blue-500/10 text-blue-500" },
    { label: "Témoignages", value: testimonials.length, icon: Star, href: "/admin/testimonials", color: "bg-yellow-500/10 text-yellow-500" },
    { label: "Destinations", value: destinations.length, icon: MapPin, href: "/admin/destinations", color: "bg-green-500/10 text-green-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Tableau de bord</h1>
        <p className="text-gray-500 dark:text-white/50 mt-1">Bienvenue, EMLOR Joël</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group relative bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:border-[#D4AF37]/40 transition-colors">
            {"badge" in s && s.badge !== undefined && (
              <span className="absolute top-3 right-3 min-w-5 h-5 px-1.5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                {s.badge}
              </span>
            )}
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-gray-500 dark:text-white/40 text-sm">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Site metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            Statistiques site
          </h2>
          <div className="space-y-3">
            {[
              { label: "Visas obtenus", value: "500+" },
              { label: "Destinations couvertes", value: "30+" },
              { label: "Taux de satisfaction", value: "98%" },
              { label: "Années d'expérience", value: "10+" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-white/5">
                <span className="text-gray-500 dark:text-white/50 text-sm">{item.label}</span>
                <span className="font-semibold text-[#D4AF37]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#D4AF37]" />
            Actions rapides
          </h2>
          <div className="space-y-2">
            {[
              { label: "Nouvel article", href: "/admin/blog" },
              { label: "Ajouter un témoignage", href: "/admin/testimonials" },
              { label: "Nouvelle destination", href: "/admin/destinations" },
              { label: "Modifier les paramètres", href: "/admin/settings" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
              >
                <span className="text-gray-700 dark:text-white/70 text-sm">{item.label}</span>
                <span className="text-[#D4AF37] text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
