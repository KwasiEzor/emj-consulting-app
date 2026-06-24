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

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
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
  };
  googleMapsUrl: string;
  googleMapsEmbed: string;
}
