import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);

// In-memory or file-backed database store for demo / server persistence
interface ServerProduct {
  id: string;
  slug: string;
  name: string;
  oilType: string;
  bottleSize: string;
  smokePoint: string;
  prices: {
    CA: { amount: number; isAvailable: boolean };
    IN: { amount: number; isAvailable: boolean };
  };
  stock: number;
  countryOfOrigin: string;
  isOriginVerified: boolean;
  isPlaceholder: boolean;
  active: boolean;
}

const SERVER_PRODUCTS: ServerProduct[] = [
  {
    id: 'oil-mustard-01',
    slug: 'cold-pressed-mustard-oil',
    name: 'Raw Cold-Pressed Mustard Oil',
    oilType: 'Mustard Seed Oil',
    bottleSize: '750 ml',
    smokePoint: '250°C (480°F)',
    prices: {
      CA: { amount: 18.5, isAvailable: true },
      IN: { amount: 395.0, isAvailable: true },
    },
    stock: 48,
    countryOfOrigin: 'India (Rajasthan Farm Cooperative)',
    isOriginVerified: true,
    isPlaceholder: false,
    active: true,
  },
  {
    id: 'oil-olive-02',
    slug: 'extra-virgin-olive-oil',
    name: 'Estate Extra Virgin Olive Oil',
    oilType: 'Extra Virgin Olive Oil',
    bottleSize: '500 ml',
    smokePoint: '195°C–205°C (385°F–400°F)',
    prices: {
      CA: { amount: 24.0, isAvailable: true },
      IN: { amount: 1250.0, isAvailable: true },
    },
    stock: 64,
    countryOfOrigin: 'Spain (Jaén Single Estate)',
    isOriginVerified: true,
    isPlaceholder: false,
    active: true,
  },
  {
    id: 'oil-sunflower-03',
    slug: 'high-oleic-sunflower-oil',
    name: 'Cold-Pressed High-Oleic Sunflower Oil',
    oilType: 'High-Oleic Sunflower Oil',
    bottleSize: '1000 ml',
    smokePoint: '232°C (450°F)',
    prices: {
      CA: { amount: 16.5, isAvailable: true },
      IN: { amount: 350.0, isAvailable: true },
    },
    stock: 82,
    countryOfOrigin: 'Canada (Saskatchewan & Manitoba Harvest)',
    isOriginVerified: true,
    isPlaceholder: false,
    active: true,
  },
  {
    id: 'oil-reserve-04',
    slug: 'artisanal-reserve-oil-slot-4',
    name: 'Artisanal Reserve Oil (Slot #4 — Configurable)',
    oilType: 'Admin Configurable Specialty Oil',
    bottleSize: '500 ml',
    smokePoint: 'To be configured',
    prices: {
      CA: { amount: 22.0, isAvailable: true },
      IN: { amount: 650.0, isAvailable: false },
    },
    stock: 25,
    countryOfOrigin: 'To Be Configured by Store Administrator',
    isOriginVerified: false,
    isPlaceholder: true,
    active: true,
  },
];

