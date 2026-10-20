/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { Hero } from './components/home/Hero';
import { ProductGrid } from './components/home/ProductGrid';
import { CookingGuide } from './components/home/CookingGuide';
import { QualityStory } from './components/home/QualityStory';
import { ComplianceNotice } from './components/home/ComplianceNotice';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { PolicyPage } from './pages/PolicyPage';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#242A24] font-sans antialiased selection:bg-[#E2CE8F] selection:text-[#182118]">
      <Header />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <ProductGrid />
            <CookingGuide />
            <QualityStory />
            <ComplianceNotice />
          </>
        )}

        {activeView === 'product' && <ProductDetailPage />}

        {activeView === 'checkout' && <CheckoutPage />}

        {activeView === 'confirmation' && <OrderConfirmationPage />}

        {activeView === 'admin' && <AdminDashboard />}

        {activeView === 'policies-shipping' && <PolicyPage type="shipping" />}
        {activeView === 'policies-returns' && <PolicyPage type="returns" />}
        {activeView === 'policies-privacy' && <PolicyPage type="privacy" />}
        {activeView === 'policies-terms' && <PolicyPage type="terms" />}
        {activeView === 'faq' && <PolicyPage type="faq" />}
      </main>

      <Footer />
      <CartDrawer />

      {/* Floating Toast notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1E291C] text-[#FAF8F5] px-4 py-3 rounded-xl shadow-xl border border-[#3E4E3B] text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-[#D8C69F] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </aside>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
