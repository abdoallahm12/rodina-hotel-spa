"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSiteSettings } from "./SettingsProvider";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms & Suites" },
  { href: "#amenities", label: "Amenities" },
  { href: "#dining", label: "Dining" },
  { href: "#spa", label: "Spa" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div
            className={cn(
              "w-10 h-10 rounded-full gold-gradient flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            )}
          >
            <span className="text-charcoal font-bold text-lg font-[var(--font-playfair)]">
              {settings.hotel?.logoLetter || "M"}
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "text-xl tracking-[0.3em] font-[var(--font-playfair)] font-bold transition-colors duration-300",
                scrolled ? "text-gold" : "text-white"
              )}
            >
              {settings.hotel?.name || "MH HOTEL"}
            </span>
            <span
              className={cn(
                "text-[10px] tracking-[0.5em] uppercase transition-colors duration-300",
                scrolled ? "text-gold-light/70" : "text-white/60"
              )}
            >
              {settings.hotel?.tagline || "Luxury Redefined"}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm tracking-wider uppercase transition-all duration-300 hover:text-gold relative group font-[var(--font-lato)]",
                scrolled
                  ? "text-white/80 hover:text-gold"
                  : "text-white/80 hover:text-gold"
              )}
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-3/4" />
            </a>
          ))}
        </div>

        {/* CTA + Phone */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${settings.contact?.phone || "+1234567890"}`}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors duration-300",
              scrolled ? "text-gold-light" : "text-white/70"
            )}
          >
            <Phone className="w-4 h-4" />
            <span className="font-[var(--font-lato)]">{settings.contact?.phone || "+1 (234) 567-890"}</span>
          </a>
          <Button
            asChild
            className="gold-gradient text-charcoal font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity font-[var(--font-lato)]"
          >
            <a href="#booking">Book Now</a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-colors",
                scrolled ? "text-gold" : "text-white"
              )}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-charcoal border-gold/20 w-80"
          >
            <VisuallyHidden>
              <h2>{settings.hotel?.name || "MH Hotel"} Navigation Menu</h2>
            </VisuallyHidden>
            <div className="flex items-center justify-between mb-8">
              <span className="text-gold text-xl tracking-[0.3em] font-[var(--font-playfair)] font-bold">
                {settings.hotel?.name || "MH HOTEL"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-gold py-3 px-4 text-sm tracking-wider uppercase transition-colors duration-300 border-b border-white/5 font-[var(--font-lato)]"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6">
                <Button
                  asChild
                  className="w-full gold-gradient text-charcoal font-semibold tracking-wider uppercase hover:opacity-90"
                >
                  <a href="#booking" onClick={() => setMobileOpen(false)}>
                    Book Now
                  </a>
                </Button>
              </div>
              <a
                href={`tel:${settings.contact?.phone || "+1234567890"}`}
                className="flex items-center gap-2 text-gold-light mt-4 text-sm"
              >
                <Phone className="w-4 h-4" />
                {settings.contact?.phone || "+1 (234) 567-890"}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
