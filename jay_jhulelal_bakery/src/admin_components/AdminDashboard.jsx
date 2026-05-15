import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const STATUS_CONFIG = {
  delivered:        { classes: "bg-green-100 text-green-700",   label: "Delivered" },
  pending:          { classes: "bg-amber-100 text-amber-700",   label: "Pending" },
  processing:       { classes: "bg-blue-100 text-blue-700",     label: "Processing" },
  out_for_delivery: { classes: "bg-purple-100 text-purple-700", label: "Out for Delivery" },
  cancelled:        { classes: "bg-red-100 text-red-700",       label: "Cancelled" },
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-amber-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-stone-200 rounded w-24" />
        <div className="h-6 bg-stone-200 rounded w-16" />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, iconBg }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl hrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-stone-400 font-semibold uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-stone-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// Gets token from bakery_user in localStorage
function getToken() {
  try {
    const stored = localStorage.getItem("bakery_user");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed.token || null;
  } catch {
    return null;
  }
}

export default function DashboardPage () {

  
  const { user } = useAuth();

  const [stats, setStats]     = useState(null);
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => { fetchDashboard(); }, []);

  async function fetchDashboard() {
    setLoading(true);
    setError("");

    const token = getToken();

    if (!token) {
      setError("No auth token found. Please log out and log in again.");
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [{ data: allOrders }, { data: allProducts }, { data: allUsers }] =
        await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/order/populateUsers`, { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/product/allProducts`,   { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/auth/admin/getAllUsers`,      { headers }),
        ]);

        
      const totalRevenue = allOrders
        .filter(o => o.status !== "cancelled")
        .filter(o => o.isPaid !== false)
        .reduce((sum, o) => sum + o.totalPrice, 0);

      setStats({
        totalOrders:    allOrders.length,
        totalRevenue,
        totalProducts:  allProducts.length,
        totalCustomers: allUsers.filter(u => !u.isAdmin).length,
      });

      setOrders(
        [...allOrders]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
      );
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function formatRupee(n) {
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
    if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n}`;
  }

  function shortId(id) {
    return `ORD-${String(id).slice(-4).toUpperCase()}`;
  }

  function customerName(user) {
    if (!user) return "—";
    if (typeof user === "object") return `${user.firstName} ${user.lastName}`;
    return user;
  }

  function itemsSummary(items = []) {
    return items.map(i => `${i.name} x${i.quantity}`).join(", ") || "—";
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const adminName = user?.firstName || "Admin";

  return (
    <div className="p-6 space-y-6">

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-stone-800">{greeting}, {adminName} 👋</h1>
        <p className="text-stone-500 text-sm mt-1">
          Here's what's happening at Jay Jhulelal Bakery today.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <span>⚠️</span>
          <span className="flex-1">{error}</span>
          <button
            onClick={fetchDashboard}
            className="border border-red-300 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-red-100 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading ? (
          <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
        ) : stats && (
          <>
            <StatCard icon="📦" iconBg="bg-orange-100" label="Total Orders"    value={stats.totalOrders.toLocaleString()} />
            <StatCard icon="💰" iconBg="bg-emerald-100" label="Total Revenue"  value={formatRupee(stats.totalRevenue)} />
            <StatCard icon="🛍" iconBg="bg-sky-100"     label="Total Products" value={stats.totalProducts} />
            <StatCard icon="👥" iconBg="bg-violet-100"  label="Customers"      value={stats.totalCustomers.toLocaleString()} />
          </>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="text-lg font-bold text-stone-800">Recent Orders</h2>
          <button
            onClick={fetchDashboard}
            disabled={loading}
            className="flex items-center gap-1.5 border border-stone-200 rounded-xl px-3 py-1.5 text-sm font-semibold text-amber-800 hover:bg-amber-50 transition-colors disabled:opacity-40"
          >
            <span className={loading ? "animate-spin inline-block" : ""}>↻</span>
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="p-10 text-center text-stone-400 text-sm">Loading orders…</p>
        ) : orders.length === 0 ? (
          <p className="p-10 text-center text-stone-400 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {orders.map((order, idx) => {
                  const s = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                  return (
                    <tr
                      key={order._id}
                      className={`hover:bg-amber-50/40 transition-colors ${idx % 2 === 1 ? "bg-stone-50/40" : "bg-white"}`}
                    >
                      <td className="px-5 py-3.5 font-semibold text-amber-800 whitespace-nowrap">
                        {shortId(order._id)}
                      </td>
                      <td className="px-5 py-3.5 text-stone-700 font-medium whitespace-nowrap">
                        {customerName(order.user)}
                      </td>
                      <td className="px-5 py-3.5 text-stone-500 max-w-xs truncate">
                        {itemsSummary(order.items)}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-stone-800 whitespace-nowrap">
                        ₹{order.totalPrice}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.classes}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-stone-400 text-xs whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}