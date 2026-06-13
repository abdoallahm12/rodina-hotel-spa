"use client";

import { motion } from "framer-motion";
import { Star, Award, Users, Globe } from "lucide-react";

const stats = [
  { icon: Star, value: "5-Star", label: "Luxury Rating" },
  { icon: Award, value: "15+", label: "Years of Excellence" },
  { icon: Users, value: "50,000+", label: "Happy Guests" },
  { icon: Globe, value: "120+", label: "Countries Served" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src="/images/lobby.png"
                alt="MH Hotel grand lobby"
                className="w-full h-[500px] object-cover rounded-2xl luxury-shadow"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-background luxury-shadow hidden sm:block">
                <img
                  src="/images/hammam.png"
                  alt="MH Hotel hammam spa"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative corner */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-gold/40 rounded-tl-2xl" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gold tracking-[0.4em] uppercase text-sm mb-4 font-[var(--font-lato)]">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold mb-6 text-foreground">
              A Legacy of <span className="gold-text">Luxury</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6 font-[var(--font-lato)] text-lg">
              Since its inception, MH Hotel has been a beacon of sophistication
              and warmth in the heart of the city. Our commitment to excellence
              transcends ordinary hospitality, offering each guest a curated
              experience that blends timeless elegance with contemporary comfort.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 font-[var(--font-lato)]">
              Every detail at MH Hotel has been thoughtfully crafted, from the
              hand-selected furnishings in our suites to the locally sourced
              ingredients in our restaurants. We believe that true luxury lies in
              the art of anticipation, where every need is met before it is
              expressed, and every moment becomes a cherished memory.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground font-[var(--font-playfair)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wider uppercase font-[var(--font-lato)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
