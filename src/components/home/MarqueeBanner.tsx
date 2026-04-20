import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const marqueeItems = [
  'Daily Signatures', '·', 'Premium Collection', '·', 'Luxury Niche', '·',
  'For Him', '·', 'For Her', '·', 'Unisex', '·',
  'Long-Lasting', '·', 'Premium Ingredients', '·', 'Made in India', '·',
  'Starting at ₹ 399', '·', 'Free Delivery 3000+', '·',
];

export const MarqueeBanner = () => {
  const doubled = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      className="py-4 overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-gold)' }}
    >
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{
              color: item === '·' ? 'rgba(13,13,15,0.3)' : 'var(--color-bg-primary)',
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const CTABanner = () => {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-15"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="divider-gold w-8 sm:w-16 hidden sm:block" />
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.4em] uppercase" style={{ color: 'var(--color-gold)' }}>
            Your Signature Awaits
          </span>
          <div className="divider-gold w-8 sm:w-16 hidden sm:block" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-light leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
        >
          35 Fragrances.{' '}
          <span className="text-gold-gradient italic">Three Collections.</span>{' '}
          One Destination.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg font-light max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-cream-muted)' }}
        >
          From everyday essentials to rare niche masterpieces — every fragrance is crafted with premium ingredients and priced to make luxury accessible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm font-medium tracking-[0.15em] uppercase transition-all duration-500"
            style={{
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-bg-primary)',
              boxShadow: '0 0 40px rgba(201,168,76,0.3)',
            }}
          >
            Explore the Full Collection
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
