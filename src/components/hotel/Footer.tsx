"use client";

import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
} from "lucide-react";
import { useSiteSettings } from "./SettingsProvider";

const footerLinks = {
  hotel: [
    { label: "About Us", href: "#about" },
    { label: "Rooms & Suites", href: "#rooms" },
    { label: "Amenities", href: "#amenities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Virtual Tour", href: "#home" },
  ],
  services: [
    { label: "Fine Dining", href: "#dining" },
    { label: "Spa & Wellness", href: "#spa" },
    { label: "Events & Meetings", href: "#events" },
    { label: "Airport Transfer", href: "#contact" },
    { label: "Concierge", href: "#amenities" },
  ],
  information: [
    { label: "Careers", href: "#" },
    { label: "Press & Media", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
};

export default function Footer() {
  const { settings } = useSiteSettings();
  const content = settings.content;
  const contact = settings.contact;
  const social = settings.social;
  const hotel = settings.hotel;

  // Build social links from settings
  const socialLinks = [
    ...(social?.instagram ? [{ icon: Instagram, label: "Instagram", href: social.instagram }] : []),
    ...(social?.facebook ? [{ icon: Facebook, label: "Facebook", href: social.facebook }] : []),
    ...(social?.whatsapp ? [{ icon: Phone, label: "WhatsApp", href: social.whatsapp }] : []),
    ...(!social?.instagram && !social?.facebook ? [
      { icon: Instagram, label: "Instagram", href: "#" },
      { icon: Facebook, label: "Facebook", href: "#" },
    ] : []),
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-gold-dark via-gold to-gold-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-[var(--font-playfair)] font-bold text-charcoal mb-4">
            {content?.footerCtaTitle || "Ready to Experience Luxury?"}
          </h3>
          <p className="text-charcoal/80 font-[var(--font-lato)] text-lg mb-6 max-w-xl mx-auto">
            {content?.footerCtaText || "Book your stay today and discover why MH Hotel is the destination of choice for discerning travelers worldwide."}
          </p>
          <button className="bg-charcoal text-gold px-8 py-3 rounded-full font-[var(--font-lato)] tracking-wider uppercase font-semibold hover:bg-charcoal/90 transition-colors">
            {content?.footerCtaButton || "Reserve Your Room"}
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                <span className="text-charcoal font-bold text-lg font-[var(--font-playfair)]">
                  {hotel?.logoLetter || "M"}
                </span>
              </div>
              <div>
                <span className="text-xl tracking-[0.3em] font-[var(--font-playfair)] font-bold text-gold">
                  {hotel?.name || "MH HOTEL"}
                </span>
                <p className="text-[10px] tracking-[0.5em] uppercase text-white/40">
                  {hotel?.tagline || "Luxury Redefined"}
                </p>
              </div>
            </div>
            <p className="text-white/60 font-[var(--font-lato)] leading-relaxed mb-6 max-w-sm">
              {content?.footerDescription || "Where timeless elegance meets modern luxury. Since 2009, MH Hotel has been the pinnacle of sophisticated hospitality, offering unparalleled experiences in the heart of the city."}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((socialItem) => (
                <a
                  key={socialItem.label}
                  href={socialItem.href}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all"
                  aria-label={socialItem.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <socialItem.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Hotel Links */}
          <div>
            <h4 className="text-gold font-[var(--font-playfair)] font-bold mb-4 tracking-wider">
              The Hotel
            </h4>
            <ul className="space-y-3">
              {footerLinks.hotel.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors font-[var(--font-lato)] text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-gold font-[var(--font-playfair)] font-bold mb-4 tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors font-[var(--font-lato)] text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-gold font-[var(--font-playfair)] font-bold mb-4 tracking-wider">
              Information
            </h4>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors font-[var(--font-lato)] text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-sm font-[var(--font-lato)]">
          &copy; {new Date().getFullYear()} {hotel?.name || "MH Hotel"}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={`tel:${contact?.phone || "+1234567890"}`}
            className="text-white/40 hover:text-gold transition-colors text-sm font-[var(--font-lato)] flex items-center gap-2"
          >
            <Phone className="w-3 h-3" />
            {contact?.phone || "+1 (234) 567-890"}
          </a>
          <a
            href={`mailto:${contact?.email || "info@mhhotel.com"}`}
            className="text-white/40 hover:text-gold transition-colors text-sm font-[var(--font-lato)] flex items-center gap-2"
          >
            <Mail className="w-3 h-3" />
            {contact?.email || "info@mhhotel.com"}
          </a>
        </div>
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/70 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
