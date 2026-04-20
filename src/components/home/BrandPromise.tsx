import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Droplets, Clock, Award, Truck } from 'lucide-react';

const promises = [
  {
    Icon: Award,
    title: 'Premium Quality',
    description:
      'Every fragrance is crafted using the same premium-grade aromatic compounds found in the finest luxury perfumes. No compromise, ever.',
  },
  {
    Icon: Droplets,
    title: 'Long-Lasting Wear',
    description:
      'Our concentrated formulas are designed for longevity — expect 8 to 16 hours of confident, full-bodied projection.',
  },
  {
    Icon: Clock,
    title: 'True to the Original',
    description:
      "Each bottle is the result of meticulous sourcing and blending — a faithful olfactory tribute to the world's greatest fragrances.",
  },
  {
    Icon: Truck,
    title: 'Delivered to You',
    description:
      'Fast, secure delivery across India. Every order is packaged with care to ensure your fragrance arrives in perfect condition.',
  },
];

export const BrandPromise = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-elevated)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)', opacity: 0.3 }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)', opacity: 0.3 }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-5"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <div className="divider-gold w-12" />
            <span className="text-xs font-medium tracking-[0.4em] uppercase" style={{ color: 'var(--color-gold)' }}>
              The Attire Standard
            </span>
            <div className="divider-gold w-12" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-light max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
          >
            Luxury Without Compromise
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 + 0.2 }}
              className="group text-center p-8 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-subtle)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.25)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(201,168,76,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border-subtle)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300 group-hover:bg-[rgba(201,168,76,0.15)]"
                style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <Icon size={22} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h3
                className="text-xl font-light mb-3"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
