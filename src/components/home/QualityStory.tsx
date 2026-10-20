import React from 'react';
import { ShieldCheck, Droplets, Sun, Sparkles, CheckCircle2 } from 'lucide-react';

export const QualityStory: React.FC = () => {
  return (
    <section id="quality-section" className="py-16 sm:py-24 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Sourcing & Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#546E44]">
              <span>Transparency &amp; Origin</span>
              <span aria-hidden="true">·</span>
              <span>Our Standards</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1E291C] tracking-tight">
              Honest Sourcing, Mechanical Extraction, and Dark Glass Protection.
            </h2>

            <p className="text-sm sm:text-base text-[#564939] leading-relaxed">
              Most industrial cooking oils undergo extreme solvent processing with hexane, high-heat deodorization at 260°C, and chemical bleaching. At Harvest &amp; Grove, we honor the integrity of the plant seed and fruit.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#EAE2D3] text-[#243522] shrink-0 mt-0.5">
                  <Droplets className="w-4 h-4 text-[#546E44]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1E291C]">Mechanical Cold Extraction</h3>
                  <p className="text-xs text-[#635645] mt-0.5 leading-relaxed">
                    Extracted using hydraulic wooden presses (kachi ghani) or mechanical continuous expellers strictly regulated below 45°C. No artificial chemicals, no petroleum solvents.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#EAE2D3] text-[#243522] shrink-0 mt-0.5">
                  <Sun className="w-4 h-4 text-[#A87B11]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1E291C]">Photoprotective Glass Packaging</h3>
                  <p className="text-xs text-[#635645] mt-0.5 leading-relaxed">
                    Light and ambient heat are the natural enemies of botanical oils. We bottle exclusively in heavyweight amber and UV-shielded dark green glass with tamper-evident caps to protect delicate fatty acids from oxidation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#EAE2D3] text-[#243522] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#47663B]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1E291C]">Single-Origin Batch Traceability</h3>
                  <p className="text-xs text-[#635645] mt-0.5 leading-relaxed">
                    Every bottle is stamped with an explicit Lot Number, pressing date, and verified regional origin—from Rajasthan mustard farming cooperatives to Jaén olive estates and Canadian prairie sunflower growers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Card & Story Box */}
          <div id="story-section" className="lg:col-span-5 scroll-mt-24">
            <div className="bg-[#F4EEE4] rounded-2xl p-7 border border-[#DDD0BC] shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#73634E]">
                <span>Our Founding Mission</span>
              </div>

              <blockquote className="font-serif italic text-base sm:text-lg text-[#1E291C] leading-snug">
                &ldquo;We founded Harvest &amp; Grove to eliminate the confusion in modern grocery aisles. Four oils, pure pressings, transparent labels, and no compromises for the home cook.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-[#DFD3C0] space-y-3 text-xs text-[#5C503E]">
                <p>
                  <strong>Canada Hub:</strong> Serving Canadian home cooks with prompt local fulfillment from Ontario, with bilingual packaging compliance and zero-rated staple food transparency.
                </p>
                <p>
                  <strong>India Hub:</strong> Celebrating traditional cold-pressed kachi ghani heritage with dedicated fulfillment across all major Indian states in compliance with national food standards.
                </p>
              </div>

              <div className="pt-2 text-[11px] text-[#786A58] border-t border-[#DFD3C0]">
                Harvest &amp; Grove Culinary Artisans · Established 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
