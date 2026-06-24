import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import BackToTop from "@/components/shared/BackToTop";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Analytics from "@/components/shared/Analytics";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Analytics />
      <LoadingScreen />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
