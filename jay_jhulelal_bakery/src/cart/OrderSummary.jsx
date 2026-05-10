import {ChevronRight} from "./Icons";

const OrderSummary = ({ total, itemCount, onCheckout }) => {
  const delivery = total >= 500 ? 0 : 49;
  const grandTotal = total + delivery;

  return (
    <div style={{
      background: "linear-gradient(145deg, rgba(255,252,248,0.9), rgba(245,233,220,0.7))",
      borderRadius: "24px",
      border: "1px solid rgba(180,130,80,0.2)",
      padding: "28px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(120,70,20,0.1)",
      position: "sticky", top: "20px",
    }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "20px", color: "#3b2409",
        marginBottom: "24px", fontWeight: 700,
      }}>Order Summary</h2>

      {[
        { label: `Items (${itemCount})`, value: `₹${total}` },
        { label: "Delivery", value: delivery === 0 ? "Free 🎉" : `₹${delivery}` },
      ].map(({ label, value }) => (
        <div key={label} style={{
          display: "flex", justifyContent: "space-between",
          marginBottom: "14px",
        }}>
          <span style={{ fontSize: "13px", color: "#7a5c38" }}>{label}</span>
          <span style={{
            fontSize: "13px", fontWeight: 600,
            color: value.includes("Free") ? "#4a8a4a" : "#3b2409",
          }}>{value}</span>
        </div>
      ))}

      {delivery === 0 && (
        <p style={{
          fontSize: "11px", color: "#4a8a4a", marginBottom: "14px",
          background: "rgba(74,138,74,0.08)", borderRadius: "8px",
          padding: "6px 10px", textAlign: "center",
        }}>✓ You qualify for free delivery!</p>
      )}

      <div style={{
        height: "1px", background: "rgba(160,110,60,0.15)",
        margin: "16px 0",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "17px", fontWeight: 700, color: "#3b2409",
        }}>Total</span>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "20px", fontWeight: 700, color: "#7a3f10",
        }}>₹{grandTotal}</span>
      </div>

      <button onClick={onCheckout} style={{
        width: "100%", padding: "15px",
        background: "linear-gradient(135deg, #a0642a, #7a3f10)",
        color: "#fdf5ec", borderRadius: "14px", border: "none",
        cursor: "pointer", fontSize: "14px", fontWeight: 700,
        letterSpacing: "0.8px", textTransform: "uppercase",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        boxShadow: "0 6px 20px rgba(120,70,20,0.35)",
        transition: "all 0.2s",
      }}>
        Proceed to Checkout <ChevronRight />
      </button>

      <p style={{
        textAlign: "center", fontSize: "11px", color: "#a07850",
        marginTop: "14px",
      }}>🔒 Secure checkout</p>
    </div>
  );
};

export default OrderSummary;