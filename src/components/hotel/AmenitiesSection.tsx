"use client";

import { motion } from "framer-motion";
import {
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Wine,
  ShieldCheck,
  Car,
  ConciergeBell,
  Sparkles,
} from "lucide-react";

const visualAmenities = [
  {
    image: "/images/pool.png",
    title: "Indoor Pool",
    description:
      "Dive into crystal-clear waters surrounded by lush palm trees and a living green wall. Our heated indoor pool offers a resort-like escape with comfortable lounge chairs and a serene atmosphere.",
  },
  {
    image: "/images/spa-treatment.png",
    title: "Luxury Spa",
    description:
      "Rejuvenate body and mind at our world-class spa. Expert therapists deliver bespoke treatments using premium organic products in tranquil, candlelit rooms with aromatic oils and flower petal rituals.",
  },
  {
    image: "/images/hammam.png",
    title: "Hammam & Wellness",
    description:
      "Experience the ancient art of purification in our exquisite marble hammam. Featuring ornate basins, ambient candlelight, and traditional cleansing rituals in an opulent setting.",
  },
  {
    image: "/images/spa-salon.png",
    title: "Beauty Salon",
    description:
      "Pamper yourself at our full-service beauty salon offering manicures, pedicures, and bespoke beauty treatments in an elegant setting with premium products and expert stylists.",
  },
  {
    image: "/images/rooftop-dining.png",
    title: "Rooftop Dining",
    description:
      "Savor exquisite cuisine with breathtaking panoramic views. Our rooftop restaurant offers a culinary experience like no other, with fresh ingredients and stunning city vistas.",
  },
  {
    image: "/images/conference.png",
    title: "Meeting Rooms",
    description:
      "State-of-the-art conference facilities with cutting-edge AV technology, high-speed WiFi, and dedicated event coordinators for seamless corporate gatherings.",
  },
];

const iconAmenities = [
  { icon: ConciergeBell, title: "24/7 Concierge", description: "Our dedicated concierge team anticipates your every need." },
  { icon: Car, title: "Valet Parking", description: "Complimentary valet service for seamless arrivals and departures." },
  { icon: Dumbbell, title: "Fitness Center", description: "Modern equipment and personal trainers, open 24/7." },
  { icon: ShieldCheck, title: "Premium Security", description: "Round-the-clock security and smart room locks throughout." },
];

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] uppercase text-sm mb-4 font-[var(--font-lato)]">
            World-Class Services
          </p>
          <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold mb-4 text-foreground">
            Hotel <span className="gold-text">Amenities</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto font-[var(--font-lato)] text-lg">
            Every detail is designed to elevate your stay. From wellness to
            gastronomy, discover a world of exclusive amenities at MH Hotel.
          </p>
        </motion.div>

        {/* Visual Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visualAmenities.map((amenity, i) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden h-[320px] cursor-pointer border border-border hover:border-gold/40 transition-all duration-500"
            >
              <img
                src={amenity.image}
                alt={amenity.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-[var(--font-playfair)] font-bold text-white mb-2">
                  {amenity.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed font-[var(--font-lato)] line-clamp-3">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Icon Amenities Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {iconAmenities.map((amenity, i) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group bg-card rounded-xl p-5 border border-border hover:border-gold/40 transition-all duration-500 hover:luxury-shadow cursor-pointer flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <amenity.icon className="w-6 h-6 text-charcoal" />
              </div>
              <div>
                <h3 className="font-[var(--font-playfair)] font-bold text-foreground text-sm">
                  {amenity.title}
                </h3>
                <p className="text-muted-foreground text-xs font-[var(--font-lato)] mt-0.5">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
