import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync } from "fs";
import path from "path";
import { updateDataFile } from "@/lib/github-cms";

export const dynamic = "force-dynamic";

const FILE = path.join(process.cwd(), "data", "analytics.json");
const MAX_VISITS = 2000;

// Simple in-memory batch: flush to disk every 10 visits
let pending: AnalyticsEntry[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

export interface AnalyticsEntry {
  id: string;
  page: string;
  country: string;
  countryName: string;
  city: string;
  device: string;
  browser: string;
  referrer: string;
  timestamp: string;
}

function parseDevice(ua: string): string {
  if (/mobile|android|iphone|ipad|ipod/i.test(ua)) return "mobile";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  return "desktop";
}

function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome|chromium/i.test(ua)) return "Chrome";
  if (/firefox/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  if (/opr\//i.test(ua)) return "Opera";
  return "Other";
}

const COUNTRY_NAMES: Record<string, string> = {
  TG: "Togo", FR: "France", US: "États-Unis", GB: "Royaume-Uni",
  DE: "Allemagne", CA: "Canada", BE: "Belgique", CI: "Côte d'Ivoire",
  SN: "Sénégal", ML: "Mali", BF: "Burkina Faso", GH: "Ghana",
  NG: "Nigeria", CM: "Cameroun", GA: "Gabon", BJ: "Bénin",
  NE: "Niger", MA: "Maroc", DZ: "Algérie", TN: "Tunisie",
  IT: "Italie", ES: "Espagne", PT: "Portugal", NL: "Pays-Bas",
  CH: "Suisse", LU: "Luxembourg", JP: "Japon", CN: "Chine",
};

function flush(data: AnalyticsEntry[]) {
  try {
    let existing: AnalyticsEntry[] = [];
    try { existing = JSON.parse(readFileSync(FILE, "utf-8")); } catch { /* empty */ }
    const merged = [...existing, ...data].slice(-MAX_VISITS);
    writeFileSync(FILE, JSON.stringify(merged, null, 2));
    updateDataFile("data/analytics.json", JSON.stringify(merged, null, 2)).catch(() => {});
  } catch { /* silent */ }
}

function scheduledFlush() {
  if (pending.length === 0) return;
  const batch = [...pending];
  pending = [];
  flushTimer = null;
  flush(batch);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const page: string = body.page || "/";
    const referrer: string = body.referrer || "";

    const country = req.headers.get("x-vercel-ip-country") || "XX";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const ua = req.headers.get("user-agent") || "";

    const entry: AnalyticsEntry = {
      id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      page,
      country,
      countryName: COUNTRY_NAMES[country] || country,
      city: decodeURIComponent(city),
      device: parseDevice(ua),
      browser: parseBrowser(ua),
      referrer: referrer ? new URL(referrer).hostname : "direct",
      timestamp: new Date().toISOString(),
    };

    pending.push(entry);

    // Flush every 10 visits or after 30s
    if (pending.length >= 10) {
      if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
      const batch = [...pending];
      pending = [];
      flush(batch);
    } else if (!flushTimer) {
      flushTimer = setTimeout(scheduledFlush, 30_000);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
