import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

export const appointments = pgTable("appointments", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  notes: text("notes").notNull().default(""),
  status: text("status", { enum: ["pending", "confirmed", "cancelled"] })
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const analyticsVisits = pgTable(
  "analytics_visits",
  {
    id: text("id").primaryKey(),
    page: text("page").notNull(),
    country: text("country").notNull().default(""),
    countryName: text("country_name").notNull().default(""),
    city: text("city").notNull().default(""),
    device: text("device").notNull().default(""),
    browser: text("browser").notNull().default(""),
    referrer: text("referrer").notNull().default(""),
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("analytics_visits_timestamp_idx").on(t.timestamp)]
);

export const pushSubscriptions = pgTable("push_subscriptions", {
  endpoint: text("endpoint").primaryKey(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
