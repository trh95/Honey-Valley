import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { products } from '../../data/products';
import { useCartStore } from '../../store/useCartStore';
import ProductCard from '../../components/ui/ProductCard';
import SEO from '../../components/layout/SEO';
import { Star, ShieldAlert, CheckCircle, Scale, CalendarDays, Map, Minus, Plus, ShoppingCart, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'process' | 'benefits'>('details');

  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-neutral-950 text-white">
        <SEO title="Product Not Found" />
        <Scale className="h-16 w-16 text-neutral-600 mb-6" />
        <h2 className="font-serif text-2xl font-bold mb-2">Honey Not Found</h2>
        <p className="font-sans text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
          The requested honey jar ID does not exist in our hives. Click below to view all available selections.
        </p>
        <Link
          to="/shop"
          className="rounded-full bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.id !== product.id)
      .slice(0, 3);
  }, [product.id]);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    const maxStock = product.stock || 99;
    setQuantity((prev) => Math.min(maxStock, prev + 1));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans py-12">
      <SEO
        title={`${product.name} — Premium Honey`}
        description={product.description}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400 hover:text-amber-400 transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Honey Catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent z-10 pointer-events-none" />
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full aspect-square object-cover transition-transform duration-75"
            />
            
            <div className="absolute top-6 left-6 z-20">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  In Stock ({product.stock} left)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-red-400">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Out of stock
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  {product.category}
                </span>
                <span className="text-neutral-500 text-xs font-mono">•</span>
                <span className="text-neutral-400 text-xs font-mono">{product.weight} Glass Jar</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-405 text-amber-500 fill-amber-500' : 'text-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-mono text-neutral-300">
                  {product.rating} <span className="text-neutral-500">({product.reviewsCount} customer reviews)</span>
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 py-4 border-y border-neutral-900">
              <span className="font-sans text-3xl font-extrabold text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="font-sans text-sm text-neutral-400 select-none">Free eco-conscious shipping included</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 space-y-1">
                <Map className="h-4 w-4 text-amber-500" />
                <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-500">Origin</span>
                <span className="block font-sans text-xs font-semibold text-white truncate">{product.origin}</span>
              </div>
              <div className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 space-y-1">
                <CalendarDays className="h-4 w-4 text-amber-500" />
                <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-500">Harvested</span>
                <span className="block font-sans text-xs font-semibold text-white truncate">{product.harvestSeason}</span>
              </div>
              <div className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 space-y-1">
                <Scale className="h-4 w-4 text-amber-500" />
                <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-500">Eco-Weight</span>
                <span className="block font-sans text-xs font-semibold text-white truncate">{product.weight} Net</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex border-b border-neutral-900 text-sm font-semibold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-3 pr-6 border-b-2 transition-all duration-300 ${
                    activeTab === 'details' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('process')}
                  className={`pb-3 px-6 border-b-2 transition-all duration-300 ${
                    activeTab === 'process' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Beekeeping
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-3 pl-6 border-b-2 transition-all duration-300 ${
                    activeTab === 'benefits' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Benefits
                </button>
              </div>

              <div className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed min-h-[80px]">
                {activeTab === 'details' && (
                  <p>{product.longDescription}</p>
                )}
                {activeTab === 'process' && (
                  <p>Our raw {product.name} is harvested under strict family organic directives in {product.origin}. We inspect hive vitality manually, filter out pure comb wax elements using gravity sieve filtration, and bottle each item by hand directly on the homestead, preserving critical raw yeast structures and minerals.</p>
                )}
                {activeTab === 'benefits' && (
                  <p>As a 100% pure raw product, our {product.name} is a vital source of antioxidants, organic digestive enzymes, and local flower pollens. Ideal as a wellness tonic with honey dippers, organic immune supplement, or high-fructose natural culinary component.</p>
                )}
              </div>
            </div>

            {product.stock > 0 ? (
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-900">
                <div className="flex items-center justify-between border border-neutral-850 bg-neutral-900 rounded-full py-3 px-4 sm:w-36 shrink-0">
                  <button
                    onClick={handleDecrease}
                    className="text-neutral-400 hover:text-white pb-0.5"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-mono text-sm font-bold text-white text-center w-8 select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    disabled={quantity >= (product.stock || 99)}
                    className="text-neutral-400 hover:text-white disabled:opacity-20 pb-0.5"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  id="product-details-add-to-cart"
                  onClick={handleAddToCart}
                  className="group flex-1 flex items-center justify-center gap-3 rounded-full bg-amber-500 py-4 font-sans text-sm font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add To Golden Jar</span>
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-4 text-xs text-red-400 text-center leading-relaxed">
                We are temporarily sold out of this exact single-origin summer batch. Sign up to our swarm updates on the home screen to be alerted when our bees finish the incoming season harvest!
              </div>
            )}
          </div>

        </div>

        <section className="border-t border-neutral-900 pt-24">
          <div className="mb-12 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500">The Swarm Recommends</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Related Honey Varieties</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
