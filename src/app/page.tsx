import Navbar from "@/components/hotel/Navbar";
import HeroSection from "@/components/hotel/HeroSection";
import AboutSection from "@/components/hotel/AboutSection";
import RoomsSection from "@/components/hotel/RoomsSection";
import AmenitiesSection from "@/components/hotel/AmenitiesSection";
import DiningSection from "@/components/hotel/DiningSection";
import SpaSection from "@/components/hotel/SpaSection";
import EventsSection from "@/components/hotel/EventsSection";
import GallerySection from "@/components/hotel/GallerySection";
import TestimonialsSection from "@/components/hotel/TestimonialsSection";
import ContactSection from "@/components/hotel/ContactSection";
import Footer from "@/components/hotel/Footer";
import SiteSettingsProvider from "@/components/hotel/SettingsProvider";

export default function Home() {
  return (
    <SiteSettingsProvider>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <AmenitiesSection />
        <DiningSection />
        <SpaSection />
        <EventsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </SiteSettingsProvider>
  );
}
