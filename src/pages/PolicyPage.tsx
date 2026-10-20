import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, Lock, HelpCircle } from 'lucide-react';

interface PolicyPageProps {
  type: 'shipping' | 'returns' | 'privacy' | 'terms' | 'faq';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
  const { setActiveView, country, settings } = useStore();

  return (
    <div className="bg-[#FAF8F5] py-12 sm:py-20 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-xs font-semibold text-[#6E6150] hover:text-[#1E291C] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {type === 'shipping' && (
          <div className="bg-white rounded-2xl border border-[#DDD3C2] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#546E44]">
              <Truck className="w-4 h-4" />
              <span>Logistics &amp; Delivery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E291C]">
              Shipping &amp; Delivery Policy
            </h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#544737] leading-relaxed">
              <p>
                Harvest &amp; Grove maintains dual domestic logistics operations to serve our primary market in <strong>Canada</strong> and our secondary market in <strong>India</strong> without unexpected import duties or long international holding delays.
              </p>
              <h3 className="text-base font-bold text-[#1E291C] pt-2">Canada Deliveries</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Dispatched via Canada Post Expedited Parcel or private courier from our Ontario distribution center.</li>
                <li>Standard ground delivery: 3–5 business days ($9.50 CAD, or free over ${settings.freeShippingThresholdCA.toFixed(0)} CAD).</li>
                <li>Express air courier: 1–2 business days ($16.50 CAD).</li>
                <li>Protected inside biodegradable molded pulp inserts designed for heavy glass bottles.</li>
              </ul>

              <h3 className="text-base font-bold text-[#1E291C] pt-2">India Deliveries</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Dispatched via Blue Dart / Delhivery Express from Delhi NCR.</li>
                <li>Standard delivery: 3–6 business days (₹120 INR, or free over ₹{settings.freeShippingThresholdIN.toLocaleString('en-IN')}).</li>
                <li>Express air courier: 2–3 business days (₹250 INR).</li>
                <li>Cash on Delivery (COD) available for eligible urban PIN codes.</li>
              </ul>
            </div>
          </div>
        )}

        {type === 'returns' && (
          <div className="bg-white rounded-2xl border border-[#DDD3C2] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#546E44]">
              <RefreshCw className="w-4 h-4" />
              <span>Customer Satisfaction</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E291C]">
              Returns &amp; Food Quality Guarantee
            </h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#544737] leading-relaxed">
              <p>
                Because our products are premium edible food oils packaged in tamper-evident glass bottles, opened food items cannot be returned to inventory in adherence to Canadian CFIA and Indian FSSAI food hygiene safety protocols.
              </p>
              <h3 className="text-base font-bold text-[#1E291C] pt-2">Transit Breakage Guarantee</h3>
              <p>
                If a bottle arrives cracked, broken, or with a broken factory security seal, simply email a photo of the package to <strong>{settings.contactEmail}</strong> within 48 hours of delivery. We will immediately dispatch a complimentary replacement bottle at zero charge or issue a full refund.
              </p>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="bg-white rounded-2xl border border-[#DDD3C2] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#546E44]">
              <Lock className="w-4 h-4" />
              <span>Data Protection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E291C]">
              Privacy &amp; Data Rights Policy
            </h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#544737] leading-relaxed">
              <p>
                Harvest &amp; Grove respects your privacy in accordance with the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA) and the Indian Digital Personal Data Protection (DPDP) Act.
              </p>
              <h3 className="text-base font-bold text-[#1E291C] pt-2">How We Handle Your Information</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>We only collect customer name, delivery address, email, and phone number necessary for order fulfillment and courier tracking notifications.</li>
                <li>We never store credit card or raw banking credentials; all card processing is tokenized through Stripe or Razorpay.</li>
                <li>We do not sell, rent, or trade your personal data to third-party advertising networks.</li>
              </ul>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="bg-white rounded-2xl border border-[#DDD3C2] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#546E44]">
              <ShieldCheck className="w-4 h-4" />
              <span>Legal Terms</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E291C]">
              Terms of Service
            </h1>
            <div className="space-y-4 text-xs sm:text-sm text-[#544737] leading-relaxed">
              <p>
                By placing an order on Harvest &amp; Grove Oils, you acknowledge that all products are sold strictly as culinary edible cooking oils and food ingredients.
              </p>
              <p>
                Prices are displayed in either Canadian Dollars (CAD) or Indian Rupees (INR) depending on your selected country market. Prices between markets are governed by distinct shipping, packaging, and supply chain rules rather than dynamic currency arbitrage.
              </p>
            </div>
          </div>
        )}

        {type === 'faq' && (
          <div className="bg-white rounded-2xl border border-[#DDD3C2] p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#546E44]">
              <HelpCircle className="w-4 h-4" />
              <span>Questions &amp; Answers</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E291C]">
              Frequently Asked Questions (FAQ)
            </h1>
            <div className="space-y-5 text-xs sm:text-sm text-[#544737] leading-relaxed">
              <div className="border-b border-[#EDE5DA] pb-4">
                <h3 className="font-bold text-[#1E291C] text-sm sm:text-base">
                  What is the difference between kachi ghani and expeller pressing?
                </h3>
                <p className="mt-1">
                  Kachi ghani is a traditional slow cold-pressing method using wooden expellers that grind mustard seeds at ambient temperatures below 45°C. This preserves the volatile pungent oils (allyl isothiocyanate). High-pressure modern expellers generate significant friction heat that strips away delicate floral aromas.
                </p>
              </div>

              <div className="border-b border-[#EDE5DA] pb-4">
                <h3 className="font-bold text-[#1E291C] text-sm sm:text-base">
                  Why does Canadian mustard oil have specific labeling requirements?
                </h3>
                <p className="mt-1">
                  In Canada, mustard oil is an authentic regional culinary oil used across South Asian gastronomy. The Canadian Food Inspection Agency (CFIA) requires accurate ingredient labeling, allergen notices (mustard is a priority food allergen), and metric net volumes. Harvest &amp; Grove strictly markets it as a culinary oil.
                </p>
              </div>

              <div className="border-b border-[#EDE5DA] pb-4">
                <h3 className="font-bold text-[#1E291C] text-sm sm:text-base">
                  Why are your oils packaged in dark glass bottles?
                </h3>
                <p className="mt-1">
                  UV and ambient blue light break down the double bonds in delicate unsaturated fatty acids, causing premature rancidity (photo-oxidation). Our dark amber and UV-shielded green glass bottles block over 99% of damaging light wavelengths.
                </p>
              </div>

              <div className="border-b border-[#EDE5DA] pb-4">
                <h3 className="font-bold text-[#1E291C] text-sm sm:text-base">
                  Can I configure the fourth oil in the catalogue?
                </h3>
                <p className="mt-1">
                  Yes! Harvest &amp; Grove operates with exactly four active catalogue slots. The fourth slot is an administrator-configurable placeholder. The store owner can set custom pricing in CAD and INR, update stock, change title to sesame or coconut oil, and write custom descriptions directly in the Admin Console.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
