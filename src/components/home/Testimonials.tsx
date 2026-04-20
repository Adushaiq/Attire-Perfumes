import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Bilal Raza',
    location: 'Mumbai',
    rating: 5,
    text: "I purchased Most Wanted Forever Elixir from the Premium Collection and the compliments have not stopped. The longevity is insane — easily 10+ hours. Attire Perfumes has a customer for life.",
    fragrance: 'Most Wanted Forever Elixir',
  },
  {
    id: 2,
    name: 'Fatima Qureshi',
    location: 'New Delhi',
    rating: 5,
    text: "Black Opium is absolutely stunning. I sprayed it in the morning and was still getting compliments at dinner. The packaging is gorgeous too. Better than I expected for a 499 perfume.",
    fragrance: 'Black Opium',
  },
  {
    id: 3,
    name: 'Ahmed Malik',
    location: 'Bengaluru',
    rating: 5,
    text: "Omber Nomade from the Luxury Niche line is everything. Rich, deep, commanding — exactly what I wanted. Fast delivery, premium packaging. Best perfume brand in India.",
    fragrance: 'Omber Nomade',
  },
  {
    id: 4,
    name: 'Sara Iqbal',
    location: 'Pune',
    rating: 5,
    text: "I was skeptical about inspired fragrances, but Cool Water from the Daily Signatures completely changed my mind. Fresh, clean, and at ₹ 399 it is an absolute steal.",
    fragrance: 'Cool Water',
  },
  {
    id: 5,
    name: 'Hassan Tariq',
    location: 'New Delhi',
    rating: 5,
    text: "Ameer al Oud is a beast. The sillage is incredible and the longevity is unmatched. My wife cannot stop complimenting me every time I wear it. Worth every rupee.",
    fragrance: 'Ameer al Oud',
  },
];

export const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-28 px-6 overflow-hidden" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
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
              Voices of Our Community
            </span>
            <div className="divider-gold w-12" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-light"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 + 0.2 }}
              className="p-8 rounded-2xl relative"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="mb-4 opacity-20"
                style={{ color: 'var(--color-gold)' }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={13} fill="var(--color-gold)" stroke="none" />
                ))}
              </div>

              {/* Review text */}
              <p
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: 'var(--color-cream-muted)', fontFamily: 'var(--font-display)', fontSize: '1rem' }}
              >
                "{t.text}"
              </p>

              {/* Fragrance badge */}
              <div className="mb-5">
                <span
                  className="text-[10px] px-2.5 py-1 rounded-full font-medium tracking-widest uppercase"
                  style={{
                    backgroundColor: 'rgba(201,168,76,0.1)',
                    color: 'var(--color-gold)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  {t.fragrance}
                </span>
              </div>

              {/* Reviewer */}
              <div
                className="flex items-center gap-3 pt-5"
                style={{ borderTop: '1px solid var(--color-border-subtle)' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-gold-muted)', color: 'var(--color-gold-light)' }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-cream)' }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra two testimonials — widescreen row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {testimonials.slice(3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 + 0.56 }}
              className="p-8 rounded-2xl flex gap-6"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <Quote
                size={28}
                className="flex-shrink-0 mt-1 opacity-20"
                style={{ color: 'var(--color-gold)' }}
              />
              <div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={12} fill="var(--color-gold)" stroke="none" />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-4 italic"
                  style={{ color: 'var(--color-cream-muted)', fontFamily: 'var(--font-display)', fontSize: '1rem' }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: 'var(--color-gold-muted)', color: 'var(--color-gold-light)' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-cream)' }}>
                      {t.name}
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                      {t.location} · {t.fragrance}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
