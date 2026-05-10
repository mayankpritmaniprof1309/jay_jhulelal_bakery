import React from 'react';

const OrderSuccess = ({ onContinue }) => (
  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
    {/* Animated checkmark */}
    <div style={{
      width: '80px', height: '80px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #a0642a, #7a3f10)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 8px 32px rgba(120,70,20,0.35)',
      animation: 'pop 0.4s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fdf5ec"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>

    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: '28px', color: '#3b2409', fontWeight: 800, marginBottom: '8px',
    }}>Order Placed! 🎉</h2>
    <p style={{ fontSize: '14px', color: '#7a5c38', lineHeight: 1.6, maxWidth: '320px', margin: '0 auto 8px' }}>
      Thank you for choosing Jay Jhulelal Bakery. Your delicious treats are being prepared with love.
    </p>
    <p style={{ fontSize: '13px', color: '#a07850', marginBottom: '32px' }}>
      You'll receive a confirmation on your phone shortly.
    </p>

    <div style={{
      display: 'inline-block', padding: '10px 24px',
      background: 'rgba(160,100,42,0.08)', borderRadius: '20px',
      fontSize: '13px', color: '#7a3f10', fontWeight: 600, marginBottom: '32px',
      border: '1px solid rgba(160,110,60,0.2)',
    }}>
      Estimated delivery: 30–45 mins ⏱
    </div>

    <br />
    <button onClick={onContinue} style={{
      padding: '13px 32px',
      background: 'linear-gradient(135deg, #a0642a, #7a3f10)',
      color: '#fdf5ec', borderRadius: '14px', border: 'none', cursor: 'pointer',
      fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px',
      boxShadow: '0 6px 20px rgba(120,70,20,0.3)',
    }}>
      Continue Shopping
    </button>

    <style>{`
      @keyframes pop {
        from { transform: scale(0); opacity: 0; }
        to   { transform: scale(1); opacity: 1; }
      }
    `}</style>
  </div>
);

export default OrderSuccess;