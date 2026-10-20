import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Phone, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, country, setActiveView, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      showToast('Please check the consent box to subscribe to our culinary dispatch.');
      return;
    }
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address.');
      return;
    }
    setIsSubscribed(true);
    showToast('Thank you for subscribing to Harvest & Grove dispatch.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#1C261A] text-[#DDD5C7] border-t border-[#2F3D2C]">
      {/* Top Newsletter & Dispatch Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#2C3B29]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-widest text-[#D4C49E] font-semibold block">
              The Harvest Dispatch
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F7F4EE] mt-1">
              Seasonal Pressings, Smoke Point Notes &amp; Recipes
            </h3>
            <p className="text-xs text-[#AAA092] mt-2 max-w-lg leading-relaxed">
              Receive notifications when single-estate harvests are pressed and fresh batches land in Toronto and New Delhi fulfillment hubs. Zero spam.
            </p>
          </div>

          <div className="lg:col-span-6">
            {isSubscribed ? (
              <div className="p-4 rounded-lg bg-[#273824] border border-[#3A5236] text-xs text-[#D8E6D3] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#8FC480]" />
                <span>You are subscribed to the Harvest Dispatch. Confirmation sent to your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#283626] border border-[#3D4F3B] text-xs text-[#FAF8F5] placeholder-[#8F8576] focus:outline-hidden focus:border-[#D4C49E]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#D4C49E] text-[#1C261A] font-semibold text-xs hover:bg-[#E2D5B5] transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                <label className="flex items-start gap-2 text-[11px] text-[#A69B8C] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-0.5 rounded-sm border-[#4C5F4A] bg-[#283626] text-[#D4C49E] focus:ring-0"
                  />
                  <span>
                    I consent to receiving culinary guides, harvest announcements, and order notifications. I can unsubscribe at any time.
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Contacts */}
          <div className="space-y-4">
            <span className="text-lg font-serif font-bold text-[#F7F4EE] block">
              {settings.brandName}
            </span>
            <p className="text-xs text-[#A89D8E] leading-relaxed">
              Artisanal single-source culinary oils crafted for everyday cooking. Canada &amp; India distribution.
            </p>
            <div className="space-y-2 text-xs text-[#C7BCAC]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4C49E]" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4C49E]" />
                <span>CA: {settings.contactPhoneCA}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4C49E]" />
                <span>IN: {settings.contactPhoneIN}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-[#9E9282]">
                <MapPin className="w-3.5 h-3.5 text-[#D4C49E] shrink-0 mt-0.5" />
                <span>{settings.headquartersAddress}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Oils & Discovery */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4C49E] mb-3">
              The Four Oils
            </h4>
            <ul className="space-y-2 text-xs text-[#BBB0A0]">
              <li>
                <button
                  onClick={() => {
                    setActiveView('home');
                    const el = document.getElementById('catalogue-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Raw Cold-Pressed Mustard Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('home');
                    const el = document.getElementById('catalogue-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Estate Extra Virgin Olive Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('home');
                    const el = document.getElementById('catalogue-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  High-Oleic Sunflower Oil
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('home');
                    const el = document.getElementById('catalogue-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Artisanal Reserve Slot #4
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('home');
                    const el = document.getElementById('cooking-guide-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left text-[#D4C49E]"
                >
                  Smoke Point Cooking Guide &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4C49E] mb-3">
              Policies &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs text-[#BBB0A0]">
              <li>
                <button onClick={() => setActiveView('policies-shipping')} className="hover:text-white transition-colors">
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('policies-returns')} className="hover:text-white transition-colors">
                  Returns &amp; Food Quality Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('policies-privacy')} className="hover:text-white transition-colors">
                  Privacy Policy &amp; Data Rights
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('policies-terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Market Hub & Administration */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4C49E] mb-3">
              Operations &amp; Admin
            </h4>
            <div className="space-y-2 text-xs text-[#AAA092]">
              <p>
                Currently operating separate domestic distribution channels in{' '}
                <strong className="text-white">Canada</strong> and{' '}
                <strong className="text-white">India</strong>.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-md bg-[#2B3B28] text-[#D8E6D3] hover:bg-[#384C34] text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A5C99B]" />
                  <span>Store Administrator Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Unboxed Anti-Pill Legal Line */}
        <div className="mt-12 pt-8 border-t border-[#2C3B29] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F8373]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {settings.brandName}. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Food Grade Certification Standards</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#A69B8B]">
            <span>Canadian CFIA Notified</span>
            <span aria-hidden="true">/</span>
            <span>FSSAI Standards Compliant</span>
            <span aria-hidden="true">/</span>
            <span>Stripe &amp; Razorpay Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
