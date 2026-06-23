import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { Link } from 'react-router-dom';
import SEO from '../../components/layout/SEO';
import { ShoppingBag, CreditCard, ChevronRight, CheckCircle2, Truck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Bee from '../../components/ui/BeeIcon';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone number must be at least 7 digits'),
  address: z.string().min(5, 'Shipping address is too short'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(3, 'Provide a valid Postal/ZIP code'),
  country: z.string().min(2, 'Country is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be exactly 16 digits'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry format must be MM/YY'),
  cardCvc: z.string().regex(/^\d{3}$/, 'CVC must be exactly 3 digits'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    customer: string;
    total: number;
    email: string;
    address: string;
    items: typeof items;
  } | null>(null);

  const subtotal = getCartTotal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'United States',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    }
  });

  const onSubmitForm: SubmitHandler<CheckoutFormValues> = (data) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const orderId = `HV-${Math.floor(100000 + Math.random() * 900000)}`;
        setCreatedOrder({
          id: orderId,
          customer: `${data.firstName} ${data.lastName}`,
          total: subtotal,
          email: data.email,
          address: `${data.address}, ${data.city}, ${data.postalCode}, ${data.country}`,
          items: [...items],
        });
        setIsSubmitted(true);
        clearCart();
        resolve();
      }, 1000);
    });
  };

  if (isSubmitted && createdOrder) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white font-sans py-24 flex items-center justify-center">
        <SEO title="Order Confirmed!" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-xl w-full px-4"
        >
          <div className="rounded-3xl border border-neutral-900 bg-neutral-900/60 p-8 md:p-10 space-y-6 text-center backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />
            
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mx-auto">
              <CheckCircle2 className="h-8 w-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400">Thank you for your order!</span>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-white leading-tight">Order Confirmed!</h1>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                Our master beekeepers are hand-packing your raw artisanal honey jars with sustainable honeycomb paper wrap today.
              </p>
            </div>

            <div className="rounded-2xl bg-neutral-950 p-6 border border-neutral-850 text-left space-y-4">
              <div className="flex justify-between border-b border-neutral-900 pb-3 text-xs font-mono text-neutral-400">
                <span>Order ID</span>
                <span className="text-white font-bold">{createdOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-3 text-xs font-mono text-neutral-400">
                <span>Customer</span>
                <span className="text-white font-semibold">{createdOrder.customer}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-3 text-xs font-mono text-neutral-400">
                <span>Delivery Address</span>
                <span className="text-white text-right max-w-[200px] truncate">{createdOrder.address}</span>
              </div>

              <div className="space-y-2 pt-1">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-500 mb-2">Items Ordered</span>
                {createdOrder.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between text-xs">
                    <span className="text-neutral-300">
                      {it.product.name} <span className="text-neutral-500">x{it.quantity}</span>
                    </span>
                    <span className="font-mono text-white">${(it.product.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-900 pt-3 flex justify-between items-baseline text-sm font-bold text-white">
                <span>Invoice Total</span>
                <span className="font-mono text-base text-amber-400">${createdOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-amber-500/5 border border-amber-500/10 p-4 text-xs text-neutral-400 text-left leading-relaxed">
              <Truck className="h-5 w-5 shrink-0 text-amber-500" />
              <span>Shipped with carbon-neutral, eco-friendly logistic partners. Recyclable packaging. Incoming delivery estimation: 2–4 business days.</span>
            </div>

            <div className="pt-4">
              <Link
                to="/shop"
                onClick={() => {}}
                className="block w-full rounded-full bg-amber-500 py-3.5 text-center text-sm font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 transition-colors"
              >
                Keep Exploring Shop
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // If cart is empty overall
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-neutral-950 text-white font-sans">
        <SEO title="Checkout — Empty Jar" />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 mx-auto text-neutral-600 mb-6">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <h2 className="font-serif text-2xl font-bold mb-2">Your Cart is Empty!</h2>
        <p className="font-sans text-sm text-neutral-400 max-w-sm mb-8 leading-relaxed">
          Before you proceed to checkout, you must add some of our family-harvested raw linden or sunflower honeys to your order.
        </p>
        <Link
          to="/shop"
          className="rounded-full bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 transition-colors"
        >
          Browse Our Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans py-12">
      <SEO
        title="Eco-conscious Checkout"
        description="Verify your order, enter shipping details, and secure your premium natural honey jar delivery today."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-neutral-900 pb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Secure <span className="text-amber-400 font-serif italic">Checkout</span>
          </h1>
          <p className="font-sans text-xs text-neutral-400">
            All orders are wrapped in organic beehive honeycomb paper and shipped 100% plastic-free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8" id="checkout-order-form">
              
              <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6 md:p-8 backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-bold text-neutral-950">1</span>
                  <h2 className="font-serif text-lg font-bold">Customer Contact</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">First Name *</label>
                    <input
                      id="input-firstName"
                      type="text"
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="Diana"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.firstName.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Last Name *</label>
                    <input
                      id="input-lastName"
                      type="text"
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="Prince"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.lastName.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Email Mailbox *</label>
                    <input
                      id="input-email"
                      type="email"
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="diana@amazon.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.email.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Phone number *</label>
                    <input
                      id="input-phone"
                      type="tel"
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="+1 (800) 555-2337"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.phone.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6 md:p-8 backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-bold text-neutral-950">2</span>
                  <h2 className="font-serif text-lg font-bold">Shipping Logistics</h2>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Street Address *</label>
                  <input
                    id="input-address"
                    type="text"
                    className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                    placeholder="16 Blossom Honey Way"
                    {...register('address')}
                  />
                  {errors.address && (
                    <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.address.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">City *</label>
                    <input
                      id="input-city"
                      type="text"
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="Austin"
                      {...register('city')}
                    />
                    {errors.city && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.city.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Postal / ZIP Code *</label>
                    <input
                      id="input-postalCode"
                      type="text"
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="78701"
                      {...register('postalCode')}
                    />
                    {errors.postalCode && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.postalCode.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Country *</label>
                    <input
                      id="input-country"
                      type="text"
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="United States"
                      {...register('country')}
                    />
                    {errors.country && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.country.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6 md:p-8 backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-neutral-900 pb-4">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 font-mono text-xs font-bold text-neutral-950">3</span>
                  <h2 className="font-serif text-lg font-bold">Secure Settlement</h2>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Credit Card Number *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-4 flex items-center text-neutral-500">
                      <CreditCard className="h-4 w-4" />
                    </span>
                    <input
                      id="input-cardNumber"
                      type="text"
                      maxLength={16}
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 pl-11 pr-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="4000123456789010"
                      {...register('cardNumber')}
                    />
                  </div>
                  {errors.cardNumber && (
                    <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.cardNumber.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Expiry Date *</label>
                    <input
                      id="input-cardExpiry"
                      type="text"
                      maxLength={5}
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="12/28"
                      {...register('cardExpiry')}
                    />
                    {errors.cardExpiry && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.cardExpiry.message}</span>
                    )}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Security Code (CVC) *</label>
                    <input
                      id="input-cardCvc"
                      type="password"
                      maxLength={3}
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950 py-3 px-4 text-xs font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      placeholder="123"
                      {...register('cardCvc')}
                    />
                    {errors.cardCvc && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.cardCvc.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="place-order-submit-btn"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-amber-500 py-4 font-sans text-sm font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 disabled:opacity-40 transition-colors"
              >
                {isSubmitting ? (
                  <span>Harvesting Order Details...</span>
                ) : (
                  <>
                    <span>Place Order • ${subtotal.toFixed(2)}</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="rounded-2xl border border-neutral-900 bg-neutral-905 bg-neutral-900/40 p-6 md:p-8 backdrop-blur-sm space-y-6">
              <h2 className="font-serif text-lg font-bold border-b border-neutral-900 pb-4">Order Summary</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                {items.map((it) => (
                  <div key={it.product.id} className="flex gap-4 items-center">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-950 border border-neutral-800">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-bold text-white truncate">{it.product.name}</h4>
                      <p className="font-mono text-[9px] text-neutral-400">{it.product.weight} • Qty {it.quantity}</p>
                    </div>
                    <span className="font-mono text-xs text-white shrink-0 font-semibold">
                      ${(it.product.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-900 pt-6 space-y-3">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Product Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Sustainable Packaging</span>
                  <span className="font-mono text-amber-500 uppercase font-semibold text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Courier Eco-Express</span>
                  <span className="font-mono text-amber-500 uppercase font-semibold text-[10px]">Free</span>
                </div>
                <div className="border-t border-neutral-900 pt-4 flex justify-between items-baseline text-base font-bold text-white">
                  <span>Grand Total</span>
                  <span className="font-mono text-lg text-amber-400">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-900 bg-amber-500/5 p-6 flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Bee className="h-5 w-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xs font-bold text-white">The Swarm Pledge</h4>
                <p className="font-sans text-[11px] leading-relaxed text-neutral-400">
                  With every order placed, 5% of the net proceeds goes directly into wildflower seed scatter programs in traditional, unpolluted countryside beehive corridors.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
