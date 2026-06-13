"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DiningSection() {
  return (
    <section id="dining" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] uppercase text-sm mb-4 font-[var(--font-lato)]">
            Culinary Excellence
          </p>
          <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold mb-4 text-foreground">
            Fine <span className="gold-text">Dining</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto font-[var(--font-lato)] text-lg">
            Embark on a culinary journey through our three signature restaurants,
            each offering a distinct atmosphere and exceptional cuisine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden h-[500px] cursor-pointer"
          >
            <img
              src="/images/seafood.png"
              alt="The Goldfinch restaurant"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2 font-[var(--font-lato)]">
                Fine Dining
              </p>
              <h3 className="text-2xl font-[var(--font-playfair)] font-bold text-white mb-3">
                The Goldfinch
              </h3>
              <p className="text-white/70 font-[var(--font-lato)] mb-4 leading-relaxed">
                Modern European cuisine reimagined by our Michelin-starred Chef.
                An intimate setting with a curated wine cellar featuring over 500
                labels from the world&apos;s finest vineyards.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gold-light text-sm font-[var(--font-lato)]">
                  Dinner: 6:30 PM - 11:00 PM
                </span>
                <Button
                  variant="ghost"
                  className="text-gold hover:text-gold-light p-0 font-[var(--font-lato)]"
                >
                  Reserve
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Restaurant 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden h-[500px] cursor-pointer"
          >
            <img
              src="/images/terrace.png"
              alt="Sky Lounge rooftop terrace"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2 font-[var(--font-lato)]">
                Rooftop Bar
              </p>
              <h3 className="text-2xl font-[var(--font-playfair)] font-bold text-white mb-3">
                Sky Lounge
              </h3>
              <p className="text-white/70 font-[var(--font-lato)] mb-4 leading-relaxed">
                Handcrafted cocktails and Asian-fusion small plates served above
                the city skyline. Live jazz performances every weekend under the
                stars.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gold-light text-sm font-[var(--font-lato)]">
                  Daily: 5:00 PM - 1:00 AM
                </span>
                <Button
                  variant="ghost"
                  className="text-gold hover:text-gold-light p-0 font-[var(--font-lato)]"
                >
                  Reserve
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Restaurant 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden h-[500px] cursor-pointer"
          >
            <img
              src="/images/rooftop-dining.png"
              alt="Azure terrace dining"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2 font-[var(--font-lato)]">
                Terrace
              </p>
              <h3 className="text-2xl font-[var(--font-playfair)] font-bold text-white mb-3">
                Azure Terrace
              </h3>
              <p className="text-white/70 font-[var(--font-lato)] mb-4 leading-relaxed">
                Relaxed terrace dining with Mediterranean-inspired dishes, fresh
                seafood, and tropical cocktails. The perfect daytime escape.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gold-light text-sm font-[var(--font-lato)]">
                  Lunch: 11:00 AM - 5:00 PM
                </span>
                <Button
                  variant="ghost"
                  className="text-gold hover:text-gold-light p-0 font-[var(--font-lato)]"
                >
                  Reserve
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
