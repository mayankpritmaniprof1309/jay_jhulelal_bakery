import { useEffect, useState } from "react";
import axios from "axios";

// const BASE = "http://localhost:3000/api";

function getToken() {
  try {
    const stored = localStorage.getItem("bakery_user");
    return stored ? JSON.parse(stored).token : null;
  } catch { return null; }
}

const STATUS_CONFIG = {
  delivered:        { classes: "bg-green-100 text-green-700 border-green-200",   label: "Delivered" },
  pending:          { classes: "bg-amber-100 text-amber-700 border-amber-200",   label: "Pending" },
  processing:       { classes: "bg-blue-100 text-blue-700 border-blue-200",      label: "Processing" },
  out_for_delivery: { classes: "bg-purple-100 text-purple-700 border-purple-200",label: "Out for Delivery" },
  cancelled:        { classes: "bg-red-100 text-red-700 border-red-200",         label: "Cancelled" },

};

const FILTERS = ["All", "pending", "processing", "out_for_delivery", "delivered", "cancelled","unpaid"];

function shortId(id) { return `ORD-${String(id).slice(-4).toUpperCase()}`; }
function customerName(user) {
  if (!user) return "—";
  if (typeof user === "object") return `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  return user;
}
function itemsSummary(items = []) {
  return items.map(i => `${i.name} x${i.quantity}`).join(", ") || "—";
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// button for isPaid
function PaidToggle({ orderId, isPaid, onChange }) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.put(
        `${import.meta.env.API_URL}/api/order/updateIsPaid/${orderId}`,
        { isPaid: !isPaid },
        { headers }
      );
      onChange(orderId, !isPaid);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update payment status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={isPaid ? "Mark as Unpaid" : "Mark as Paid"}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50
        ${isPaid ? "bg-emerald-500" : "bg-stone-300"}`}
    >
      <span
        className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200
          ${isPaid ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

// ── Status Dropdown ────────────────────────────────────────────
function StatusSelect({ orderId, current, onChange }) {
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value;
    setLoading(true);
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.put(
        `${import.meta.env.API_URL}/api/order/updateStatus/${orderId}`,
        { status: newStatus },
        { headers }
      );
      onChange(orderId, newStatus);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={loading}
      className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 bg-white text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 cursor-pointer"
    >
      {Object.entries(STATUS_CONFIG).map(([val, { label }]) => (
        <option key={val} value={val}>{label}</option>
      ))}
    </select>
  );
}

// ── Main Component ─────────────────────────────────────────────
export function ShowOrders() {
  const [orders, setOrders]   = useState([]);
  const [filter, setFilter]   = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await axios.get(`${import.meta.env.API_URL}/api/order/populateUsers`, { headers });
      // handle both array and { orders: [...] } response shapes
      setOrders(Array.isArray(data) ? data : data.orders ?? []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  }

  function handlePaidChange(orderId, newIsPaid) {
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, isPaid: newIsPaid } : o));
  }

  function handleStatusChange(orderId, newStatus) {
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
  }
//For filtering the order based on status and isPaid
  const filtered = filter === "All"
  ? orders
  : filter === "unpaid"
    ? orders.filter(o => !o.isPaid)
    : orders.filter(o => o.status === filter);

  return (
    <div className="p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Orders Management</h1>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-1.5 border border-stone-200 rounded-xl px-3 py-1.5 text-sm font-semibold text-amber-800 hover:bg-amber-50 transition-colors disabled:opacity-40"
        >
          <span className={loading ? "animate-spin inline-block" : ""}>↻</span>
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => {
          const label = f === "All" ? "All" : f === "unpaid" ? "Unpaid" : (STATUS_CONFIG[f]?.label ?? f);
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors
                ${active
                  ? "bg-amber-800 text-white border-amber-800"
                  : "bg-white text-stone-600 border-stone-200 hover:border-amber-400 hover:text-amber-800"}`}
            >
              {label}
              {f !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({f === "unpaid"
                    ? orders.filter(o => !o.isPaid).length
                    : orders.filter(o => o.status === f).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <span>⚠️</span>
          <span className="flex-1">{error}</span>
          <button onClick={fetchOrders} className="border border-red-300 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-red-100">
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-100">
        {loading ? (
          <div className="p-12 text-center text-stone-400 text-sm">Loading orders…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-stone-400 text-sm">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  {["Order ID", "Customer", "Items", "Total", "Date", "Status", "Paid", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-stone-400 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {filtered.map((order, idx) => {
                  const s = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
                  return (
                    <tr key={order._id} className={`hover:bg-amber-50/40 transition-colors ${idx % 2 === 1 ? "bg-stone-50/40" : "bg-white"}`}>
                      <td className="px-5 py-3.5 font-semibold text-amber-800 whitespace-nowrap">
                        {shortId(order._id)}
                      </td>
                      <td className="px-5 py-3.5 text-stone-700 font-medium whitespace-nowrap">
                        {customerName(order.user)}
                      </td>
                      <td className="px-5 py-3.5 text-stone-500 max-w-55 truncate">
                        {itemsSummary(order.items)}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-stone-800 whitespace-nowrap">
                        ₹{order.totalPrice}
                      </td>
                      <td className="px-5 py-3.5 text-stone-400 text-xs whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.classes}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <PaidToggle
                            orderId={order._id}
                            isPaid={order.isPaid}
                            onChange={handlePaidChange}
                          />
                          <span className={`text-xs font-semibold ${order.isPaid ? "text-emerald-600" : "text-stone-400"}`}>
                            {order.isPaid ? "Paid" : "Unpaid"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusSelect
                          orderId={order._id}
                          current={order.status}
                          onChange={handleStatusChange}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer count */}
      {!loading && (
        <p className="text-xs text-stone-400 text-right">
          Showing {filtered.length} of {orders.length} orders
        </p>
      )}
    </div>
  );
}