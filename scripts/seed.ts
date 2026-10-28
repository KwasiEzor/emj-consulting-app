/**
 * Seed script: migrates existing JSON data files to NeonDB.
 * Run with: npx tsx scripts/seed.ts
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import { readFileSync } from "fs";
import path from "path";

const DATA = path.join(process.cwd(), "data");

function read<T>(file: string): T {
  return JSON.parse(readFileSync(path.join(DATA, file), "utf-8"));
}

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log("Seeding services…");
  const services = read<schema.Service[]>("services.json");
  for (const s of services) {
    await db.insert(schema.services).values(s).onConflictDoNothing();
  }

  console.log("Seeding destinations…");
  const destinations = read<schema.Destination[]>("destinations.json");
  for (const d of destinations) {
    await db.insert(schema.destinations).values(d).onConflictDoNothing();
  }

  console.log("Seeding testimonials…");
  const testimonials = read<schema.Testimonial[]>("testimonials.json");
  for (const t of testimonials) {
    await db.insert(schema.testimonials).values(t).onConflictDoNothing();
  }

  console.log("Seeding blog posts…");
  const posts = read<schema.BlogPost[]>("blog.json");
  for (const p of posts) {
    await db.insert(schema.blogPosts).values(p).onConflictDoNothing();
  }

  console.log("Seeding appointments…");
  const appointments = read<schema.Appointment[]>("appointments.json");
  for (const a of appointments) {
    await db
      .insert(schema.appointments)
      .values({ ...a, createdAt: new Date(a.createdAt) })
      .onConflictDoNothing();
  }

  console.log("Seeding analytics…");
  const analytics = read<schema.AnalyticsEntry[]>("analytics.json");
  for (const v of analytics) {
    await db
      .insert(schema.analytics)
      .values({ ...v, timestamp: new Date(v.timestamp) })
      .onConflictDoNothing();
  }

  console.log("Seeding site settings…");
  const settings = read<object>("settings.json");
  await db
    .insert(schema.siteSettings)
    .values({ id: 1, data: settings })
    .onConflictDoUpdate({ target: schema.siteSettings.id, set: { data: settings } });

  console.log("Seeding page content…");
  const pages = read<object>("pages.json");
  await db
    .insert(schema.pageContent)
    .values({ id: 1, data: pages })
    .onConflictDoUpdate({ target: schema.pageContent.id, set: { data: pages } });

  console.log("✅ Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
