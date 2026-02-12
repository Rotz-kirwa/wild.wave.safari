import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import serengetiImg from "@/assets/serengeti.jpg";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import balloonImg from "@/assets/balloon-safari.jpg";
import zanzibarImg from "@/assets/zanzibar-beach.jpg";
import masaiMaraImg from "@/assets/masai-mara.jpg";
import ngorongoroImg from "@/assets/ngorongoro.jpg";

const allDestinations = [
  { name: "Masai Mara", country: "Kenya", region: "Kenya", category: ["Luxury", "Photo Safaris"], image: masaiMaraImg, desc: "Home to the Great Migration and the Big Five.", bestMonths: "Jul - Oct" },
  { name: "Serengeti", country: "Tanzania", region: "Tanzania", category: ["Luxury", "Photo Safaris", "Family Safaris"], image: serengetiImg, desc: "Endless plains teeming with wildlife across 15,000 sq km.", bestMonths: "Jun - Oct" },
  { name: "Ngorongoro Crater", country: "Tanzania", region: "Tanzania", category: ["Luxury", "Budget"], image: ngorongoroImg, desc: "The world's largest volcanic caldera — a natural Eden.", bestMonths: "Jun - Sep" },
  { name: "Bwindi Impenetrable Forest", country: "Uganda", region: "Uganda", category: ["Luxury"], image: gorillaImg, desc: "Trek through misty forests to meet endangered mountain gorillas.", bestMonths: "Jun - Sep, Dec - Feb" },
  { name: "Zanzibar", country: "Tanzania", region: "Tanzania", category: ["Budget", "Family Safaris"], image: zanzibarImg, desc: "White sand beaches, spice markets, and rich Swahili culture.", bestMonths: "Jun - Oct" },
  { name: "Masai Mara Balloon", country: "Kenya", region: "Kenya", category: ["Luxury", "Photo Safaris"], image: balloonImg, desc: "Sunrise hot-air balloon ride over the savanna.", bestMonths: "Jul - Oct" },
];

const regions = ["All", "Kenya", "Tanzania", "Uganda", "Rwanda"];
const categories = ["All", "Luxury", "Budget", "Photo Safaris", "Family Safaris"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Destinations = () => {
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allDestinations.filter((d) => {
    const regionMatch = activeRegion === "All" || d.region === activeRegion;
    const catMatch = activeCategory === "All" || d.category.includes(activeCategory);
    return regionMatch && catMatch;
  });

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Explore East Africa</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Our <span className="italic text-primary">Destinations</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From vast savannas to misty mountains and turquoise coastlines — discover the diversity of East Africa.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-background sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-foreground mr-2">Region:</span>
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    activeRegion === r
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-foreground mr-2">Type:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    activeCategory === c
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No destinations match your filters. Try adjusting.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {dest.category.map((cat) => (
                        <span key={cat} className="bg-safari-charcoal/70 text-safari-cream text-xs px-2 py-1 rounded-full backdrop-blur-sm">{cat}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-primary text-sm mb-2">
                      <MapPin className="w-3 h-3" />
                      {dest.country}
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">{dest.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{dest.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Best: {dest.bestMonths}</span>
                      <Link to="/contact" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                        Details <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
