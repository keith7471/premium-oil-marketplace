export type CountryCode = 'CA' | 'IN';

export interface MarketPrice {
  amount: number;
  currency: 'CAD' | 'INR';
  isAvailable: boolean;
}

export interface NutritionalInfo {
  servingSize: string;
  caloriesPerServing: number;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  polyunsaturatedFat?: string;
  monounsaturatedFat?: string;
  cholesterol: string;
  sodium: string;
  totalCarbohydrates: string;
  protein: string;
  vitaminE?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  oilType: string;
  tagline: string;
  shortDescription: string;
  detailedDescription: string;
  bottleSize: string; // e.g., "750 ml", "500 ml", "1000 ml"
  containerType: string; // e.g., "Amber Glass Bottle", "Dark UV-Shielded Glass"
  smokePoint: string;
  colorHex: string; // thematic accent for bottle illustration
  accentColor: string;
  imageFallback: string; // descriptive SVG/art type
  imageUrl?: string;
  prices: {
    CA: { amount: number; isAvailable: boolean };
    IN: { amount: number; isAvailable: boolean };
  };
  stock: number;
  countryOfOrigin: string;
  isOriginVerified: boolean;
  ingredients: string;
  nutritionalInfo: NutritionalInfo;
  storageInstructions: string;
  culinaryUses: string[];
  bestBefore: string;
  batchLotFormat: string;
  foodSafetyNotice: string;
  isPlaceholder: boolean;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  currency: 'CAD' | 'INR';
}

export interface CustomerAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  unit?: string;
  city: string;
  region: string; // Province in CA, State in IN
  postalCode: string; // Postal code in CA, PIN code in IN
  country: CountryCode;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDays: string;
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentProvider = 'stripe' | 'razorpay' | 'cod';

export interface OrderItemSnapshot {
  productId: string;
  productName: string;
  oilType: string;
  bottleSize: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  currency: 'CAD' | 'INR';
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  country: CountryCode;
  currency: 'CAD' | 'INR';
  customer: CustomerAddress;
  items: OrderItemSnapshot[];
  subtotal: number;
  shippingCost: number;
  shippingMethodId: string;
  shippingMethodName: string;
  taxAmount: number;
  taxRatePercent: number;
  taxDescription: string;
  total: number;
  paymentMethod: PaymentProvider;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  adminNotes?: string;
}

export interface StoreSettings {
  brandName: string;
  brandTagline: string;
  contactEmail: string;
  contactPhoneCA: string;
  contactPhoneIN: string;
  headquartersAddress: string;
  freeShippingThresholdCA: number;
  freeShippingThresholdIN: number;
  standardShippingRateCA: number;
  standardShippingRateIN: number;
  expressShippingRateCA: number;
  expressShippingRateIN: number;
  cashOnDeliveryEnabledIN: boolean;
  cashOnDeliveryEnabledCA: boolean;
  stripeTestMode: boolean;
  razorpayTestMode: boolean;
  cfiaAdvisoryText: string;
  fssaiAdvisoryText: string;
}
