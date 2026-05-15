import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";
import axios from 'axios'
import { useEffect, useState } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [cartItems, setcartItems] = useState([])

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fdf5ec 0%, #f5e9d6 50%, #ede0cc 100%)",
      padding: "40px 16px 60px",
      fontFamily: "sans-serif",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto 32px" }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 5vw, 40px)",
          color: "#3b2409", fontWeight: 800, marginBottom: "4px",
        }}>Your Cart</h1>
        <p style={{ fontSize: "13px", color: "#a07850" }}>
          {itemCount === 0 ? "Nothing here yet" : `${itemCount} item${itemCount > 1 ? "s" : ""} selected`}
        </p>
      </div>

      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: cart.length === 0 ? "1fr" : "1fr",
        gap: "24px",
        alignItems: "start",
      }}>
        <div>
          {cart.length === 0
            ? <EmptyCart onShop={() => navigate("/product")} />
            : cart.map(item => (
              <CartItem key={item._id} item={item} dispatch={dispatch} />
            ))
          }
        </div>

        {cart.length > 0 && (
          <OrderSummary
            total={total}
            itemCount={itemCount}
            onCheckout={() => navigate("/checkout")}
          />
        )}
      </div>
    </div>
  );
};

export default CartPage;