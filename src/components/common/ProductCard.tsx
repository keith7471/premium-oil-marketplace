import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { BottleVisual } from './BottleVisual';
import { Plus, Check, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { country, currency, addToCart, openProductPage, formatCurrency } = useStore();

  const marketPrice = country === 'CA' ? product.prices.CA : product.prices.IN;
  const isAvailableInCountry = marketPrice.isAvailable;
  const price = marketPrice.amount;
  const isOutOfStock = product.stock <= 0;

  return (
    <article className="group bg-[#FAF8F5] rounded-xl border border-[#E4DACD] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-[#CFC3B0]">
      {/* Product Visual Container (takes 65-70% visual weight) */}
      <div
        onClick={() => openProductPage(product.slug)}
        className="relative h-72 sm:h-80 w-full cursor-pointer overflow-hidden bg-[#F3EEE5] border-b border-[#E8DFD3]"
      >
        <BottleVisual
          type={product.imageFallback}
          bottleSize={product.bottleSize}
          isPlaceholder={product.isPlaceholder}
          className="w-full h-full"
        />

        {/* Quiet Top Status Tag (Anti-Pill discipline: clean unboxed text) */}
        <div className="absolute top-3 left-3 text-[11px] font-semibold tracking-wider uppercase text-[#544837]">
          {product.isPlaceholder ? (
            <span className="text-[#875525] font-bold">Slot #4 · Configurable</span>
          ) : isOutOfStock ? (
            <span className="text-[#8F2D2D]">Out of Stock</span>
          ) : !isAvailableInCountry ? (
            <span className="text-[#78634B]">Not Available in {country === 'CA' ? 'Canada' : 'India'}</span>
          ) : (
            <span className="text-[#3E5C31]">In Stock ({product.stock} units)</span>
          )}
        </div>

        {/* Bottle volume indicator */}
        <div className="absolute top-3 right-3 text-[11px] font-mono font-medium text-[#6B5E4D]">
          {product.bottleSize}
        </div>
      </div>

      {/* Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-[#706453] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px]">{product.oilType}</span>
            <span aria-hidden="true">·</span>
            <span>Smoke Point {product.smokePoint}</span>
          </div>

          <h3
            onClick={() => openProductPage(product.slug)}
            className="text-base sm:text-lg font-serif font-bold text-[#1E291C] hover:text-[#3B5433] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#615545] mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Actions Row */}
        <div className="mt-5 pt-4 border-t border-[#EDE5DA] flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#786C5B] uppercase tracking-wider font-medium">
              Price ({currency})
            </div>
            {isAvailableInCountry ? (
              <div className="text-base sm:text-lg font-mono font-bold text-[#1E291C]">
                {formatCurrency(price)}
              </div>
            ) : (
              <div className="text-xs text-[#966316] font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Requires config for {country}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openProductPage(product.slug)}
              className="px-3 py-2 text-xs font-semibold text-[#443B2E] hover:text-[#1E291C] border border-[#DDD3C3] rounded-lg hover:bg-[#EFEAE0] transition-colors cursor-pointer whitespace-nowrap"
            >
              Details
            </button>

            <button
              onClick={() => addToCart(product, 1)}
              disabled={!isAvailableInCountry || isOutOfStock}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#243522] text-[#F7F4EE] hover:bg-[#182516] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs active:translate-y-px"
              aria-label={`Add ${product.name} to bag`}
            >
              <Plus className="w-3.5 h-3.5 text-[#D8C69F]" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
