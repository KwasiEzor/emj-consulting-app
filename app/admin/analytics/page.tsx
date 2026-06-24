"use client";

import { useEffect, useState } from "react";
import { Globe, Monitor, Smartphone, Tablet, TrendingUp, Users, Eye, ArrowUpRight } from "lucide-react";

const FLAG: Record<string, string> = {
  TG: "🇹🇬", FR: "🇫🇷", US: "🇺🇸", GB: "🇬🇧", DE: "🇩🇪", CA: "🇨🇦",
  BE: "🇧🇪", CI: "🇨🇮", SN: "🇸🇳", ML: "🇲🇱", BF: "🇧🇫", GH: "🇬🇭",
  NG: "🇳🇬", CM: "🇨🇲", GA: "🇬🇦", BJ: "🇧🇯", NE: "🇳🇪", MA: "🇲🇦",
  DZ: "🇩🇿", TN: "🇹🇳", IT: "🇮🇹", ES: "🇪🇸", PT: "🇵🇹", NL: "🇳🇱",
  CH: "🇨🇭", LU: "🇱🇺", JP: "🇯🇵", CN: "🇨🇳", XX: "🌐",
};

interface AnalyticsData {
  total: number;
  last7: number;
  last30: number;
  topCountries: { code: string; name: string; count: number }[];
  topPages: { page: string; count: number }[];
  devices: Record<string, number>;
  browsers: Record<string, number>;
  daily: { date: string; count: number }[];
  recent: {
    id: string; page: string; country: string; countryName: string;
    city: string; device: string; browser: string; referrer: string; timestamp: string;
  }[];
}

function DeviceIcon({ device }: { device: string }) {
  if (device === "mobile") return <Smartphone className="w-3.5 h-3.5" />;
  if (device === "tablet") return <Tablet className="w-3.5 h-3.5" />;
  return <Monitor className="w-3.5 h-3.5" />;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div className="text-gray-400 text-sm">Chargement...</div>;

  const maxDaily = Math.max(...data.daily.map(d => d.count), 1);
  const totalDevices = Object.values(data.devices).reduce((a, b) => a + b, 0) || 1;
  const totalBrowsers = Object.values(data.browsers).reduce((a, b) => a + b, 0) || 1;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">Analytiques</h1>
        <p className="text-gray-500 dark:text-white/50 text-sm mt-1">Statistiques de visite du site</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total visites", value: data.total, icon: Eye, color: "bg-blue-500/10 text-blue-500" },
          { label: "7 derniers jours", value: data.last7, icon: TrendingUp, color: "bg-green-500/10 text-green-500" },
          { label: "30 derniers jours", value: data.last30, icon: Users, color: "bg-[#D4AF37]/10 text-[#D4AF37]" },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="font-poppins font-bold text-3xl text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-gray-500 dark:text-white/40 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Daily chart */}
      <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10 mb-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
          Visites des 14 derniers jours
        </h2>
        <div className="flex items-end gap-1.5 h-36">
          {data.daily.map(d => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="relative w-full">
                <div
                  className="w-full bg-[#D4AF37]/80 hover:bg-[#D4AF37] rounded-t-md transition-colors"
                  style={{ height: `${Math.max((d.count / maxDaily) * 120, d.count > 0 ? 4 : 0)}px` }}
                  title={`${d.count} visites`}
                />
              </div>
              <span className="text-[9px] text-gray-400 dark:text-white/30 rotate-45 origin-left mt-1 whitespace-nowrap">
                {d.date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Countries */}
        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#D4AF37]" />
            Top pays
          </h2>
          {data.topCountries.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune donnée</p>
          ) : (
            <div className="space-y-3">
              {data.topCountries.map(c => (
                <div key={c.code} className="flex items-center gap-3">
                  <span className="text-xl w-7">{FLAG[c.code] || "🌐"}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700 dark:text-white/70">{c.name}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{c.count}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37] rounded-full"
                        style={{ width: `${(c.count / data.topCountries[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pages */}
        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            Pages les plus visitées
          </h2>
          {data.topPages.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune donnée</p>
          ) : (
            <div className="space-y-3">
              {data.topPages.map(p => (
                <div key={p.page} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-700 dark:text-white/70 font-mono">{p.page || "/"}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{p.count}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(p.count / data.topPages[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Devices */}
        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Appareils</h2>
          <div className="space-y-3">
            {Object.entries(data.devices).sort((a, b) => b[1] - a[1]).map(([device, count]) => (
              <div key={device} className="flex items-center gap-3">
                <div className="w-7 flex justify-center text-gray-400 dark:text-white/40">
                  <DeviceIcon device={device} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700 dark:text-white/70 capitalize">{device}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {Math.round((count / totalDevices) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${(count / totalDevices) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browsers */}
        <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 border border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Navigateurs</h2>
          <div className="space-y-3">
            {Object.entries(data.browsers).sort((a, b) => b[1] - a[1]).map(([browser, count]) => (
              <div key={browser} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700 dark:text-white/70">{browser}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {Math.round((count / totalBrowsers) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(count / totalBrowsers) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent visits */}
      <div className="bg-white dark:bg-[#0B1F3A] rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-white/10">
          <h2 className="font-semibold text-gray-900 dark:text-white">Visites récentes</h2>
        </div>
        {data.recent.length === 0 ? (
          <div className="p-6 text-gray-400 text-sm">Aucune visite enregistrée pour l&apos;instant.</div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-white/5">
            {data.recent.map(v => (
              <div key={v.id} className="flex items-center gap-4 px-6 py-3">
                <span className="text-xl w-8">{FLAG[v.country] || "🌐"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-900 dark:text-white truncate">{v.page || "/"}</span>
                    {v.city && <span className="text-xs text-gray-400 dark:text-white/30">— {v.city}</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-white/30 mt-0.5">
                    <span className="flex items-center gap-1"><DeviceIcon device={v.device} />{v.device}</span>
                    <span>{v.browser}</span>
                    <span>{v.referrer !== "direct" ? `via ${v.referrer}` : "direct"}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-white/30 shrink-0">
                  {new Date(v.timestamp).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
