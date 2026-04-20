import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { dailyProducts, premiumProducts, luxuryProducts } from '../../data/mockProducts';

const collections = [
  {
    id: 'daily',
    label: 'Daily Signatures',
    price: '₹ 399',
    ml: '30ml',
    tagline: 'Everyday luxury for everyone.',
    description:
      'Eight beautifully crafted fragrances built for daily wear. Fresh, clean, and endlessly versatile — premium quality at an accessible price.',
    href: '/shop?collection=daily',
    count: dailyProducts.length,
    gradient: 'linear-gradient(135deg, #06100c 0%, #0c1e18 50%, #060e0a 100%)',
    accentColor: 'rgba(80,180,140,0.15)',
    borderHover: 'rgba(80,180,140,0.25)',
    tagColor: '#6ecfaa',
    number: '01',
  },
  {
    id: 'premium',
    label: 'Premium Collection',
    price: '₹ 499',
    ml: '30ml',
    tagline: 'Aspirational. Iconic. Signature.',
    description:
      'Nineteen inspired versions of the world\'s most celebrated luxury fragrances. Crafted for those who appreciate the finer things in life.',
    href: '/shop?collection=premium',
    count: premiumProducts.length,
    gradient: 'linear-gradient(135deg, #0c0818 0%, #18103a 50%, #08061a 100%)',
    accentColor: 'rgba(130,90,220,0.15)',
    borderHover: 'rgba(130,90,220,0.25)',
    tagColor: '#a070e8',
    number: '02',
  },
  {
    id: 'luxury',
    label: 'Luxury Niche',
    price: '₹ 599',
    ml: '30ml',
    tagline: 'Rare. Opulent. Unforgettable.',
    description:
      'Eight extraordinary niche and Arabic fragrances from the upper echelon of perfumery. For those who demand the absolute best.',
    href: '/shop?collection=luxury',
    count: luxuryProducts.length,
    gradient: 'linear-gradient(135deg, #100a00 0%, #241800 50%, #0e0800 100%)',
    accentColor: 'rgba(201,168,76,0.15)',
    borderHover: 'rgba(201,168,76,0.25)',
    tagColor: '#C9A84C',
    number: '03',
  },
];

export const CategoryBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 px-6" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="divider-gold w-12" />
            <span className="text-xs font-medium tracking-[0.4em] uppercase" style={{ color: 'var(--color-gold)' }}>
              Three Tiers of Excellence
            </span>
            <div className="divider-gold w-12" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-light mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
          >
            Our Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm max-w-lg mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            From everyday favourites to rare niche masterpieces — every fragrance is priced to make luxury accessible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 + 0.2 }}
            >
              <Link to={col.href} className="group block relative overflow-hidden rounded-2xl h-full">
                {/* Background */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: col.gradient }}
                />

                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 60%, ${col.accentColor}, transparent 70%)` }}
                />

                {/* Border */}
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-500"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  ref={(el) => {
                    if (el) {
                      el.addEventListener('mouseenter', () => {
                        el.style.borderColor = col.borderHover;
                      });
                      el.addEventListener('mouseleave', () => {
                        el.style.borderColor = 'rgba(255,255,255,0.06)';
                      });
                    }
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full min-h-[340px]">
                  {/* Number + price row */}
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-5xl font-light opacity-15"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
                    >
                      {col.number}
                    </span>
                    <div className="text-right">
                      <div
                        className="text-2xl font-light"
                        style={{ fontFamily: 'var(--font-display)', color: col.tagColor }}
                      >
                        {col.price}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        {col.ml} each
                      </div>
                    </div>
                  </div>

                  {/* Count badge */}
                  <div className="mb-3">
                    <span
                      className="text-[10px] font-semibold tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${col.accentColor}`,
                        color: col.tagColor,
                        border: `1px solid ${col.borderHover}`,
                      }}
                    >
                      {col.count} Fragrances
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="text-3xl font-light mb-2 leading-tight transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
                  >
                    {col.label}
                  </h3>

                  {/* Tagline */}
                  <p
                    className="text-sm italic mb-4"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream-muted)' }}
                  >
                    {col.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {col.description}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-3 mt-8 pt-5 transition-all duration-300 group-hover:gap-5"
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      color: col.tagColor,
                    }}
                  >
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                      Shop Collection
                    </span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
