import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-safari-charcoal text-safari-sand">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold text-safari-cream mb-4">
              Wild<span className="text-primary">Wave</span> Safaris
            </h3>
            <p className="text-sm leading-relaxed opacity-80 mb-6">
              Crafting unforgettable East African safari experiences since 2010. 
              From the Serengeti to the mountains of Rwanda, we bring you closer to the wild.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-safari-warm-brown hover:bg-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-safari-cream mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {["Destinations", "Safari Packages", "About Us", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-').replace('us','')}`} className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="font-display font-semibold text-safari-cream mb-4">Top Destinations</h4>
            <ul className="space-y-3 text-sm">
              {["Masai Mara", "Serengeti", "Ngorongoro Crater", "Bwindi Forest", "Zanzibar"].map((item) => (
                <li key={item}>
                  <Link to="/destinations" className="opacity-80 hover:opacity-100 hover:text-primary transition-all flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-safari-cream mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 opacity-80">
                <Phone className="w-4 h-4 text-primary" />
                +254 700 123 456
              </li>
              <li className="flex items-center gap-3 opacity-80">
                <Mail className="w-4 h-4 text-primary" />
                hello@wildwavesafaris.com
              </li>
              <li className="flex items-start gap-3 opacity-80">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                Karen Road, Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-safari-warm-brown text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} WildWave Safaris. All rights reserved. | KATO Licensed Tour Operator</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
