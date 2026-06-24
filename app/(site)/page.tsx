import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";
import { getServices, getDestinations, getTestimonials } from "@/lib/data";

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
