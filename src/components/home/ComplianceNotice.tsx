import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AlertCircle, Scale, Shield, CheckCircle } from 'lucide-react';

export const ComplianceNotice: React.FC = () => {
  const { country, settings } = useStore();

  return (
    <section className="py-12 bg-[#EFE9DD]/80 border-t border-[#DFD5C2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#FAF8F5] border border-[#DDD1BE] p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#73634E] mb-2">
            <Scale className="w-4 h-4 text-[#546E44]" />
            <span>Food Safety, Labeling &amp; Regulatory Framework</span>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1E291C]">
            Edible Oil Regulatory Standards &amp; Mandatory Declarations
          </h3>

          <p className="text-xs sm:text-sm text-[#594C3B] mt-2 leading-relaxed">
            As a culinary food business, Harvest &amp; Grove strictly adheres to verified food safety disclosure guidelines. We refrain from making unverified medicinal, disease-prevention, or cholesterol-lowering claims. All mandatory label fields—including net metric volume, full ingredient declarations, lot numbers, country of origin, and nutrition facts tables—are documented and configurable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[#EAE0D1]">
            {/* Canada requirements */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base" role="img" aria-label="Canada">🇨🇦</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E291C]">
                  Canadian Market Compliance (CFIA &amp; Health Canada)
                </h4>
              </div>
              <p className="text-xs text-[#635544] leading-relaxed">
                {settings.cfiaAdvisoryText}
              </p>
              <ul className="text-[11px] text-[#706250] space-y-1 list-disc list-inside">
                <li>Bilingual (English/French) packaging specifications supported</li>
                <li>Metric net quantity (ml / L) declaration required</li>
                <li>Mustard oil designated strictly as a culinary cooking oil</li>
                <li>Basic grocery GST/HST zero-rated tax rules applicable to pure staple oils</li>
              </ul>
            </div>

            {/* India requirements */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base" role="img" aria-label="India">🇮🇳</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E291C]">
                  Indian Market Compliance (FSSAI &amp; Legal Metrology)
                </h4>
              </div>
              <p className="text-xs text-[#635544] leading-relaxed">
                {settings.fssaiAdvisoryText}
              </p>
              <ul className="text-[11px] text-[#706250] space-y-1 list-disc list-inside">
                <li>FSSAI 14-digit license number and logo placement requirements</li>
                <li>Legal Metrology declaration of maximum retail price (MRP) &amp; net quantity</li>
                <li>Single-oil purity declaration with zero argemone or prohibited coloring</li>
                <li>GST HSN code 1515/1509/1512 tax categorization (typically 5%)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EAE0D1] flex items-center justify-between text-[11px] text-[#807260]">
            <span>
              <strong>Owner Advisory:</strong> Commercial compliance depends on your actual operating entity, local business licenses, and importing permits. Configurable in Admin.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
