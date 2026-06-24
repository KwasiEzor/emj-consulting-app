"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, User, Mail, Phone, FileText,
  Search, Check, X, Trash2, ChevronDown, ChevronUp,
  RefreshCw, AlertCircle,
} from "lucide-react";
import type { Appointment, AppointmentStatus } from "@/lib/types";

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; bg: string; text: string; dot: string }> = {
  pending:   { label: "En attente",  bg: "bg-amber-500/10",  text: "text-amber-600 dark:text-amber-400",  dot: "bg-amber-500"  },
  confirmed: { label: "Confirmé",    bg: "bg-green-500/10",  text: "text-green-600 dark:text-green-400",  dot: "bg-green-500"  },
  cancelled: { label: "Annulé",      bg: "bg-red-500/10",    text: "text-red-600 dark:text-red-400",      dot: "bg-red-500"    },
};

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/appointments");
    const data = await res.json();
    setAppointments(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          a.service.toLowerCase().includes(q) ||
          a.phone.includes(q);
      }
      return true;
    });
  }, [appointments, filter, search]);

  const stats = useMemo(() => ({
    total: appointments.length,
    pending: appointments.filter(a => a.status === "pending").length,
    confirmed: appointments.filter(a => a.status === "confirmed").length,
    cancelled: appointments.filter(a => a.status === "cancelled").length,
  }), [appointments]);

  const updateStatus = async (id: string, status: AppointmentStatus) => {
    setUpdating(id);
    const res = await fetch("/api/admin/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const { appointment } = await res.json();
      setAppointments(prev => prev.map(a => a.id === id ? appointment : a));
    }
    setUpdating(null);
  };

  const deleteAppointment = async (id: string) => {
    setDeleting(id);
    const res = await fetch(`/api/admin/appointments?id=${id}`, { method: "DELETE" });
    if (res.ok) setAppointments(prev => prev.filter(a => a.id !== id));
    setDeleting(null);
    setConfirmDelete(null);
  };

  const TABS: { key: AppointmentStatus | "all"; label: string; count: number }[] = [
    { key: "all",       label: "Tous",       count: stats.total     },
    { key: "pending",   label: "En attente", count: stats.pending   },
    { key: "confirmed", label: "Confirmés",  count: stats.confirmed },
    { key: "cancelled", label: "Annulés",    count: stats.cancelled },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Rendez-vous</h1>
          <p className="text-gray-500 dark:text-white/50 text-sm mt-1">{stats.total} demande{stats.total !== 1 ? "s" : ""} au total</p>
        </div>
        <button onClick={load} disabled={loading} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:border-[#D4AF37]/40 text-sm transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Actualiser
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total,     color: "text-[#0B1F3A] dark:text-white",          bg: "bg-[#0B1F3A]/5 dark:bg-white/10" },
          { label: "En attente", value: stats.pending,   color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
          { label: "Confirmés",  value: stats.confirmed, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
          { label: "Annulés",    value: stats.cancelled, color: "text-red-600 dark:text-red-400",     bg: "bg-red-500/10"   },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-5 border border-gray-100 dark:border-white/10">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${s.bg} mb-3`}>
              <span className={`font-poppins font-bold text-lg ${s.color}`}>{s.value}</span>
            </div>
            <p className="text-gray-500 dark:text-white/40 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1F3A] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filter === t.key
                  ? "bg-[#D4AF37] text-[#0B1F3A]"
                  : "bg-white dark:bg-[#0B1F3A] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:border-[#D4AF37]/40"
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === t.key ? "bg-[#0B1F3A]/20" : "bg-gray-100 dark:bg-white/10"}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-white/30">
          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Aucun rendez-vous trouvé</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((appt) => {
              const isExpanded = expanded === appt.id;
              const isUpdating = updating === appt.id;
              const isDeleting = deleting === appt.id;
              const isConfirmingDelete = confirmDelete === appt.id;

              return (
                <motion.div
                  key={appt.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden"
                >
                  {/* Row */}
                  <div className="flex items-center gap-4 p-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#0B1F3A]/10 dark:bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                      <span className="font-semibold text-sm text-[#0B1F3A] dark:text-[#D4AF37]">
                        {appt.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm truncate">{appt.name}</span>
                        <StatusBadge status={appt.status} />
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400 dark:text-white/40 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{appt.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{appt.time}</span>
                        <span className="truncate">{appt.service}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {appt.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(appt.id, "confirmed")}
                            disabled={isUpdating}
                            title="Confirmer"
                            className="w-8 h-8 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 flex items-center justify-center transition-colors disabled:opacity-50"
                          >
                            {isUpdating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => updateStatus(appt.id, "cancelled")}
                            disabled={isUpdating}
                            title="Annuler"
                            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 flex items-center justify-center transition-colors disabled:opacity-50"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {appt.status === "confirmed" && (
                        <button
                          onClick={() => updateStatus(appt.id, "cancelled")}
                          disabled={isUpdating}
                          title="Annuler le RDV"
                          className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 flex items-center justify-center transition-colors disabled:opacity-50"
                        >
                          {isUpdating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      {appt.status === "cancelled" && (
                        <button
                          onClick={() => updateStatus(appt.id, "pending")}
                          disabled={isUpdating}
                          title="Remettre en attente"
                          className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 flex items-center justify-center transition-colors disabled:opacity-50"
                        >
                          {isUpdating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        </button>
                      )}

                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => deleteAppointment(appt.id)}
                            disabled={isDeleting}
                            className="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            {isDeleting ? "..." : "Supprimer"}
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-2 py-1 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 text-xs hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                          >
                            Non
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(appt.id)}
                          title="Supprimer"
                          className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => setExpanded(isExpanded ? null : appt.id)}
                        className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-gray-100 dark:border-white/10 pt-4 grid sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            {[
                              { icon: User,     label: "Nom complet",  value: appt.name    },
                              { icon: Mail,     label: "Email",        value: appt.email   },
                              { icon: Phone,    label: "Téléphone",    value: appt.phone   },
                            ].map(({ icon: Icon, label, value }) => (
                              <div key={label} className="flex items-start gap-3">
                                <Icon className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-xs text-gray-400 dark:text-white/40">{label}</p>
                                  <p className="text-sm text-gray-900 dark:text-white">{value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-3">
                            {[
                              { icon: FileText, label: "Service",      value: appt.service },
                              { icon: Calendar, label: "Date",          value: appt.date    },
                              { icon: Clock,    label: "Heure",         value: appt.time    },
                            ].map(({ icon: Icon, label, value }) => (
                              <div key={label} className="flex items-start gap-3">
                                <Icon className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-xs text-gray-400 dark:text-white/40">{label}</p>
                                  <p className="text-sm text-gray-900 dark:text-white">{value}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {appt.notes && (
                            <div className="sm:col-span-2 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                              <p className="text-xs text-gray-400 dark:text-white/40 mb-1">Notes</p>
                              <p className="text-sm text-gray-700 dark:text-white/70">{appt.notes}</p>
                            </div>
                          )}
                          <div className="sm:col-span-2 flex items-center justify-between text-xs text-gray-400 dark:text-white/30">
                            <span>ID: {appt.id}</span>
                            <span>Reçu le {formatDate(appt.createdAt)}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
