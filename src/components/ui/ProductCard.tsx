import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductCard({ product }: { product: Product; key?: any }) {
  const { addItem } = useCartStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const renderTitle = (name: string) => {
    const parts = name.split(/\s+/);
    if (parts.length > 1 && parts[parts.length - 1].toLowerCase() === 'honey') {
      const mainName = parts.slice(0, -1).join(' ');
      const honeyWord = parts[parts.length - 1].toLowerCase();
      return (
        <span className="font-serif text-xl font-medium tracking-tight text-white leading-tight">
          {mainName}{' '}
          <span className="italic text-amber-500/90 font-serif lowercase block sm:inline mt-0.5 sm:mt-0">
            {honeyWord}
          </span>
        </span>
      );
    }
    return <span className="font-serif text-xl font-medium tracking-tight text-white leading-tight">{name}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-neutral-800/80 bg-[#121214]/40 shadow-xl backdrop-blur-md transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_20px_40px_rgba(245,158,11,0.08)]"
    >
      <Link to={`/products/${product.id}`} className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.08)_0%,_transparent_75%)] transition-opacity duration-500 group-hover:opacity-100" />
        
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        <span className="absolute top-4 left-4 z-10 rounded-full bg-neutral-950/90 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-amber-500/90 border border-neutral-900 shadow-md">
          {product.category}
        </span>

        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-neutral-950 shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="h-5 w-5" />
          </span>
        </div>

        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/80 z-20">
            <span className="rounded-lg bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-500 border border-red-500/20">
              Sold Out
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8 text-[#121214] fill-current">
            <path d="M0,0 C300,55 900,55 1200,0 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 bg-[#121214]">
        <h3 className="mb-2">
          <Link to={`/products/${product.id}`} className="hover:text-amber-400 transition-colors duration-200">
            {renderTitle(product.name)}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-neutral-200 font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-neutral-500">({product.reviewsCount})</span>
          </div>
          <span className="text-neutral-800">•</span>
          <span className="text-neutral-400 font-medium">{product.weight}</span>
        </div>

        <p className="font-sans text-xs text-neutral-400 leading-relaxed line-clamp-2 mt-3 mb-5">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-900">
          <span className="font-serif text-lg font-bold text-white tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          
          {product.stock > 0 ? (
            <button
              id={`add-to-cart-${product.id}`}
              onClick={handleAdd}
              className="rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2 font-mono text-[9px] font-semibold tracking-widest text-neutral-300 uppercase hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/5 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            >
              ADD TO CART
            </button>
          ) : (
            <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase py-2">Out of Stock</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
