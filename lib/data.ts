import servicesData from "@/data/services.json";
import destinationsData from "@/data/destinations.json";
import testimonialsData from "@/data/testimonials.json";
import blogData from "@/data/blog.json";
import settingsData from "@/data/settings.json";
import type { Service, Destination, Testimonial, BlogPost, SiteSettings } from "./types";

export function getServices(): Service[] {
  return servicesData as Service[];
}

export function getDestinations(): Destination[] {
  return destinationsData as Destination[];
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function getBlogPosts(): BlogPost[] {
  return blogData as BlogPost[];
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return (blogData as BlogPost[]).find((p) => p.slug === slug);
}

export function getSettings(): SiteSettings {
  return settingsData as SiteSettings;
}
