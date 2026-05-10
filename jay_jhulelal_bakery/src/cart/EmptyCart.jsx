import {BagIcon} from "./Icons";

const EmptyCart = ({ onShop }) => (
  <div style={{
    textAlign: "center",
    padding: "80px 20px",
    color: "#a07850",
  }}>
    <div style={{ opacity: 0.25, marginBottom: "20px" }}><BagIcon /></div>
    <p style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "24px", color: "#3b2409", marginBottom: "8px",
    }}>Your cart is empty</p>
    <p style={{ fontSize: "13px", marginBottom: "28px" }}>
      Add some delicious treats to get started
    </p>
    <button onClick={onShop} style={{
      padding: "12px 28px",
      background: "linear-gradient(135deg, #a0642a, #7a3f10)",
      color: "#fdf5ec", borderRadius: "12px", border: "none",
      cursor: "pointer", fontSize: "13px", fontWeight: 700,
      letterSpacing: "0.5px", boxShadow: "0 4px 16px rgba(120,70,20,0.3)",
    }}>
      Browse Products
    </button>
  </div>
);

export default EmptyCart;