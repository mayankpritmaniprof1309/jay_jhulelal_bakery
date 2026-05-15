import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();
const API = "http://localhost:3000/api/cart";

const cartRequest = (body) =>
  axios.post(API, body, { withCredentials: true });

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);       // items array from DB
  const [loading, setLoading] = useState(true);

  // load cart on mount (replaces initial reducer state)
useEffect(() => {
  cartRequest({ action: "GET" })
    .then((res) => setCart(res.data.items ?? []))
    .catch(() => setCart([]))
    .finally(() => setLoading(false));
}, []);

  // replaces ADD_TO_CART
  const addToCart = async (product) => {
    const res = await cartRequest({
      action:   "ADD",
      product:  product._id?.$oid ?? product._id,
      name:     product.name,
      image:    product.image,
      price:    product.price,
      quantity: product.quantity,
    });
    setCart(res.data.items);
  };

  // replaces UPDATE_QUANTITY
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    const res = await cartRequest({
      action:   "UPDATE",
      product:  productId,
      quantity,
    });
    setCart(res.data.items);
  };

  // replaces REMOVE_ITEM
  const removeFromCart = async (productId) => {
    const res = await cartRequest({
      action:  "REMOVE",
      product: productId,
    });
    setCart(res.data.items);
  };

  // replaces CLEAR_CART
  const clearCart = async () => {
    await cartRequest({ action: "CLEAR" });
    setCart([]);
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, loading,
      addToCart, updateQuantity, removeFromCart, clearCart,
      total, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);