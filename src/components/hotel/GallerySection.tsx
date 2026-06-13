"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { src: "/images/hotel-exterior.png", alt: "Hotel Exterior", category: "Hotel" },
  { src: "/images/lobby.png", alt: "Grand Lobby & Reception", category: "Hotel" },
  { src: "/images/conference.png", alt: "Conference Room", category: "Hotel" },
  { src: "/images/conference-banquet.png", alt: "Banquet Hall", category: "Hotel" },
  { src: "/images/room-standard.png", alt: "Room Service Breakfast", category: "Rooms" },
  { src: "/images/room-twin.png", alt: "Twin Room", category: "Rooms" },
  { src: "/images/room-deluxe-pink.png", alt: "Deluxe Room", category: "Rooms" },
  { src: "/images/room-romantic.png", alt: "Romantic Suite", category: "Rooms" },
  { src: "/images/room-suite.png", alt: "Executive Suite", category: "Rooms" },
  { src: "/images/room-family.png", alt: "Family Room", category: "Rooms" },
  { src: "/images/room-classic.png", alt: "Classic Room", category: "Rooms" },
  { src: "/images/room-city-view.png", alt: "Room with City View", category: "Rooms" },
  { src: "/images/fine-dining.png", alt: "Fine Dining Restaurant", category: "Dining" },
  { src: "/images/seafood.png", alt: "Seafood Platter", category: "Dining" },
  { src: "/images/desserts.png", alt: "Patisserie Desserts", category: "Dining" },
  { src: "/images/rooftop-dining.png", alt: "Rooftop Dining", category: "Dining" },
  { src: "/images/terrace.png", alt: "Garden Terrace", category: "Dining" },
  { src: "/images/pool.png", alt: "Indoor Pool", category: "Amenities" },
  { src: "/images/pool-lounge.png", alt: "Pool Lounge", category: "Amenities" },
  { src: "/images/spa-treatment.png", alt: "Spa Treatment", category: "Amenities" },
  { src: "/images/hammam.png", alt: "Hammam & Bath", category: "Amenities" },
  { src: "/images/spa-salon.png", alt: "Beauty Salon", category: "Amenities" },
  { src: "/images/bathroom-1.png", alt: "Luxury Bathroom", category: "Amenities" },
  { src: "/images/bathroom-2.png", alt: "Stone Bath Suite", category: "Amenities" },
  { src: "/images/terrace.png", alt: "Outdoor Lounge", category: "Amenities" },
  { src: "/images/conference-banquet.png", alt: "Event Space", category: "Events" },
  { src: "/images/conference.png", alt: "Meeting Room", category: "Events" },
];

const categories = ["All", "Hotel", "Rooms", "Dining", "Amenities", "Events"];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : null
    );
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredImages.length) % filteredImages.length
        : null
    );

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold tracking-[0.4em] uppercase text-sm mb-4 font-[var(--font-lato)]">
            Visual Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold mb-4 text-foreground">
            Photo <span className="gold-text">Gallery</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-6" />
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={
                activeCategory === cat
                  ? "gold-gradient text-charcoal font-[var(--font-lato)] tracking-wider uppercase text-xs"
                  : "border-gold/30 text-foreground hover:border-gold font-[var(--font-lato)] tracking-wider uppercase text-xs"
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.src + img.alt}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                  i === 0 || i === 5
                    ? "row-span-2 h-[400px]"
                    : "h-[190px]"
                }`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-start p-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-[var(--font-playfair)] font-bold text-sm">
                      {img.alt}
                    </p>
                    <p className="text-gold text-xs font-[var(--font-lato)]">
                      {img.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                onClick={closeLightbox}
              >
                <X className="w-8 h-8" />
              </button>
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                <ChevronRight className="w-10 h-10" />
              </button>
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
