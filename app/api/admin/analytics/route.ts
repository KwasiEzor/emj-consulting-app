import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { readFileSync } from "fs";
import path from "path";
import type { AnalyticsEntry } from "@/app/api/track/route";

export const dynamic = "force-dynamic";

function readVisits(): AnalyticsEntry[] {
  try {
    return JSON.parse(readFileSync(path.join(process.cwd(), "data", "analytics.json"), "utf-8"));
  } catch { return []; }
}

export async function GET() {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const visits = readVisits();
  const now = Date.now();
  const day = 86_400_000;

  const last7 = visits.filter(v => now - new Date(v.timestamp).getTime() < 7 * day);
  const last30 = visits.filter(v => now - new Date(v.timestamp).getTime() < 30 * day);

  // Countries
  const countryCounts: Record<string, { name: string; count: number }> = {};
  for (const v of visits) {
    if (!countryCounts[v.country]) countryCounts[v.country] = { name: v.countryName, count: 0 };
    countryCounts[v.country].count++;
  }
  const topCountries = Object.entries(countryCounts)
    .map(([code, { name, count }]) => ({ code, name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Pages
  const pageCounts: Record<string, number> = {};
  for (const v of visits) pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
  const topPages = Object.entries(pageCounts)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Devices
  const devices: Record<string, number> = {};
  for (const v of visits) devices[v.device] = (devices[v.device] || 0) + 1;

  // Browsers
  const browsers: Record<string, number> = {};
  for (const v of visits) browsers[v.browser] = (browsers[v.browser] || 0) + 1;

  // Daily visits (last 14 days)
  const daily: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * day);
    daily[d.toISOString().slice(0, 10)] = 0;
  }
  for (const v of visits) {
    const d = v.timestamp.slice(0, 10);
    if (d in daily) daily[d]++;
  }

  // Recent 20
  const recent = [...visits].reverse().slice(0, 20);

  return NextResponse.json({
    total: visits.length,
    last7: last7.length,
    last30: last30.length,
    topCountries,
    topPages,
    devices,
    browsers,
    daily: Object.entries(daily).map(([date, count]) => ({ date, count })),
    recent,
  });
}
