import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Bee from '../ui/BeeIcon';

export default function Header() {
  const { getCartItemsCount, setDrawerOpen } = useCartStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = getCartItemsCount();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Honey', path: '/shop' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
         
        <Link to="/" id="brand-logo" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-neutral-950 transition-transform duration-300 group-hover:scale-110">
            <Bee className="h-6 w-6 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              Honey <span className="text-amber-400">Valley</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500/80">
              Bee Positive.
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`relative py-2 font-sans text-sm font-medium transition-colors hover:text-amber-400 ${
                isActive(link.path) ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-amber-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          
          <button
            id="cart-trigger-btn"
            onClick={() => setDrawerOpen(true)}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-white transition-all duration-300 hover:border-amber-500 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Open shopping cart"
          >
            <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-amber-400" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-neutral-950 ring-2 ring-neutral-950"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link
            to="/shop"
            id="header-cta-shop"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-950 transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            Order Now
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-white hover:bg-neutral-900 md:hidden"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-neutral-800 bg-neutral-950 md:hidden overflow-hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-neutral-900 text-amber-400 font-semibold'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-neutral-800 pt-4 mt-4">
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-amber-500 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-neutral-950 hover:bg-amber-400"
                >
                  Shop Best-Sellers
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
