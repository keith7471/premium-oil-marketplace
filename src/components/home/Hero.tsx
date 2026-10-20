import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BottleVisual } from '../common/BottleVisual';
import { ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  const { country, currency, settings, setActiveView } = useStore();

  const scrollToCatalogue = () => {
    const el = document.getElementById('catalogue-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4EFE6] via-[#FAF8F5] to-[#FAF8F5] border-b border-[#E6DDD0] pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E2D5B5]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#D4E3CC]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet text kicker - zero-pill discipline */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#546E44]">
              <span>Culinary Precision</span>
              <span aria-hidden="true">·</span>
              <span>Single Harvest Extraction</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C261A] tracking-tight leading-[1.15] text-balance">
              Bring Better Oils to Your Everyday Cooking.
            </h1>

            <p className="text-base sm:text-lg text-[#52483A] leading-relaxed max-w-2xl">
              Discover our focused four-oil collection: raw cold-pressed mustard oil with authentic pungent character, single-estate extra virgin olive oil, Canadian prairie high-oleic sunflower oil, and an artisanal reserve selection. Pure botanical fats crafted for everyday kitchen versatility.
            </p>

            {/* Market Context Notice */}
            <div className="flex items-center gap-2 text-xs text-[#6B5E4F] bg-[#EFE9DD]/80 border border-[#DED3C2] rounded-lg p-3 max-w-lg">
              <span className="text-base" role="img" aria-label="Globe">🌐</span>
              <div>
                <span className="font-semibold text-[#1C261A]">
                  Fulfilling directly in {country === 'CA' ? 'Canada (Domestic CAD)' : 'India (Domestic INR)'}.
                </span>{' '}
                <span className="text-[#756857]">
                  Transparent origin disclosures and food-grade UV-shielded bottles.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToCatalogue}
                className="px-6 py-3.5 rounded-lg bg-[#243522] text-[#F7F4EE] font-semibold text-sm hover:bg-[#162314] transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:translate-y-px"
              >
                <span>Shop Our Oils</span>
                <ArrowRight className="w-4 h-4 text-[#D8C69F]" />
              </button>

              <button
                onClick={scrollToStory}
                className="px-6 py-3.5 rounded-lg bg-[#FAF8F5] text-[#332A1E] border border-[#DDD3C3] font-semibold text-sm hover:bg-[#EFEAE0] transition-colors cursor-pointer"
              >
                Explore Our Story
              </button>
            </div>

            {/* Trust points row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8DFD3] text-xs text-[#6B5F50]">
              <div>
                <p className="font-serif font-bold text-[#1C261A] text-sm sm:text-base">100% Pure</p>
                <p className="mt-0.5">Cold expeller-pressed, zero chemical solvents</p>
              </div>
              <div>
                <p className="font-serif font-bold text-[#1C261A] text-sm sm:text-base">Glass Packaged</p>
                <p className="mt-0.5">UV-protective tinted bottles preserve freshness</p>
              </div>
              <div>
                <p className="font-serif font-bold text-[#1C261A] text-sm sm:text-base">Zero Blends</p>
                <p className="mt-0.5">Full batch traceability &amp; clear origin labels</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Trio (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Frame */}
            <div className="relative w-full max-w-md bg-gradient-to-tr from-[#EBE3D3] via-[#FAF8F5] to-[#F1ECE1] rounded-2xl p-6 border border-[#DDD1BE] shadow-xl">
              <div className="text-center mb-4">
                <span className="text-[11px] uppercase tracking-widest text-[#73634E] font-semibold block">
                  The Four Essential Culinary Oils
                </span>
                <span className="text-xs text-[#4A5D3F] font-serif italic">
                  Mustard · Olive · Sunflower · Reserve
                </span>
              </div>

              {/* Trio Overlapping Bottles Presentation */}
              <div className="relative h-72 flex items-center justify-center">
                <div className="absolute left-4 z-10 w-36 h-64 scale-90 -rotate-3 transition-transform hover:rotate-0 hover:z-30 duration-300">
                  <BottleVisual type="mustard" bottleSize="750 ml" className="w-full h-full rounded-xl shadow-md border border-[#E0D2BE]" />
                </div>
                <div className="relative z-20 w-44 h-72 transition-transform hover:scale-105 duration-300">
                  <BottleVisual type="olive" bottleSize="500 ml" className="w-full h-full rounded-xl shadow-xl border border-[#CBD8C4]" />
                </div>
                <div className="absolute right-4 z-10 w-36 h-64 scale-90 rotate-3 transition-transform hover:rotate-0 hover:z-30 duration-300">
                  <BottleVisual type="sunflower" bottleSize="1000 ml" className="w-full h-full rounded-xl shadow-md border border-[#EBE0C4]" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DFD5C3] flex items-center justify-between text-xs text-[#5C5040]">
                <span>Pure Seed &amp; Fruit Oils</span>
                <span className="font-mono font-medium">4 Curated Bottles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
