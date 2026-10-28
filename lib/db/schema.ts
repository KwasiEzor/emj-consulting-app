import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const services = pgTable("services", {
  id: text("id").primaryKey(),
  icon: text("icon").notNull().default(""),
  title: text("title").notNull(),
  shortDesc: text("short_desc").notNull().default(""),
  description: text("description").notNull().default(""),
  advantages: jsonb("advantages").$type<string[]>().notNull().default([]),
  process: jsonb("process").$type<string[]>().notNull().default([]),
  image: text("image").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
});

export const destinations = pgTable("destinations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  flag: text("flag").notNull().default(""),
  image: text("image").notNull().default(""),
  description: text("description").notNull().default(""),
  visaTypes: jsonb("visa_types").$type<string[]>().notNull().default([]),
  avgDelay: text("avg_delay").notNull().default(""),
  requiredDocs: jsonb("required_docs").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
});

export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull().default(""),
  country: text("country").notNull().default(""),
  avatar: text("avatar").notNull().default(""),
  rating: integer("rating").notNull().default(5),
  text: text("text").notNull(),
  date: text("date").notNull().default(""),
});

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  category: text("category").notNull().default(""),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  image: text("image").notNull().default(""),
  author: text("author").notNull().default(""),
  authorAvatar: text("author_avatar").notNull().default(""),
  publishedAt: text("published_at").notNull().default(""),
  readTime: text("read_time").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
});

export const appointments = pgTable("appointments", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  notes: text("notes").notNull().default(""),
  status: appointmentStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: text("id").primaryKey(),
  page: text("page").notNull(),
  country: text("country").notNull().default(""),
  countryName: text("country_name").notNull().default(""),
  city: text("city").notNull().default(""),
  device: text("device").notNull().default(""),
  browser: text("browser").notNull().default(""),
  referrer: text("referrer").notNull().default(""),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const pushSubscriptions = pgTable("push_subscriptions", {
  id: text("id").primaryKey(),
  endpoint: text("endpoint").notNull().unique(),
  keys: jsonb("keys").$type<{ p256dh: string; auth: string }>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Single-row config tables stored as JSON
export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  data: jsonb("data").notNull(),
});

export const pageContent = pgTable("page_content", {
  id: integer("id").primaryKey().default(1),
  data: jsonb("data").notNull(),
});

// Inferred TypeScript types
export type Service = InferSelectModel<typeof services>;
export type Destination = InferSelectModel<typeof destinations>;
export type Testimonial = InferSelectModel<typeof testimonials>;
export type BlogPost = InferSelectModel<typeof blogPosts>;
export type Appointment = InferSelectModel<typeof appointments>;
export type AnalyticsEntry = InferSelectModel<typeof analytics>;
export type PushSubscription = InferSelectModel<typeof pushSubscriptions>;
