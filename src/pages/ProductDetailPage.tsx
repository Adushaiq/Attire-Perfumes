import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Leaf,
  Clock,
  Wind,
  Package,
  Info,
} from 'lucide-react';
import { getProductById, mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ui/ProductCard';

const collectionLabel: Record<string, string> = {
  daily: 'Daily Signatures',
  premium: 'Premium',
  luxury: 'Luxury Niche',
};

const noteColors = {
  top: { bg: 'rgba(201,168,76,0.1)', border: 'rgba(201,168,76,0.25)', text: 'var(--color-gold)' },
  heart: { bg: 'rgba(180,80,140,0.1)', border: 'rgba(180,80,140,0.25)', text: '#d980b0' },
  base: { bg: 'rgba(80,100,200,0.1)', border: 'rgba(80,100,200,0.25)', text: '#8090d8' },
};

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id ?? '');
  const { addToCart } = useCart();

  const [selectedMl, setSelectedMl] = useState(() => {
    if (!product) return 0;
    return (product.sizes[1] ?? product.sizes[0]).ml;
  });
  const [selectedImg, setSelectedImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'notes' | 'reviews'>('details');

  if (!product) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <p
          className="text-5xl font-light mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
        >
          Fragrance Not Found
        </p>
        <p className="mb-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {"The fragrance you're looking for doesn't exist or has been removed."}
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-lg text-sm font-medium"
          style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-bg-primary)' }}
        >
          Browse the Collection
        </Link>
      </div>
    );
  }

  const selectedSize = product.sizes.find((s) => s.ml === selectedMl) ?? product.sizes[0];

  const relatedProducts = mockProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.collection === product.collection || p.category === product.category)
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedMl, selectedSize.price);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Breadcrumb */}
      <div
        className="px-6 lg:px-8 py-4 max-w-7xl mx-auto"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          <Link
            to="/"
            className="transition-colors duration-200 hover:text-[var(--color-gold)]"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            className="transition-colors duration-200 hover:text-[var(--color-gold)]"
          >
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/shop?collection=${product.collection}`}
            className="transition-colors duration-200 hover:text-[var(--color-gold)]"
          >
            {collectionLabel[product.collection]}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-cream-muted)' }}>{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20">
          {/* ── Left: Image Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="space-y-4"
          >
            {/* Main image */}
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-2xl"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImg}
                  src={product.images[selectedImg] ?? product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 text-[11px] font-semibold tracking-widest uppercase rounded-lg"
                    style={{
                      backgroundColor: badge === 'Bestseller' ? 'var(--color-gold)' : 'rgba(13,13,15,0.8)',
                      color: badge === 'Bestseller' ? 'var(--color-bg-primary)' : 'var(--color-cream)',
                      backdropFilter: 'blur(8px)',
                      border: badge !== 'Bestseller' ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(13,13,15,0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--color-border)',
                }}
                aria-label="Wishlist"
              >
                <Heart
                  size={16}
                  fill={wishlisted ? 'var(--color-gold)' : 'none'}
                  stroke={wishlisted ? 'var(--color-gold)' : 'var(--color-cream-muted)'}
                />
              </button>

              {/* Image nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImg((prev) => Math.max(0, prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(13,13,15,0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    <ChevronLeft size={14} style={{ color: 'var(--color-cream)' }} />
                  </button>
                  <button
                    onClick={() => setSelectedImg((prev) => Math.min(product.images.length - 1, prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(13,13,15,0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    <ChevronRight size={14} style={{ color: 'var(--color-cream)' }} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className="w-20 h-20 rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      border: selectedImg === i
                        ? '2px solid var(--color-gold)'
                        : '2px solid var(--color-border-subtle)',
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Right: Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Collection + category + concentration */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-medium tracking-[0.3em] uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                {collectionLabel[product.collection]}
              </span>
              <span style={{ color: 'var(--color-border)' }}>·</span>
              <span
                className="text-xs font-medium tracking-[0.2em] uppercase"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {product.category === 'men' ? 'For Him' : product.category === 'women' ? 'For Her' : 'Unisex'}
              </span>
              <span style={{ color: 'var(--color-border)' }}>·</span>
              <span
                className="text-xs font-medium tracking-[0.2em] uppercase"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {product.concentration}
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-5xl md:text-6xl font-light mb-2 leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
            >
              {product.name}
            </h1>

            {/* Inspired by */}
            {product.inspiredBy && (
              <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                Inspired by{' '}
                <span style={{ color: 'var(--color-cream-muted)' }}>
                  {product.inspiredBy}
                </span>
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'none'}
                    stroke="var(--color-gold)"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--color-cream-muted)' }}>
                {product.rating}
              </span>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Tagline */}
            <p
              className="text-xl font-light italic mb-5 pb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-cream-muted)',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              &ldquo;{product.tagline}&rdquo;
            </p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-4xl font-light"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}
                >
                  ₹ {selectedSize.price.toLocaleString()}
                </span>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {selectedMl}ml · Free delivery on orders above ₹ 3,000
              </p>
            </div>

            {/* Size selector */}
            {product.sizes.length > 1 && (
              <div className="mb-7">
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                  style={{ color: 'var(--color-cream-muted)' }}
                >
                  Select Size
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.ml}
                      onClick={() => setSelectedMl(size.ml)}
                      className="flex flex-col items-center px-5 py-3 rounded-xl transition-all duration-200"
                      style={{
                        backgroundColor:
                          selectedMl === size.ml ? 'rgba(201,168,76,0.15)' : 'var(--color-bg-card)',
                        border: `1px solid ${selectedMl === size.ml ? 'var(--color-gold)' : 'var(--color-border)'}`,
                        color: selectedMl === size.ml ? 'var(--color-gold)' : 'var(--color-cream-muted)',
                      }}
                    >
                      <span className="text-sm font-semibold">{size.ml}ml</span>
                      <span className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                        ₹ {size.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock indicator */}
            <div className="flex items-center gap-2 mb-7">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    product.stock > 20
                      ? '#4caf80'
                      : product.stock > 0
                      ? 'var(--color-gold)'
                      : '#cf4444',
                }}
              />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {product.stock > 20
                  ? 'In Stock'
                  : product.stock > 0
                  ? `Only ${product.stock} left in stock`
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Add to Cart + Wishlist */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300"
                style={{
                  backgroundColor: addedToCart
                    ? 'rgba(76,175,128,0.15)'
                    : product.stock === 0
                    ? 'var(--color-bg-card)'
                    : 'var(--color-gold)',
                  color: addedToCart
                    ? '#4caf80'
                    : product.stock === 0
                    ? 'var(--color-text-tertiary)'
                    : 'var(--color-bg-primary)',
                  border: addedToCart ? '1px solid #4caf80' : 'none',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: addedToCart
                    ? 'none'
                    : product.stock > 0
                    ? '0 4px 24px rgba(201,168,76,0.3)'
                    : 'none',
                }}
              >
                {addedToCart ? (
                  <>
                    <Check size={16} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                  </>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setWishlisted(!wishlisted)}
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: wishlisted ? 'rgba(201,168,76,0.1)' : 'var(--color-bg-card)',
                  border: `1px solid ${wishlisted ? 'var(--color-gold)' : 'var(--color-border)'}`,
                }}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={18}
                  fill={wishlisted ? 'var(--color-gold)' : 'none'}
                  stroke={wishlisted ? 'var(--color-gold)' : 'var(--color-cream-muted)'}
                />
              </motion.button>
            </div>

            {/* Quick facts */}
            <div
              className="grid grid-cols-2 gap-4 p-5 rounded-xl"
              style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)' }}
            >
              {[
                { Icon: Clock, label: 'Longevity', value: product.longevity },
                { Icon: Wind, label: 'Sillage', value: product.sillage },
                { Icon: Leaf, label: 'Season', value: product.season.join(', ') },
                { Icon: Package, label: 'Type', value: product.concentration },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: 'rgba(201,168,76,0.08)' }}
                  >
                    <Icon size={13} style={{ color: 'var(--color-gold)' }} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--color-text-tertiary)' }}>
                      {label}
                    </p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-cream-muted)' }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Tabs: Details / Scent Notes / Reviews ── */}
        <div className="mt-20">
          {/* Tab nav */}
          <div
            className="flex gap-0 mb-10"
            style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
          >
            {(['details', 'notes', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-200 relative"
                style={{
                  color: activeTab === tab ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                  letterSpacing: '0.12em',
                }}
              >
                {tab === 'details' ? 'Description' : tab === 'notes' ? 'Scent Notes' : 'Reviews'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl"
              >
                <p
                  className="text-lg font-light leading-relaxed mb-8"
                  style={{ color: 'var(--color-cream-muted)' }}
                >
                  {product.description}
                </p>
                {product.inspiredBy && (
                  <div
                    className="flex items-start gap-3 p-5 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(201,168,76,0.06)',
                      border: '1px solid rgba(201,168,76,0.15)',
                    }}
                  >
                    <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-gold)' }} />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      This is an inspired fragrance. It is not affiliated with, endorsed by, or associated with the original brand. The name &ldquo;{product.inspiredBy}&rdquo; is used solely to describe the olfactory similarity and is the property of its respective owner.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'notes' && (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl"
              >
                <div className="flex flex-col gap-8">
                  {(
                    [
                      { type: 'top', label: 'Top Notes', sublabel: 'First impression — 0 to 30 minutes', notes: product.notes.top },
                      { type: 'heart', label: 'Heart Notes', sublabel: 'The core character — 30 min to 4 hours', notes: product.notes.heart },
                      { type: 'base', label: 'Base Notes', sublabel: 'The lasting impression — 4+ hours', notes: product.notes.base },
                    ] as const
                  ).map(({ type, label, sublabel, notes }) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex gap-6 items-start"
                    >
                      <div className="flex flex-col items-center flex-shrink-0 pt-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: noteColors[type].text }}
                        />
                        {type !== 'base' && (
                          <div
                            className="w-px flex-1 mt-2 min-h-[40px]"
                            style={{
                              background: `linear-gradient(to bottom, ${noteColors[type].text}, transparent)`,
                              opacity: 0.3,
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h3
                          className="text-xl font-light mb-0.5"
                          style={{ fontFamily: 'var(--font-display)', color: noteColors[type].text }}
                        >
                          {label}
                        </h3>
                        <p className="text-xs mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
                          {sublabel}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {notes.map((note) => (
                            <span
                              key={note}
                              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                              style={{
                                backgroundColor: noteColors[type].bg,
                                border: `1px solid ${noteColors[type].border}`,
                                color: noteColors[type].text,
                              }}
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl"
              >
                {/* Rating summary */}
                <div
                  className="flex items-center gap-10 p-8 rounded-2xl mb-8"
                  style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-subtle)' }}
                >
                  <div className="text-center">
                    <div
                      className="text-6xl font-light mb-1"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}
                    >
                      {product.rating}
                    </div>
                    <div className="flex gap-1 justify-center mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill={i < Math.floor(product.rating) ? 'var(--color-gold)' : 'none'}
                          stroke="var(--color-gold)"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {product.reviewCount} reviews
                    </p>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const pct = stars === 5 ? 78 : stars === 4 ? 16 : stars === 3 ? 4 : 1;
                      return (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-xs w-4" style={{ color: 'var(--color-text-secondary)' }}>
                            {stars}
                          </span>
                          <Star size={10} fill="var(--color-gold)" stroke="none" />
                          <div
                            className="flex-1 h-1.5 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'var(--color-bg-elevated)' }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: 'var(--color-gold)' }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                          <span className="text-xs w-8" style={{ color: 'var(--color-text-tertiary)' }}>
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample reviews */}
                {[
                  {
                    name: 'Bilal R.',
                    rating: 5,
                    date: '2 weeks ago',
                    text: `Absolutely incredible. I purchased the ${product.name} and it's a dead ringer for the original. The longevity is phenomenal — people were asking what I was wearing all day long.`,
                  },
                  {
                    name: 'Fatima A.',
                    rating: 5,
                    date: '1 month ago',
                    text: "I was skeptical about inspired fragrances but this completely changed my mind. Premium feel, beautiful packaging, and the scent is stunning. Highly recommend.",
                  },
                  {
                    name: 'Usman K.',
                    rating: 4,
                    date: '3 weeks ago',
                    text: 'Very close to the original. Great longevity and sillage. Fast delivery too. Will definitely be ordering again.',
                  },
                ].map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-xl mb-4"
                    style={{
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ backgroundColor: 'var(--color-gold-muted)', color: 'var(--color-gold-light)' }}
                        >
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--color-cream)' }}>
                            {review.name}
                          </p>
                          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, si) => (
                          <Star key={si} size={12} fill="var(--color-gold)" stroke="none" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-cream-muted)' }}>
                      {review.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div
              className="flex items-center gap-4 mb-10"
              style={{ borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1.5rem' }}
            >
              <div className="divider-gold w-8" />
              <h2
                className="text-3xl font-light"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
              >
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
