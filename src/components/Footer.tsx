import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const partners = [
  { name: "KWS", logo: "https://i.pinimg.com/736x/c0/a6/c6/c0a6c633ee7ad764c4cd50e5b04cccae.jpg" },
  { name: "TRA", logo: "https://tra.go.ke/wp-content/uploads/2024/09/Logo-TRA.png" },
  { name: "Safari Bookings", logo: "https://cfstatic.safaribookings.com/img/logos/logo-240x35.png" },
  { name: "TOSK", logo: "https://staging.toskenya.org/wp-content/uploads/2024/03/tosk_logo_v2.webp" },
  { name: "Magical Kenya", logo: "https://magicalkenya.com/wp-content/uploads/2024/09/Magical-Kenya-LOGO-1-2.png" },
  { name: "Sopa Lodges", logo: "https://www.sopalodges.com/images/logos/sopalodges-logo.png" },
  { name: "Serena Hotels", logo: "https://image-tc.galaxy.tf/wisvg-bef60isivhiwcb2xdupujlz1o/serena-hotel-colored-logo.svg?width=122&height=64" },
  { name: "TripAdvisor", logo: "https://static.tacdn.com/img2/brand_refresh_2025/logos/wordmark.svg" },
  { name: "Bonfire Adventures", logo: "https://storage.aerocrs.com/99/system/logo.png" },
  { name: "Kenya Railways", logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/Kenya_Railways_logo.png" },
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
