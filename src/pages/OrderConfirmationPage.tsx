import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Truck, Printer, ArrowRight, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastPlacedOrder, setActiveView, formatCurrency } = useStore();

  if (!lastPlacedOrder) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center">
        <h2 className="text-xl font-serif font-bold text-[#1E291C]">No Active Order Found</h2>
        <p className="text-xs text-[#6B5E4E] mt-2">Browse our oils to create your first order.</p>
        <button
          onClick={() => setActiveView('home')}
          className="mt-6 px-5 py-2.5 rounded-lg bg-[#243522] text-[#F7F4EE] text-xs font-semibold cursor-pointer"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const order = lastPlacedOrder;

  return (
    <div className="bg-[#FAF8F5] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="text-center space-y-3 pb-8 border-b border-[#E6DDD0]">
          <div className="w-16 h-16 rounded-full bg-[#E8F0E4] border border-[#C5DDC0] flex items-center justify-center mx-auto text-[#3E5C31]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#546E44] block">
            Payment Verified &amp; Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E291C]">
            Thank You for Your Order
          </h1>
          <p className="text-sm text-[#615444] max-w-md mx-auto">
            Order <strong className="font-mono text-[#1E291C]">#{order.orderNumber}</strong> has been received by our cellar dispatch team.
          </p>
        </div>

        {/* Courier & Dispatch Status Notice */}
        <div className="mt-8 p-5 rounded-xl bg-[#F5EFE4] border border-[#DDD2C0] flex items-start gap-4 text-xs text-[#524434]">
          <Truck className="w-5 h-5 text-[#546E44] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-bold text-[#1E291C]">
              Carrier: {order.carrier || 'Domestic Courier'} (Tracking: {order.trackingNumber})
            </h3>
            <p className="leading-relaxed">
              We are preparing your glass-packaged bottles with thermal and shock protection. A dispatch notification with real-time tracking will be emailed to <strong>{order.customer.email}</strong>.
            </p>
          </div>
        </div>

        {/* Receipt Container */}
        <div className="mt-8 bg-white rounded-xl border border-[#DDD3C2] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE5DA] text-xs">
            <div>
              <span className="text-[#786B5A] block">Date Placed</span>
              <strong className="font-mono text-[#1E291C]">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </strong>
            </div>

            <div className="text-right">
              <span className="text-[#786B5A] block">Payment Gateway</span>
              <strong className="font-mono uppercase text-[#1E291C]">
                {order.paymentMethod} ({order.paymentReference?.slice(0, 14)})
              </strong>
            </div>
          </div>

          {/* Delivery Address Snapshot */}
          <div className="text-xs text-[#524434] space-y-1 bg-[#FAF8F5] p-4 rounded-lg border border-[#EDE5DA]">
            <div className="flex items-center gap-1.5 font-bold text-[#1E291C] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#546E44]" />
              <span>Delivering To:</span>
            </div>
            <p className="font-semibold">{order.customer.fullName}</p>
            <p>{order.customer.street} {order.customer.unit && `· ${order.customer.unit}`}</p>
            <p>{order.customer.city}, {order.customer.region} {order.customer.postalCode}</p>
            <p>{order.country === 'CA' ? 'Canada' : 'India'} · {order.customer.phone}</p>
          </div>

          {/* Itemized Snapshot */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#736553] mb-3">
              Itemized Cellar Manifest
            </h4>
            <div className="divide-y divide-[#EDE5DA]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-bold text-[#1E291C]">{item.productName}</h5>
                    <div className="text-[#6E6150] text-[11px]">
                      {item.bottleSize} · Qty {item.quantity} × {formatCurrency(item.unitPrice)}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#1E291C]">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice Calculations */}
          <div className="pt-4 border-t border-[#EDE5DA] space-y-2 text-xs text-[#524434]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono">{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping ({order.shippingMethodName})</span>
              <span className="font-mono">
                {order.shippingCost === 0 ? 'Complimentary' : formatCurrency(order.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-[#6E6150]">
              <span>{order.taxDescription}</span>
              <span className="font-mono">{formatCurrency(order.taxAmount)}</span>
            </div>
            <div className="pt-3 border-t border-[#1E291C] flex justify-between font-bold text-sm text-[#1E291C]">
              <span>Grand Total Paid</span>
              <span className="font-mono text-base">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[#DDD3C2] bg-white text-xs font-semibold text-[#443B2E] hover:bg-[#F7F4EE] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#756857]" />
            <span>Print Official Invoice</span>
          </button>

          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#243522] text-[#F7F4EE] text-xs font-semibold hover:bg-[#162314] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Back to Storefront</span>
            <ArrowRight className="w-4 h-4 text-[#D8C69F]" />
          </button>
        </div>
      </div>
    </div>
  );
};
