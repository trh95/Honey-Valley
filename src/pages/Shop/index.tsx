import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';
import SEO from '../../components/layout/SEO';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Bee from '../../components/ui/BeeIcon';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const query = searchParams.get('q');
    const sort = searchParams.get('sort');
    const cat = searchParams.get('category');

    if (query) setSearchQuery(query);
    if (sort) setSortBy(sort);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const updateParams = (newQuery: string, newSort: string, newCat: string) => {
    const params: Record<string, string> = {};
    if (newQuery) params.q = newQuery;
    if (newSort !== 'featured') params.sort = newSort;
    if (newCat !== 'all') params.category = newCat;
    setSearchParams(params);
  };

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSortBy('featured');
    setSelectedCategory('all');
    setSearchParams({});
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateParams(val, sortBy, selectedCategory);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    updateParams(searchQuery, val, selectedCategory);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    updateParams(searchQuery, sortBy, val);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans py-12">
      <SEO
        title="Artisan Honey Shop"
        description="Search, filter, and discover Honey Valley's six raw organic premium honey varieties. Acacia, Linden, Forest, Canola, Wildflower, and Sunflower."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Bee className="h-5 w-5 animate-pulse" />
            </div>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Our Honey <span className="text-amber-400 font-serif italic text-glow">Catalog</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Harvested gently with utmost care for our hive colonies. Each jar consists of 100% natural, raw single-origin nectar unfiltered for premium body and rich pollen traits.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 p-5 md:p-6 mb-12 backdrop-blur-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            <div className="relative md:col-span-5">
              <span className="absolute inset-y-0 left-4 flex items-center text-neutral-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                id="search-products-input"
                type="text"
                placeholder="Search Acacia, Linden, creamy, dark..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-full border border-neutral-800 bg-neutral-950/80 py-3 pl-11 pr-10 font-sans text-sm text-white placeholder-neutral-500 transition-all duration-300 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute inset-y-0 right-4 flex items-center text-neutral-500 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="md:col-span-4 flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <SlidersHorizontal className="h-4 w-4 text-neutral-500 shrink-0 hidden sm:block" />
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    id={`filter-cat-${cat.toLowerCase()}`}
                    onClick={() => handleCategoryChange(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors border ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-neutral-950 border-transparent font-bold'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All Varietals' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative md:col-span-3">
              <span className="absolute inset-y-0 left-4 flex items-center text-neutral-500 pointer-events-none">
                <ArrowUpDown className="h-4 w-4" />
              </span>
              <select
                id="sort-select-dropdown"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full appearance-none rounded-full border border-neutral-800 bg-neutral-950/80 py-3 pl-11 pr-10 font-sans text-xs uppercase tracking-wider font-semibold text-neutral-300 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <option value="featured">Featured Selections</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A to Z</option>
                <option value="name-desc">Alphabetical: Z to A</option>
                <option value="rating-desc">Highly Rated</option>
              </select>
              <span className="absolute inset-y-0 right-4 flex items-center text-neutral-500 pointer-events-none">
                ▼
              </span>
            </div>

          </div>

          {(searchQuery || selectedCategory !== 'all' || sortBy !== 'featured') && (
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-neutral-900 text-xs text-neutral-400">
              <span className="font-sans">Active Filters:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-full text-white">
                  Query: "{searchQuery}"
                  <button onClick={() => handleSearchChange('')}>
                    <X className="h-3 w-3 hover:text-red-400 ml-1" />
                  </button>
                </span>
              )}
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-full text-white">
                  Category: {selectedCategory}
                  <button onClick={() => handleCategoryChange('all')}>
                    <X className="h-3 w-3 hover:text-red-400 ml-1" />
                  </button>
                </span>
              )}

              {sortBy !== 'featured' && (
                <span className="inline-flex items-center gap-1 bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-full text-white">
                  Sorting: {sortBy.replace('-', ' ')}
                  <button onClick={() => handleSortChange('featured')}>
                    <X className="h-3 w-3 hover:text-red-400 ml-1" />
                  </button>
                </span>
              )}

              <button
                id="clear-all-filters-btn"
                onClick={handleClearFilters}
                className="font-mono text-[10px] uppercase font-bold text-amber-500 hover:text-amber-400 underline ml-auto py-1"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredAndSortedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-24 text-center rounded-3xl border border-dotted border-neutral-800 max-w-lg mx-auto space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 mx-auto text-neutral-600">
                <X className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">No honeys matched your filter!</h3>
                <p className="font-sans text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Try adjusting categories, clearing your search query, or checking for typo variations to locate our sweet products.
                </p>
              </div>
              <button
                id="reset-filter-fallback-btn"
                onClick={handleClearFilters}
                className="rounded-full bg-amber-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:bg-amber-400 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
