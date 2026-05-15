import { useEffect, useState } from "react";

// ─── CartToast ───────────────────────────────────────────────────────────────
// Usage:
//   import { showCartToast } from "./CartToast";
//   showCartToast({ name: "Product Name", image: "url", price: 99 });
// ─────────────────────────────────────────────────────────────────────────────

let _setToast = null;

export function showCartToast({ name, image, price } = {}) {
  if (_setToast) _setToast({ name, image, price, key: Date.now() });
}

export default function CartToast() {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  // Register the setter globally so showCartToast() can reach it
  useEffect(() => {
    _setToast = setToast;
    return () => { _setToast = null; };
  }, []);

  // Animate in → auto-dismiss after 3 s → animate out
  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const hide = setTimeout(() => setVisible(false), 3000);
    const clean = setTimeout(() => setToast(null), 3400); // after fade-out
    return () => { clearTimeout(hide); clearTimeout(clean); };
  }, [toast]);

  if (!toast) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        .ct-wrap {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          font-family: 'DM Sans', sans-serif;
          pointer-events: none;
        }

        .ct-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 14px 20px 14px 14px;
          box-shadow:
            0 0 0 1px rgba(255,210,100,0.12),
            0 20px 60px rgba(0,0,0,0.55),
            0 4px 16px rgba(255,195,0,0.08);
          min-width: 280px;
          max-width: 340px;
          transform: translateY(30px) scale(0.94);
          opacity: 0;
          transition:
            transform 0.38s cubic-bezier(0.16,1,0.3,1),
            opacity   0.32s ease;
          will-change: transform, opacity;
        }

        .ct-card.show {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        /* Thumbnail */
        .ct-img {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          object-fit: cover;
          flex-shrink: 0;
          background: #1e1e1e;
        }
        .ct-img-fallback {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          background: linear-gradient(135deg,#2a2a2a,#1a1a1a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        /* Text */
        .ct-body { flex: 1; min-width: 0; }

        .ct-tag {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f5c542;
          margin-bottom: 3px;
        }

        .ct-name {
          font-size: 14px;
          font-weight: 500;
          color: #f0f0f0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ct-price {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-top: 2px;
        }

        /* Tick icon */
        .ct-tick {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg,#f5c542,#f0851a);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(245,197,66,0.35);
        }
        .ct-tick svg { width: 16px; height: 16px; }

        /* Progress bar */
        .ct-bar-track {
          position: absolute;
          bottom: 0;
          left: 14px;
          right: 14px;
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 0 0 18px 18px;
          overflow: hidden;
        }
        .ct-bar-fill {
          height: 100%;
          background: linear-gradient(90deg,#f5c542,#f0851a);
          border-radius: 2px;
          animation: ct-drain 3s linear forwards;
        }
        @keyframes ct-drain {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>

      <div className="ct-wrap">
        <div className={`ct-card ${visible ? "show" : ""}`} style={{ position: "relative" }}>

          {/* Thumbnail */}
          {toast.image
            ? <img className="ct-img" src={toast.image} alt={toast.name} />
            : <div className="ct-img-fallback">🛍️</div>
          }

          {/* Text */}
          <div className="ct-body">
            <div className="ct-tag">Added to cart</div>
            <div className="ct-name">{toast.name || "Item"}</div>
            {toast.price != null && (
              <div className="ct-price">₹{toast.price}</div>
            )}
          </div>

          {/* Tick */}
          <div className="ct-tick">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8l3.5 3.5L13 5" stroke="#0d0d0d" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Auto-dismiss progress bar */}
          {visible && (
            <div className="ct-bar-track">
              <div className="ct-bar-fill" key={toast.key} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}