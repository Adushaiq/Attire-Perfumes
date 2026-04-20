import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'For Him', href: '/shop?category=men' },
    { label: 'For Her', href: '/shop?category=women' },
    { label: 'Unisex', href: '/shop?category=unisex' },
    { label: 'New Arrivals', href: '/shop?badge=new' },
    { label: 'Bestsellers', href: '/shop?badge=bestseller' },
  ],
  Help: [
    { label: 'FAQs', href: '#' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'Returns & Exchanges', href: '#' },
    { label: 'Track Your Order', href: '#' },
  ],
  About: [
    { label: 'Our Story', href: '#' },
    { label: 'Ingredients', href: '#' },
    { label: 'Sustainability', href: '#' },
  ],
};

const socials = [
  { Icon: Camera, href: '#', label: 'Instagram' },
  { Icon: Globe, href: '#', label: 'Website' },
  { Icon: MessageCircle, href: '#', label: 'WhatsApp' },
];

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border-subtle)' }}>
      {/* Top newsletter bar */}
      <div
        className="py-12 px-6"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-3xl font-light mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
            >
              The Art of Fragrance
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Subscribe for exclusive releases, offers, and fragrance inspiration.
            </p>
          </div>
          <form
            className="flex w-full md:w-auto gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-5 py-3 text-sm outline-none bg-transparent border rounded-l-lg"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-cream)',
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium tracking-widest uppercase rounded-r-lg transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-bg-primary)',
                letterSpacing: '0.1em',
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex flex-col leading-none mb-6">
              <span
                className="text-3xl font-light tracking-[0.3em] uppercase"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}
              >
                Attire
              </span>
              <span
                className="text-[10px] tracking-[0.5em] uppercase mt-0.5"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Perfumes
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-8 max-w-xs"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Bringing the world's most coveted luxury fragrances within reach. Every bottle is a masterwork — crafted with premium ingredients, bottled with intention.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={14} style={{ color: 'var(--color-gold)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  +91 300 0000000
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} style={{ color: 'var(--color-gold)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  hello@attireperfumes.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} style={{ color: 'var(--color-gold)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  India
                </span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
                style={{ color: 'var(--color-gold)' }}
              >
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm transition-colors duration-200 hover:text-[var(--color-gold)]"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border-subtle)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            © {new Date().getFullYear()} Attire Perfumes. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors duration-200 hover:text-[var(--color-gold)]"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
