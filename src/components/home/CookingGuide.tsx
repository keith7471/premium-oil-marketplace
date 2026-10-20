import React from 'react';
import { Flame, Salad, Utensils, ThermometerSun } from 'lucide-react';

export const CookingGuide: React.FC = () => {
  return (
    <section id="cooking-guide-section" className="py-16 sm:py-24 bg-[#F5EFE4] border-y border-[#E2D8C7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#546E44] mb-2">
            <span>Culinary Science &amp; Techniques</span>
            <span aria-hidden="true">·</span>
            <span>Neutral Kitchen Reference</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E291C] tracking-tight">
            How to Cook with Each Oil
          </h2>
          <p className="text-sm text-[#5C503F] mt-2 leading-relaxed">
            Every edible oil possesses unique fatty acid structures, smoke points, and aromatic profiles that determine its ideal heat tolerance and culinary application. Here is a factual guide for home cooks and chefs.
          </p>
        </div>

        {/* 3 Oil Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Mustard Oil */}
          <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#DFD4C2] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-[#EBE3D4] pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E6D1B]">
                    Traditional Kachi Ghani
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1E291C]">Mustard Oil</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#9E6D1B] block">250°C</span>
                  <span className="text-[10px] text-[#736552]">480°F Smoke Pt</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#524535] leading-relaxed">
                <div>
                  <h4 className="font-semibold text-[#1E291C] text-xs">Aroma &amp; Heat Behavior</h4>
                  <p className="mt-0.5">
                    Characterized by natural allyl isothiocyanates, giving a pungent wasabi-like kick. Traditional cooks often heat the oil until it reaches a gentle first smoke to mellow the pungency before adding aromatics (a technique known as &ldquo;smoking the oil&rdquo;).
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1E291C] text-xs">Best Culinary Applications</h4>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-[#615444]">
                    <li>Authentic Bengali fish preparations (Ilish &amp; Rui)</li>
                    <li>Tempering whole mustard seeds, fenugreek, and cumin</li>
                    <li>Traditional sun-cured mango &amp; green chili pickles</li>
                    <li>Tandoori spice pastes &amp; roasted cauliflower marinades</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDE5D8] text-[11px] text-[#7A6C59] flex items-center gap-1.5">
              <ThermometerSun className="w-3.5 h-3.5 text-[#9E6D1B]" />
              <span>High-heat stability; pungent aroma when unheated.</span>
            </div>
          </div>

          {/* Card 2: Extra Virgin Olive Oil */}
          <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#DFD4C2] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-[#EBE3D4] pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4E6B35]">
                    Single Estate Press
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1E291C]">Extra Virgin Olive Oil</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#4E6B35] block">195°–205°C</span>
                  <span className="text-[10px] text-[#736552]">385°–400°F Smoke Pt</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#524535] leading-relaxed">
                <div>
                  <h4 className="font-semibold text-[#1E291C] text-xs">Aroma &amp; Heat Behavior</h4>
                  <p className="mt-0.5">
                    Rich in natural olive polyphenols and oleic acid. High heat can volatilize delicate grassy and peppery aromatic compounds; hence best appreciated in cold or gentle cooking situations where flavors remain vibrant.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1E291C] text-xs">Best Culinary Applications</h4>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-[#615444]">
                    <li>Finishing drizzle over warm pasta, soup, or fresh tomatoes</li>
                    <li>Sourdough bread dipping with coarse flaky sea salt</li>
                    <li>Emulsified salad dressings and raw vegetable carpaccios</li>
                    <li>Gentle pan-roasting of tender greens and garlic cloves</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDE5D8] text-[11px] text-[#7A6C59] flex items-center gap-1.5">
              <Salad className="w-3.5 h-3.5 text-[#4E6B35]" />
              <span>Finishing &amp; cold applications maximize aromatic depth.</span>
            </div>
          </div>

          {/* Card 3: High-Oleic Sunflower Oil */}
          <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#DFD4C2] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-[#EBE3D4] pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A17711]">
                    Expeller-Pressed Prairie
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1E291C]">High-Oleic Sunflower</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#A17711] block">232°C</span>
                  <span className="text-[10px] text-[#736552]">450°F Smoke Pt</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#524535] leading-relaxed">
                <div>
                  <h4 className="font-semibold text-[#1E291C] text-xs">Aroma &amp; Heat Behavior</h4>
                  <p className="mt-0.5">
                    Naturally bred high-oleic sunflower seeds produce an oil with &gt;80% monounsaturated fat that resists thermal breakdown and has virtually zero residual scent. It provides superior frying performance without masking food flavors.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1E291C] text-xs">Best Culinary Applications</h4>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-[#615444]">
                    <li>Everyday sautéing, stir-fries, and shallow skillet frying</li>
                    <li>Artisanal baking where a neutral fat texture is required</li>
                    <li>Homemade mayonnaise, aioli, and herb infusions</li>
                    <li>Sheet-pan vegetable roasting at 400°F+ oven temperatures</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EDE5D8] text-[11px] text-[#7A6C59] flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#A17711]" />
              <span>Neutral profile; the kitchen workhorse for high heat.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
