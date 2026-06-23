import { Testimonial } from '../../types';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial; key?: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-8 backdrop-blur-sm"
    >
      <div className="absolute top-6 right-6 text-neutral-800 pointer-events-none">
        <Quote className="h-10 w-10 rotate-180 opacity-40 text-amber-500/10" />
      </div>

      <div>
        <div className="flex items-center gap-1 text-amber-400 mb-5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-500" />
          ))}
        </div>

        <blockquote className="font-sans text-sm text-neutral-300 leading-relaxed italic mb-8">
          "{testimonial.text}"
        </blockquote>
      </div>

      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-neutral-800">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          referrerPolicy="no-referrer"
          className="h-11 w-11 rounded-full object-cover border border-amber-500/40"
        />
        <div>
          <h4 className="font-serif text-sm font-bold text-white leading-tight">
            {testimonial.name}
          </h4>
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
