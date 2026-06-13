"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wifi,
  Coffee,
  Tv,
  Bath,
  Maximize,
  ArrowRight,
  Check,
} from "lucide-react";

const rooms = [
  {
    id: "standard",
    name: "Standard Room",
    image: "/images/room-standard.png",
    price: 199,
    size: "32 m²",
    bed: "Queen Bed",
    description:
      "A serene retreat featuring contemporary design, plush bedding, and a thoughtfully appointed workspace. Perfect for both leisure and business travelers seeking comfort and convenience.",
    amenities: ["Free WiFi", "Smart TV", "Coffee Maker", "Rain Shower", "City View", "Mini Bar"],
    icon: Wifi,
  },
  {
    id: "twin",
    name: "Twin Room",
    image: "/images/room-twin.png",
    price: 229,
    size: "36 m²",
    bed: "Twin Beds",
    description:
      "Ideal for friends or colleagues traveling together, our Twin Room features two comfortable single beds with navy accents, cozy blue armchairs, and a modern geometric carpet in calming neutral tones.",
    amenities: ["Free WiFi", "Smart TV", "Coffee Maker", "Rain Shower", "City View", "Mini Bar"],
    icon: Wifi,
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    image: "/images/room-deluxe-pink.png",
    price: 349,
    size: "48 m²",
    bed: "King Bed",
    description:
      "Elevate your stay in our Deluxe Room, offering panoramic city views through floor-to-ceiling windows, a vibrant pink accent chair, and a spacious marble bathroom. An ideal choice for those who appreciate refined details.",
    amenities: [
      "Free WiFi",
      "65\" Smart TV",
      "Espresso Machine",
      "Bathtub & Shower",
      "Panoramic View",
      "Lounge Access",
    ],
    icon: Coffee,
    featured: true,
  },
  {
    id: "romantic",
    name: "Romantic Suite",
    image: "/images/room-romantic.png",
    price: 499,
    size: "55 m²",
    bed: "King Bed",
    description:
      "Celebrate love in our Romantic Suite, adorned with rose petals, towel art swans, and a luxurious terracotta headboard against botanical blue wallpaper. Perfect for honeymoons and anniversaries.",
    amenities: [
      "Free WiFi",
      "65\" Smart TV",
      "Champagne & Flowers",
      "Jacuzzi Bath",
      "Room Service",
      "Late Checkout",
    ],
    icon: Coffee,
  },
  {
    id: "suite",
    name: "Executive Suite",
    image: "/images/room-suite.png",
    price: 599,
    size: "75 m²",
    bed: "King Bed + Sofa",
    description:
      "Our Executive Suite redefines luxury with a separate living area, dining space, and bedroom. Featuring bespoke furnishings, dual vanities, and exclusive butler service.",
    amenities: [
      "Free WiFi",
      "75\" Smart TV",
      "Full Kitchen",
      "Jacuzzi Bath",
      "Butler Service",
      "Airport Transfer",
    ],
    icon: Bath,
  },
  {
    id: "family",
    name: "Family Room",
    image: "/images/room-family.png",
    price: 449,
    size: "52 m²",
    bed: "Triple Beds",
    description:
      "Spacious and inviting, our Family Room accommodates up to three guests with three single beds, red accent chairs, and a cozy seating nook by the window. Designed for families and groups seeking comfort and style.",
    amenities: [
      "Free WiFi",
      "Smart TV",
      "Coffee Maker",
      "Rain Shower",
      "Seating Area",
      "Kids Welcome",
    ],
    icon: Maximize,
  },
];

export default function RoomsSection() {
  return (
    <section id="rooms" className="py-24 bg-secondary/30">
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
            Accommodation
          </p>
          <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold mb-4 text-foreground">
            Rooms & <span className="gold-text">Suites</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto font-[var(--font-lato)] text-lg">
            Each room and suite is a sanctuary of comfort, designed with
            meticulous attention to detail and adorned with the finest materials.
          </p>
        </motion.div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`group relative bg-card rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl ${
                room.featured
                  ? "border-gold/40 luxury-shadow"
                  : "border-border hover:border-gold/30"
              }`}
            >
              {room.featured && (
                <Badge className="absolute top-4 right-4 z-10 gold-gradient text-charcoal font-[var(--font-lato)] tracking-wider">
                  Most Popular
                </Badge>
              )}

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-[var(--font-playfair)] font-bold text-white">
                      {room.name}
                    </h3>
                    <p className="text-white/70 text-sm font-[var(--font-lato)]">
                      {room.size} &bull; {room.bed}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-gold text-3xl font-[var(--font-playfair)] font-bold">
                      ${room.price}
                    </span>
                    <span className="text-white/60 text-sm font-[var(--font-lato)]">
                      /night
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4 font-[var(--font-lato)] leading-relaxed">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="font-[var(--font-lato)]">{amenity}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-charcoal text-gold-light hover:bg-charcoal/90 tracking-wider uppercase font-[var(--font-lato)] group/btn">
                  Book This Room
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
