import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const partners = [
  { name: "KWS", logo: "https://i.pinimg.com/736x/c0/a6/c6/c0a6c633ee7ad764c4cd50e5b04cccae.jpg" },
  { name: "TRA", logo: "https://i.pinimg.com/736x/8e/3d/0a/8e3d0a8c8f5e5c5e5e5e5e5e5e5e5e5e.jpg" },
  { name: "Safari Bookings", logo: "https://i.pinimg.com/736x/a5/2e/8d/a52e8d8c8f5e5c5e5e5e5e5e5e5e5e5e.jpg" },
  { name: "TOSK", logo: "https://i.pinimg.com/736x/b3/4f/1c/b34f1c8c8f5e5c5e5e5e5e5e5e5e5e5e.jpg" },
  { name: "Magical Kenya", logo: "https://i.pinimg.com/736x/c1/d1/42/c1d14293c0597d3b7a94a40222c6464c.jpg" },
  { name: "Sopa Lodges", logo: "https://i.pinimg.com/736x/92/36/31/923631f353cdb0a7fa328b51a730c14b.jpg" },
  { name: "Serena Hotels", logo: "https://i.pinimg.com/736x/f7/bf/32/f7bf32c64f80b641fab94c24b99e6de1.jpg" },
  { name: "TripAdvisor", logo: "https://i.pinimg.com/736x/d4/e2/5a/d4e25a8c8f5e5c5e5e5e5e5e5e5e5e5e.jpg" },
  { name: "Bonfire Adventures", logo: "https://i.pinimg.com/736x/e5/f3/6b/e5f36b8c8f5e5c5e5e5e5e5e5e5e5e5e.jpg" },
  { name: "Kenya Railways", logo: "https://i.pinimg.com/736x/f6/04/7c/f6047c8c8f5e5c5e5e5e5e5e5e5e5e5e.jpg" },
];

const Footer = () => {
  return (
    <footer className="bg-safari-charcoal text-safari-sand">
      {/* Partners Section */}
      <div className="border-b border-safari-warm-brown bg-safari-charcoal/50">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-center text-safari-cream font-display font-semibold text-xl mb-6">Our Partners</h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-12 items-center">
              {[...partners, ...partners].map((partner, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                +254 713 241 666
              </li>
              <li className="flex items-center gap-3 opacity-80">
                <Mail className="w-4 h-4 text-primary" />
                wildwavesafaris@gmail.com
              </li>
              <li className="flex items-start gap-3 opacity-80">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                Thika Road, Spur Mall, Nairobi
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
