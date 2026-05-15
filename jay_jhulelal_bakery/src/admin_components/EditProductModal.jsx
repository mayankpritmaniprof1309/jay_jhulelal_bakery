import { useState } from "react";
import axios from "axios";

const BASE = `${import.meta.env.API_URL}/api`;

function getToken() {
  try {
    const stored = localStorage.getItem("bakery_user");
    return stored ? JSON.parse(stored).token : null;
  } catch { return null; }
}

const CATEGORIES = ['cake', 'pastry', 'bread', 'cookies', 'drinks', 'other'];
const UNITS      = ["piece", "kg", "loaf", "dozen", "box", "slice"];

export default function EditProductModal({ product, onClose, onUpdated }) {
  const [form, setForm] = useState({
    name:        product.name        ?? "",
    price:       product.price       ?? "",
    desc:        product.desc        ?? "",
    category:    product.category    ?? "cake",
    unit:        product.unit        ?? "piece",
    stock:       product.stock       ?? 0,       // ← new
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview,   setPreview]   = useState(product.image ?? null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!form.name || !form.price) return setError("Name and price are required.");
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };

      const fd = new FormData();
      fd.append("name",        form.name);
      fd.append("price",       form.price);
      fd.append("description", form.desc);
      fd.append("category",    form.category);
      fd.append("unit",        form.unit);
      fd.append("stock",       form.stock);      // ← new
      if (imageFile) fd.append("image", imageFile);

      const { data } = await axios.put(
        `${BASE}/product/updateProduct/${product._id}`, fd,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );

      onUpdated(data.product ?? data);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            Edit Product
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors text-lg">✕</button>
        </div>

        {/* Body */}
        <div className="px-7 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2.5 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Product Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors overflow-hidden relative group">
              {preview ? (
                <>
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-3xl mb-1">🖼</p>
                  <p className="text-xs text-amber-700 font-medium">Click to upload image</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Product Name</label>
            <input
              name="name" value={form.name} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>

          {/* Price + Stock — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Price (₹)</label>
              <input
                name="price" type="number" min="0" value={form.price} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                Stock
                {/* live badge shows current level */}
                {form.stock !== "" && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    Number(form.stock) === 0
                      ? "bg-red-100 text-red-600"
                      : Number(form.stock) <= 5
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {Number(form.stock) === 0 ? "Out of stock" : Number(form.stock) <= 5 ? "Low" : "In stock"}
                  </span>
                )}
              </label>
              <input
                name="stock" type="number" min="0" value={form.stock} onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              name="desc" value={form.desc} onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
            />
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Unit</label>
              <select name="unit" value={form.unit} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                {UNITS.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 pb-6 pt-3 border-t border-stone-100">
          <button
            onClick={handleSubmit} disabled={loading}
            className="w-full py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-900/20"
          >
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}