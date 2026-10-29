import { config } from "dotenv";
import { readFileSync } from "fs";
config({ path: ".env.local" });

type Row = { createdAt: string } & Record<string, string>;
type Visit = { timestamp: string } & Record<string, string>;

async function main() {
  const { db, appointments, analyticsVisits } = await import("../lib/db");
  const read = (f: string) => JSON.parse(readFileSync(`data/${f}`, "utf-8"));

  const appts = read("appointments.json");
  if (appts.length)
    await db.insert(appointments).values(appts.map((a: Row) => ({ ...a, createdAt: new Date(a.createdAt) }))).onConflictDoNothing();

  const visits = read("analytics.json");
  for (let i = 0; i < visits.length; i += 500)
    await db.insert(analyticsVisits).values(visits.slice(i, i + 500).map((v: Visit) => ({ ...v, timestamp: new Date(v.timestamp) }))).onConflictDoNothing();

  console.log(`imported ${appts.length} appointments, ${visits.length} visits`);
}
main();
