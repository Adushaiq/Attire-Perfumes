import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const collections = [
  { label: 'Daily Signatures', sublabel: '₹ 399 · 30ml', href: '/shop?collection=daily' },
  { label: 'Premium Collection', sublabel: '₹ 499 · 30ml', href: '/shop?collection=premium' },
  { label: 'Luxury Niche', sublabel: '₹ 599 · 30ml', href: '/shop?collection=luxury' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '#', hasDropdown: true },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(13,13,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border-subtle)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start leading-none">
            <span
              className="text-xl font-light tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}
            >
              Attire
            </span>
            <span
              className="text-[8px] tracking-[0.5em] uppercase -mt-0.5"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Perfumes
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 text-sm font-medium tracking-widest uppercase transition-colors duration-200"
                    style={{
                      color: dropdownOpen ? 'var(--color-gold)' : 'var(--color-cream-muted)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-200"
                      style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 py-2 rounded-xl overflow-hidden"
                        style={{
                          backgroundColor: 'rgba(18,18,22,0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid var(--color-border)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        }}
                      >
                        {collections.map((col) => (
                          <Link
                            key={col.label}
                            to={col.href}
                            className="flex flex-col px-5 py-3 transition-all duration-200"
                            style={{ color: 'var(--color-cream-muted)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.06)';
                              e.currentTarget.style.color = 'var(--color-gold)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'var(--color-cream-muted)';
                            }}
                          >
                            <span className="text-sm font-medium">{col.label}</span>
                            <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                              {col.sublabel}
                            </span>
                          </Link>
                        ))}
                        <div style={{ borderTop: '1px solid var(--color-border-subtle)' }} className="mt-1 pt-1">
                          <Link
                            to="/shop"
                            className="flex items-center px-5 py-3 text-sm font-medium transition-colors duration-200"
                            style={{ color: 'var(--color-gold)' }}
                          >
                            View All Fragrances
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium tracking-widest uppercase transition-colors duration-200"
                  style={{
                    color:
                      location.pathname === link.href ? 'var(--color-gold)' : 'var(--color-cream-muted)',
                    letterSpacing: '0.12em',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.href)
                      e.currentTarget.style.color = 'var(--color-cream-muted)';
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right side: search, cart, mobile menu */}
          <div className="flex items-center gap-4">
            <button
              className="transition-colors duration-200"
              style={{ color: 'var(--color-cream-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-cream-muted)')}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <Link
              to="/shop"
              className="relative transition-colors duration-200"
              style={{ color: 'var(--color-cream-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-cream-muted)')}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-bg-primary)' }}
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            <button
              className="md:hidden transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: 'var(--color-cream-muted)' }}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pt-16 md:hidden"
            style={{ backgroundColor: 'rgba(13,13,15,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col px-8 py-8 gap-6">
              <Link to="/" className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}>
                Home
              </Link>
              <Link to="/shop" className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}>
                Shop All
              </Link>
              <div className="pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-gold)' }}>
                  Collections
                </p>
                {collections.map((col) => (
                  <Link
                    key={col.label}
                    to={col.href}
                    className="flex justify-between items-center py-3"
                    style={{ color: 'var(--color-cream-muted)' }}
                  >
                    <span className="text-lg font-light" style={{ fontFamily: 'var(--font-display)' }}>
                      {col.label}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {col.sublabel}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
