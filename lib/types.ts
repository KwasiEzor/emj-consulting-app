export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDesc: string;
  description: string;
  advantages: string[];
  process: string[];
  image: string;
  featured: boolean;
}

export interface Destination {
  id: string;
  name: string;
  flag: string;
  image: string;
  description: string;
  visaTypes: string[];
  avgDelay: string;
  requiredDocs: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface PageContent {
  home: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: Array<{ value: number; suffix: string; label: string }>;
  };
  about: {
    heroTitle: string;
    heroSubtitle: string;
    founderName: string;
    founderRole: string;
    founderBio: string;
    founderImage: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
  };
  services: {
    heroTitle: string;
    heroSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
  destinations: {
    heroTitle: string;
    heroSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
  contact: {
    heroTitle: string;
    heroSubtitle: string;
    formTitle: string;
    infoTitle: string;
  };
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  phone2: string;
  whatsapp: string;
  address: string;
  addressFull: string;
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
  stats: Array<{ value: number; suffix: string; label: string }>;
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string;
    ogImage: string;
  };
  googleMapsUrl: string;
  googleMapsEmbed: string;
}
