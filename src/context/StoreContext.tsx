import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  CountryCode,
  StoreSettings,
  Order,
} from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { DEFAULT_STORE_SETTINGS, CANADIAN_REGIONS, INDIAN_STATES } from '../data/defaultSettings';

interface StoreContextType {
  country: CountryCode;
  currency: 'CAD' | 'INR';
  setCountry: (country: CountryCode) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  updateProduct: (updated: Product) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  cartItemCount: number;
  freeShippingProgress: number;
  isFreeShippingEligible: boolean;
  currentShippingRate: number;
  activeView: string;
  setActiveView: (view: string) => void;
  activeProductSlug: string | null;
  openProductPage: (slug: string) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  formatCurrency: (amount: number) => string;
  adminToken: string | null;
  setAdminToken: (token: string | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Country & Currency - Canada by default
  const [country, setCountryState] = useState<CountryCode>(() => {
    const saved = localStorage.getItem('hg_country');
    return saved === 'IN' || saved === 'CA' ? saved : 'CA';
  });

  const currency: 'CAD' | 'INR' = country === 'CA' ? 'CAD' : 'INR';

  const setCountry = (newCountry: CountryCode) => {
    setCountryState(newCountry);
    localStorage.setItem('hg_country', newCountry);
    showToast(`Switched market to ${newCountry === 'CA' ? 'Canada (CAD $)' : 'India (INR ₹)'}`);
  };

  // 2. Products state (persisted so admin edits persist across reloads)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('hg_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 4) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('hg_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated catalogue details for "${updated.name}"`);
  };

  // 3. Settings state
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('hg_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_STORE_SETTINGS;
  });

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('hg_settings', JSON.stringify(updated));
      return updated;
    });
    showToast('Store settings updated successfully');
  };

  // 4. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hg_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('hg_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Recalculate cart item prices whenever country changes to guarantee accurate market currency
  const getProductPriceForCountry = (prod: Product, c: CountryCode) => {
    return c === 'CA' ? prod.prices.CA.amount : prod.prices.IN.amount;
  };

  const addToCart = (product: Product, quantity = 1) => {
    // Check market availability
    const isAvail = country === 'CA' ? product.prices.CA.isAvailable : product.prices.IN.isAvailable;
    if (!isAvail) {
      showToast(`Notice: ${product.name} is not currently available for delivery in ${country === 'CA' ? 'Canada' : 'India'}.`);
      return;
    }

    if (product.stock <= 0) {
      showToast(`${product.name} is currently out of stock.`);
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      const unitPrice = getProductPriceForCountry(product, country);

      if (existingIndex > -1) {
        const currentQty = prevCart[existingIndex].quantity;
        const newQty = Math.min(product.stock, currentQty + quantity);
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          unitPrice,
          currency,
        };
        return updated;
      } else {
        const initialQty = Math.min(product.stock, quantity);
        return [
          ...prevCart,
          {
            product,
            quantity: initialQty,
            unitPrice,
            currency,
          },
        ];
      }
    });

    setIsCartOpen(true);
    showToast(`Added ${quantity}x "${product.name}" to your bag`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Removed item from bag');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stock;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => {
    const freshProduct = products.find((p) => p.id === item.product.id) || item.product;
    const price = getProductPriceForCountry(freshProduct, country);
    return acc + price * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const threshold = country === 'CA' ? settings.freeShippingThresholdCA : settings.freeShippingThresholdIN;
  const standardShipping = country === 'CA' ? settings.standardShippingRateCA : settings.standardShippingRateIN;

  const isFreeShippingEligible = cartSubtotal >= threshold;
  const currentShippingRate = cartSubtotal > 0 ? (isFreeShippingEligible ? 0 : standardShipping) : 0;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / threshold) * 100));

  // 5. Navigation & views
  const [activeView, setActiveView] = useState<string>('home');
  const [activeProductSlug, setActiveProductSlug] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  const openProductPage = (slug: string) => {
    setActiveProductSlug(slug);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6. Notifications / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // 7. Format currency
  const formatCurrency = (amount: number) => {
    if (currency === 'CAD') {
      return `$${amount.toFixed(2)} CAD`;
    }
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // 8. Admin auth token
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return sessionStorage.getItem('hg_admin_token') || null;
  });

  const handleSetAdminToken = (token: string | null) => {
    setAdminToken(token);
    if (token) {
      sessionStorage.setItem('hg_admin_token', token);
    } else {
      sessionStorage.removeItem('hg_admin_token');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        country,
        currency,
        setCountry,
        products,
        setProducts,
        updateProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartItemCount,
        freeShippingProgress,
        isFreeShippingEligible,
        currentShippingRate,
        activeView,
        setActiveView,
        activeProductSlug,
        openProductPage,
        lastPlacedOrder,
        setLastPlacedOrder,
        settings,
        updateSettings,
        toastMessage,
        showToast,
        formatCurrency,
        adminToken,
        setAdminToken: handleSetAdminToken,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
