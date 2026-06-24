export const dynamic = "force-dynamic";
import nextDynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import { getServices, getDestinations, getTestimonials } from "@/lib/data";
import { getPageContent } from "@/lib/data.server";

const DestinationsSection = nextDynamic(() => import("@/components/home/DestinationsSection"));
const ProcessSection = nextDynamic(() => import("@/components/home/ProcessSection"));
const WhyUsSection = nextDynamic(() => import("@/components/home/WhyUsSection"));
const TestimonialsSection = nextDynamic(() => import("@/components/home/TestimonialsSection"));
const FaqSection = nextDynamic(() => import("@/components/home/FaqSection"));
const CtaSection = nextDynamic(() => import("@/components/home/CtaSection"));

export default function HomePage() {
  const services = getServices();
  const destinations = getDestinations();
  const testimonials = getTestimonials();
  const pages = getPageContent();

  return (
    <>
      <HeroSection content={pages.home} />
      <ServicesSection services={services} />
      <DestinationsSection destinations={destinations} />
      <ProcessSection />
      <WhyUsSection />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <CtaSection />
    </>
  );
}
