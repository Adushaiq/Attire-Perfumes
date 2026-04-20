import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

// Floating particle component
const Particle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, backgroundColor: 'var(--color-gold)' }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 0.6, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 4 + Math.random() * 3,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
}));

export const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-12 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: 'var(--color-gold-dark)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15"
          style={{ backgroundColor: '#4a2080' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-[80px] opacity-10"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
      ))}

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 h-full w-px opacity-10"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)' }}
        />
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="divider-gold w-8 sm:w-16 hidden sm:block" />
          <span
            className="flex items-center gap-2 text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.4em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            <Sparkles size={12} />
            Luxury Fragrance Collection
          </span>
          <div className="divider-gold w-8 sm:w-16 hidden sm:block" />
        </motion.div>

        {/* Main headline — staggered word animation */}
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-light mb-6 leading-none"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
        >
          {['Wear', 'Your', 'Story'].map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.2em] last:mr-0"
            >
              {i === 2 ? (
                <span className="text-gold-gradient italic">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'var(--color-cream-muted)' }}
        >
          Inspired versions of the world&apos;s finest luxury fragrances — from everyday essentials to rare niche masterpieces. Starting at just ₹ 399.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-500 hover:gap-5 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-bg-primary)',
              letterSpacing: '0.15em',
              boxShadow: '0 0 0 transparent',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(201,168,76,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 0 transparent';
            }}
          >
            Shop Now
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            to="/shop?category=unisex"
            className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            style={{
              color: 'var(--color-cream-muted)',
              border: '1px solid var(--color-border)',
              letterSpacing: '0.15em',
            }}
          >
            Explore Unisex
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-12 sm:mt-16 pt-12 sm:pt-16"
          style={{ borderTop: '1px solid var(--color-border-subtle)' }}
        >
          {[
            { value: '35', label: 'Fragrances' },
            { value: '3', label: 'Collections' },
            { value: '₹ 399', label: 'Starting At' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl font-light mb-1"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}
              >
                {value}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-secondary)' }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-text-tertiary)' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, var(--color-gold), transparent)' }}
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};
