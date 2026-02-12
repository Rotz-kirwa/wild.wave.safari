import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import gorillaImg from "@/assets/gorilla-trekking.jpg";
import balloonImg from "@/assets/balloon-safari.jpg";
import zanzibarImg from "@/assets/zanzibar-beach.jpg";
import masaiMaraImg from "@/assets/masai-mara.jpg";
import serengetiImg from "@/assets/serengeti.jpg";
import ngorongoroImg from "@/assets/ngorongoro.jpg";

const packages = [
  { name: "Classic Game Drive", duration: "7 Days", price: "$2,800", tag: "Most Popular", type: "Classic", image: masaiMaraImg, desc: "Explore Kenya's Masai Mara and Amboseli parks with expert trackers.", includes: ["Airport transfers", "All meals", "Game drives", "Park fees", "Professional guide"], excludes: ["International flights", "Travel insurance", "Tips"] },
  { name: "Great Migration Safari", duration: "10 Days", price: "$4,500", tag: "Seasonal", type: "Classic", image: serengetiImg, desc: "Follow the wildebeest migration across the Serengeti and Mara.", includes: ["Airport transfers", "All meals", "Luxury tented camps", "Park fees", "Bush walks"], excludes: ["International flights", "Visa fees", "Travel insurance"] },
  { name: "Gorilla Trekking Expedition", duration: "5 Days", price: "$4,200", tag: "Exclusive", type: "Gorilla Trekking", image: gorillaImg, desc: "Trek through Bwindi's misty forests for an intimate gorilla encounter.", includes: ["Gorilla permits", "All meals", "Lodge accommodation", "Park fees", "Guide"], excludes: ["International flights", "Travel insurance", "Personal items"] },
  { name: "Hot Air Balloon Safari", duration: "10 Days", price: "$5,500", tag: "Premium", type: "Balloon Safaris", image: balloonImg, desc: "Float above the Serengeti at dawn plus full ground game drives.", includes: ["Balloon flight", "Champagne breakfast", "All meals", "Luxury lodge", "Park fees"], excludes: ["International flights", "Travel insurance", "Tips"] },
  { name: "Beach & Bush Combo", duration: "12 Days", price: "$3,600", tag: "Best Value", type: "Beach Add-Ons", image: zanzibarImg, desc: "Combine thrilling Serengeti game drives with Zanzibar beach relaxation.", includes: ["Domestic flights", "All meals", "Beach resort", "Safari lodge", "Water sports"], excludes: ["International flights", "Visa fees", "Spa treatments"] },
  { name: "Ngorongoro & Crater Highlands", duration: "6 Days", price: "$3,200", tag: "Adventure", type: "Classic", image: ngorongoroImg, desc: "Descend into the world's largest caldera and walk with Maasai warriors.", includes: ["All meals", "4x4 vehicle", "Crater fees", "Cultural visit", "Guide"], excludes: ["International flights", "Travel insurance", "Gratuities"] },
];

const types = ["All", "Classic", "Gorilla Trekking", "Balloon Safaris", "Beach Add-Ons"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

import { useState } from "react";

const Packages = () => {
  const [activeType, setActiveType] = useState("All");
  const filtered = activeType === "All" ? packages : packages.filter((p) => p.type === activeType);

  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Safari Packages</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Choose Your <span className="italic text-primary">Adventure</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every package is fully customizable. Pick your starting point, and we'll tailor it to you.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-b border-border bg-background sticky top-16 z-30">
        <div className="container mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 space-y-8">
          {filtered.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all flex flex-col md:flex-row"
            >
              <div className="relative md:w-80 h-56 md:h-auto overflow-hidden shrink-0">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {pkg.tag}
                </span>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <h3 className="text-2xl font-display font-bold">{pkg.name}</h3>
                  <span className="text-2xl font-display font-bold text-primary">{pkg.price}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{pkg.duration}</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">{pkg.type}</span>
                </div>
                <p className="text-muted-foreground mb-6">{pkg.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Includes:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Excludes:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      {pkg.excludes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link to="/contact">
                    <Button className="gap-2">Inquire Now <ArrowRight className="w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Packages;
