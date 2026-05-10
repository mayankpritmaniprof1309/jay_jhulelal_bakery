import {TrashIcon} from "./Icons";

const CartItem = ({ item, dispatch }) => {
  const handleQtyChange = (delta) => {
    const next = item.quantity + delta;
    if (next < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: item._id, quantity: next } });
  };

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      alignItems: "center",
      padding: "20px 24px",
      background: "rgba(255,255,255,0.55)",
      borderRadius: "20px",
      border: "1px solid rgba(180,130,80,0.15)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 4px 24px rgba(120,70,20,0.07)",
      marginBottom: "14px",
      transition: "box-shadow 0.2s",
    }}>

      {/* Image */}
      <div style={{
        width: "88px", height: "88px", borderRadius: "14px",
        overflow: "hidden", flexShrink: 0,
        boxShadow: "0 6px 20px rgba(120,70,20,0.18)",
      }}>
        <img src={item.image} alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "17px", fontWeight: 600,
          color: "#3b2409", marginBottom: "4px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{item.name}</p>
        <p style={{ fontSize: "12px", color: "#a07850", marginBottom: "10px" }}>
          ₹{item.price} / {item.qty}
        </p>

        {/* Qty control */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {[-1, null, +1].map((delta, i) =>
            delta === null ? (
              <span key="val" style={{
                width: "32px", height: "32px", borderRadius: "10px",
                background: "rgba(245,233,220,0.9)",
                border: "1px solid rgba(160,110,60,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: 700, color: "#3b2409",
              }}>{item.quantity}</span>
            ) : (
              <button key={i} onClick={() => handleQtyChange(delta)} style={{
                width: "32px", height: "32px", borderRadius: "10px",
                background: "rgba(245,233,220,0.9)",
                border: "1px solid rgba(160,110,60,0.25)",
                cursor: "pointer", fontSize: "18px", lineHeight: 1,
                color: "#7a3f10", display: "flex", alignItems: "center",
                justifyContent: "center", transition: "all 0.15s",
              }}>{delta > 0 ? "+" : "−"}</button>
            )
          )}
        </div>
      </div>

      {/* Right: subtotal + remove */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "18px", fontWeight: 700, color: "#7a3f10", marginBottom: "12px",
        }}>₹{item.price * item.quantity}</p>
        <button
          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item._id })}
          style={{
            background: "rgba(200,80,60,0.08)", border: "1px solid rgba(200,80,60,0.2)",
            borderRadius: "8px", padding: "6px 10px", cursor: "pointer",
            color: "#c04030", display: "flex", alignItems: "center", gap: "5px",
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.5px",
            transition: "all 0.15s",
          }}
        >
          <TrashIcon /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;