let SERVER_ORDERS: any[] = [];

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Store Config & Credentials status
  app.get('/api/config', (_req: Request, res: Response) => {
    res.json({
      brandName: 'Harvest & Grove Oils',
      markets: ['CA', 'IN'],
      primaryMarket: 'CA',
      currencies: { CA: 'CAD', IN: 'INR' },
      gateways: {
        stripe: {
          available: true,
          mode: process.env.STRIPE_SECRET_KEY ? 'live' : 'test_simulator',
          hasApiKey: Boolean(process.env.STRIPE_SECRET_KEY),
        },
        razorpay: {
          available: true,
          mode: process.env.RAZORPAY_KEY_SECRET ? 'live' : 'test_simulator',
          hasApiKey: Boolean(process.env.RAZORPAY_KEY_SECRET),
        },
      },
    });
  });

  // 2. Products List
  app.get('/api/products', (_req: Request, res: Response) => {
    res.json(SERVER_PRODUCTS);
  });

  // 3. Server-side Independent Cart Validation
  // "Never trust client-submitted prices or totals. The server must independently validate
  // product prices, availability, quantities, shipping, discounts, and totals before accepting an order."
  app.post('/api/cart/validate', (req: Request, res: Response) => {
    const { items, country, shippingMethodId } = req.body;

    if (!Array.isArray(items) || !country || (country !== 'CA' && country !== 'IN')) {
      return res.status(400).json({ error: 'Invalid cart payload or unsupported country' });
    }

    let calculatedSubtotal = 0;
    const validatedItems: any[] = [];

    for (const item of items) {
      const serverProduct = SERVER_PRODUCTS.find((p) => p.id === item.productId);
      if (!serverProduct) {
        return res.status(400).json({ error: `Product ID "${item.productId}" not found in catalogue.` });
      }

      const marketPrice = country === 'CA' ? serverProduct.prices.CA : serverProduct.prices.IN;
      if (!marketPrice.isAvailable) {
        return res.status(400).json({
          error: `Product "${serverProduct.name}" is not available for purchase in ${country}.`,
        });
      }

      if (serverProduct.stock < item.quantity) {
        return res.status(400).json({
          error: `Requested quantity for "${serverProduct.name}" exceeds available stock (${serverProduct.stock} left).`,
        });
      }

      const lineTotal = marketPrice.amount * item.quantity;
      calculatedSubtotal += lineTotal;

      validatedItems.push({
        productId: serverProduct.id,
        productName: serverProduct.name,
        bottleSize: serverProduct.bottleSize,
        unitPrice: marketPrice.amount,
        quantity: item.quantity,
        subtotal: lineTotal,
      });
    }

    // Shipping rules
    const freeThreshold = country === 'CA' ? 60.0 : 1500.0;
    let shippingCost = 0;
    if (shippingMethodId === 'express') {
      shippingCost = country === 'CA' ? 16.5 : 250.0;
    } else {
      shippingCost = calculatedSubtotal >= freeThreshold ? 0 : country === 'CA' ? 9.5 : 120.0;
    }

    // Tax rules (Canada: 0% basic grocery; India: 5% edible oil GST)
    const taxRate = country === 'CA' ? 0.0 : 0.05;
    const taxAmount = Math.round(calculatedSubtotal * taxRate * 100) / 100;
    const total = Math.round((calculatedSubtotal + shippingCost + taxAmount) * 100) / 100;

    return res.json({
      valid: true,
      country,
      currency: country === 'CA' ? 'CAD' : 'INR',
      items: validatedItems,
      subtotal: calculatedSubtotal,
      shippingCost,
      taxAmount,
      total,
    });
  });

  // 4. Create Payment Session
  app.post('/api/checkout/create-session', (req: Request, res: Response) => {
    const { country, amount, orderNumber } = req.body;

    if (country === 'CA') {
      // Stripe flow
      res.json({
        provider: 'stripe',
        sessionId: `cs_test_${Math.random().toString(36).substring(2, 12)}`,
        mode: 'test_mode',
        currency: 'CAD',
        amount,
        orderNumber,
      });
    } else {
      // Razorpay flow
      res.json({
        provider: 'razorpay',
        orderId: `order_in_${Math.random().toString(36).substring(2, 12)}`,
        mode: 'test_mode',
        currency: 'INR',
        amount,
        orderNumber,
      });
    }
  });

  // 5. Admin Authentication Endpoint
  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { password } = req.body;
    if (password === 'harvest2026' || password === 'admin') {
      return res.json({ success: true, token: `adm_${Date.now()}` });
    }
    return res.status(401).json({ success: false, error: 'Invalid password' });
  });

  // 6. Admin Orders
  app.get('/api/admin/orders', (_req: Request, res: Response) => {
    res.json(SERVER_ORDERS);
  });

  // In development, mount Vite's middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Harvest & Grove server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
