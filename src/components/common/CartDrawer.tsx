import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BottleVisual } from './BottleVisual';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingProgress,
    isFreeShippingEligible,
    currentShippingRate,
    formatCurrency,
    country,
    currency,
    settings,
    setActiveView,
  } = useStore();

  if (!isCartOpen) return null;

  const threshold = country === 'CA' ? settings.freeShippingThresholdCA : settings.freeShippingThresholdIN;
  const remainingForFree = Math.max(0, threshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E2D9CB] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8DFD3] flex items-center justify-between bg-[#F4EFE6]">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#1F2B1C]">Your Shopping Bag</h2>
              <div className="flex items-center gap-2 text-xs text-[#6F6454] mt-0.5">
                <span>Market: {country === 'CA' ? 'Canada' : 'India'}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{currency}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-[#6F6454] hover:text-[#1F2B1C] hover:bg-[#EAE2D3] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3.5 bg-[#EAE2D3]/70 border-b border-[#DFD5C4] text-xs">
            {isFreeShippingEligible ? (
              <p className="text-[#2F4725] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4B6B3C]" />
                You have unlocked complimentary {country === 'CA' ? 'Canadian' : 'Indian'} delivery!
              </p>
            ) : (
              <p className="text-[#594E3F]">
                Add <span className="font-semibold text-[#1F2B1C]">{formatCurrency(remainingForFree)}</span> more for complimentary shipping.
              </p>
            )}
            <div className="w-full bg-[#D7CDBB] rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-[#47663B] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EBE3D7]">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EFE9DD] flex items-center justify-center text-[#8C7D68]">
                  <BottleVisual type="mustard" className="w-10 h-10 opacity-70" />
                </div>
                <h3 className="text-base font-serif font-semibold text-[#292219]">Your bag is currently empty</h3>
                <p className="text-xs text-[#736756] mt-1 max-w-xs mx-auto">
                  Explore our cold-pressed mustard, estate olive, and sunflower oils crafted for culinary versatility.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('home');
                    const el = document.getElementById('catalogue-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-6 px-5 py-2.5 rounded-lg bg-[#243522] text-[#F7F4EE] text-xs font-semibold hover:bg-[#182516] transition-colors cursor-pointer"
                >
                  Explore Our Oils
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const product = item.product;
                const unitPrice = country === 'CA' ? product.prices.CA.amount : product.prices.IN.amount;
                const itemSubtotal = unitPrice * item.quantity;
                const maxStock = product.stock;

                return (
                  <div key={product.id} className="py-4 flex gap-4 items-start">
                    {/* Thumbnail */}
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-[#EFE9DD] shrink-0 border border-[#DCD1BF]">
                      <BottleVisual
                        type={product.imageFallback}
                        bottleSize={product.bottleSize}
                        isPlaceholder={product.isPlaceholder}
                        className="w-full h-full scale-90"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#1F2B1C] leading-snug line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#968774] hover:text-[#7A1E1E] transition-colors p-1 -mr-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#6F6352] mt-0.5">
                        <span>{product.bottleSize}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{formatCurrency(unitPrice)} each</span>
                      </div>

                      {/* Quantity Controls & Line Subtotal */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#CFBFAB] rounded-md bg-[#FAF8F5]">
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity - 1)}
                            className="p-1.5 text-[#5F5342] hover:bg-[#EAE2D3] rounded-l-md transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono font-semibold text-[#1F2B1C]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity + 1)}
                            disabled={item.quantity >= maxStock}
                            className="p-1.5 text-[#5F5342] hover:bg-[#EAE2D3] rounded-r-md transition-colors cursor-pointer disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-mono font-bold text-[#1E291C]">
                          {formatCurrency(itemSubtotal)}
                        </span>
                      </div>

                      {item.quantity >= maxStock && (
                        <p className="text-[10px] text-[#A6601D] mt-1">Maximum stock reached ({maxStock} available)</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E5DCCE] bg-[#F4EFE6] space-y-3">
              <div className="space-y-1.5 text-xs text-[#594E3F]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono font-semibold text-[#1E291C]">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Courier Delivery</span>
                  <span className="font-mono">
                    {isFreeShippingEligible ? (
                      <span className="text-[#36562A] font-semibold">Free</span>
                    ) : (
                      formatCurrency(currentShippingRate)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#7A6D5C]">
                  <span>Applicable Destination Taxes</span>
                  <span>Calculated at checkout step</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DFD5C4] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#1E291C]">Estimated Subtotal</span>
                <span className="text-lg font-mono font-bold text-[#1E291C]">
                  {formatCurrency(cartSubtotal + currentShippingRate)}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-lg bg-[#243522] text-[#FAF8F5] font-semibold text-sm hover:bg-[#162314] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:translate-y-px"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D8C69F]" />
              </button>

              <p className="text-[11px] text-center text-[#7A6E5F]">
                Secure 256-bit encrypted checkout · Canada &amp; India domestic fulfillment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
