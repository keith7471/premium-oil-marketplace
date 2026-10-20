import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order, OrderStatus, StoreSettings } from '../types';
import { BottleVisual } from '../components/common/BottleVisual';
import {
  ShieldCheck,
  Lock,
  Package,
  ShoppingBag,
  Sliders,
  DollarSign,
  Download,
  Edit,
  Save,
  CheckCircle,
  Truck,
  LogOut,
  AlertCircle,
  FileText,
  Building,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    updateProduct,
    settings,
    updateSettings,
    adminToken,
    setAdminToken,
    setActiveView,
    formatCurrency,
    showToast,
  } = useStore();

  // Admin Login State
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings' | 'export'>('orders');

  // Orders State (loaded from localStorage)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('hg_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  const reloadOrders = () => {
    try {
      const saved = localStorage.getItem('hg_orders');
      if (saved) setOrders(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus, tracking?: string, carrier?: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: status,
          trackingNumber: tracking !== undefined ? tracking : o.trackingNumber,
          carrier: carrier !== undefined ? carrier : o.carrier,
        };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem('hg_orders', JSON.stringify(updated));
    showToast(`Order status updated to "${status}"`);
  };

  // Product Editing State (for 4 products)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Store Settings Edit Form State
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);

  // Simple secure authentication check
  // Default demo admin pass: "harvest2026"
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'harvest2026' || password === 'admin') {
      const token = `adm_token_${Date.now()}`;
      setAdminToken(token);
      setLoginError(null);
      showToast('Welcome to Harvest & Grove Store Operations Console');
    } else {
      setLoginError('Invalid administrator credentials. (Default demo pass: harvest2026)');
    }
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    showToast('Logged out of admin console');
  };

  // Export Orders function (CSV)
  const handleExportCSV = () => {
    if (orders.length === 0) {
      showToast('No orders available to export yet.');
      return;
    }

    const headers = [
      'Order Number',
      'Date',
      'Market',
      'Customer Name',
      'Customer Email',
      'City',
      'Region',
      'Postal/PIN',
      'Items Count',
      'Currency',
      'Subtotal',
      'Shipping',
      'Tax',
      'Total',
      'Payment Method',
      'Payment Status',
      'Order Status',
      'Tracking Number',
    ];

    const rows = orders.map((o) => [
      o.orderNumber,
      o.createdAt,
      o.country,
      `"${o.customer.fullName.replace(/"/g, '""')}"`,
      o.customer.email,
      `"${o.customer.city}"`,
      o.customer.region,
      o.customer.postalCode,
      o.items.reduce((s, i) => s + i.quantity, 0),
      o.currency,
      o.subtotal.toFixed(2),
      o.shippingCost.toFixed(2),
      o.taxAmount.toFixed(2),
      o.total.toFixed(2),
      o.paymentMethod,
      o.paymentStatus,
      o.orderStatus,
      o.trackingNumber || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Harvest_Grove_Orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders exported to CSV file.');
  };

  // Export Orders as JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(orders, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Harvest_Grove_Orders_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Orders exported to JSON file.');
  };

  // Calculations for stats
  const totalSalesCAD = orders
    .filter((o) => o.currency === 'CAD')
    .reduce((sum, o) => sum + o.total, 0);

  const totalSalesINR = orders
    .filter((o) => o.currency === 'INR')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingFulfillments = orders.filter(
    (o) => o.orderStatus === 'paid' || o.orderStatus === 'processing'
  ).length;

  if (!adminToken) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#FAF8F5]">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#DDD3C2] p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#243522] text-[#D8C69F] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-serif font-bold text-[#1E291C]">
              Store Administrator Authentication
            </h1>
            <p className="text-xs text-[#6B5E4E]">
              Protected merchant console for inventory, order fulfillment, and multi-market pricing.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-[#FDF2F2] border border-[#F5C2C2] text-xs text-[#A12B2B]">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#4F4333] mb-1">
                Admin Master Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD3C2] text-xs focus:outline-hidden focus:border-[#243522]"
              />
              <p className="text-[11px] text-[#857766] mt-1">
                Default Demo Password: <code className="bg-[#EFE9DD] px-1 py-0.5 rounded font-mono font-bold">harvest2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#243522] text-[#F7F4EE] text-xs font-semibold hover:bg-[#162314] transition-colors cursor-pointer"
            >
              Authenticate &amp; Enter Console
            </button>
          </form>

          <div className="pt-4 border-t border-[#EDE5DA] text-center">
            <button
              onClick={() => setActiveView('home')}
              className="text-xs text-[#6B5E4E] hover:text-[#1E291C] cursor-pointer"
            >
              &larr; Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Operations Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6DDD0]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#546E44]">
              <ShieldCheck className="w-4 h-4" />
              <span>Merchant Operations Center</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#1E291C] mt-1">
              Store Management Console
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('home')}
              className="px-3.5 py-1.5 rounded-lg border border-[#DDD3C2] bg-white text-xs font-semibold text-[#443B2E] hover:bg-[#F7F4EE] cursor-pointer"
            >
              View Storefront
            </button>
            <button
              onClick={handleAdminLogout}
              className="px-3.5 py-1.5 rounded-lg bg-[#ECE4D6] text-xs font-semibold text-[#5A4D3D] hover:bg-[#DFD5C4] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Real-time KPI Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#DDD3C2] shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6D5C] block">
              Canada Gross Sales
            </span>
            <div className="text-2xl font-serif font-bold text-[#1E291C] mt-1">
              ${totalSalesCAD.toFixed(2)} CAD
            </div>
            <span className="text-[11px] text-[#546E44] font-medium block mt-1">
              Domestic Canadian Channel
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DDD3C2] shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6D5C] block">
              India Gross Sales
            </span>
            <div className="text-2xl font-serif font-bold text-[#1E291C] mt-1">
              ₹{totalSalesINR.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-[#546E44] font-medium block mt-1">
              Domestic Indian Channel
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DDD3C2] shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6D5C] block">
              Total Placed Orders
            </span>
            <div className="text-2xl font-serif font-bold text-[#1E291C] mt-1">
              {orders.length} Orders
            </div>
            <span className="text-[11px] text-[#7A6D5C] block mt-1">
              Recorded in ledger
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DDD3C2] shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6D5C] block">
              Awaiting Fulfillment
            </span>
            <div className="text-2xl font-serif font-bold text-[#9C4E1E] mt-1">
              {pendingFulfillments} Pending
            </div>
            <span className="text-[11px] text-[#9C4E1E] block mt-1">
              Dispatch needed
            </span>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="flex items-center gap-2 border-b border-[#DDD3C2] pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-white border-t border-x border-[#DDD3C2] text-[#1E291C] font-bold shadow-xs'
                : 'text-[#695D4D] hover:text-[#1E291C]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders Ledger ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-white border-t border-x border-[#DDD3C2] text-[#1E291C] font-bold shadow-xs'
                : 'text-[#695D4D] hover:text-[#1E291C]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Catalogue Manager (4 Products)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-white border-t border-x border-[#DDD3C2] text-[#1E291C] font-bold shadow-xs'
                : 'text-[#695D4D] hover:text-[#1E291C]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Market Shipping, Taxes &amp; Food Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'export'
                ? 'bg-white border-t border-x border-[#DDD3C2] text-[#1E291C] font-bold shadow-xs'
                : 'text-[#695D4D] hover:text-[#1E291C]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Data Export</span>
          </button>
        </div>

        {/* Tab 1: Orders Ledger */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-[#DDD3C2] shadow-xs overflow-hidden space-y-4">
            <div className="p-5 border-b border-[#EDE5DA] flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-[#1E291C]">Customer Orders</h3>
                <p className="text-xs text-[#6E6150]">Review order details, update shipping tracking, and manage fulfillment.</p>
              </div>
              <button
                onClick={reloadOrders}
                className="p-2 text-[#6E6150] hover:text-[#1E291C] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
                title="Refresh order list"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#7A6D5C]">
                No customer orders placed yet. Test an order from the storefront checkout to see it appear here in real time.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#6E6150] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EDE5DA]">
                    <tr>
                      <th className="px-5 py-3">Order Number</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Recipient &amp; Dest</th>
                      <th className="px-5 py-3">Items Manifest</th>
                      <th className="px-5 py-3">Total Paid</th>
                      <th className="px-5 py-3">Fulfillment</th>
                      <th className="px-5 py-3">Carrier Tracking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE5DA]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-[#1E291C]">
                          #{ord.orderNumber}
                        </td>
                        <td className="px-5 py-4 text-[#6E6150]">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-[#1E291C]">{ord.customer.fullName}</div>
                          <div className="text-[11px] text-[#786C5B]">
                            {ord.customer.city}, {ord.customer.region} ({ord.country})
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="space-y-0.5">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="text-[11px] text-[#4F4333]">
                                {it.quantity}x {it.productName} ({it.bottleSize})
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-[#1E291C]">
                          {ord.currency === 'CAD' ? `$${ord.total.toFixed(2)} CAD` : `₹${ord.total.toFixed(2)}`}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) =>
                              handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)
                            }
                            className="px-2 py-1 rounded bg-[#FAF8F5] border border-[#DDD3C2] text-xs font-medium cursor-pointer"
                          >
                            <option value="paid">Paid (Awaiting Pack)</option>
                            <option value="processing">Processing / Packing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled / Refunded</option>
                          </select>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-[11px] text-[#546E44] font-mono">
                            {ord.carrier}: {ord.trackingNumber || 'Pending'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 4-Product Catalogue Manager */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-[#DDD3C2] shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1E291C]">
                    Four-Product Inventory &amp; Specifications
                  </h3>
                  <p className="text-xs text-[#6E6150]">
                    Strictly 4 products are maintained in this catalogue. You can configure prices (CAD &amp; INR), stock counts, origins, and adapt Slot #4 to any specialty oil.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {products.map((p, idx) => (
                <div key={p.id} className="bg-white rounded-xl border border-[#DDD3C2] p-5 shadow-xs space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-28 rounded-lg overflow-hidden bg-[#F5EFE4] shrink-0 border border-[#DDD2C0]">
                      <BottleVisual
                        type={p.imageFallback}
                        bottleSize={p.bottleSize}
                        isPlaceholder={p.isPlaceholder}
                        className="w-full h-full scale-90"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6D5C]">
                          Catalogue Slot #{idx + 1} {p.isPlaceholder && '· (Configurable Slot)'}
                        </span>
                        <span className={`text-[11px] font-bold ${p.stock > 0 ? 'text-[#3E5C31]' : 'text-[#8F2D2D]'}`}>
                          {p.stock} In Stock
                        </span>
                      </div>

                      <h4 className="text-base font-serif font-bold text-[#1E291C] truncate mt-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#695D4D] line-clamp-2 mt-0.5">{p.shortDescription}</p>

                      <div className="grid grid-cols-2 gap-2 pt-3 text-xs">
                        <div className="bg-[#FAF8F5] p-2 rounded border border-[#EDE5DA]">
                          <span className="text-[10px] text-[#7A6D5C] uppercase block">Price (CAD)</span>
                          <span className="font-mono font-bold">${p.prices.CA.amount.toFixed(2)} CAD</span>
                          <span className="text-[10px] block text-[#546E44]">
                            {p.prices.CA.isAvailable ? '✓ Enabled for CA' : '✗ Disabled in CA'}
                          </span>
                        </div>
                        <div className="bg-[#FAF8F5] p-2 rounded border border-[#EDE5DA]">
                          <span className="text-[10px] text-[#7A6D5C] uppercase block">Price (INR)</span>
                          <span className="font-mono font-bold">₹{p.prices.IN.amount.toFixed(2)} INR</span>
                          <span className="text-[10px] block text-[#546E44]">
                            {p.prices.IN.isAvailable ? '✓ Enabled for IN' : '✗ Disabled in IN'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EDE5DA] flex items-center justify-between">
                    <span className="text-[11px] text-[#7A6D5C] truncate max-w-xs">
                      Origin: {p.countryOfOrigin}
                    </span>
                    <button
                      onClick={() => setEditingProduct({ ...p })}
                      className="px-3.5 py-1.5 rounded-lg bg-[#243522] text-[#F7F4EE] text-xs font-semibold hover:bg-[#162314] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#D8C69F]" />
                      <span>Edit Slot #{idx + 1}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Edit Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-[#DDD3C2] max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#EDE5DA] pb-3">
                    <h3 className="text-lg font-serif font-bold text-[#1E291C]">
                      Edit Product: {editingProduct.name}
                    </h3>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="text-xs font-semibold text-[#7A6D5C] hover:text-[#1E291C] cursor-pointer"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#4A3E31] mb-1">Product Title</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#4A3E31] mb-1">Oil Category / Type</label>
                      <input
                        type="text"
                        value={editingProduct.oilType}
                        onChange={(e) => setEditingProduct({ ...editingProduct, oilType: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#4A3E31] mb-1">Bottle Size (e.g. 500 ml, 750 ml)</label>
                      <input
                        type="text"
                        value={editingProduct.bottleSize}
                        onChange={(e) => setEditingProduct({ ...editingProduct, bottleSize: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#4A3E31] mb-1">Price in Canada (CAD $)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingProduct.prices.CA.amount}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            prices: {
                              ...editingProduct.prices,
                              CA: { ...editingProduct.prices.CA, amount: parseFloat(e.target.value) || 0 },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2] font-mono"
                      />
                      <label className="flex items-center gap-1.5 mt-1 text-[11px] text-[#5A4F41]">
                        <input
                          type="checkbox"
                          checked={editingProduct.prices.CA.isAvailable}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              prices: {
                                ...editingProduct.prices,
                                CA: { ...editingProduct.prices.CA, isAvailable: e.target.checked },
                              },
                            })
                          }
                        />
                        <span>Enable product in Canada market</span>
                      </label>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#4A3E31] mb-1">Price in India (INR ₹)</label>
                      <input
                        type="number"
                        step="1"
                        value={editingProduct.prices.IN.amount}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            prices: {
                              ...editingProduct.prices,
                              IN: { ...editingProduct.prices.IN, amount: parseFloat(e.target.value) || 0 },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2] font-mono"
                      />
                      <label className="flex items-center gap-1.5 mt-1 text-[11px] text-[#5A4F41]">
                        <input
                          type="checkbox"
                          checked={editingProduct.prices.IN.isAvailable}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              prices: {
                                ...editingProduct.prices,
                                IN: { ...editingProduct.prices.IN, isAvailable: e.target.checked },
                              },
                            })
                          }
                        />
                        <span>Enable product in India market</span>
                      </label>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#4A3E31] mb-1">Inventory Stock (Bottles)</label>
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2] font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#4A3E31] mb-1">Smoke Point</label>
                      <input
                        type="text"
                        value={editingProduct.smokePoint}
                        onChange={(e) => setEditingProduct({ ...editingProduct, smokePoint: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#4A3E31] mb-1">Country / Region of Origin</label>
                      <input
                        type="text"
                        value={editingProduct.countryOfOrigin}
                        onChange={(e) => setEditingProduct({ ...editingProduct, countryOfOrigin: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#4A3E31] mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        value={editingProduct.shortDescription}
                        onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#4A3E31] mb-1">Ingredients Declaration</label>
                      <input
                        type="text"
                        value={editingProduct.ingredients}
                        onChange={(e) => setEditingProduct({ ...editingProduct, ingredients: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-[#4A3E31] mb-1">Food Safety / Labeling Notice</label>
                      <textarea
                        rows={2}
                        value={editingProduct.foodSafetyNotice}
                        onChange={(e) => setEditingProduct({ ...editingProduct, foodSafetyNotice: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EDE5DA] flex items-center justify-end gap-3">
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 rounded-lg border border-[#DDD3C2] text-xs font-semibold text-[#5A4F41] hover:bg-[#F7F4EE] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        updateProduct(editingProduct);
                        setEditingProduct(null);
                      }}
                      className="px-5 py-2 rounded-lg bg-[#243522] text-[#F7F4EE] text-xs font-semibold hover:bg-[#162314] cursor-pointer shadow-xs"
                    >
                      Save Catalogue Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Market Shipping, Taxes & Food Policy Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl border border-[#DDD3C2] p-6 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif font-bold text-base text-[#1E291C]">
                Store Branding, Market Thresholds &amp; Regulatory Declarations
              </h3>
              <p className="text-xs text-[#6E6150]">
                Configure domestic shipping thresholds, flat delivery rates, and statutory notices for Canada &amp; India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="sm:col-span-2 border-b border-[#EDE5DA] pb-4">
                <h4 className="font-bold text-[#1E291C] mb-3">Brand &amp; Contact Identity</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-[#4A3E31] mb-1">Store Brand Name</label>
                    <input
                      type="text"
                      value={settingsForm.brandName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#4A3E31] mb-1">Concierge Email</label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#4A3E31] mb-1">Canada Phone</label>
                    <input
                      type="text"
                      value={settingsForm.contactPhoneCA}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactPhoneCA: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                    />
                  </div>
                </div>
              </div>

              {/* Canadian Market Settings */}
              <div className="space-y-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE5DA]">
                <div className="flex items-center gap-2 font-bold text-[#1E291C]">
                  <span role="img" aria-label="Canada">🇨🇦</span>
                  <span>Canada Market Shipping Settings</span>
                </div>
                <div>
                  <label className="block font-semibold text-[#4A3E31] mb-1">Free Shipping Threshold (CAD $)</label>
                  <input
                    type="number"
                    value={settingsForm.freeShippingThresholdCA}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, freeShippingThresholdCA: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A3E31] mb-1">Standard Ground Courier Rate (CAD $)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={settingsForm.standardShippingRateCA}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, standardShippingRateCA: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2] font-mono"
                  />
                </div>
              </div>

              {/* Indian Market Settings */}
              <div className="space-y-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE5DA]">
                <div className="flex items-center gap-2 font-bold text-[#1E291C]">
                  <span role="img" aria-label="India">🇮🇳</span>
                  <span>India Market Shipping Settings</span>
                </div>
                <div>
                  <label className="block font-semibold text-[#4A3E31] mb-1">Free Shipping Threshold (INR ₹)</label>
                  <input
                    type="number"
                    value={settingsForm.freeShippingThresholdIN}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, freeShippingThresholdIN: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A3E31] mb-1">Standard Delivery Rate (INR ₹)</label>
                  <input
                    type="number"
                    value={settingsForm.standardShippingRateIN}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, standardShippingRateIN: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2] font-mono"
                  />
                </div>
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={settingsForm.cashOnDeliveryEnabledIN}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, cashOnDeliveryEnabledIN: e.target.checked })
                    }
                  />
                  <span>Enable Cash on Delivery (COD) in India</span>
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#4A3E31] mb-1">
                  CFIA Canadian Regulatory Advisory Statement
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.cfiaAdvisoryText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, cfiaAdvisoryText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#4A3E31] mb-1">
                  FSSAI Indian Regulatory Advisory Statement
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.fssaiAdvisoryText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, fssaiAdvisoryText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DDD3C2]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE5DA] flex justify-end">
              <button
                onClick={() => updateSettings(settingsForm)}
                className="px-6 py-2.5 rounded-lg bg-[#243522] text-[#F7F4EE] text-xs font-semibold hover:bg-[#162314] cursor-pointer"
              >
                Save All Operational Settings
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Data Export */}
        {activeTab === 'export' && (
          <div className="bg-white rounded-xl border border-[#DDD3C2] p-6 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif font-bold text-base text-[#1E291C]">Export Order &amp; Catalogue Data</h3>
              <p className="text-xs text-[#6E6150]">Download complete ledgers for accounting, bookkeeping, and fulfillment integrations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl border border-[#DDD3C2] bg-[#FAF8F5] space-y-3">
                <h4 className="font-bold text-xs text-[#1E291C] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#546E44]" />
                  <span>Orders Manifest (CSV Spreadsheet)</span>
                </h4>
                <p className="text-xs text-[#6B5E4E]">
                  Compatible with Microsoft Excel, Google Sheets, QuickBooks, and accounting software. Includes addresses, payment references, and tax breakdowns.
                </p>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-lg bg-[#243522] text-[#F7F4EE] text-xs font-semibold hover:bg-[#162314] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#D8C69F]" />
                  <span>Download Orders (.CSV)</span>
                </button>
              </div>

              <div className="p-5 rounded-xl border border-[#DDD3C2] bg-[#FAF8F5] space-y-3">
                <h4 className="font-bold text-xs text-[#1E291C] flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#546E44]" />
                  <span>Complete Database Snapshot (JSON)</span>
                </h4>
                <p className="text-xs text-[#6B5E4E]">
                  Full raw JSON backup containing complete item snapshots, timestamps, carrier codes, and customer addresses.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-lg border border-[#DDD3C2] bg-white text-[#1E291C] text-xs font-semibold hover:bg-[#EFE9DD] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#546E44]" />
                  <span>Download Ledger (.JSON)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
