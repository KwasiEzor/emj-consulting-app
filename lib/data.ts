import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  services,
  destinations,
  testimonials,
  blogPosts,
  siteSettings,
  type Service,
  type Destination,
  type Testimonial,
  type BlogPost,
} from "./db/schema";
import type { SiteSettings } from "./types";

export async function getServices(): Promise<Service[]> {
  return db.select().from(services);
}

export async function getDestinations(): Promise<Destination[]> {
  return db.select().from(destinations);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return db.select().from(testimonials);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return db.select().from(blogPosts);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  return rows[0];
}

export async function getSettings(): Promise<SiteSettings> {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
  return rows[0]?.data as SiteSettings;
}
