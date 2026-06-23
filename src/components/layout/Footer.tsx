import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Bee from '../ui/BeeIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-neutral-950">
                <Bee className="h-5 w-5" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white">
                Honey <span className="text-amber-400">Valley</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-neutral-400 leading-relaxed">
              Family-owned beekeepers producing premium, 100% pure and raw artisanal honey harvested with love from our local flower fields, forests, and valleys.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-amber-400 hover:text-amber-400 transition-colors"
                aria-label="Facebook link"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-amber-400 hover:text-amber-400 transition-colors"
                aria-label="Instagram link"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-amber-400 hover:text-amber-400 transition-colors"
                aria-label="Twitter link"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-6">Explore</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-amber-400 transition-colors">Shop All Products</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact & FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-6">Our Varieties</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/shop?sort=name-asc" className="hover:text-amber-400 transition-colors">Monofloral Selection</Link>
              </li>
              <li>
                <Link to="/shop?sort=name-asc" className="hover:text-amber-400 transition-colors">Forest Honeys</Link>
              </li>
              <li>
                <Link to="/shop?sort=name-asc" className="hover:text-amber-400 transition-colors">Specialty Creamed Spread</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-white mb-6">Address & Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-amber-500" />
                <span className="text-neutral-400">
                  12 Hive Blossom Lane,<br />
                  Golden Valley Orchard, GV24 9BE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-500" />
                <a href="tel:+18005552337" className="hover:text-amber-400 transition-colors">+1 (800) 555-2337</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-500" />
                <a href="mailto:hello@honeyvalley.com" className="hover:text-amber-400 transition-colors">hello@honeyvalley.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {currentYear} Honey Valley Company. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <span className="text-amber-500/80">"Bee Positive."</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
