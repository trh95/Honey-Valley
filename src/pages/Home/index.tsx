import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, testimonials } from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';
import TestimonialCard from '../../components/ui/TestimonialCard';
import SEO from '../../components/layout/SEO';
import { ArrowRight, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Bee from '../../components/ui/BeeIcon';

const beekeeperImg = "/src/assets/images/beekeeper_illustration_1781721031755.jpg";

const BEE_QUOTES = [
  { text: "Bee kind, bee brave, bee positive!", source: "Honey Valley Creed" },
  { text: "In the garden of life, surround yourself with flowers, light, and sweetness.", source: "Apiary Wisdom" },
  { text: "No bees, no honey; no work, no money. Keep buzzing in your own beautiful rhythm!", source: "Traditional Proverb" },
  { text: "A collective swarm can accomplish what no single bee could dream of.", source: "Colony Philosophy" },
  { text: "Sweetness is not found by rushing, but by lingering on the beautiful moments.", source: "Slow Living Guide" }
];

const BEE_FACTS = [
  "Honeybees perform a specialized 'Waggle Dance' to tell their sisters exactly where to find the sweetest blossoms!",
  "A single honeybee visits between 50 and 100 flowers during a single collection flight.",
  "Honey is the only food source created by insects that never spoils—it can last for thousands of years!",
  "To produce one pound of honey, hive bees fly over 55,000 miles and tap 2 million flowers.",
  "A honeybee beats its wings over 200 times per second, creating their signature soothing buzz!"
];

const BEE_COUPONS = [
  "You are un-bee-lievably awesome! Use code BEEPOSITIVE for 10% off your next purchase!",
  "Buzz! You've discovered an organic secret! Use code GOLDENVALLEY to get a free honey dipper!",
  "Sweet discovery! Save 15% on any organic liquid gold with code HONEYSMILE at checkout!"
];

const playSecretBuzz = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(140, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(170, ctx.currentTime + 0.12);
    osc1.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.25);
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(145, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(175, ctx.currentTime + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(115, ctx.currentTime + 0.25);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.25);
    osc2.stop(ctx.currentTime + 0.25);
  } catch (error) {
    console.warn("Audio Context blocked or not supported", error);
  }
};

