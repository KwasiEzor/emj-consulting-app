import { desc, eq, count } from "drizzle-orm";
import { db, appointments, analyticsVisits, pushSubscriptions } from "./index";
import type { Appointment, AppointmentStatus } from "@/lib/types";

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

export type PushSubscriptionData = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

const MAX_VISITS = 2000;

type AppointmentRow = typeof appointments.$inferSelect;
type VisitRow = typeof analyticsVisits.$inferSelect;

const toAppointment = (r: AppointmentRow): Appointment => ({
  ...r,
  createdAt: r.createdAt.toISOString(),
});

const toVisit = (r: VisitRow): AnalyticsEntry => ({
  ...r,
  timestamp: r.timestamp.toISOString(),
});

export async function listAppointments(): Promise<Appointment[]> {
  const rows = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
  return rows.map(toAppointment);
}

export async function countAppointments(): Promise<number> {
  const [row] = await db.select({ n: count() }).from(appointments);
  return row.n;
}

export async function insertAppointment(a: Appointment) {
  await db.insert(appointments).values({ ...a, createdAt: new Date(a.createdAt) });
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<Appointment | null> {
  const [row] = await db
    .update(appointments)
    .set({ status })
    .where(eq(appointments.id, id))
    .returning();
  return row ? toAppointment(row) : null;
}

export async function deleteAppointment(id: string) {
  await db.delete(appointments).where(eq(appointments.id, id));
}

export async function insertVisit(v: AnalyticsEntry) {
  await db.insert(analyticsVisits).values({ ...v, timestamp: new Date(v.timestamp) });
}

/** Latest visits, oldest first (same order as the former JSON file). */
export async function listVisits(): Promise<AnalyticsEntry[]> {
  const rows = await db
    .select()
    .from(analyticsVisits)
    .orderBy(desc(analyticsVisits.timestamp))
    .limit(MAX_VISITS);
  return rows.reverse().map(toVisit);
}

export async function listSubscriptions(): Promise<PushSubscriptionData[]> {
  const rows = await db.select().from(pushSubscriptions);
  return rows.map((r) => ({ endpoint: r.endpoint, keys: { p256dh: r.p256dh, auth: r.auth } }));
}

export async function saveSubscription(sub: PushSubscriptionData) {
  await db
    .insert(pushSubscriptions)
    .values({ endpoint: sub.endpoint, p256dh: sub.keys.p256dh, auth: sub.keys.auth })
    .onConflictDoUpdate({
      target: pushSubscriptions.endpoint,
      set: { p256dh: sub.keys.p256dh, auth: sub.keys.auth },
    });
}

export async function removeSubscription(endpoint: string) {
  await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint));
}
