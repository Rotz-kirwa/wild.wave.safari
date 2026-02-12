import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import serengetiImg from "@/assets/serengeti.jpg";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import balloonImg from "@/assets/balloon-safari.jpg";
import zanzibarImg from "@/assets/zanzibar-beach.jpg";
import masaiMaraImg from "@/assets/masai-mara.jpg";
import ngorongoroImg from "@/assets/ngorongoro.jpg";

const posts = [
  { title: "The Ultimate Packing List for an East African Safari", category: "Travel Tips", date: "Jan 15, 2026", readTime: "5 min", image: masaiMaraImg, excerpt: "From binoculars to bug spray — everything you need for your first safari adventure." },
  { title: "When to Visit the Serengeti: A Month-by-Month Guide", category: "Destination Guide", date: "Dec 28, 2025", readTime: "7 min", image: serengetiImg, excerpt: "Each month brings different wildlife spectacles. Find the perfect time for your trip." },
  { title: "Gorilla Trekking: What to Expect on Your First Trek", category: "Experience", date: "Dec 10, 2025", readTime: "6 min", image: gorillaImg, excerpt: "A detailed guide to preparing for and enjoying your mountain gorilla encounter." },
  { title: "Zanzibar Beyond the Beach: Culture, Spice & History", category: "Destination Guide", date: "Nov 22, 2025", readTime: "8 min", image: zanzibarImg, excerpt: "Discover Stone Town, spice plantations, and the rich Swahili heritage of Zanzibar." },
  { title: "Hot Air Balloon Safari: Is It Worth the Splurge?", category: "Experience", date: "Nov 5, 2025", readTime: "4 min", image: balloonImg, excerpt: "We break down costs, what to expect, and why it might be your trip's highlight." },
  { title: "Ngorongoro Crater: Africa's Garden of Eden", category: "Destination Guide", date: "Oct 18, 2025", readTime: "6 min", image: ngorongoroImg, excerpt: "Why this volcanic caldera is one of the most remarkable wildlife habitats on Earth." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Blog = () => {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Blog & Guides</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Stories from the <span className="italic text-primary">Trail</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Travel guides, packing tips, and tales from the wild to inspire your next adventure.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group mb-12 bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all flex flex-col md:flex-row"
          >
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="text-primary text-sm font-medium mb-2">{posts[0].category}</span>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{posts[0].title}</h2>
              <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{posts[0].date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{posts[0].readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="text-primary text-xs font-medium">{post.category}</span>
                  <h3 className="text-lg font-display font-bold mt-2 mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