export default function Home() {
  const [isWiggling, setIsWiggling] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverContent, setPopoverContent] = useState<{
    type: 'quote' | 'fact' | 'coupon';
    title: string;
    text: string;
    subText?: string;
  } | null>(null);
  const [particles, setParticles] = useState<{
    id: number;
    tx: number;
    ty: number;
    rotate: number;
    duration: number;
  }[]>([]);

  useEffect(() => {
    if (!showPopover) return;
    const timer = setTimeout(() => {
      setShowPopover(false);
    }, 13000);
    return () => clearTimeout(timer);
  }, [showPopover, popoverContent]);

  const handleBeeClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 800);

    playSecretBuzz();

    const newParticles = Array.from({ length: 7 }).map((_, idx) => {
      const angle = (Math.PI * 2 * idx) / 7 + (Math.random() * 0.4 - 0.2);
      const distance = 80 + Math.random() * 100;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 45;
      return {
        id: Date.now() + idx,
        tx,
        ty,
        rotate: Math.random() * 360 + 180,
        duration: 1.0 + Math.random() * 0.8,
      };
    });
    setParticles(prev => [...prev, ...newParticles]);

    const rand = Math.random();
    let selected;
    if (rand < 0.4) {
      const q = BEE_QUOTES[Math.floor(Math.random() * BEE_QUOTES.length)];
      selected = {
        type: 'quote' as const,
        title: 'Daily Buzz Quote',
        text: `"${q.text}"`,
        subText: q.source,
      };
    } else if (rand < 0.75) {
      const f = BEE_FACTS[Math.floor(Math.random() * BEE_FACTS.length)];
      selected = {
        type: 'fact' as const,
        title: 'Bee Wisdom & Facts',
        text: f,
        subText: 'Fascinating Beekeeping Trivia',
      };
    } else {
      const c = BEE_COUPONS[Math.floor(Math.random() * BEE_COUPONS.length)];
      selected = {
        type: 'coupon' as const,
        title: 'Golden Sweet Discount',
        text: c,
        subText: 'Secret Beekeeper Reward Code',
      };
    }
    setPopoverContent(selected);
    setShowPopover(true);
  };

  const featuredProducts = products.filter(p => 
    p.id === 'acacia-honey' || p.id === 'linden-honey' || p.id === 'forest-honey'
  );

  const whyChooseUs = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
      title: '100% Natural',
      description: 'Pure, raw, unfiltered honey containing all trace pollens, vitamins, and minerals without any thermal degradation or additives.'
    },
    {
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: 'Local Production',
      description: 'Harvested exclusively from pristine woodlands and organic flower valleys in traditional apiaries managed by hand.'
    },
    {
      icon: <Heart className="h-6 w-6 text-amber-500" />,
      title: 'Sustainable Beekeeping',
      description: 'We prioritize bee wellness, pesticide-free meadows, and circular ecosystem husbandry to support local honeybee populations.'
    }
  ];

  const floatingBees = [
    { top: '15%', left: '10%', delay: 0, scale: 0.9, duration: 6 },
    { top: '30%', left: '85%', delay: 1.5, scale: 0.7, duration: 8 },
    { top: '75%', left: '25%', delay: 2.2, scale: 0.8, duration: 7 },
    { top: '60%', left: '70%', delay: 0.7, scale: 1.1, duration: 6.5 },
  ];

  const handleLearnMoreScroll = () => {
    const section = document.getElementById('why-choose-us-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-x-hidden">
      <SEO
        title="Pure Organic Artisanal Honey"
        description="Welcome to Honey Valley. Savor ancient, local, pure, unfiltered, 100% natural organic honeys. sustainable apiaries. Bee Positive."
      />

      <section className="relative min-h-[calc(100vh-80px)] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 border-b border-neutral-900 overflow-hidden">
        
        <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-amber-600/5 blur-[120px]" />

        {floatingBees.map((bee, idx) => (
          <motion.div
            key={idx}
            className="absolute z-10 text-amber-400 pointer-events-none opacity-40"
            style={{ top: bee.top, left: bee.left }}
            animate={{
              y: [0, -25, 10, -15, 0],
              x: [0, 15, -10, 20, 0],
              rotate: [0, 8, -6, 5, 0],
            }}
            transition={{
              duration: bee.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: bee.delay,
            }}
          >
            <div style={{ transform: `scale(${bee.scale})` }}>
              <Bee className="h-5 w-5" />
            </div>
          </motion.div>
        ))}

        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-amber-400">
              <Sparkles className="h-3 w-3 animate-spin duration-1000" />
              <span>Premium Artisan Beekeeping</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Bee <span className="text-amber-400 font-serif italic text-glow">Positive.</span>
            </h1>

            <p className="max-w-lg font-sans text-base sm:text-lg text-neutral-400 leading-relaxed">
              Honey Valley is a family-owned beekeeping company harvesting 100% natural, raw, and pure liquid gold directly from local unpolluted flower fields. Discover the taste of organic honeycombs crafted with environmental sustainability at heart.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                to="/shop"
                id="hero-shop-cta"
                className="group flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 transition-all duration-300"
              >
                <span>Shop Honey</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                id="hero-learn-cta"
                onClick={handleLearnMoreScroll}
                className="rounded-full border border-neutral-800 bg-neutral-900/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-neutral-900 hover:border-neutral-700 transition-colors"
              >
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="absolute inset-0 -m-4 rounded-3xl bg-amber-500/5 blur-2xl" />

            <div className="relative max-w-md w-full transition-transform duration-500 skew-y-1 hover:skew-y-0">
              
              <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-3 shadow-2xl">
                <img
                  src={beekeeperImg}
                  alt="Honey Valley Beekeeper working sustainably with hives"
                  referrerPolicy="no-referrer"
                  className="h-full w-full rounded-2xl object-cover"
                />

                <motion.button
                  onClick={handleBeeClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group absolute bottom-0 left-0 z-20 flex h-16 w-16 items-center justify-center rounded-none rounded-tr-3xl bg-[#0a0a0c] border-t border-r border-neutral-800 shadow-xl p-3.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  title="Click for some apiary inspiration!"
                >
                  <motion.div
                    animate={isWiggling ? { 
                      rotate: [0, -20, 360, 20, 0],
                      scale: [1, 1.25, 0.85, 1.15, 1],
                      y: [0, -10, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex items-center justify-center animate-bounce duration-1000"
                  >
                    <Bee className="h-8 w-8 text-amber-500 group-hover:text-amber-400 transition-colors" />
                  </motion.div>
                  
                  <span className="absolute top-2 right-2 flex h-2 w-2 border-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </motion.button>
              </div>
              
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute bottom-10 left-10 pointer-events-none text-amber-400 z-50"
                  initial={{ opacity: 1, scale: 0.4, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: [1, 1, 0],
                    scale: [0.4, 0.9, 0],
                    x: p.tx,
                    y: p.ty,
                    rotate: p.rotate,
                  }}
                  transition={{
                    duration: p.duration,
                    ease: "easeOut",
                  }}
                  onAnimationComplete={() => {
                    setParticles(prev => prev.filter(item => item.id !== p.id));
                  }}
                >
                  <Bee className="h-5 w-5" />
                </motion.div>
              ))}

              {showPopover && popoverContent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute bottom-20 left-0 sm:-left-4 z-40 w-72 p-4 bg-neutral-950/95 border border-amber-500/30 rounded-2xl shadow-[0_10px_40px_rgba(245,158,11,0.25)] backdrop-blur-md"
                >
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      <span className="animate-pulse text-amber-500">●</span> {popoverContent.title}
                    </span>
                    <button
                      onClick={() => setShowPopover(false)}
                      className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      title="Clear message"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="font-sans text-xs text-neutral-200 leading-relaxed font-medium">
                    {popoverContent.text}
                  </p>
                  {popoverContent.subText && (
                    <p className="font-mono text-[9px] text-amber-500/70 mt-2 text-right">
                      {popoverContent.subText}
                    </p>
                  )}
                  <div className="absolute -bottom-2.5 left-8 w-5 h-5 bg-neutral-950 border-r border-b border-amber-500/30 rotate-45" />
                </motion.div>
              )}

            </div>
          </motion.div>

        </div>
      </section>

      <section id="why-choose-us-section" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">Pure Production Values</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">Why Choose Honey Valley</h2>
          <p className="font-sans text-sm text-neutral-400 leading-relaxed">
            Our apiary structures are managed organically, giving you honey that is raw, rich in natural enzymes, and delicious.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex flex-col items-start rounded-2xl border border-neutral-900 bg-neutral-900/20 p-8 hover:border-amber-500/30 transition-colors"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                {card.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-3">{card.title}</h3>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500">The Apiary Selects</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">Featured Honey Varieties</h2>
            <p className="font-sans text-sm text-neutral-400">
              Hand-harvested, cold-pressed raw monofloral and polyfloral creations.
            </p>
          </div>
          <Link
            to="/shop"
            id="featured-browse-all"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-6 py-3 font-mono text-xs uppercase tracking-wider text-amber-400 hover:border-amber-400 transition-colors"
          >
            <span>View All Shop</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">Real Reviews</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">Customer Testimonials</h2>
          <p className="font-sans text-sm text-neutral-400">
            Hear from culinary experts, tea enthusiasts, and families who love our pure honey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-neutral-900 bg-neutral-900/30 px-8 py-12 md:py-16 text-center space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
          
          <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 border border-amber-500/20 bg-amber-500/5 rounded-full px-3 py-1">
            Family Beekeeper Core Values
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white max-w-md mx-auto">
            Ready to taste the absolute finest raw organic honey?
          </h2>
          <p className="font-sans text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
            All jars are shipped in robust, recyclable eco-friendly honeycomb paper. Experience pure local honey direct from the swarm.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/shop"
              id="newsletter-shop-cta"
              className="rounded-full bg-amber-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 transition-colors"
            >
              Shop Honey Valley Selection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
