import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BottleVisual } from '../components/common/BottleVisual';
import { ProductCard } from '../components/common/ProductCard';
import {
  ArrowLeft,
  Plus,
  Minus,
  Check,
  AlertCircle,
  ShieldCheck,
  Truck,
  Droplets,
  Thermometer,
  Package,
  Calendar,
  Layers,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    activeProductSlug,
    products,
    country,
    currency,
    addToCart,
    setActiveView,
    formatCurrency,
    settings,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'culinary' | 'safety'>('details');

  const product = products.find((p) => p.slug === activeProductSlug) || products[0];
  const marketPrice = country === 'CA' ? product.prices.CA : product.prices.IN;
  const isAvailable = marketPrice.isAvailable;
  const unitPrice = marketPrice.amount;
  const isOutOfStock = product.stock <= 0;

  // 3 other products from the 4-product catalogue
  const relatedProducts = products.filter((p) => p.id !== product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-xs font-semibold text-[#6E6150] hover:text-[#1E291C] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </button>

        {/* Main PDP Grid (Left: Large Gallery, Right: Contiguous Purchase Module) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Column: Visual Showcase (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-96 sm:h-[480px] w-full rounded-2xl overflow-hidden bg-[#F2EDE3] border border-[#DDD1BE] shadow-sm flex items-center justify-center">
              <BottleVisual
                type={product.imageFallback}
                bottleSize={product.bottleSize}
                isPlaceholder={product.isPlaceholder}
                className="w-full h-full scale-100"
              />

              {product.isPlaceholder && (
                <div className="absolute top-4 left-4 bg-[#784F2B] text-white px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
                  Admin Configurable Slot #4
                </div>
              )}
            </div>

            {/* Micro specifications badges row */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#DFD5C4]">
                <span className="text-[10px] text-[#786C5A] uppercase block">Bottle Volume</span>
                <span className="font-semibold text-[#1E291C] font-mono">{product.bottleSize}</span>
              </div>
              <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#DFD5C4]">
                <span className="text-[10px] text-[#786C5A] uppercase block">Smoke Point</span>
                <span className="font-semibold text-[#1E291C] font-mono">{product.smokePoint}</span>
              </div>
              <div className="p-3 bg-[#F4EFE6] rounded-xl border border-[#DFD5C4]">
                <span className="text-[10px] text-[#786C5A] uppercase block">Container</span>
                <span className="font-semibold text-[#1E291C] truncate block">{product.containerType.split(' ')[0]} Glass</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Quiet unboxed kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#546E44] mb-2">
                <span>{product.oilType}</span>
                <span aria-hidden="true">·</span>
                <span>{product.isOriginVerified ? product.countryOfOrigin : 'Origin Pending Verification'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E291C] tracking-tight">
                {product.name}
              </h1>

              <p className="text-sm font-serif italic text-[#635543] mt-2">
                {product.tagline}
              </p>

              {/* Price Row */}
              <div className="mt-5 p-4 rounded-xl bg-[#F5EFE4] border border-[#DDD2C0] flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#736553] font-medium block">
                    Price for {country === 'CA' ? 'Canada (CAD)' : 'India (INR)'}
                  </span>
                  {isAvailable ? (
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-[#1E291C]">
                      {formatCurrency(unitPrice)}
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-[#8C3A22] flex items-center gap-1.5 mt-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>Not currently configured for delivery in {country}</span>
                    </div>
                  )}
                </div>

                <div className="text-right text-xs">
                  {isOutOfStock ? (
                    <span className="font-semibold text-[#8F2D2D]">Currently Out of Stock</span>
                  ) : (
                    <span className="font-medium text-[#38542B] flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>{product.stock} Units in Cellar Stock</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Short description */}
              <p className="text-sm text-[#544737] mt-4 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Quantity Stepper & Buy Action Buttons */}
              {isAvailable && !isOutOfStock && (
                <div className="mt-6 space-y-4 pt-4 border-t border-[#EAE1D3]">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-[#4F4333]">Select Quantity:</span>
                    <div className="flex items-center border border-[#CBBDA9] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-2 text-[#5F5342] hover:bg-[#EAE2D3] rounded-l-lg transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-sm font-mono font-semibold text-[#1F2B1C]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        disabled={quantity >= product.stock}
                        className="p-2 text-[#5F5342] hover:bg-[#EAE2D3] rounded-r-lg transition-colors cursor-pointer disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-[#706453]">
                      Line Total: <strong className="font-mono text-[#1E291C]">{formatCurrency(unitPrice * quantity)}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => addToCart(product, quantity)}
                      className="w-full py-3.5 rounded-lg border border-[#243522] bg-[#243522] text-[#F7F4EE] font-semibold text-xs uppercase tracking-wider hover:bg-[#162314] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:translate-y-px"
                    >
                      <Plus className="w-4 h-4 text-[#D8C69F]" />
                      <span>Add to Bag</span>
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="w-full py-3.5 rounded-lg border border-[#DDD0BC] bg-[#FAF8F5] text-[#1E291C] font-semibold text-xs uppercase tracking-wider hover:bg-[#EFEAE0] transition-colors flex items-center justify-center gap-2 cursor-pointer active:translate-y-px"
                    >
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Delivery info box */}
              <div className="mt-6 p-4 rounded-xl bg-[#F4EFE6] border border-[#DDD3C2] text-xs text-[#5C5040] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-[#1E291C]">
                  <Truck className="w-4 h-4 text-[#546E44]" />
                  <span>
                    Fulfillment for {country === 'CA' ? 'Canada (Domestic Hub)' : 'India (Domestic Dispatch)'}
                  </span>
                </div>
                <p className="leading-relaxed">
                  {country === 'CA'
                    ? `Shipped via express ground courier from Toronto, ON. Delivery typically takes 2–5 business days. Free delivery on orders over $${settings.freeShippingThresholdCA.toFixed(0)} CAD.`
                    : `Dispatched with temperature-conscious packing from Delhi NCR. Delivery within 3–6 business days across all states. Free shipping on orders over ₹${settings.freeShippingThresholdIN.toLocaleString('en-IN')}.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Specifications & Labels */}
        <div className="mt-16 pt-10 border-t border-[#E5DACB]">
          <div className="flex items-center gap-2 border-b border-[#DDD1BF] pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-b-2 border-[#243522] text-[#1E291C] font-bold bg-[#EFE9DD]'
                  : 'text-[#695C4C] hover:text-[#1E291C]'
              }`}
            >
              Full Description &amp; Origin
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'nutrition'
                  ? 'border-b-2 border-[#243522] text-[#1E291C] font-bold bg-[#EFE9DD]'
                  : 'text-[#695C4C] hover:text-[#1E291C]'
              }`}
            >
              Nutrition Facts Table
            </button>
            <button
              onClick={() => setActiveTab('culinary')}
              className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'culinary'
                  ? 'border-b-2 border-[#243522] text-[#1E291C] font-bold bg-[#EFE9DD]'
                  : 'text-[#695C4C] hover:text-[#1E291C]'
              }`}
            >
              Culinary Applications
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'safety'
                  ? 'border-b-2 border-[#243522] text-[#1E291C] font-bold bg-[#EFE9DD]'
                  : 'text-[#695C4C] hover:text-[#1E291C]'
              }`}
            >
              Food Label &amp; Compliance Notes
            </button>
          </div>

          <div className="p-6 bg-[#FAF8F5] border border-[#DDD1BF] border-t-0 rounded-b-xl">
            {activeTab === 'details' && (
              <div className="space-y-4 text-xs sm:text-sm text-[#4E4233] leading-relaxed max-w-4xl">
                <p className="whitespace-pre-line">{product.detailedDescription}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAE0D0]">
                  <div>
                    <h4 className="font-bold text-[#1E291C]">Ingredients:</h4>
                    <p className="text-xs text-[#5F5141] mt-0.5">{product.ingredients}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E291C]">Storage &amp; Handling:</h4>
                    <p className="text-xs text-[#5F5141] mt-0.5">{product.storageInstructions}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#6B5E4E]">
                  <div>
                    <strong>Country of Origin:</strong> {product.countryOfOrigin}
                  </div>
                  <div>
                    <strong>Best Before:</strong> {product.bestBefore}
                  </div>
                  <div>
                    <strong>Batch / Lot Format:</strong> {product.batchLotFormat}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="max-w-md bg-white p-5 rounded-lg border-2 border-[#243522] text-xs font-sans">
                <div className="border-b-4 border-black pb-1 mb-2">
                  <h3 className="text-xl font-bold font-serif tracking-tight">Nutrition Facts</h3>
                  <p className="text-xs">Serving Size: {product.nutritionalInfo.servingSize}</p>
                </div>
                <div className="border-b-2 border-black py-1 font-bold flex justify-between">
                  <span>Calories per serving</span>
                  <span className="font-mono text-sm">{product.nutritionalInfo.caloriesPerServing}</span>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-1 flex justify-between font-bold">
                    <span>Total Fat</span>
                    <span className="font-mono">{product.nutritionalInfo.totalFat}</span>
                  </div>
                  <div className="py-1 pl-4 flex justify-between text-gray-700">
                    <span>Saturated Fat</span>
                    <span className="font-mono">{product.nutritionalInfo.saturatedFat}</span>
                  </div>
                  <div className="py-1 pl-4 flex justify-between text-gray-700">
                    <span>Trans Fat</span>
                    <span className="font-mono">{product.nutritionalInfo.transFat}</span>
                  </div>
                  {product.nutritionalInfo.polyunsaturatedFat && (
                    <div className="py-1 pl-4 flex justify-between text-gray-700">
                      <span>Polyunsaturated Fat</span>
                      <span className="font-mono">{product.nutritionalInfo.polyunsaturatedFat}</span>
                    </div>
                  )}
                  {product.nutritionalInfo.monounsaturatedFat && (
                    <div className="py-1 pl-4 flex justify-between text-gray-700">
                      <span>Monounsaturated Fat</span>
                      <span className="font-mono">{product.nutritionalInfo.monounsaturatedFat}</span>
                    </div>
                  )}
                  <div className="py-1 flex justify-between">
                    <span>Cholesterol</span>
                    <span className="font-mono">{product.nutritionalInfo.cholesterol}</span>
                  </div>
                  <div className="py-1 flex justify-between">
                    <span>Sodium</span>
                    <span className="font-mono">{product.nutritionalInfo.sodium}</span>
                  </div>
                  <div className="py-1 flex justify-between">
                    <span>Total Carbohydrates</span>
                    <span className="font-mono">{product.nutritionalInfo.totalCarbohydrates}</span>
                  </div>
                  <div className="py-1 flex justify-between">
                    <span>Protein</span>
                    <span className="font-mono">{product.nutritionalInfo.protein}</span>
                  </div>
                </div>
                <div className="border-t-2 border-black pt-2 mt-2 text-[10px] text-gray-500">
                  * Percent Daily Values (DV) are based on a 2,000 calorie diet. Pure culinary oil contains zero sugars or dietary fiber.
                </div>
              </div>
            )}

            {activeTab === 'culinary' && (
              <div className="space-y-4 max-w-3xl">
                <h4 className="text-sm font-bold text-[#1E291C]">Recommended Cooking &amp; Culinary Uses</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#524434]">
                  {product.culinaryUses.map((use, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#546E44] font-bold">✓</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-[#544737] leading-relaxed">
                <div className="p-4 rounded-lg bg-[#F5EFE4] border border-[#DDD2BF]">
                  <h4 className="font-bold text-[#1E291C] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#546E44]" />
                    <span>Food Regulatory Notice</span>
                  </h4>
                  <p className="mt-1 text-xs text-[#635544]">{product.foodSafetyNotice}</p>
                </div>

                <div className="text-xs text-[#736553] space-y-1">
                  <p>
                    <strong>Lot &amp; Traceability:</strong> Packed under clean room conditions in food-grade packaging.
                  </p>
                  <p>
                    <strong>No Health Claims Policy:</strong> Harvest &amp; Grove products are marketed purely as culinary cooking ingredients. We make no unverified health, therapeutic, or cure claims.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products: The remaining 3 oils in the 4-oil catalogue */}
        <div className="mt-20 pt-12 border-t border-[#E5DACB]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#546E44]">
                The Complete Cellar
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1E291C] mt-1">
                Explore the Other 3 Oils
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
