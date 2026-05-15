import { useState, useEffect } from "react";
import axios from "axios";

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

const StockBar = ({ stock }) => {
  const pct   = Math.min((stock / 10) * 100, 100);
  const color = stock <= 3 ? '#c0392b' : stock <= 6 ? '#e67e22' : '#c0902b';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        flex: 1, height: 6, background: 'rgba(180,130,80,0.15)',
        borderRadius: 99, overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: color, borderRadius: 99,
          transition: 'width 0.6s ease',
        }} />
      </div>
      <span style={{
        fontSize: 12, fontWeight: 700, color,
        minWidth: 24, textAlign: 'right',
      }}>{stock}</span>
    </div>
  );
};

export default function AdminSettingsPage() {
  const [lowStock, setLowStock]         = useState([]);
  const [stockLoading, setStockLoading] = useState(false);
  const [toast, setToast]               = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchLowStock = async () => {
    setStockLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/lowStock`, {
        withCredentials: true,
      });
      setLowStock(res.data);
    } catch (err) {
      showToast('Failed to fetch stock data');
    } finally {
      setStockLoading(false);
    }
  };

  useEffect(() => { fetchLowStock(); }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fdf5ec 0%, #f5e9d6 50%, #ede0cc 100%)',
      padding: '40px 24px 60px',
      fontFamily: "'Lora', serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lora:wght@400;500;600&display=swap" rel="stylesheet" />

      {toast && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 200,
          background: 'linear-gradient(135deg, #a0642a, #7a3f10)',
          color: '#fdf5ec', padding: '12px 20px', borderRadius: 12,
          fontSize: 13, fontWeight: 600,
          boxShadow: '0 8px 24px rgba(120,70,20,0.3)',
          animation: 'slideIn 0.3s ease',
        }}>{toast}</div>
      )}

      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, color: '#a07850', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>
            Admin Panel
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 5vw, 38px)',
            color: '#3b2409', fontWeight: 800, margin: 0,
          }}>Settings</h1>
        </div>

        {/* Low Stock Card */}
        <div style={{
          background: 'rgba(255,252,248,0.9)',
          borderRadius: 20,
          border: '1px solid rgba(180,130,80,0.18)',
          boxShadow: '0 8px 32px rgba(120,70,20,0.08)',
          overflow: 'hidden',
        }}>
          {/* Card header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(180,130,80,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18, color: '#3b2409', fontWeight: 700, margin: 0,
                }}>Low Stock Alerts</h2>
                {lowStock.length > 0 && (
                  <span style={{
                    background: '#c0392b', color: '#fff',
                    borderRadius: 99, fontSize: 10, fontWeight: 700,
                    padding: '2px 8px',
                  }}>{lowStock.length}</span>
                )}
              </div>
              <p style={{ fontSize: 12, color: '#a07850', margin: '3px 0 0' }}>
                Products with less than 10 units remaining
              </p>
            </div>
            <button
              onClick={fetchLowStock}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 10,
                border: '1.5px solid rgba(160,110,60,0.3)',
                background: 'transparent', color: '#7a5c38',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              <RefreshIcon /> Refresh
            </button>
          </div>

          {/* Content */}
          {stockLoading ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#a07850' }}>Loading…</div>
          ) : lowStock.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
              <p style={{ color: '#7a5c38', fontSize: 14, fontWeight: 600 }}>
                All products are well stocked!
              </p>
            </div>
          ) : (
            <div>
              {lowStock.map((product, i) => (
                <div key={product._id} style={{
                  padding: '16px 24px',
                  borderBottom: i < lowStock.length - 1
                    ? '1px solid rgba(180,130,80,0.1)' : 'none',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: 52, height: 52, borderRadius: 10,
                      objectFit: 'cover',
                      border: '1px solid rgba(180,130,80,0.2)',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{
                        fontSize: 14, fontWeight: 600, color: '#3b2409',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{product.name}</span>
                      {product.stock <= 3 && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: '#c0392b',
                          background: 'rgba(192,57,43,0.1)',
                          border: '1px solid rgba(192,57,43,0.2)',
                          borderRadius: 99, padding: '1px 8px', flexShrink: 0,
                        }}>Critical</span>
                      )}
                    </div>
                    <StockBar stock={product.stock} />
                  </div>
                  <div style={{ fontSize: 13, color: '#7a5c38', fontWeight: 600, flexShrink: 0 }}>
                    ₹{product.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}