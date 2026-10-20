import { StoreSettings } from '../types';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  brandName: 'Harvest & Grove Oils',
  brandTagline: 'Pure, Cold-Pressed & Estate Culinary Oils for Everyday Cooking',
  contactEmail: 'concierge@harvestandgroveoils.com',
  contactPhoneCA: '+1 (800) 555-4768 (Toll Free, Canada)',
  contactPhoneIN: '+91 (11) 4567-8900 (Customer Desk, India)',
  headquartersAddress: '742 King Street West, Suite 400, Toronto, ON M5V 1N6, Canada',
  freeShippingThresholdCA: 60.00, // CAD
  freeShippingThresholdIN: 1500.00, // INR
  standardShippingRateCA: 9.50, // CAD
  standardShippingRateIN: 120.00, // INR
  expressShippingRateCA: 16.50, // CAD
  expressShippingRateIN: 250.00, // INR
  cashOnDeliveryEnabledIN: true, // Supported in India for eligible pin codes
  cashOnDeliveryEnabledCA: false, // Standard card/Stripe in Canada
  stripeTestMode: true,
  razorpayTestMode: true,
  cfiaAdvisoryText:
    'Canadian Regulatory Notice: In Canada, edible vegetable oils are governed under the Food and Drugs Act and Regulations enforced by the Canadian Food Inspection Agency (CFIA). Staple pure culinary oils are typically zero-rated under basic grocery guidelines for GST/HST, subject to provincial and packaging rules. This website displays transparent ingredient declarations and avoids unsubstantiated medicinal claims.',
  fssaiAdvisoryText:
    'Indian Regulatory Notice: In India, edible oils must comply with the Food Safety and Standards (Food Products Standards and Food Additives) Regulations and Legal Metrology rules enforced by the Food Safety and Standards Authority of India (FSSAI). Raw and packaged edible vegetable oils are categorized under applicable GST schedules (customarily 5%). Product claims are verified against statutory labeling guidelines.',
};

export interface RegionTaxRate {
  code: string;
  name: string;
  gstRate: number; // e.g. 0.05
  provincialRate: number; // e.g. 0.08
  totalRate: number;
  label: string;
  isEdibleOilExempt: boolean; // Many basic staple oils are zero-rated for GST in Canada
}

// Canadian provinces & territories tax configurations
export const CANADIAN_REGIONS: RegionTaxRate[] = [
  { code: 'AB', name: 'Alberta', gstRate: 0.05, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% GST)', isEdibleOilExempt: true },
  { code: 'BC', name: 'British Columbia', gstRate: 0.05, provincialRate: 0.07, totalRate: 0.00, label: 'Basic Grocery (0% GST/PST)', isEdibleOilExempt: true },
  { code: 'MB', name: 'Manitoba', gstRate: 0.05, provincialRate: 0.07, totalRate: 0.00, label: 'Basic Grocery (0% GST/RST)', isEdibleOilExempt: true },
  { code: 'NB', name: 'New Brunswick', gstRate: 0.15, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% HST)', isEdibleOilExempt: true },
  { code: 'NL', name: 'Newfoundland and Labrador', gstRate: 0.15, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% HST)', isEdibleOilExempt: true },
  { code: 'NT', name: 'Northwest Territories', gstRate: 0.05, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% GST)', isEdibleOilExempt: true },
  { code: 'NS', name: 'Nova Scotia', gstRate: 0.15, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% HST)', isEdibleOilExempt: true },
  { code: 'NU', name: 'Nunavut', gstRate: 0.05, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% GST)', isEdibleOilExempt: true },
  { code: 'ON', name: 'Ontario', gstRate: 0.13, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% HST)', isEdibleOilExempt: true },
  { code: 'PE', name: 'Prince Edward Island', gstRate: 0.15, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% HST)', isEdibleOilExempt: true },
  { code: 'QC', name: 'Quebec', gstRate: 0.05, provincialRate: 0.09975, totalRate: 0.00, label: 'Basic Grocery (0% GST/QST)', isEdibleOilExempt: true },
  { code: 'SK', name: 'Saskatchewan', gstRate: 0.05, provincialRate: 0.06, totalRate: 0.00, label: 'Basic Grocery (0% GST/PST)', isEdibleOilExempt: true },
  { code: 'YT', name: 'Yukon', gstRate: 0.05, provincialRate: 0.00, totalRate: 0.00, label: 'Basic Grocery (0% GST)', isEdibleOilExempt: true },
];

// Indian major states for shipping & GST
export const INDIAN_STATES: { code: string; name: string; gstRate: number; label: string }[] = [
  { code: 'DL', name: 'Delhi', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'MH', name: 'Maharashtra', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'KA', name: 'Karnataka', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'TN', name: 'Tamil Nadu', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'WB', name: 'West Bengal', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'RJ', name: 'Rajasthan', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'UP', name: 'Uttar Pradesh', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'GJ', name: 'Gujarat', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'PB', name: 'Punjab', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'HR', name: 'Haryana', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'TG', name: 'Telangana', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
  { code: 'KL', name: 'Kerala', gstRate: 0.05, label: 'GST (5% Edible Oil)' },
];
