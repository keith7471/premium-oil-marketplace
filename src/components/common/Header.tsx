import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Globe, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    country,
    currency,
    setCountry,
    cartItemCount,
    setIsCartOpen,
    activeView,
    setActiveView,
    settings,
  } = useStore();

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7DFD3] transition-colors duration-200">
      {/* Top micro announcement bar */}
      <div className="bg-[#1C261B] text-[#E8E0D2] px-4 py-1.5 text-xs text-center font-normal tracking-wide flex items-center justify-center gap-3">
        <span>
          {country === 'CA'
            ? `Complimentary Canadian courier shipping on orders over $${settings.freeShippingThresholdCA.toFixed(0)} CAD`
            : `Complimentary express delivery across India on orders over ₹${settings.freeShippingThresholdIN.toLocaleString('en-IN')}`}
        </span>
        <span className="text-[#998A78]" aria-hidden="true">·</span>
        <span className="hidden sm:inline text-[#D8C69F]">CFIA &amp; FSSAI Standard Food Grade Packaging</span>
      </div>

      {/* Main 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#1E291C] group-hover:text-[#3B5433] transition-colors whitespace-nowrap shrink-0 block">
            {settings.brandName}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#786D5E] font-medium block -mt-0.5">
            Artisanal Edible Oils
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A4237]">
          <button
            onClick={() => {
              setActiveView('home');
              const el = document.getElementById('catalogue-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#1E291C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 cursor-pointer"
          >
            Shop Oils
          </button>

          <button
            onClick={() => {
              setActiveView('home');
              const el = document.getElementById('cooking-guide-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#1E291C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 cursor-pointer"
          >
            Culinary Guide
          </button>

          <button
            onClick={() => {
              setActiveView('home');
              const el = document.getElementById('quality-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#1E291C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 cursor-pointer"
          >
            Quality &amp; Sourcing
          </button>

          <button
            onClick={() => {
              setActiveView('home');
              const el = document.getElementById('story-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#1E291C] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 cursor-pointer"
          >
            Our Story
          </button>

          <button
            onClick={() => {
              setActiveView('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#645849] hover:text-[#1E291C] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#5C734B]" />
            <span>Store Admin</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action container */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Country / Currency Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#DCD3C5] bg-[#F7F4EE] text-xs font-medium text-[#2E2820] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
              aria-label="Select delivery market and currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#5C734B]" />
              <span className="font-semibold">{country}</span>
              <span className="text-[#756A5B]">({currency})</span>
            </button>

            {isCountryDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl bg-[#FCFAF7] border border-[#DDD3C3] shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setIsCountryDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8C7E6D] uppercase tracking-wider border-b border-[#EFE8DD]">
                  Select Market &amp; Currency
                </div>

                <button
                  onClick={() => {
                    setCountry('CA');
                    setIsCountryDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between transition-colors ${
                    country === 'CA' ? 'bg-[#EFEAE0] text-[#1E291C] font-semibold' : 'text-[#4A4237] hover:bg-[#F5F0E6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base" role="img" aria-label="Canada">🇨🇦</span>
                    <div>
                      <p className="font-medium">Canada (Primary)</p>
                      <p className="text-[10px] text-[#7A6E5F]">Prices in Canadian Dollars (CAD)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold">$ CAD</span>
                </button>

                <button
                  onClick={() => {
                    setCountry('IN');
                    setIsCountryDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-xs flex items-center justify-between transition-colors ${
                    country === 'IN' ? 'bg-[#EFEAE0] text-[#1E291C] font-semibold' : 'text-[#4A4237] hover:bg-[#F5F0E6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base" role="img" aria-label="India">🇮🇳</span>
                    <div>
                      <p className="font-medium">India (Secondary)</p>
                      <p className="text-[10px] text-[#7A6E5F]">Prices in Indian Rupees (INR)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold">₹ INR</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary Cart Action Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#243522] text-[#F7F4EE] hover:bg-[#182516] transition-colors text-xs font-medium cursor-pointer shadow-sm active:translate-y-px"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#D8C69F]" />
            <span className="font-semibold hidden sm:inline">Bag</span>
            <span className="inline-flex items-center justify-center bg-[#D8C69F] text-[#1C261B] text-[11px] font-bold rounded-full w-5 h-5">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
