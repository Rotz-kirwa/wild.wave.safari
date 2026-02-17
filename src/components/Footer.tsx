import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const partners = [
  { name: "KWS", logo: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/112017/untitled-1_144.png?V2cDV1g0NsJJsBtMYuXh3a9zsT5zt4BE&itok=6KZKWiEQ" },
  { name: "TRA", logo: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200&h=80&fit=crop" },
  { name: "Safari Bookings", logo: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&h=80&fit=crop" },
  { name: "TOSK", logo: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=200&h=80&fit=crop" },
  { name: "Magical Kenya", logo: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=200&h=80&fit=crop" },
  { name: "Sopa Lodges", logo: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=200&h=80&fit=crop" },
  { name: "Serena Hotels", logo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=80&fit=crop" },
  { name: "TripAdvisor", logo: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=200&h=80&fit=crop" },
  { name: "Bonfire Adventures", logo: "https://images.unsplash.com/photo-1484406566174-9da000fda645?w=200&h=80&fit=crop" },
  { name: "Kenya Railways", logo: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=200&h=80&fit=crop" },
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
