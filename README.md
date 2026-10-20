# Harvest & Grove Oils — Premium Edible Oils Storefront & Operations

A full-stack, dual-market e-commerce platform architected for a premium culinary edible oil brand featuring exactly **four curated edible oil products**:
1. **Raw Cold-Pressed Mustard Oil** (Traditional Kachi Ghani, 750 ml amber bottle)
2. **Estate Extra Virgin Olive Oil** (Single Estate Harvest, 500 ml UV-shielded bottle)
3. **High-Oleic Cold-Pressed Sunflower Oil** (Canadian Prairie Farmed, 1000 ml bottle)
4. **Artisanal Reserve Oil (Slot #4 — Admin Configurable)** (Clearly marked configurable placeholder for the store owner to customize)

---

## 1. Architectural Highlights

- **Dual-Market Architecture**:
  - **Canada (Primary)**: Default market on first visit. Displayed & charged in Canadian Dollars (`CAD $`). Standard courier & express priority shipping, destination-based Canadian tax rules (unflavored staple grocery oils zero-rated under Part III of Schedule VI to the Excise Tax Act).
  - **India (Secondary)**: Displayed & charged in Indian Rupees (`INR ₹`). Domestic hub dispatch, 5% GST on packaged edible oils under HSN code 1515/1509/1512, with Cash on Delivery (COD) eligibility toggle.
  - **Market Independence**: Indian prices are never automatically converted into Canadian prices via volatile forex; each market maintains its own independent, administrator-configured selling price and stock availability.
- **Top Bar Contract & Anti-Slop Visual Hierarchy**:
  - Clean 3-zone top navigation (Single wordmark brand, 4 concise single-line nav links, primary Bag & Market selector).
  - Warm cream and ivory backgrounds (`#FAF8F5`, `#F4EFE6`), deep olive green (`#1E291C`, `#243522`), and subtle golden yellow sunflower tones.
  - Zero-pill metadata discipline, typographic separators (`·` and `/`), serif editorial typography (Playfair Display) paired with Plus Jakarta Sans.
  - High-precision SVG botanical bottle illustrations ensuring crisp, zero-broken-image reliability across all screen resolutions.
- **Independent Server-Side Validation**:
  - Express `/api/cart/validate` endpoint verifies product existence, stock availability, unit prices, destination shipping thresholds, and tax calculations. The server never blindly trusts client-submitted totals.
- **Comprehensive Store Administrator Console**:
  - Secure password authentication (`harvest2026`).
  - Real-time gross sales tracking across Canada and India.
  - 4-Product catalogue manager: live editing of titles, bottle sizes, CAD & INR prices, stock counts, and transformation of Slot #4 into any specialty oil (sesame, coconut, avocado, etc.).
  - Order fulfillment management with carrier assignment and tracking number updates.
  - Export orders to CSV spreadsheet and raw JSON format.
  - Store branding, contact details, and statutory food regulatory disclosure configuration.

---

## 2. Directory Structure

```text
├── index.html                   # HTML entry point with synchronized title, OpenGraph tags, and Google Fonts
├── metadata.json                # AI Studio application metadata
├── package.json                 # Dependencies & full-stack scripts (dev: tsx server.ts, start: node server.ts)
├── server.ts                    # Express full-stack server (cart validation, order sessions, admin endpoints)
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Root application router & toast notification manager
│   ├── index.css                # Tailwind CSS v4 styling rules
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces for Product, Order, CartItem, Address, Settings
│   ├── data/
│   │   ├── initialProducts.ts   # The 4 edible oil products with rich culinary and food-label metadata
│   │   └── defaultSettings.ts   # Store branding, shipping thresholds, and tax rate tables
│   ├── context/
│   │   └── StoreContext.tsx     # Global store state (market selector, persistent cart, admin auth)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx       # 3-Zone Top Bar navigation with country selector & bag button
│   │   │   ├── Footer.tsx       # 4-Column footer with policies, newsletter consent, and legal notes
│   │   │   ├── BottleVisual.tsx # Bespoke SVG amber/green/gold artisanal bottle visualizer
│   │   │   ├── ProductCard.tsx  # Product card with quiet metadata and Add to Bag action
│   │   │   └── CartDrawer.tsx   # Slide-out shopping bag drawer with free-shipping meter
│   │   └── home/
│   │       ├── Hero.tsx         # Campaign hero with dual CTAs and bottle showcase
│   │       ├── ProductGrid.tsx  # 4-Product filtered catalogue grid
│   │       ├── CookingGuide.tsx # Educational culinary guide (smoke points, applications)
│   │       ├── QualityStory.tsx # Sourcing transparency, cold pressing, and dark glass protection
│   │       └── ComplianceNotice.tsx # CFIA & FSSAI food business regulatory framework notice
│   └── pages/
│       ├── ProductDetailPage.tsx # PDP with contiguous purchase module, nutrition facts, & related oils
│       ├── CheckoutPage.tsx     # Dual-market checkout with CA/IN address forms, shipping, & payment
│       ├── OrderConfirmationPage.tsx # Post-purchase printable receipt with carrier dispatch tracking
│       ├── AdminDashboard.tsx   # Protected admin portal for products, orders, settings, & exports
│       └── PolicyPage.tsx       # Shipping, Returns, Privacy, Terms, and FAQ pages
```

---

## 3. Local Development

Run the full-stack development environment:
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

To check TypeScript compliance:
```bash
npm run lint
```

To build for production:
```bash
npm run build
```

---

## 4. Payment Provider Configuration

### Stripe (Canada)
1. Add your Stripe API keys to `.env`:
   ```bash
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```
2. When test keys are omitted, the application operates in transparent **Sandbox Simulation Mode**, allowing orders to be processed, validated, and recorded for end-to-end testing without blocking checkout.

### Razorpay (India)
1. Add your Razorpay credentials to `.env`:
   ```bash
   RAZORPAY_KEY_ID="rzp_test_..."
   RAZORPAY_KEY_SECRET="your_secret_..."
   ```
2. For testing, the application simulates UPI/Card authorization and generates verifiable test payment reference IDs (`pay_test_...`).

---

## 5. Regulatory Compliance & Food Labeling Policy

- **No Medical Claims**: Product descriptions explicitly refrain from claiming that culinary edible oils prevent, treat, or cure medical conditions.
- **CFIA (Canada)**: Meets Canadian Food Inspection Agency guidelines for net quantity declarations in metric units, bilingual labeling readiness, ingredient lists, and priority allergen disclosures (mustard seeds).
- **FSSAI (India)**: Meets Food Safety and Standards Authority of India requirements regarding single-oil purity declarations, prohibition of argemone oil, and maximum retail price (MRP) disclosures.
- **Production Verification**: The Store Administrator Dashboard includes dedicated fields to update license numbers, manufacturing facility addresses, and importer details once finalized by the business owner.

---

## 6. Store Administrator Access

- **Console Path**: Accessible via the "Store Admin" link in the top navigation or footer.
- **Default Master Password**: `harvest2026`
- **Capabilities**:
  - Modify prices for both Canada (CAD) and India (INR) independently.
  - Reconfigure Product Slot #4 to your desired edible oil.
  - Update inventory stock counts and market availability toggles.
  - Mark orders as Shipped with carrier name and tracking number.
  - Export full order manifests in CSV format for accounting.
