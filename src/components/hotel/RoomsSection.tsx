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
import { useSiteSettings } from "./SettingsProvider";

const rooms = [
  {
    id: "classique",
    name: "Chambre Classique",
    image: "/images/room-classic.png",
    price: 166,
    priceSingle: 141,
    priceTriple: 202,
    totalRooms: 50,
    size: "32 m²",
    bed: "Queen Bed",
    maxGuests: "1–3 Adultes",
    description:
      "Un havre de sérénité au design contemporain, literie moelleuse et espace de travail soigneusement aménagé. Parfait pour les voyageurs d'affaires et de loisirs en quête de confort et de praticité.",
    amenities: ["WiFi Gratuit", "Smart TV", "Machine à Café", "Douche Pluie", "Vue Ville", "Mini Bar"],
    icon: Wifi,
  },
  {
    id: "superieure",
    name: "Chambre Supérieure",
    image: "/images/room-twin.png",
    price: 198,
    priceSingle: 167,
    totalRooms: 10,
    size: "36 m²",
    bed: "Twin / Double",
    maxGuests: "1–2 Adultes",
    description:
      "Idéale pour les amis ou collègues voyageant ensemble, notre Chambre Supérieure dispose de deux lits confortables avec accents bleu marine, fauteuils moelleux et un tapis géométrique moderne aux tons neutres apaisants.",
    amenities: ["WiFi Gratuit", "Smart TV", "Machine à Café", "Douche Pluie", "Vue Ville", "Mini Bar"],
    icon: Coffee,
    featured: true,
  },
  {
    id: "premium",
    name: "Chambre Premium",
    image: "/images/room-deluxe-pink.png",
    price: 224,
    priceSingle: 193,
    totalRooms: 10,
    size: "48 m²",
    bed: "King Bed",
    maxGuests: "1–2 Adultes",
    description:
      "Élevez votre séjour dans notre Chambre Premium, offrant une vue panoramique sur la ville à travers des baies vitrées, un fauteuil rose vibrant et une salle de bain en marbre spacieuse. Un choix idéal pour les amateurs de raffinement.",
    amenities: [
      "WiFi Gratuit",
      "Smart TV 65\"",
      "Machine Espresso",
      "Baignoire & Douche",
      "Vue Panoramique",
      "Accès Lounge",
    ],
    icon: Coffee,
  },
  {
    id: "junior-suite",
    name: "Suite Junior",
    image: "/images/room-suite.png",
    price: 251,
    priceSingle: 220,
    totalRooms: 10,
    size: "55 m²",
    bed: "King Bed + Salon",
    maxGuests: "1–2 Adultes",
    description:
      "Notre Suite Junior redéfinit le luxe avec un salon séparé, un espace repas et une chambre. Dotée de mobilier sur mesure, de doubles vasques et d'un service de butler exclusif pour une expérience inoubliable.",
    amenities: [
      "WiFi Gratuit",
      "Smart TV 75\"",
      "Cuisine Équipée",
      "Jacuzzi",
      "Butler Service",
      "Transfert Aéroport",
    ],
    icon: Bath,
  },
  {
    id: "romantique",
    name: "Suite Romantique",
    image: "/images/room-romantic.png",
    price: 320,
    totalRooms: 5,
    size: "55 m²",
    bed: "King Bed",
    maxGuests: "2 Adultes",
    description:
      "Célébrez l'amour dans notre Suite Romantique, parée de pétales de roses, de cygnes en serviette et d'une tête de lit terracotta luxueuse sur un papier peint botanique bleu. Parfaite pour les lunes de miel et anniversaires.",
    amenities: [
      "WiFi Gratuit",
      "Smart TV 65\"",
      "Champagne & Fleurs",
      "Jacuzzi",
      "Room Service",
      "Late Checkout",
    ],
    icon: Bath,
  },
  {
    id: "familiale",
    name: "Chambre Familiale",
    image: "/images/room-family.png",
    price: 280,
    totalRooms: 8,
    size: "52 m²",
    bed: "Lits Triple",
    maxGuests: "3 Adultes",
    description:
      "Spacieuse et accueillante, notre Chambre Familiale accueille jusqu'à trois convives avec trois lits simples, des fauteuils rouges et un coin salon cosy près de la fenêtre. Conçue pour les familles et les groupes.",
    amenities: [
      "WiFi Gratuit",
      "Smart TV",
      "Machine à Café",
      "Douche Pluie",
      "Coin Salon",
      "Enfants Bienvenus",
    ],
    icon: Maximize,
  },
];

export default function RoomsSection() {
  const { settings } = useSiteSettings();
  const content = settings.content;
  const currency = settings.currency;

  // Merge room prices from settings
  const displayRooms = rooms.map((room) => {
    const settingsRoom = settings.rooms?.find((r) => r.id === room.id);
    if (settingsRoom) {
      return {
        ...room,
        price: settingsRoom.price,
        priceSingle: settingsRoom.priceSingle,
        priceTriple: settingsRoom.priceTriple,
        totalRooms: settingsRoom.totalRooms,
        name: settingsRoom.name || room.name,
      };
    }
    return room;
  });

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
            {content?.roomsLabel || "Hébergement"}
          </p>
          <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold mb-4 text-foreground">
            {content?.roomsTitle1 || "Chambres &"} <span className="gold-text">{content?.roomsTitle2 || "Suites"}</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto font-[var(--font-lato)] text-lg">
            {content?.roomsSubtitle || "Chaque chambre et suite est un sanctuaire de confort, conçu avec une attention minutieuse aux détails et orné des plus beaux matériaux."}
          </p>
        </motion.div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayRooms.map((room, i) => (
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
                  Recommandée
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
                      {currency?.symbol || "$"}{room.price}
                    </span>
                    <span className="text-white/60 text-sm font-[var(--font-lato)]">
                      /nuit
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Room Info Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/10 text-gold text-xs font-[var(--font-lato)]">
                    {room.maxGuests}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/10 text-gold text-xs font-[var(--font-lato)]">
                    {room.totalRooms} chambres
                  </span>
                  {room.priceSingle && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-charcoal/10 text-muted-foreground text-xs font-[var(--font-lato)]">
                      Dès {currency?.symbol || "$"}{room.priceSingle}/pers.
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-4 font-[var(--font-lato)] leading-relaxed">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-2 mb-4">
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

                {/* Tax notice */}
                <p className="text-xs text-muted-foreground/70 font-[var(--font-lato)] mb-4">
                  + {currency?.taxRate || 9}% Taxes et frais
                </p>

                <Button className="w-full bg-charcoal text-gold-light hover:bg-charcoal/90 tracking-wider uppercase font-[var(--font-lato)] group/btn">
                  Choisir cette chambre
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
