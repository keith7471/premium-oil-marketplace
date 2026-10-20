import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { SlidersHorizontal, Info, ShieldAlert } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, country } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredProducts = products.filter((product) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'mustard') return product.oilType.toLowerCase().includes('mustard');
    if (selectedFilter === 'olive') return product.oilType.toLowerCase().includes('olive');
    if (selectedFilter === 'sunflower') return product.oilType.toLowerCase().includes('sunflower');
    if (selectedFilter === 'reserve') return product.isPlaceholder;
    return true;
  });

  return (
    <section id="catalogue-section" className="py-16 sm:py-24 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#546E44] mb-2">
              <span>The Four-Oil Cellar</span>
              <span aria-hidden="true">·</span>
              <span>Curated Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E291C] tracking-tight">
              Essential Culinary Oils
            </h2>
            <p className="text-sm text-[#5C5141] mt-2 max-w-xl">
              Each oil serves a distinct culinary function in your kitchen—from pungent regional marinades to delicate salad dressings and high-heat roasting.
            </p>
          </div>

          {/* Interactive filter tabs (clean segmented buttons as allowed in Frontend Design) */}
          <div className="flex items-center p-1 bg-[#EFE9DD] rounded-lg border border-[#DDD3C3] overflow-x-auto">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#FAF8F5] text-[#1E291C] shadow-xs font-semibold'
                  : 'text-[#695D4D] hover:text-[#1E291C]'
              }`}
            >
              All 4 Oils
            </button>
            <button
              onClick={() => setSelectedFilter('mustard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'mustard'
                  ? 'bg-[#FAF8F5] text-[#1E291C] shadow-xs font-semibold'
                  : 'text-[#695D4D] hover:text-[#1E291C]'
              }`}
            >
              Mustard
            </button>
            <button
              onClick={() => setSelectedFilter('olive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'olive'
                  ? 'bg-[#FAF8F5] text-[#1E291C] shadow-xs font-semibold'
                  : 'text-[#695D4D] hover:text-[#1E291C]'
              }`}
            >
              Olive
            </button>
            <button
              onClick={() => setSelectedFilter('sunflower')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'sunflower'
                  ? 'bg-[#FAF8F5] text-[#1E291C] shadow-xs font-semibold'
                  : 'text-[#695D4D] hover:text-[#1E291C]'
              }`}
            >
              Sunflower
            </button>
            <button
              onClick={() => setSelectedFilter('reserve')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'reserve'
                  ? 'bg-[#FAF8F5] text-[#1E291C] shadow-xs font-semibold'
                  : 'text-[#695D4D] hover:text-[#1E291C]'
              }`}
            >
              Slot #4 Reserve
            </button>
          </div>
        </div>

        {/* Product Grid - Exactly 4 slots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Informative footnote regarding Slot 4 and transparency */}
        <div className="mt-12 p-4 rounded-xl bg-[#F4EFE6] border border-[#DFD5C3] text-xs text-[#594E3F] flex items-start gap-3">
          <Info className="w-5 h-5 text-[#546E44] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-[#1E291C]">Catalogue Transparency Note:</span> Harvest &amp; Grove operates a disciplined 4-product catalogue. Product Slot #4 is a configurable specialty slot managed in real time via the Store Admin Dashboard. Prices, stock limits, and shipping destinations are tailored for {country === 'CA' ? 'Canada (CAD)' : 'India (INR)'} without arbitrary currency conversion.
          </div>
        </div>
      </div>
    </section>
  );
};
