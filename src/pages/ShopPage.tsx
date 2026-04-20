import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { ProductCard } from '../components/ui/ProductCard';
import type { Collection } from '../types/product';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name';
type Category = 'all' | 'men' | 'women' | 'unisex';
type Concentration = 'all' | 'EDP' | 'EDT' | 'Parfum' | 'Attar';
type CollectionFilter = 'all' | Collection;

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A–Z' },
];

const collectionOptions: { value: CollectionFilter; label: string; color: string }[] = [
  { value: 'all', label: 'All Collections', color: 'var(--color-cream-muted)' },
  { value: 'daily', label: 'Daily Signatures — ₹ 399', color: '#6ecfaa' },
  { value: 'premium', label: 'Premium — ₹ 499', color: '#a070e8' },
  { value: 'luxury', label: 'Luxury Niche — ₹ 599', color: '#C9A84C' },
];

const categoryOptions: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Fragrances' },
  { value: 'men', label: 'For Him' },
  { value: 'women', label: 'For Her' },
  { value: 'unisex', label: 'Unisex' },
];

const concentrationOptions: { value: Concentration; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Parfum', label: 'Parfum' },
  { value: 'EDP', label: 'EDP' },
  { value: 'EDT', label: 'EDT' },
  { value: 'Attar', label: 'Attar' },
];

const FilterSection = ({
  title,
  isOpen,
  toggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) => (
  <div style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-4 text-left"
    >
      <span
        className="text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: 'var(--color-cream-muted)' }}
      >
        {title}
      </span>
      {isOpen ? (
        <ChevronUp size={14} style={{ color: 'var(--color-text-secondary)' }} />
      ) : (
        <ChevronDown size={14} style={{ color: 'var(--color-text-secondary)' }} />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="pb-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'all';
  const initialCollection = (searchParams.get('collection') as CollectionFilter) || 'all';

  const [category, setCategory] = useState<Category>(initialCategory);
  const [collection, setCollection] = useState<CollectionFilter>(initialCollection);
  const [concentration, setConcentration] = useState<Concentration>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    collection: true,
    category: true,
    concentration: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const products = useMemo(() => {
    let result = [...mockProducts];

    if (collection !== 'all') result = result.filter((p) => p.collection === collection);
    if (category !== 'all') result = result.filter((p) => p.category === category);
    if (concentration !== 'all') result = result.filter((p) => p.concentration === concentration);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [category, collection, concentration, sortBy]);

  const activeFiltersCount =
    (category !== 'all' ? 1 : 0) +
    (collection !== 'all' ? 1 : 0) +
    (concentration !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setCategory('all');
    setCollection('all');
    setConcentration('all');
    setSortBy('featured');
  };

  const Sidebar = () => (
    <div className="space-y-0">
      {/* Header */}
      <div
        className="flex items-center justify-between pb-4 mb-2"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: 'var(--color-gold)' }}
        >
          Filters
        </span>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs flex items-center gap-1 transition-colors duration-200"
            style={{ color: 'var(--color-text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          >
            <X size={11} /> Clear all
          </button>
        )}
      </div>

      {/* Collection */}
      <FilterSection
        title="Collection"
        isOpen={openSections.collection}
        toggle={() => toggleSection('collection')}
      >
        <div className="flex flex-col gap-2">
          {collectionOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCollection(opt.value)}
              className="flex items-center justify-between text-sm py-1.5 transition-colors duration-200 text-left"
              style={{
                color: collection === opt.value ? opt.color : 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = opt.color)}
              onMouseLeave={(e) => {
                if (collection !== opt.value) e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              {opt.label}
              {collection === opt.value && (
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: opt.color }}
                />
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection
        title="Gender"
        isOpen={openSections.category}
        toggle={() => toggleSection('category')}
      >
        <div className="flex flex-col gap-2">
          {categoryOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value)}
              className="flex items-center justify-between text-sm py-1 transition-colors duration-200 text-left"
              style={{
                color: category === opt.value ? 'var(--color-gold)' : 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => {
                if (category !== opt.value) e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              {opt.label}
              {category === opt.value && (
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                />
              )}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Concentration */}
      <FilterSection
        title="Type"
        isOpen={openSections.concentration}
        toggle={() => toggleSection('concentration')}
      >
        <div className="flex flex-wrap gap-2">
          {concentrationOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setConcentration(opt.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200"
              style={{
                backgroundColor:
                  concentration === opt.value ? 'var(--color-gold)' : 'var(--color-bg-elevated)',
                color:
                  concentration === opt.value
                    ? 'var(--color-bg-primary)'
                    : 'var(--color-text-secondary)',
                border: `1px solid ${concentration === opt.value ? 'var(--color-gold)' : 'var(--color-border)'}`,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  // Page titles based on active collection
  const pageTitle = collection === 'daily'
    ? 'Daily Signatures'
    : collection === 'premium'
    ? 'Premium Collection'
    : collection === 'luxury'
    ? 'Luxury Niche'
    : 'All Fragrances';

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Page header */}
      <div
        className="py-16 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full blur-[80px] opacity-10"
            style={{ backgroundColor: 'var(--color-gold)' }}
          />
        </div>
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-3">
          <div className="divider-gold w-8 sm:w-12 hidden sm:block" />
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.4em] uppercase" style={{ color: 'var(--color-gold)' }}>
            {collection === 'daily' ? '₹ 399 · 30ml' : collection === 'premium' ? '₹ 499 · 30ml' : collection === 'luxury' ? '₹ 599 · 30ml' : 'The Full Catalogue'}
          </span>
          <div className="divider-gold w-8 sm:w-12 hidden sm:block" />
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-light"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
        >
          {pageTitle}
        </h1>
        <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {products.length} fragrance{products.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Sort bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-cream-muted)',
              }}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFiltersCount > 0 && (
                <span
                  className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-bg-primary)' }}
                >
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {products.length} result{products.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none px-4 py-2 pr-8 rounded-lg text-sm outline-none cursor-pointer transition-colors duration-200"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-cream-muted)',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--color-text-secondary)' }}
            />
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-28">
              <Sidebar />
            </div>
          </aside>

          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 lg:hidden"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="fixed left-0 top-0 bottom-0 z-50 w-72 p-6 overflow-y-auto lg:hidden"
                  style={{ backgroundColor: 'var(--color-bg-surface)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-sm font-semibold tracking-widest uppercase"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      Filters
                    </span>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X size={18} style={{ color: 'var(--color-cream-muted)' }} />
                    </button>
                  </div>
                  <Sidebar />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p
                  className="text-4xl font-light mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                >
                  No fragrances found
                </p>
                <p className="text-sm mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
                  Try adjusting your filters to discover more scents.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-bg-primary)' }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                    >
                      <ProductCard product={product} index={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
