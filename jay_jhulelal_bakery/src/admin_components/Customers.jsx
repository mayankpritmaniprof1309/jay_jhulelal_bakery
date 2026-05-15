import { useEffect, useState } from "react";
import axios from "axios";



function getToken() {
  try {
    const stored = localStorage.getItem("bakery_user");
    return stored ? JSON.parse(stored).token : null;
  } catch { return null; }
}

// Generate a consistent color from name initials
const AVATAR_COLORS = [
  "bg-amber-800", "bg-stone-700", "bg-rose-800",
  "bg-teal-700",  "bg-violet-800","bg-orange-700",
  "bg-cyan-800",  "bg-lime-800",  "bg-pink-800",
];

function getAvatarColor(name = "") {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function getInitials(firstName = "", lastName = "") {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toISOString().split("T")[0];
}

function formatRupee(n) {
  if (!n) return "₹0";
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
}

//  Skeleton Card 
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 animate-pulse">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-stone-200 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-stone-200 rounded w-32" />
          <div className="h-3 bg-stone-100 rounded w-44" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="h-14 bg-stone-100 rounded-2xl" />
        <div className="h-14 bg-stone-100 rounded-2xl" />
      </div>
      <div className="h-3 bg-stone-100 rounded w-36" />
    </div>
  );
}

//  Customer Card
function CustomerCard({ customer, index }) {
  const fullName  = `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim() || "Unknown";
  const initials  = getInitials(customer.firstName ?? "", customer.lastName ?? "");
  const avatarBg  = getAvatarColor(fullName);
  const orderCount   = customer.orderCount   ?? 0;
  const totalSpent   = customer.totalSpent   ?? 0;
  const memberSince  = formatDate(customer.createdAt);

  return (
    <div
      className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Avatar + Name */}
      <div className="flex items-center gap-4 mb-5">
        <div className={`w-14 h-14 rounded-2xl ${avatarBg} flex items-center justify-center shrink-0`}>
          <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            {initials}
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-stone-800 text-[15px] leading-tight truncate"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {fullName}
          </h3>
          <p className="text-[12px] text-stone-400 truncate mt-0.5">{customer.email ?? "—"}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-stone-50 rounded-2xl px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Orders</p>
          <p className="text-[22px] font-bold text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            {orderCount}
          </p>
        </div>
        <div className="bg-amber-50 rounded-2xl px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">Total Spent</p>
          <p className="text-[22px] font-bold text-amber-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            {formatRupee(totalSpent)}
          </p>
        </div>
      </div>

      {/* Member since */}
      <p className="text-[11px] text-stone-400">
        Member since {memberSince}
      </p>
    </div>
  );
}

//  Main Page 
export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [orders,    setOrders]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [search,    setSearch]    = useState("");

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, ordersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/auth/admin/getAllUsers`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/order/getAllOrders`,     { headers }),
      ]);

      const allUsers  = Array.isArray(usersRes.data)  ? usersRes.data  : usersRes.data.users  ?? [];
      const allOrders = Array.isArray(ordersRes.data) ? ordersRes.data : ordersRes.data.orders ?? [];

      // Only non-admin users
      const customers = allUsers.filter(u => !u.isAdmin);

      // Calculate orderCount + totalSpent per customer
      const enriched = customers.map(user => {
        const userOrders = allOrders.filter(o => {
          const uid = typeof o.user === "object" ? o.user?._id : o.user;
          return String(uid) === String(user._id);
        });

        const totalSpent = userOrders
          .filter(o => o.status !== "cancelled")
          .reduce((sum, o) => sum + (o.totalPrice ?? 0), 0);

        return { ...user, orderCount: userOrders.length, totalSpent };
      });

      setCustomers(enriched);
      setOrders(allOrders);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load customers.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = customers.filter(c => {
    const name  = `${c.firstName ?? ""} ${c.lastName ?? ""}`.toLowerCase();
    const email = (c.email ?? "").toLowerCase();
    const q     = search.toLowerCase();
    return name.includes(q) || email.includes(q);
  });

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            Customers
          </h1>
          {!loading && (
            <p className="text-sm text-stone-400 mt-0.5">{customers.length} total customers</p>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="pl-9 pr-4 py-2.5 rounded-2xl border border-stone-200 bg-white text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-64 placeholder-stone-300"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <span>⚠️</span>
          <span className="flex-1">{error}</span>
          <button onClick={fetchData} className="border border-red-300 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-red-100">
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.length === 0
            ? <p className="col-span-full text-center text-stone-400 py-16">
                {search ? "No customers match your search." : "No customers yet."}
              </p>
            : filtered.map((c, i) => (
                <CustomerCard key={c._id} customer={c} index={i} />
              ))
        }
      </div>

      {/* Footer */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-stone-400 text-right">
          Showing {filtered.length} of {customers.length} customers
        </p>
      )}

    </div>
  );
}