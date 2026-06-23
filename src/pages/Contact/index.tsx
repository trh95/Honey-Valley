import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { faqs } from '../../data/products';
import SEO from '../../components/layout/SEO';
import { Mail, Phone, MapPin, Clock, MessageSquare, ChevronDown, CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Bee from '../../components/ui/BeeIcon';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please use a valid email address'),
  subject: z.string().min(3, 'Subject is too short'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched',
  });

  const onSubmitContact: SubmitHandler<ContactFormValues> = (data) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setSuccessMessage(true);
        reset();
        resolve();
        setTimeout(() => setSuccessMessage(false), 5000);
      }, 1000);
    });
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans py-12">
      <SEO
        title="Contact Us & FAQ"
        description="Write to our beekeeping family, locate the Honey Valley homestead, and read raw organic honey FAQs."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500">Get in Touch</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Contact & <span className="text-amber-400 font-serif italic">FAQ</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-neutral-400">
            Have questions about crystallisation, colony shipping, or bulk order rates? Our honey homestead door is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          <div className="lg:col-span-4 space-y-6">
            
            <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6 md:p-8 space-y-6 backdrop-blur-sm">
              <h2 className="font-serif text-lg font-bold border-b border-neutral-900 pb-3">The Homestead</h2>
              
              <ul className="space-y-6 text-xs sm:text-sm">
                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <MapPin className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block font-sans font-bold text-white mb-1">Our Location</span>
                    <span className="text-neutral-400 leading-relaxed font-sans">
                      12 Hive Blossom Lane,<br />
                      Golden Valley Orchard, GV24 9BE
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block font-sans font-bold text-white mb-1">Call Us</span>
                    <a href="tel:+18005552337" className="text-neutral-400 hover:text-amber-400 transition-colors inline-block pt-0.5 font-mono">
                      +1 (800) 555-2337
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block font-sans font-bold text-white mb-1">Write Mail</span>
                    <a href="mailto:hello@honeyvalley.com" className="text-neutral-400 hover:text-amber-400 transition-colors inline-block pt-0.5 font-mono">
                      hello@honeyvalley.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Clock className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block font-sans font-bold text-white mb-1">Homestead Hours</span>
                    <span className="text-neutral-400 font-sans leading-relaxed text-xs">
                      Mon – Fri: 8:00 AM – 5:00 PM<br />
                      Sat: 9:00 AM – 2:00 PM<br />
                      Sun: Closed for Hive Rest
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-900 bg-amber-500/5 p-6 space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-amber-500 font-bold block">Purity Guaranteed</span>
              <p className="font-sans text-xs leading-relaxed text-neutral-400">
                All inquiries are answered personally by our apiary managers (and occasional honey tasting suggestions are guaranteed!).
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 rounded-2xl border border-neutral-900 bg-neutral-900/40 p-6 md:p-8 backdrop-blur-sm relative">
            
            <div className="flex items-center gap-3 border-b border-neutral-900 pb-4 mb-6">
              <MessageSquare className="h-5 w-5 text-amber-500" />
              <h2 className="font-serif text-lg font-bold">Send Message</h2>
            </div>

            <AnimatePresence mode="wait">
              {successMessage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-8 text-center space-y-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto">
                    <CheckCircle2 className="h-6 w-6 animate-pulse" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white">Message Scented & Sent!</h3>
                  <p className="font-sans text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Thank you! We received your message and our apiary family will read and respond within 24 hours. Keep pollinating!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmitContact)} className="space-y-6" id="contact-homestead-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Your Name *</label>
                      <input
                        id="contact-input-name"
                        type="text"
                        placeholder="Bruce Wayne"
                        className="w-full rounded-xl border border-neutral-850 bg-neutral-950/80 py-3 px-4 text-xs font-sans font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                        {...register('name')}
                      />
                      {errors.name && (
                        <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.name.message}</span>
                      )}
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Email Mailbox *</label>
                      <input
                        id="contact-input-email"
                        type="email"
                        placeholder="bruce@waynecorp.com"
                        className="w-full rounded-xl border border-neutral-850 bg-neutral-950/80 py-3 px-4 text-xs font-sans font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                        {...register('email')}
                      />
                      {errors.email && (
                        <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Message Subject *</label>
                    <input
                      id="contact-input-subject"
                      type="text"
                      placeholder="About Wholesale Canola Honey crystallisation rates..."
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950/80 py-3 px-4 text-xs font-sans font-medium text-white transition-colors focus:border-amber-500 focus:outline-none"
                      {...register('subject')}
                    />
                    {errors.subject && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.subject.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-2 font-semibold">Message Body *</label>
                    <textarea
                      id="contact-input-message"
                      rows={5}
                      placeholder="Hi Honey Valley family, I wanted to inquire about your winter honeycomb collection protocols..."
                      className="w-full rounded-xl border border-neutral-850 bg-neutral-950/80 py-3 px-4 text-xs font-sans font-medium text-white transition-colors focus:border-amber-500 focus:outline-none resize-none"
                      {...register('message')}
                    ></textarea>
                    {errors.message && (
                      <span className="text-red-400 font-mono text-[10px] block mt-1">{errors.message.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-neutral-950 hover:bg-amber-400 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{isSubmitting ? 'Sending Scented Carrier Bee...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

        <section className="mb-24">
          <div className="mb-8 space-y-2 text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500">Find Us</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Our Apiary Foothills</h2>
          </div>

          <div className="relative h-[320px] rounded-3xl overflow-hidden border border-neutral-900 bg-[#161616] flex items-center justify-center group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />
            
            <div className="absolute top-[30%] left-0 w-[60%] h-1 bg-amber-500/20 rounded-full" />
            <div className="absolute top-[30%] left-[60%] w-[30%] h-1 bg-amber-500/20 rounded-full rotate-45" />
            <div className="absolute bottom-[20%] left-0 w-full h-1 bg-amber-500/10 rounded-full" />
            
            <div className="absolute top-[10%] left-[20%] h-24 w-36 rounded-full bg-amber-500/5 blur-2xl" />
            <div className="absolute bottom-[10%] right-[10%] h-32 w-48 rounded-full bg-amber-400/5 blur-3xl" />

            <p className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-widest text-neutral-500 select-none">
              Map Scale: 1 unit / 120 bee flying meters
            </p>

            <div id="homestead-map-marker" className="relative z-10 flex flex-col items-center gap-2 transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-neutral-950 border-4 border-neutral-950 shadow-2xl animate-bounce">
                <Bee className="h-6 w-6" />
              </div>
              <div className="rounded-lg bg-neutral-955 bg-neutral-900 border border-neutral-800 px-4 py-2 text-xs font-bold text-white shadow-xl text-center">
                <span className="block text-[11px] text-amber-400 font-serif italic">Honey Valley Homestead</span>
                <span className="block text-[9px] font-mono font-medium text-neutral-400 mt-0.5">Visitations welcome Sat afternoons</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto border-t border-neutral-900 pt-24">
          <div className="text-center mb-12 space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500">Frequently Answered</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Common Inquiries</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-900 bg-neutral-900/20 overflow-hidden"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-neutral-900/40"
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-neutral-200">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-amber-500 shrink-0 transition-transform duration-300 ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-neutral-900/40 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
