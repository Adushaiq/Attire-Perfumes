import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

const collectionLabel: Record<string, string> = {
  daily: 'Daily Signatures',
  premium: 'Premium',
  luxury: 'Luxury Niche',
};

const collectionColor: Record<string, string> = {
  daily: '#6ecfaa',
  premium: '#a070e8',
  luxury: '#C9A84C',
};

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    addToCart(product, defaultSize.ml, defaultSize.price);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  const defaultSize = product.sizes[product.sizes.length > 1 ? 1 : 0];
  const colColor = collectionColor[product.collection] || '#C9A84C';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div
          className="relative overflow-hidden rounded-2xl transition-all duration-500"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid var(--color-border-subtle)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.boxShadow = `0 20px 60px rgba(201, 168, 76, 0.1), 0 0 0 1px rgba(201, 168, 76, 0.12)`;
            el.style.borderColor = 'rgba(201, 168, 76, 0.2)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.boxShadow = 'none';
            el.style.borderColor = 'var(--color-border-subtle)';
          }}
        >
          {/* Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to top, rgba(13,13,15,0.8) 0%, rgba(13,13,15,0.2) 40%, transparent 70%)',
              }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-md"
                  style={{
                    backgroundColor: badge === 'Bestseller' ? 'var(--color-gold)' : 'rgba(13,13,15,0.85)',
                    color: badge === 'Bestseller' ? 'var(--color-bg-primary)' : 'var(--color-cream)',
                    border: badge !== 'Bestseller' ? '1px solid var(--color-border)' : 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: 'rgba(13,13,15,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-border)',
              }}
              aria-label="Add to wishlist"
            >
              <Heart
                size={14}
                fill={wishlisted ? 'var(--color-gold)' : 'none'}
                stroke={wishlisted ? 'var(--color-gold)' : 'var(--color-cream-muted)'}
              />
            </button>

            {/* Stock warning */}
            {product.stock <= 15 && product.stock > 0 && (
              <div className="absolute bottom-3 left-3">
                <span
                  className="text-[10px] px-2.5 py-1 rounded-md font-medium"
                  style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: 'var(--color-gold-light)' }}
                >
                  Only {product.stock} left
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-3 sm:p-5">
            {/* Collection + concentration */}
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] tracking-[0.2em] uppercase font-semibold"
                style={{ color: colColor }}
              >
                {collectionLabel[product.collection]} · {product.concentration}
              </span>
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star size={11} fill="var(--color-gold)" stroke="none" />
                <span className="text-[11px] font-medium" style={{ color: 'var(--color-cream-muted)' }}>
                  {product.rating}
                </span>
              </div>
            </div>

            {/* Name */}
            <h3
              className="text-lg sm:text-xl font-light mb-0.5 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
            >
              {product.name}
            </h3>

            {/* Inspired by */}
            {product.inspiredBy && (
              <p className="text-[11px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                Inspired by {product.inspiredBy}
              </p>
            )}
            {!product.inspiredBy && (
              <p className="text-[11px] mb-3 italic" style={{ color: 'var(--color-text-tertiary)' }}>
                {product.tagline}
              </p>
            )}

            {/* Notes preview */}
            <div className="hidden sm:flex flex-wrap gap-1 mb-4">
              {product.notes.top.slice(0, 2).map((note) => (
                <span
                  key={note}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'var(--color-bg-elevated)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  {note}
                </span>
              ))}
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                +{product.notes.top.length + product.notes.heart.length + product.notes.base.length - 2} more
              </span>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-0 mt-2 sm:mt-0">
              <div>
                <span
                  className="text-base sm:text-xl font-semibold"
                  style={{ color: 'var(--color-gold)' }}
                >
                  ₹ {defaultSize.price.toLocaleString()}
                </span>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  {defaultSize.ml}ml
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 w-full sm:w-auto"
                style={{
                  backgroundColor: addedToCart ? 'rgba(201,168,76,0.15)' : 'var(--color-gold)',
                  color: addedToCart ? 'var(--color-gold)' : 'var(--color-bg-primary)',
                  border: addedToCart ? '1px solid var(--color-gold)' : '1px solid transparent',
                }}
              >
                <ShoppingBag size={14} />
                {addedToCart ? 'Added!' : 'Add'}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
