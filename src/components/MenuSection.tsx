import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Check, ShieldAlert, Sparkles, Filter, Info, Star } from 'lucide-react';
import { CakeItem, CakeCategory } from '../types';
import { CAKE_ITEMS } from '../data/cakes';

interface MenuSectionProps {
  onSelectItemToCustomize: (item: CakeItem) => void;
  onQuickAdd: (item: CakeItem, weight: 'halfKg' | 'oneKg' | 'fixed', isEggless: boolean) => void;
}

const CATEGORIES: { value: CakeCategory; label: string; icon: string }[] = [
  { value: 'all', label: 'All Bakes', icon: '🍽️' },
  { value: 'chocolate', label: 'Chocolate Special', icon: '🍫' },
  { value: 'special', label: 'Premium Fusion', icon: '🍨' },
  { value: 'fruit', label: 'Fruit & Nuts Delight', icon: '🍓' },
  { value: 'nocream', label: 'Healthy No-Cream', icon: '🍞' },
  { value: 'mini', label: 'Mini Delights & Pops', icon: '🧁' },
];

export default function MenuSection({ onSelectItemToCustomize, onQuickAdd }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CakeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [selectedWeightStates, setSelectedWeightStates] = useState<Record<string, 'halfKg' | 'oneKg' | 'fixed'>>({});
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc'>('bestseller');

  // Filter items
  const filteredItems = useMemo(() => {
    return CAKE_ITEMS.filter((item) => {
      // Category match
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
      
      // Search match
      const query = searchQuery.toLowerCase();
      const stringMatch =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      // Veg (Eggless) match
      const egglessMatch = !vegetarianOnly || item.isEgglessAvailable;

      return categoryMatch && stringMatch && egglessMatch;
    }).sort((a, b) => {
      if (sortBy === 'bestseller') {
        const aVal = a.isBestSeller ? 1 : 0;
        const bVal = b.isBestSeller ? 1 : 0;
        return bVal - aVal;
      }
      if (sortBy === 'price-asc') {
        const aPrice = a.price.fixed || a.price.halfKg || a.price.oneKg || 0;
        const bPrice = b.price.fixed || b.price.halfKg || b.price.oneKg || 0;
        return aPrice - bPrice;
      }
      if (sortBy === 'price-desc') {
        const aPrice = a.price.oneKg || a.price.fixed || a.price.halfKg || 0;
        const bPrice = b.price.oneKg || b.price.fixed || b.price.halfKg || 0;
        return bPrice - aPrice;
      }
      return 0;
    });
  }, [activeCategory, searchQuery, vegetarianOnly, sortBy]);

  // Set default weights for items based on available options
  const getItemSelectedWeight = (item: CakeItem) => {
    if (selectedWeightStates[item.id]) {
      return selectedWeightStates[item.id];
    }
    if (item.price.fixed !== undefined) {
      return 'fixed';
    }
    if (item.price.halfKg !== undefined) {
      return 'halfKg';
    }
    return 'oneKg';
  };

  const handleWeightChange = (itemId: string, weight: 'halfKg' | 'oneKg' | 'fixed') => {
    setSelectedWeightStates((prev) => ({
      ...prev,
      [itemId]: weight,
    }));
  };

  return (
    <section id="menu" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-sans text-xs font-bold text-[#A0522D] tracking-widest uppercase block">
            Freshly Baked Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3D2B1F] mt-2">
            Explore Handcrafted Delights
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#3D2B1F]/75 mt-3">
            Every order is custom-baked. Browse our verified standard cakes or launch 
            the custom builder with any of these flavors for personalized decorations.
          </p>
        </div>

        {/* Toolbar: Search, Filters, Sorters */}
        <div className="bg-[#EADBC8]/30 rounded-3xl p-5 border border-[#3D2B1F]/10 mb-10 space-y-4">
          
          {/* Top Row: Search and Sorters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#3D2B1F]/50">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search flavors, e.g., Butterscotch, Truffle, Coconut..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#3D2B1F]/15 rounded-full focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] font-sans text-xs sm:text-sm text-[#3D2B1F] outline-none placeholder:text-[#3D2B1F]/40 transition-all font-medium"
              />
            </div>

            {/* Eggless Vegetarian Filter Toggle */}
            <div className="md:col-span-3 flex items-center justify-start sm:justify-center">
              <label className="relative flex items-center gap-2.5 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={vegetarianOnly}
                  onChange={(e) => setVegetarianOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#3D2B1F]/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-[#3D2B1F]/10 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-700"></div>
                <span className="font-sans text-xs sm:text-sm font-bold text-[#3D2B1F] flex items-center gap-1.5 label-text">
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-sm inline-block border border-emerald-900" />
                  Eggless (100% Veg)
                </span>
              </label>
            </div>

            {/* Sorting Combo */}
            <div className="md:col-span-3 flex items-center justify-end">
              <span className="font-sans text-xs text-[#3D2B1F]/60 mr-2 shrink-0 uppercase font-bold tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3.5 border border-[#3D2B1F]/15 bg-white text-xs sm:text-sm text-[#3D2B1F] font-bold rounded-full outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition-all cursor-pointer"
              >
                <option value="bestseller">🏆 Bestsellers First</option>
                <option value="price-asc">💵 Price: Low to High</option>
                <option value="price-desc">💵 Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Bottom Row - Category Tab Horizontal Roll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-t border-[#3D2B1F]/10 pt-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold whitespace-nowrap transition-all cursor-pointer rounded-full border border-transparent ${
                  activeCategory === cat.value
                    ? 'bg-[#3D2B1F] text-[#FDFBF7] shadow-xs'
                    : 'bg-[#EADBC8]/40 hover:bg-[#EADBC8]/70 text-[#3D2B1F]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Catalog Grid Cards */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-amber-50/20 border border-dashed border-amber-200/50 rounded-2xl">
            <ShieldAlert className="w-10 h-10 text-amber-700/60 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-medium text-amber-950">No bakes matched your search</h3>
            <p className="font-sans text-sm text-amber-900/60 max-w-md mx-auto mt-2">
              Try removing some toggles or check spelling. Or click <strong>"Build Custom Cake"</strong> at the top to describe what you want!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const currentWeight = getItemSelectedWeight(item);
              
              // Map index to the four custom Geometric Balance cream/biscuit backgrounds
              const cardBgColors = ['bg-[#F5E6DA]', 'bg-[#EADBC8]', 'bg-[#D9C5B2]', 'bg-[#C7B299]'];
              const cardBg = cardBgColors[index % cardBgColors.length];

              // Calculate Price to show
              let displayPrice = 0;
              let unitLabel = '';
              let isSpecialRange = false;

              if (item.price.fixed !== undefined) {
                displayPrice = item.price.fixed;
                unitLabel = item.price.isEstimatedRange
                  ? `₹${item.price.rangeStart}–${item.price.rangeEnd}`
                  : 'per item / pack';
                isSpecialRange = !!item.price.isEstimatedRange;
              } else if (currentWeight === 'halfKg') {
                displayPrice = item.price.halfKg || 0;
                unitLabel = 'per ½ Kg';
              } else {
                displayPrice = item.price.oneKg || 0;
                unitLabel = 'per 1 Kg';
              }

              return (
                <div
                  key={item.id}
                  id={`cake-card-${item.id}`}
                  className={`group ${cardBg} rounded-3xl border border-[#3D2B1F]/10 hover:border-[#3D2B1F]/20 shadow-xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between overflow-hidden text-[#3D2B1F] bento-card`}
                >
                  
                  {/* Card Main body */}
                  <div>
                    
                    {/* Header Emoji banner background with glass effect */}
                    <div className="relative h-44 bg-white/40 hover:bg-white/50 transition-colors flex items-center justify-center m-4 mb-2 rounded-2xl border border-[#3D2B1F]/5">
                      
                      {/* Lace detail overlay */}
                      <div className="absolute inset-2.5 border border-dashed border-[#3D2B1F]/10 rounded-xl" />

                      {/* Display Cake Emoji Illustration */}
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-xs">
                        {item.image}
                      </span>

                      {/* Floating badge tags */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        {item.isBestSeller && (
                          <span className="bg-[#3D2B1F] text-white font-sans text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                            Bestseller
                          </span>
                        )}
                        {item.isEgglessAvailable && (
                          <span className="bg-white/80 backdrop-blur-xs text-emerald-800 border border-emerald-500/20 font-bold uppercase tracking-wider text-[8px] px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full inline-block" />
                            Eggless
                          </span>
                        )}
                      </div>

                      {/* Kid safe and cream badges tags bottom */}
                      {item.tags.includes('No Added Colors') && (
                        <span className="absolute bottom-3 right-3 bg-white/85 text-[#A0522D] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#3D2B1F]/5 shadow-xs">
                          🌱 Safe Bakes
                        </span>
                      )}

                    </div>

                    {/* Content text */}
                    <div className="px-5 py-4 space-y-2">
                      
                      {/* Categories list and tags inline */}
                      <span className="text-[10px] font-bold tracking-widest text-[#A0522D] uppercase block">
                        {item.category === 'nocream' ? 'Healthy No-Cream' : item.category === 'chocolate' ? 'Premium Chocolate' : item.category.toUpperCase() + ' SPECIAL'}
                      </span>

                      {/* Title block */}
                      <h3 className="font-serif text-xl font-bold text-[#3D2B1F] group-hover:text-[#A0522D] transition-colors leading-tight">
                        {item.name}
                      </h3>

                      {/* Short summary description */}
                      <p className="font-sans text-xs text-[#3D2B1F]/80 leading-relaxed min-h-[40px]">
                        {item.description}
                      </p>

                      {/* Small tags badges display */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((t) => (
                          <span key={t} className="bg-white/30 border border-[#3D2B1F]/5 text-[#3D2B1F]/70 text-[9px] px-2 py-0.5 rounded-md font-medium">
                            {t}
                          </span>
                        ))}
                      </div>

                    </div>

                  </div>

                  {/* Weight Choice buttons & checkout area - Fixed at bottom */}
                  <div className="px-5 pb-5 pt-0 mt-auto">
                    
                    {/* Weight selector row - Hidden if item is Fixed price Mini cake */}
                    {item.price.fixed === undefined ? (
                      <div className="flex items-center justify-between gap-1.5 py-2.5 border-t border-[#3D2B1F]/10">
                        <span className="font-sans text-[10px] font-bold text-[#3D2B1F]/60 uppercase tracking-widest">Weight:</span>
                        <div className="flex gap-0.5 bg-white/30 p-0.5 rounded-lg border border-[#3D2B1F]/5">
                          {item.price.halfKg !== undefined && (
                            <button
                              onClick={() => handleWeightChange(item.id, 'halfKg')}
                              className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                                currentWeight === 'halfKg'
                                  ? 'bg-white text-[#3D2B1F] shadow-xs font-bold'
                                  : 'text-[#3D2B1F]/60 hover:text-[#3D2B1F]'
                              }`}
                            >
                              ½ Kg
                            </button>
                          )}
                          {item.price.oneKg !== undefined && (
                            <button
                              onClick={() => handleWeightChange(item.id, 'oneKg')}
                              className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                                currentWeight === 'oneKg'
                                  ? 'bg-white text-[#3D2B1F] shadow-xs font-bold'
                                  : 'text-[#3D2B1F]/60 hover:text-[#3D2B1F]'
                              }`}
                            >
                              1 Kg
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 py-2.5 border-t border-[#3D2B1F]/10 font-sans text-[9px] text-[#3D2B1F]/60 uppercase tracking-wider">
                        <Info className="w-3 h-3 text-[#A0522D]" />
                        <span>Prepared fresh on order</span>
                      </div>
                    )}

                    {/* Price & Primary Cta Order */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-[#3D2B1F]/10">
                      <div className="flex flex-col">
                        <span className="font-serif text-xl font-bold tracking-tight text-[#3D2B1F]">
                          {isSpecialRange ? unitLabel : `₹${displayPrice}`}
                        </span>
                        {!isSpecialRange && (
                          <span className="font-sans text-[9px] text-[#3D2B1F]/50 uppercase tracking-widest font-semibold">
                            {unitLabel}
                          </span>
                        )}
                      </div>

                      {/* CTA Add option buttons */}
                      <div className="flex gap-1">
                        <button
                          onClick={() => onSelectItemToCustomize(item)}
                          className="px-2.5 py-1.5 border border-[#3D2B1F]/20 hover:border-[#3D2B1F]/40 text-[#3D2B1F] hover:bg-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer"
                        >
                          Customize
                        </button>
                        <button
                          onClick={() => onQuickAdd(item, currentWeight, item.isEgglessAvailable)}
                          className="px-3.5 py-1.5 bg-[#8B4513] hover:bg-[#3D2B1F] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-xs"
                        >
                          Add
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
