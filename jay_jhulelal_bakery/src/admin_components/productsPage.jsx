import { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal  from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { Stars } from "./AdminIcons";
import { Icon } from "./AdminIcons";

function getToken() {
  try {
    const stored = localStorage.getItem("bakery_user");
    return stored ? JSON.parse(stored).token : null;
  } catch { return null; }
}


// ── Category badge ─────────────────────────────────────────────
const CAT_COLORS = {
  Cakes:    "bg-amber-800 text-white",
  Pastries: "bg-stone-700 text-white",
  Cupcakes: "bg-rose-700 text-white",
  Breads:   "bg-yellow-800 text-white",
  Cookies:  "bg-orange-700 text-white",
  Drinks:   "bg-teal-700 text-white",
};

// ── Skeleton card ──────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-52 bg-stone-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-100 rounded w-full" />
        <div className="h-3 bg-stone-100 rounded w-2/3" />
        <div className="h-8 bg-stone-100 rounded-xl mt-4" />
      </div>
    </div>
  );
}

// ── Product Card ───────────────────────────────────────────────
function ProductCard({ product, onEdit, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const catColor = CAT_COLORS[product.category] ?? "bg-stone-700 text-white";

  async function handleDelete() {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    setDeleting(true);
    try {
      const token = getToken();
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/product/deleteProduct/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(product._id);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete product.");
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100 group">

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; }}
        />
        {/* Category badge */}
        <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${catColor}`}>
          {product.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-bold text-stone-800 text-[16px] leading-tight mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          {product.name}
        </h3>
        <p className="text-[12px] text-stone-400 leading-relaxed mb-3 line-clamp-2">
          {product.desc}
        </p>

        {/* Price + rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-bold text-amber-800"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              ₹{product.price}
            </span>
            <span className="text-[11px] text-stone-400">/{product.qty ?? "piece"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating ?? 4} />
            <span className="text-[11px] text-stone-400">({product.reviews ?? 0})</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-100 mb-4" />

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:border-amber-400 hover:text-amber-800 hover:bg-amber-50 transition-all"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-40"
          >
            {deleting ? "…" : "🗑 Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function ProductsPage() {
  const [products,    setProducts]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [showAdd,     setShowAdd]     = useState(false);
  const [editProduct, setEditProduct] = useState(null); // product to edit

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/allProducts`, { headers });
      setProducts(Array.isArray(data) ? data : data.products ?? []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  
  function handleProductAdded(newProduct) {
    setProducts(prev => [newProduct, ...prev]);
  }

  function handleProductUpdated(updated) {
    setProducts(prev => prev.map(p => p._id === updated._id ? updated : p));
  }


  function handleProductDeleted(id) {
    setProducts(prev => prev.filter(p => p._id !== id));
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>
          Products
        </h1>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-amber-900/20 transition-all hover:scale-[1.02]"
        >
          <span className="text-lg leading-none">+</span> Add Product
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <span>⚠️</span>
          <span className="flex-1">{error}</span>
          <button onClick={fetchProducts} className="border border-red-300 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-red-100">
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.length === 0
            ? <p className="col-span-full text-center text-stone-400 py-16">No products found.</p>
            : products.map(p => (
                <ProductCard
                  key={p._id}
                  product={p}
                  onEdit={setEditProduct}
                  onDelete={handleProductDeleted}
                />
              ))
        }
      </div>

      {/* Modals */}
      {showAdd && (
        <AddProductModal
          onClose={() => setShowAdd(false)}
          onAdded={handleProductAdded}
        />
      )}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdated={handleProductUpdated}
        />
      )}

    </div>
  );
}