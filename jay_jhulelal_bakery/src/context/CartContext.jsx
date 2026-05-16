import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const CartContext = createContext();
const API = `${import.meta.env.VITE_API_URL}/api/cart`;

const cartRequest = (body, signal) =>
  axios.post(API, body, { withCredentials: true, signal });

export function CartProvider({ children }) {
  const [cart, setCart]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);   // ✅ surface errors to UI

  // ── load cart on mount ──────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 8000); // ✅ 8s timeout

    cartRequest({ action: "GET" }, controller.signal)
      .then((res) => {
        setCart(res.data.items ?? []);
        setError(null);
      })
      .catch((err) => {
        if (axios.isCancel(err) || err.code === "ERR_CANCELED") {
          setError("Server is waking up, please wait…"); // ✅ Render cold start message
        } else if (err.response?.status === 401) {
          setCart([]);  // not logged in — silently clear
        } else {
          setError("Failed to load cart.");
          console.error("Cart GET failed:", err.message);
        }
        setCart([]);
      })
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeout);
      controller.abort(); // ✅ cancel on unmount
    };
  }, []);

  // ── helpers ─────────────────────────────────────────────────────────

  // ✅ wrap mutations in try/catch so callers can handle errors
  const addToCart = useCallback(async (product) => {
    const res = await cartRequest({
      action:   "ADD",
      product:  product._id?.$oid ?? product._id,
      name:     product.name,
      image:    product.image,
      price:    product.price,
      quantity: product.quantity ?? 1,
    });
    setCart(res.data.items);
  }, []);

  const updateQuantity = useCallback(async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    const res = await cartRequest({ action: "UPDATE", product: productId, quantity });
    setCart(res.data.items);
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    const res = await cartRequest({ action: "REMOVE", product: productId });
    setCart(res.data.items);
  }, []);

  const clearCart = useCallback(async () => {
    await cartRequest({ action: "CLEAR" });
    setCart([]);
  }, []);

  // ✅ refresh cart manually (e.g. after login)
  const refreshCart = useCallback(async () => {
    setLoading(true);
    cartRequest({ action: "GET" })
      .then((res) => setCart(res.data.items ?? []))
      .catch((err) => {
        if (err.response?.status !== 401) console.error("Cart refresh failed:", err.message);
        setCart([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const total     = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, loading, error,
      addToCart, updateQuantity, removeFromCart, clearCart, refreshCart,
      total, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);