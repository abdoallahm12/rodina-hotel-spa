"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Presentation, Cake, Music } from "lucide-react";

const eventTypes = [
  {
    icon: Presentation,
    title: "Conferences & Meetings",
    description:
      "State-of-the-art boardrooms and conference halls with cutting-edge AV technology, high-speed WiFi, and dedicated event coordinators for seamless corporate gatherings.",
    capacity: "Up to 500 guests",
  },
  {
    icon: Cake,
    title: "Weddings & Celebrations",
    description:
      "Transform your dream wedding into reality in our grand ballroom with crystal chandeliers, floral arrangements, and a dedicated wedding planner to curate every magical detail.",
    capacity: "Up to 350 guests",
  },
  {
    icon: Users,
    title: "Private Events",
    description:
      "Host intimate gatherings, galas, or milestone celebrations in our versatile event spaces, each customizable to reflect your unique vision and style.",
    capacity: "Up to 200 guests",
  },
  {
    icon: Music,
    title: "Cultural & Social Events",
    description:
      "From art exhibitions to charity galas, our sophisticated venues provide the perfect backdrop for cultural and social occasions that leave lasting impressions.",
    capacity: "Up to 400 guests",
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gold tracking-[0.4em] uppercase text-sm mb-4 font-[var(--font-lato)]">
              Unforgettable Occasions
            </p>
            <h2 className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold mb-4">
              Events & <span className="gold-text">Meetings</span>
            </h2>
            <div className="w-16 h-[2px] bg-gold mb-6" />
            <p className="text-white/70 leading-relaxed mb-10 font-[var(--font-lato)] text-lg">
              From grand celebrations to corporate summits, MH Hotel provides
              stunning venues and impeccable service to make every event
              extraordinary. Our dedicated events team ensures every detail is
              flawlessly executed.
            </p>

            <div className="space-y-4">
              {eventTypes.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                    <event.icon className="w-6 h-6 text-charcoal" />
                  </div>
                  <div>
                    <h4 className="font-[var(--font-playfair)] font-bold text-white group-hover:text-gold transition-colors mb-1">
                      {event.title}
                    </h4>
                    <p className="text-white/60 text-sm font-[var(--font-lato)] leading-relaxed mb-1">
                      {event.description}
                    </p>
                    <span className="text-gold text-xs font-[var(--font-lato)]">
                      {event.capacity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button className="mt-6 gold-gradient text-charcoal font-semibold tracking-wider uppercase hover:opacity-90 font-[var(--font-lato)]">
              Plan Your Event
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/images/conference-banquet.png"
              alt="MH Hotel event space"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/3 rounded-b-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
