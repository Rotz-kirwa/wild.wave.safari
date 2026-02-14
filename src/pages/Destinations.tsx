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
  { name: "Amboseli National Park", country: "Kenya", region: "Kenya", category: ["Luxury", "Photo Safaris"], image: "https://i.pinimg.com/1200x/af/84/a5/af84a56c7132d028785480a3100ed4eb.jpg", desc: "Iconic views of Mount Kilimanjaro with large elephant herds.", bestMonths: "Jun - Oct, Jan - Feb" },
  { name: "Tsavo West National Park", country: "Kenya", region: "Kenya", category: ["Budget", "Photo Safaris"], image: "https://i.pinimg.com/736x/9b/29/c6/9b29c6b81c37eee1212ac88d91981df4.jpg", desc: "Volcanic landscapes, Mzima Springs, and diverse wildlife.", bestMonths: "Jun - Sep" },
  { name: "Tsavo East National Park", country: "Kenya", region: "Kenya", category: ["Budget", "Photo Safaris"], image: "https://i.pinimg.com/1200x/eb/63/3c/eb633c44d40b54d63064719da7dfb03a.jpg", desc: "Famous for red elephants and vast open plains.", bestMonths: "Jun - Sep" },
  { name: "Samburu National Reserve", country: "Kenya", region: "Kenya", category: ["Luxury"], image: "https://i.pinimg.com/1200x/a2/f4/e4/a2f4e4b2279d6ea4c2687912bc875c30.jpg", desc: "Unique wildlife including Grevy's zebra, reticulated giraffe, and Somali ostrich.", bestMonths: "Jun - Oct" },
  { name: "Lake Nakuru National Park", country: "Kenya", region: "Kenya", category: ["Budget", "Family Safaris"], image: "https://i.pinimg.com/736x/ba/6a/4d/ba6a4d70598ab059e5d35549cf3f7954.jpg", desc: "Flamingo paradise and rhino sanctuary in the Great Rift Valley.", bestMonths: "Year-round" },
  { name: "Lake Naivasha", country: "Kenya", region: "Kenya", category: ["Budget", "Family Safaris"], image: "https://i.pinimg.com/1200x/34/cc/5a/34cc5ab0c0db9ab717ae7ddc773c3a35.jpg", desc: "Freshwater lake with hippos, birdlife, and boat safaris.", bestMonths: "Year-round" },
  { name: "Aberdare National Park", country: "Kenya", region: "Kenya", category: ["Luxury"], image: "https://i.pinimg.com/1200x/3a/a0/04/3aa0048b05f26c1738e918845cc48754.jpg", desc: "Misty highlands, waterfalls, and rare bongo antelope.", bestMonths: "Jan - Mar, Jul - Oct" },
  { name: "Meru National Park", country: "Kenya", region: "Kenya", category: ["Budget"], image: "https://i.pinimg.com/1200x/fc/0d/3a/fc0d3a0e363a3c7de828924e3745f47e.jpg", desc: "Remote wilderness where Elsa the lioness was raised.", bestMonths: "Jun - Sep" },
  { name: "Ol Pejeta Conservancy", country: "Kenya", region: "Kenya", category: ["Luxury", "Photo Safaris"], image: "https://i.pinimg.com/1200x/4a/c9/24/4ac924d42d3422878e37d44b1bf493f3.jpg", desc: "Home to the last two northern white rhinos and chimpanzee sanctuary.", bestMonths: "Year-round" },
  { name: "Hell's Gate National Park", country: "Kenya", region: "Kenya", category: ["Budget", "Family Safaris"], image: "https://i.pinimg.com/1200x/0b/d1/35/0bd1350bd76c2763dbbf3e227f91c738.jpg", desc: "Walk or cycle among wildlife in dramatic gorges and cliffs.", bestMonths: "Year-round" },
  { name: "Lewa Wildlife Conservancy", country: "Kenya", region: "Kenya", category: ["Luxury"], image: "https://i.pinimg.com/736x/3a/37/87/3a3787f4d7b463432d56b1200d0abe58.jpg", desc: "World-renowned rhino conservation and endangered species protection.", bestMonths: "Jun - Oct, Jan - Feb" },
  { name: "Kakamega Forest", country: "Kenya", region: "Kenya", category: ["Budget"], image: "https://i.pinimg.com/736x/5b/f2/00/5bf200432588f114fdb1abd4c3529dcd.jpg", desc: "Kenya's only tropical rainforest with unique bird species.", bestMonths: "Year-round" },
  { name: "Solio Ranch Game Reserve", country: "Kenya", region: "Kenya", category: ["Luxury"], image: "https://i.pinimg.com/736x/00/92/bf/0092bf9066809bb9a1743c9e48279673.jpg", desc: "Private rhino sanctuary with highest density of black and white rhinos.", bestMonths: "Year-round" },
  { name: "Diani Beach", country: "Kenya", region: "Kenya", category: ["Budget", "Family Safaris"], image: "https://i.pinimg.com/736x/1c/0c/6d/1c0c6d937843c47da0cc438056c679c8.jpg", desc: "Pristine white sand beaches on Kenya's south coast.", bestMonths: "Dec - Mar, Jul - Oct" },
  { name: "Serengeti", country: "Tanzania", region: "Tanzania", category: ["Luxury", "Photo Safaris", "Family Safaris"], image: serengetiImg, desc: "Endless plains teeming with wildlife across 15,000 sq km.", bestMonths: "Jun - Oct" },
  { name: "Ngorongoro Crater", country: "Tanzania", region: "Tanzania", category: ["Luxury", "Budget"], image: ngorongoroImg, desc: "The world's largest volcanic caldera — a natural Eden.", bestMonths: "Jun - Sep" },
  { name: "Bwindi Impenetrable Forest", country: "Uganda", region: "Uganda", category: ["Luxury"], image: gorillaImg, desc: "Trek through misty forests to meet endangered mountain gorillas.", bestMonths: "Jun - Sep, Dec - Feb" },
  { name: "Zanzibar", country: "Tanzania", region: "Tanzania", category: ["Budget", "Family Safaris"], image: "https://i.pinimg.com/736x/88/99/df/8899df143fd810e4dcfde33678601a57.jpg", desc: "White sand beaches, spice markets, and rich Swahili culture.", bestMonths: "Jun - Oct" },
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
                  className="group relative rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all h-80"
                >
                  <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-safari-charcoal/90 via-safari-charcoal/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {dest.category.map((cat) => (
                      <span key={cat} className="bg-safari-charcoal/70 text-safari-cream text-xs px-2 py-1 rounded-full backdrop-blur-sm">{cat}</span>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="flex items-center gap-2 text-safari-gold text-sm mb-2">
                      <MapPin className="w-3 h-3" />
                      {dest.country}
                    </div>
                    <h3 className="text-xl font-display font-bold text-safari-cream mb-2">{dest.name}</h3>
                    <p className="text-safari-sand/90 text-sm mb-3">{dest.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-safari-sand/70">Best: {dest.bestMonths}</span>
                      <Link to="/contact" className="text-safari-gold text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
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
