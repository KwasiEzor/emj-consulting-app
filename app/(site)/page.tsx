import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import { getServices, getDestinations, getTestimonials } from "@/lib/data";

// Lazy-load everything below the fold
const DestinationsSection = dynamic(() => import("@/components/home/DestinationsSection"));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection"));
const WhyUsSection = dynamic(() => import("@/components/home/WhyUsSection"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const FaqSection = dynamic(() => import("@/components/home/FaqSection"));
const CtaSection = dynamic(() => import("@/components/home/CtaSection"));

export default function HomePage() {
  const services = getServices();
  const destinations = getDestinations();
  const testimonials = getTestimonials();

  return (
    <>
      <HeroSection />
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
