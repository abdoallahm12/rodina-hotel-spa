"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const treatments = [
  {
    name: "Royal Signature Massage",
    duration: "90 min",
    price: "$220",
    description:
      "A bespoke full-body massage combining Swedish, hot stone, and aromatherapy techniques using 24-karat gold-infused oils.",
  },
  {
    name: "Diamond Facial",
    duration: "75 min",
    price: "$280",
    description:
      "Reveal radiant skin with our premium facial featuring diamond dust exfoliation, hyaluronic acid serums, and LED light therapy.",
  },
  {
    name: "Couples Retreat",
    duration: "120 min",
    price: "$450",
    description:
      "Share a blissful experience with synchronized massages, private Jacuzzi access, champagne, and chocolate-dipped strawberries.",
  },
  {
    name: "Herbal Steam Ritual",
    duration: "60 min",
    price: "$150",
    description:
      "Ancient healing meets modern wellness in our aromatic steam ceremony followed by a cooling herbal body wrap and scalp treatment.",
  },
];

export default function SpaSection() {
  return (
    <section id="spa" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/images/spa-treatment.png"
              alt="MH Hotel luxury spa"
              className="w-full h-[600px] object-cover rounded-2xl luxury-shadow"
            />
            <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm rounded-xl p-4 border border-gold/20">
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-[var(--font-lato)] mb-1">
                Award Winning
              </p>
              <p className="text-white font-[var(--font-playfair)] text-lg font-bold">
                Best City Spa 2025
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gold tracking-[0.4em] uppercase text-sm mb-4 font-[var(--font-lato)]">
              Wellness & Rejuvenation
            </p>
            <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold mb-4 text-foreground">
              MH <span className="gold-text">Spa</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-8 font-[var(--font-lato)] text-lg">
              Step into a world of tranquility and renewal. Our award-winning spa
              offers a sanctuary where ancient healing traditions meet
              cutting-edge wellness technology, all delivered by expert
              therapists dedicated to your complete well-being.
            </p>

            {/* Treatments */}
            <div className="space-y-4">
              {treatments.map((treatment, i) => (
                <motion.div
                  key={treatment.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-gold/30 transition-colors group cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-[var(--font-playfair)] font-bold text-foreground group-hover:text-gold transition-colors">
                        {treatment.name}
                      </h4>
                      <span className="text-gold font-[var(--font-playfair)] font-bold text-lg">
                        {treatment.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm font-[var(--font-lato)] mb-1">
                      {treatment.description}
                    </p>
                    <span className="text-gold-light text-xs font-[var(--font-lato)]">
                      {treatment.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="mt-6 gold-gradient text-charcoal font-semibold tracking-wider uppercase hover:opacity-90 font-[var(--font-lato)]">
              Book a Treatment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
