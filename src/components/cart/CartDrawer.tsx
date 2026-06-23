import { useCartStore } from '../../store/useCartStore';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useRef, useEffect } from 'react';

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setDrawerOpen,
    updateQuantity,
    removeItem,
    getCartTotal
  } = useCartStore();

  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setDrawerOpen(false);
      }
    };

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscPress);

    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscPress);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, setDrawerOpen]);

  const subtotal = getCartTotal();

  const handleCheckoutClick = () => {
    setDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-neutral-950 backdrop-blur-sm"
          />

          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 z-50 h-[100dvh] w-full max-w-md border-l border-neutral-800 bg-neutral-950 p-0 text-white shadow-2xl flex flex-col focus:outline-none"
            id="shopping-cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart Drawer"
          >
            <div className="flex h-20 items-center justify-between border-b border-neutral-800 px-6 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-500" />
                <h2 className="font-serif text-lg font-bold">Your Golden Jar</h2>
                <span className="rounded-full bg-neutral-900 border border-neutral-800 px-2 py-0.5 font-mono text-xs text-amber-400">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                id="close-cart-drawer"
                onClick={() => setDrawerOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-amber-400 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex h-full flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
                      <ShoppingBag className="h-6 w-6 text-neutral-600" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-white mb-1">Your jar is empty!</h3>
                      <p className="font-sans text-xs text-neutral-400 max-w-[240px] leading-relaxed">
                        Pour some of our family-harvested liquid gold into your jar today.
                      </p>
                    </div>
                    <Link
                      to="/shop"
                      onClick={() => setDrawerOpen(false)}
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-950 hover:bg-amber-400"
                    >
                      Browse Honeys
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 rounded-xl border border-neutral-900 bg-neutral-900/40 p-3.5 relative"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-950 border border-neutral-800">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif text-sm font-bold text-white line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              id={`remove-item-${item.product.id}`}
                              onClick={() => removeItem(item.product.id)}
                              className="text-neutral-500 hover:text-red-400 transition-colors p-0.5"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-mono text-[10px] text-amber-500/80 mb-2">
                            {item.product.weight} • {item.product.category}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-neutral-800 bg-neutral-950 rounded-full h-8 px-1">
                            <button
                              id={`decrease-qty-${item.product.id}`}
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="h-6 w-6 flex items-center justify-center text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-mono text-xs font-bold px-3 text-center min-w-[24px]">
                              {item.quantity}
                            </span>
                            <button
                              id={`increase-qty-${item.product.id}`}
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= (item.product.stock || 99)}
                              className="h-6 w-6 flex items-center justify-center text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-sans text-sm font-bold text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="border-t border-neutral-800 bg-neutral-950 p-6 space-y-4 shrink-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>Eco Shipping</span>
                    <span className="font-mono text-amber-500 uppercase text-xs font-semibold tracking-wider">Free</span>
                  </div>
                  <div className="border-t border-neutral-900 pt-3 flex justify-between text-base font-bold text-white">
                    <span>Estimated Total</span>
                    <span className="font-mono text-lg text-amber-400">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="checkout-drawer-btn"
                    onClick={handleCheckoutClick}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 py-3.5 text-center text-sm font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    id="continue-shopping"
                    onClick={() => setDrawerOpen(false)}
                    className="mt-3 block w-full text-center text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
