"use client";

import { useState, useEffect, createContext, useContext } from "react";
import type { AdminSettings } from "@/lib/admin-settings";

const defaultSettings: AdminSettings = {
  hotel: {
    name: "MH HOTEL",
    tagline: "Luxury Redefined",
    description:
      "Where timeless elegance meets modern luxury. Experience a world of refined comfort, impeccable service, and unforgettable moments.",
    logoLetter: "M",
  },
  currency: { code: "USD", symbol: "$", taxRate: 9 },
  rooms: [
    { id: "classique", name: "Chambre Classique", price: 166, priceSingle: 141, priceTriple: 202, totalRooms: 50 },
    { id: "superieure", name: "Chambre Supérieure", price: 198, priceSingle: 167, totalRooms: 10 },
    { id: "premium", name: "Chambre Premium", price: 224, priceSingle: 193, totalRooms: 10 },
    { id: "junior-suite", name: "Suite Junior", price: 251, priceSingle: 220, totalRooms: 10 },
    { id: "romantique", name: "Suite Romantique", price: 320, totalRooms: 5 },
    { id: "familiale", name: "Chambre Familiale", price: 280, totalRooms: 8 },
  ],
  social: { facebook: "", instagram: "", whatsapp: "", tiktok: "", youtube: "" },
  contact: { phone: "+1 (234) 567-890", email: "info@mhhotel.com", address: "City Center, Main Boulevard" },
  images: { heroBg: "/images/hotel-exterior.png", aboutMain: "/images/lobby.png", aboutInset: "/images/room-classic.png", spaMain: "/images/spa-treatment.png" },
  content: {
    heroWelcome: "Welcome to",
    heroTitle1: "MH",
    heroTitle2: "HOTEL",
    heroSubtitle: "Where timeless elegance meets modern luxury. Experience a world of refined comfort, impeccable service, and unforgettable moments.",
    aboutLabel: "Our Story",
    aboutTitle1: "A Legacy of",
    aboutTitle2: "Luxury",
    aboutP1: "Since its inception, MH Hotel has been a beacon of sophistication and warmth in the heart of the city. Our commitment to excellence transcends ordinary hospitality, offering each guest a curated experience that blends timeless elegance with contemporary comfort.",
    aboutP2: "Every detail at MH Hotel has been thoughtfully crafted, from the hand-selected furnishings in our suites to the locally sourced ingredients in our restaurants. We believe that true luxury lies in the art of anticipation, where every need is met before it is expressed, and every moment becomes a cherished memory.",
    roomsLabel: "Hébergement",
    roomsTitle1: "Chambres &",
    roomsTitle2: "Suites",
    roomsSubtitle: "Chaque chambre et suite est un sanctuaire de confort, conçu avec une attention minutieuse aux détails et orné des plus beaux matériaux.",
    footerCtaTitle: "Ready to Experience Luxury?",
    footerCtaText: "Book your stay today and discover why MH Hotel is the destination of choice for discerning travelers worldwide.",
    footerCtaButton: "Reserve Your Room",
    footerDescription: "Where timeless elegance meets modern luxury. Since 2009, MH Hotel has been the pinnacle of sophisticated hospitality, offering unparalleled experiences in the heart of the city.",
  },
};

interface SiteSettingsContextType {
  settings: AdminSettings;
  loading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  loading: true,
});

export const useSiteSettings = () => useContext(SiteSettingsContext);

export default function SiteSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings({ ...defaultSettings, ...data });
        }
      } catch {
        // Use defaults
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
