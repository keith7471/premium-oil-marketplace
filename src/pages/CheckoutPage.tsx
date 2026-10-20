import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { BottleVisual } from '../components/common/BottleVisual';
import { CustomerAddress, ShippingMethod, PaymentProvider, Order, OrderItemSnapshot } from '../types';
import { CANADIAN_REGIONS, INDIAN_STATES } from '../data/defaultSettings';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  AlertCircle,
  HelpCircle,
  Banknote,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    country,
    currency,
    settings,
    clearCart,
    setLastPlacedOrder,
    setActiveView,
    formatCurrency,
    showToast,
  } = useStore();

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#1E291C]">Your Bag is Empty</h2>
        <p className="text-sm text-[#615545] mt-2">Add products to your bag before proceeding to checkout.</p>
        <button
          onClick={() => setActiveView('home')}
          className="mt-6 px-6 py-2.5 rounded-lg bg-[#243522] text-[#F7F4EE] font-semibold text-xs cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Address Form State
  const [address, setAddress] = useState<CustomerAddress>({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    unit: '',
    city: '',
    region: country === 'CA' ? 'ON' : 'DL',
    postalCode: '',
    country,
  });

  // Shipping Method
  const [shippingMethodId, setShippingMethodId] = useState<string>('standard');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentProvider>(
    country === 'CA' ? 'stripe' : 'razorpay'
  );

  // Card Simulator details for test mode
  const [testCardNumber, setTestCardNumber] = useState('4242 •••• •••• 4242');
  const [testCardExp, setTestCardExp] = useState('12/28');
  const [testCardCvc, setTestCardCvc] = useState('123');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Available Shipping options for country
  const shippingOptions: ShippingMethod[] = useMemo(() => {
    const isFree =
      country === 'CA'
        ? cartSubtotal >= settings.freeShippingThresholdCA
        : cartSubtotal >= settings.freeShippingThresholdIN;

    if (country === 'CA') {
      return [
        {
          id: 'standard',
          name: 'Canada Post / Courier Ground',
          description: 'Carbon-neutral domestic delivery in padded packaging',
          cost: isFree ? 0 : settings.standardShippingRateCA,
          estimatedDays: '3–5 business days',
        },
        {
          id: 'express',
          name: 'Express Air Priority Courier',
          description: 'Expedited courier dispatch with real-time signature tracking',
          cost: settings.expressShippingRateCA,
          estimatedDays: '1–2 business days',
        },
      ];
    } else {
      return [
        {
          id: 'standard',
          name: 'Blue Dart / Delhivery Ground',
          description: 'Shock-proof eco-bubble packaging',
          cost: isFree ? 0 : settings.standardShippingRateIN,
          estimatedDays: '3–6 business days',
        },
        {
          id: 'express',
          name: 'Air Express Courier',
          description: 'Priority courier flight dispatch',
          cost: settings.expressShippingRateIN,
          estimatedDays: '2–3 business days',
        },
      ];
    }
  }, [country, cartSubtotal, settings]);

  const selectedShipping = shippingOptions.find((s) => s.id === shippingMethodId) || shippingOptions[0];

  // Tax calculation based on selected province or state
  const taxDetails = useMemo(() => {
    if (country === 'CA') {
      const region = CANADIAN_REGIONS.find((r) => r.code === address.region) || CANADIAN_REGIONS[8]; // Default ON
      // Under Canadian Excise Tax Act, basic staple groceries (unflavored culinary oils) are zero-rated (0% GST/HST).
      const taxRate = region.isEdibleOilExempt ? 0 : region.gstRate + region.provincialRate;
      const amount = Math.round(cartSubtotal * taxRate * 100) / 100;
      return {
        ratePercent: taxRate * 100,
        amount,
        description: region.label,
      };
    } else {
      // India: 5% GST on packaged edible oils under HSN 1515/1509/1512
      const taxRate = 0.05;
      const amount = Math.round(cartSubtotal * taxRate * 100) / 100;
      return {
        ratePercent: 5,
        amount,
        description: 'GST @ 5% (HSN 1515/1509/1512 Edible Oils)',
      };
    }
  }, [country, address.region, cartSubtotal]);

  const finalTotal = cartSubtotal + selectedShipping.cost + taxDetails.amount;

  const validateForm = (): boolean => {
    if (!address.fullName.trim()) {
      setFormError('Please enter your full legal recipient name.');
      return false;
    }
    if (!address.email.trim() || !address.email.includes('@')) {
      setFormError('Please enter a valid email address for your order confirmation receipt.');
      return false;
    }
    if (!address.phone.trim() || address.phone.length < 8) {
      setFormError('Please provide a complete telephone number for delivery courier updates.');
      return false;
    }
    if (!address.street.trim()) {
      setFormError('Please enter your street address.');
      return false;
    }
    if (!address.city.trim()) {
      setFormError('Please enter your city.');
      return false;
    }
    if (!address.postalCode.trim()) {
      setFormError(country === 'CA' ? 'Please enter a Canadian postal code (e.g. M5V 2T6).' : 'Please enter a 6-digit Indian PIN code.');
      return false;
    }

    // Canadian Postal Code regex test
    if (country === 'CA') {
      const caPostal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      if (!caPostal.test(address.postalCode.trim())) {
        setFormError('Please enter a valid Canadian postal code format (e.g. M5V 1N6).');
        return false;
      }
    } else {
      // Indian PIN code regex
      const inPin = /^[1-9][0-9]{5}$/;
      if (!inPin.test(address.postalCode.trim().replace(/\s/g, ''))) {
        setFormError('Please enter a valid 6-digit Indian Postal PIN code.');
        return false;
      }
    }

    setFormError(null);
    return true;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 1. Create order snapshot
      const itemsSnapshot: OrderItemSnapshot[] = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        oilType: item.product.oilType,
        bottleSize: item.product.bottleSize,
        quantity: item.quantity,
        unitPrice: country === 'CA' ? item.product.prices.CA.amount : item.product.prices.IN.amount,
        subtotal: (country === 'CA' ? item.product.prices.CA.amount : item.product.prices.IN.amount) * item.quantity,
        currency,
      }));

      const orderNumber = `HG-${country}-${Date.now().toString().slice(-6)}`;
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        country,
        currency,
        customer: address,
        items: itemsSnapshot,
        subtotal: cartSubtotal,
        shippingCost: selectedShipping.cost,
        shippingMethodId: selectedShipping.id,
        shippingMethodName: selectedShipping.name,
        taxAmount: taxDetails.amount,
        taxRatePercent: taxDetails.ratePercent,
        taxDescription: taxDetails.description,
        total: finalTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
        paymentReference:
          paymentMethod === 'stripe'
            ? `pi_test_${Math.random().toString(36).substring(2, 10)}`
            : paymentMethod === 'razorpay'
            ? `pay_test_${Math.random().toString(36).substring(2, 10)}`
            : 'COD_VERIFIED_ON_DELIVERY',
        orderStatus: 'paid',
        carrier: country === 'CA' ? 'Canada Post Ground' : 'Blue Dart Express',
        trackingNumber: `TRK-${country}-${Math.floor(10000000 + Math.random() * 90000000)}`,
        adminNotes: 'Order automatically verified via secure test checkout gateway.',
      };

      // 2. Persist order in localStorage (for admin overview and client confirmation)
      const existingOrdersRaw = localStorage.getItem('hg_orders');
      const existingOrders: Order[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      localStorage.setItem('hg_orders', JSON.stringify([newOrder, ...existingOrders]));

      // 3. Clear cart & set confirmation
      clearCart();
      setLastPlacedOrder(newOrder);
      setActiveView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Order error', err);
      setFormError('An error occurred during order submission. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 text-xs font-semibold text-[#6E6150] hover:text-[#1E291C] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <div className="flex items-center justify-between pb-6 border-b border-[#E6DDD0] mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#546E44]">
              Secure Checkout
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E291C] mt-1">
              Complete Your Order
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#524536] bg-[#EFE9DD] px-3.5 py-1.5 rounded-lg border border-[#DDD2C0]">
            <Lock className="w-3.5 h-3.5 text-[#546E44]" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-[#FDF2F2] border border-[#F5C2C2] text-xs text-[#A12B2B] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form Fields (7 cols) */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Details */}
            <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#DDD3C2] shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-serif font-bold text-[#1E291C] text-base border-b border-[#EDE5DA] pb-3">
                <span className="w-5 h-5 rounded-full bg-[#243522] text-[#F7F4EE] text-xs font-mono flex items-center justify-center font-bold">
                  1
                </span>
                <h2>Contact Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A3F31] mb-1">
                    Full Recipient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Keith Barretto"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD3C2] text-xs text-[#1E291C] focus:outline-hidden focus:border-[#243522]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3F31] mb-1">
                    Email Address (For Invoice) *
                  </label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD3C2] text-xs text-[#1E291C] focus:outline-hidden focus:border-[#243522]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3F31] mb-1">
                    Phone Number (Courier SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder={country === 'CA' ? '+1 (416) 555-0192' : '+91 98765 43210'}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD3C2] text-xs text-[#1E291C] focus:outline-hidden focus:border-[#243522]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Country-Specific Shipping Address */}
            <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#DDD3C2] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#EDE5DA] pb-3">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1E291C] text-base">
                  <span className="w-5 h-5 rounded-full bg-[#243522] text-[#F7F4EE] text-xs font-mono flex items-center justify-center font-bold">
                    2
                  </span>
                  <h2>{country === 'CA' ? 'Canadian Delivery Address' : 'Indian Delivery Address'}</h2>
                </div>
                <span className="text-xs font-medium text-[#736553]">
                  Destination: <strong>{country === 'CA' ? 'Canada' : 'India'}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A3F31] mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="e.g. 120 King Street West"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD3C2] text-xs text-[#1E291C] focus:outline-hidden focus:border-[#243522]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3F31] mb-1">
                    Unit / Suite / Apartment (Optional)
                  </label>
                  <input
                    type="text"
                    value={address.unit || ''}
                    onChange={(e) => setAddress({ ...address, unit: e.target.value })}
                    placeholder="Suite 400"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD3C2] text-xs text-[#1E291C] focus:outline-hidden focus:border-[#243522]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3F31] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder={country === 'CA' ? 'Toronto' : 'New Delhi'}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD3C2] text-xs text-[#1E291C] focus:outline-hidden focus:border-[#243522]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3F31] mb-1">
                    {country === 'CA' ? 'Province / Territory *' : 'State *'}
                  </label>
                  <select
                    value={address.region}
                    onChange={(e) => setAddress({ ...address, region: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD3C2] text-xs text-[#1E291C] focus:outline-hidden focus:border-[#243522]"
                  >
                    {country === 'CA'
                      ? CANADIAN_REGIONS.map((r) => (
                          <option key={r.code} value={r.code}>
                            {r.name} ({r.code})
                          </option>
                        ))
                      : INDIAN_STATES.map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.name}
                          </option>
                        ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3F31] mb-1">
                    {country === 'CA' ? 'Postal Code * (e.g. M5V 1N6)' : 'PIN Code * (6 digits)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value.toUpperCase() })}
                    placeholder={country === 'CA' ? 'M5V 1N6' : '110001'}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD3C2] text-xs text-[#1E291C] focus:outline-hidden focus:border-[#243522]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#DDD3C2] shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-serif font-bold text-[#1E291C] text-base border-b border-[#EDE5DA] pb-3">
                <span className="w-5 h-5 rounded-full bg-[#243522] text-[#F7F4EE] text-xs font-mono flex items-center justify-center font-bold">
                  3
                </span>
                <h2>Delivery Method</h2>
              </div>

              <div className="space-y-3">
                {shippingOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                      shippingMethodId === opt.id
                        ? 'border-[#243522] bg-[#F2EDE2]'
                        : 'border-[#DDD2C0] bg-white hover:bg-[#F9F6F0]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethodId === opt.id}
                        onChange={() => setShippingMethodId(opt.id)}
                        className="mt-1 text-[#243522] focus:ring-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#1E291C]">{opt.name}</div>
                        <div className="text-[11px] text-[#695D4D] mt-0.5">{opt.description}</div>
                        <div className="text-[11px] text-[#546E44] font-medium mt-1 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          <span>Estimated delivery: {opt.estimatedDays}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#1E291C]">
                        {opt.cost === 0 ? 'Complimentary' : formatCurrency(opt.cost)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Payment Provider */}
            <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#DDD3C2] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#EDE5DA] pb-3">
                <div className="flex items-center gap-2 font-serif font-bold text-[#1E291C] text-base">
                  <span className="w-5 h-5 rounded-full bg-[#243522] text-[#F7F4EE] text-xs font-mono flex items-center justify-center font-bold">
                    4
                  </span>
                  <h2>Payment Provider</h2>
                </div>
                <span className="text-[11px] text-[#6E6150]">Test Mode Enabled</span>
              </div>

              {/* Provider Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {country === 'CA' ? (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'stripe'
                        ? 'border-[#243522] bg-[#F2EDE2]'
                        : 'border-[#DDD2C0] bg-white hover:bg-[#F9F6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#1E291C]">
                      <CreditCard className="w-4 h-4 text-[#546E44]" />
                      <span>Stripe Canada</span>
                    </div>
                    <span className="text-[10px] text-[#6E6150] block mt-0.5">Visa, MC, Amex (CAD)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#243522] bg-[#F2EDE2]'
                        : 'border-[#DDD2C0] bg-white hover:bg-[#F9F6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#1E291C]">
                      <CreditCard className="w-4 h-4 text-[#546E44]" />
                      <span>Razorpay India</span>
                    </div>
                    <span className="text-[10px] text-[#6E6150] block mt-0.5">UPI, Cards, NetBanking (INR)</span>
                  </button>
                )}

                {/* Cash on delivery (only if enabled for region) */}
                {country === 'IN' && settings.cashOnDeliveryEnabledIN && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#243522] bg-[#F2EDE2]'
                        : 'border-[#DDD2C0] bg-white hover:bg-[#F9F6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#1E291C]">
                      <Banknote className="w-4 h-4 text-[#546E44]" />
                      <span>Cash on Delivery</span>
                    </div>
                    <span className="text-[10px] text-[#6E6150] block mt-0.5">Pay upon package arrival</span>
                  </button>
                )}
              </div>

              {/* Card simulator / payment form */}
              {paymentMethod !== 'cod' ? (
                <div className="p-4 rounded-xl bg-white border border-[#DDD3C2] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#524434]">
                    <span className="font-semibold">
                      {paymentMethod === 'stripe' ? 'Stripe Test Card' : 'Razorpay Simulated Gateway'}
                    </span>
                    <span className="text-[11px] text-[#6E6050] font-mono">Simulated Sandbox Active</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#544636] mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={testCardNumber}
                        onChange={(e) => setTestCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-[#FAF8F5] border border-[#DDD3C2] text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#544636] mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={testCardExp}
                          onChange={(e) => setTestCardExp(e.target.value)}
                          className="w-full px-3 py-2 rounded-md bg-[#FAF8F5] border border-[#DDD3C2] text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#544636] mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={testCardCvc}
                          onChange={(e) => setTestCardCvc(e.target.value)}
                          className="w-full px-3 py-2 rounded-md bg-[#FAF8F5] border border-[#DDD3C2] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#F5EFE4] border border-[#DDD3C2] text-xs text-[#524434] space-y-1">
                  <p className="font-semibold text-[#1E291C]">Cash on Delivery Terms:</p>
                  <p>
                    Please keep the exact cash amount of <strong>{formatCurrency(finalTotal)}</strong> ready for the delivery associate. A confirmation SMS will be sent to {address.phone || 'your phone'} prior to dispatch.
                  </p>
                </div>
              )}
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#243522] text-[#F7F4EE] font-bold text-sm tracking-wide hover:bg-[#162314] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:translate-y-px disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-[#D8C69F]" />
              <span>
                {isSubmitting
                  ? 'Authorizing Transaction...'
                  : `Place Order · ${formatCurrency(finalTotal)}`}
              </span>
            </button>
          </form>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F5] rounded-xl p-6 border border-[#DDD3C2] shadow-xs">
              <h3 className="font-serif font-bold text-base text-[#1E291C] border-b border-[#EDE5DA] pb-3 mb-4">
                Order Invoice Summary ({cart.length} items)
              </h3>

              {/* Items List */}
              <div className="divide-y divide-[#EDE5DA] max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const unitPrice =
                    country === 'CA' ? item.product.prices.CA.amount : item.product.prices.IN.amount;
                  return (
                    <div key={item.product.id} className="py-3 flex items-center gap-3">
                      <div className="w-12 h-14 rounded-md overflow-hidden bg-[#F2EDE3] shrink-0 border border-[#DDD1BE]">
                        <BottleVisual
                          type={item.product.imageFallback}
                          bottleSize={item.product.bottleSize}
                          className="w-full h-full scale-90"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#1E291C] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-[#6E6150]">
                          Qty: {item.quantity} × {formatCurrency(unitPrice)}
                        </div>
                      </div>
                      <div className="text-xs font-mono font-bold text-[#1E291C]">
                        {formatCurrency(unitPrice * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cost Calculations */}
              <div className="pt-4 mt-4 border-t border-[#EDE5DA] space-y-2 text-xs text-[#524434]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono font-semibold text-[#1E291C]">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping ({selectedShipping.name.split('/')[0]})</span>
                  <span className="font-mono">
                    {selectedShipping.cost === 0 ? (
                      <span className="text-[#3E5C31] font-semibold">Complimentary</span>
                    ) : (
                      formatCurrency(selectedShipping.cost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-[#6E6050]">
                  <span>
                    {country === 'CA' ? 'Basic Grocery GST/HST (0%)' : taxDetails.description}
                  </span>
                  <span className="font-mono">{formatCurrency(taxDetails.amount)}</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="pt-4 mt-4 border-t-2 border-[#1E291C] flex items-baseline justify-between">
                <span className="font-serif font-bold text-base text-[#1E291C]">Total Payable</span>
                <span className="text-xl font-mono font-bold text-[#1E291C]">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>

            {/* Food Business Regulatory Guarantee */}
            <div className="p-4 rounded-xl bg-[#F5EFE4] border border-[#DDD3C2] text-xs text-[#5E5140] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#1E291C]">
                <ShieldCheck className="w-4 h-4 text-[#546E44]" />
                <span>Food-Grade Quality Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Bottled in tamper-evident glass containers under strict CFIA &amp; FSSAI handling guidelines. If any bottle arrives broken or unsealed during transit, we provide an immediate no-hassle courier replacement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
