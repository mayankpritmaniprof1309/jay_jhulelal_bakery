import React from 'react';
import { LockIcon } from './Checkouticons';

const Row = ({ label, value, bold }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
    <span style={{ fontSize: '13px', color: '#7a5c38' }}>{label}</span>
    <span style={{ fontSize: '13px', fontWeight: bold ? 700 : 500, color: bold ? '#7a3f10' : '#3b2409' }}>{value}</span>
  </div>
);

const OrderReview = ({ form, cart, total, onPlace, onBack, placing }) => {
  const delivery = total >= 500 ? 0 : (form.deliveryType === '1' ? 49 : 0);
  const grand = total + delivery;

  return (
    <div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '20px', color: '#3b2409', fontWeight: 700, marginBottom: '24px',
      }}>Review & Confirm</h2>

      {/* Cart items */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#7a5c38', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px' }}>Your Items</p>
        {cart.map(item => (
          <div key={item._id} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '12px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.5)', marginBottom: '8px',
            border: '1px solid rgba(180,130,80,0.12)',
          }}>
            <img src={item.image} alt={item.name} style={{
              width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(120,70,20,0.15)',
            }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#3b2409', margin: 0 }}>{item.name}</p>
              <p style={{ fontSize: '12px', color: '#a07850', margin: 0 }}>₹{item.price} × {item.quantity}</p>
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700, color: '#7a3f10' }}>
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* Delivery info */}
      <div style={{
        padding: '16px', borderRadius: '12px',
        background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(180,130,80,0.12)',
        marginBottom: '16px',
      }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#7a5c38', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '10px' }}>Delivering to</p>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#3b2409', margin: '0 0 2px' }}>{form.fullName}</p>
        <p style={{ fontSize: '13px', color: '#7a5c38', margin: 0 }}>{form.address}, {form.city}, {form.state} – {form.pincode}</p>
        <p style={{ fontSize: '13px', color: '#7a5c38', margin: '2px 0 0' }}>{form.phone}</p>
      </div>

      {/* Bill */}
      <div style={{
        padding: '16px', borderRadius: '12px',
        background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(180,130,80,0.12)',
        marginBottom: '24px',
      }}>
        <Row label="Subtotal" value={`₹${total}`} />
        <Row label="Delivery" value={delivery === 0 ? 'Free 🎉' : `₹${delivery}`} />
        <div style={{ height: '1px', background: 'rgba(160,110,60,0.15)', margin: '12px 0' }} />
        <Row label="Grand Total" value={`₹${grand}`} bold />
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={onBack} style={{
          flex: '0 0 120px', padding: '15px',
          background: 'transparent', border: '1.5px solid rgba(160,110,60,0.3)',
          borderRadius: '14px', cursor: 'pointer',
          fontSize: '13px', fontWeight: 600, color: '#7a5c38',
        }}>← Back</button>
        <button onClick={onPlace} disabled={placing} style={{
          flex: 1, padding: '15px',
          background: placing ? 'rgba(160,110,60,0.3)' : 'linear-gradient(135deg, #a0642a, #7a3f10)',
          color: placing ? '#b09070' : '#fdf5ec',
          borderRadius: '14px', border: 'none', cursor: placing ? 'not-allowed' : 'pointer',
          fontSize: '14px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
          boxShadow: placing ? 'none' : '0 6px 20px rgba(120,70,20,0.35)',
          transition: 'all 0.2s',
        }}>
          {placing ? 'Placing Order...' : '🎉 Place Order'}
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#a07850', marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <LockIcon /> Secure order • Free cancellation within 1 hour
      </p>
    </div>
  );
};

export default OrderReview;