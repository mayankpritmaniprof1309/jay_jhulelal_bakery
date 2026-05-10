import React from 'react';
import FormField from './Formfield';
import { CardIcon, LockIcon } from './Checkouticons';

const methods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi',  label: 'UPI',                 icon: '⚡' },
  { id: 'cod',  label: 'Cash on Delivery',    icon: '💵' },
];

const PaymentForm = ({ form, setForm, onNext, onBack }) => {
  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const method = form.paymentMethod || 'card';

  const handleNext = () => {
    console.log("Review Order clicked, calling onNext");
    onNext();
  };

  const handleBack = () => {
    console.log("Back clicked, calling onBack");
    onBack();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #a0642a, #7a3f10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fdf5ec', boxShadow: '0 4px 12px rgba(120,70,20,0.25)',
        }}><CardIcon /></div>
        <div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px', color: '#3b2409', fontWeight: 700, margin: 0,
          }}>Payment</h2>
          <p style={{ fontSize: '12px', color: '#a07850', margin: 0 }}>Choose how you'd like to pay</p>
        </div>
      </div>

      {/* Method selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        {methods.map(m => (
          <button
            type="button"
            key={m.id}
            onClick={() => setForm(f => ({ ...f, paymentMethod: m.id }))}
            style={{
              flex: 1, padding: '12px 8px', borderRadius: '12px',
              border: `1.5px solid ${method === m.id ? '#a0642a' : 'rgba(160,110,60,0.25)'}`,
              background: method === m.id ? 'rgba(160,100,42,0.08)' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
            }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{m.icon}</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: method === m.id ? '#7a3f10' : '#7a5c38' }}>{m.label}</div>
          </button>
        ))}
      </div>

      {/* Card fields */}
      {method === 'card' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <FormField label="Cardholder Name" placeholder="Name on card" value={form.cardName || ''} onChange={update('cardName')} />
          <FormField label="Card Number" placeholder="1234 5678 9012 3456" value={form.cardNumber || ''} onChange={update('cardNumber')} />
          <FormField label="Expiry" placeholder="MM / YY" value={form.expiry || ''} onChange={update('expiry')} half />
          <FormField label="CVV" type="password" placeholder="•••" value={form.cvv || ''} onChange={update('cvv')} half />
        </div>
      )}

      {/* UPI field */}
      {method === 'upi' && (
        <FormField label="UPI ID" placeholder="yourname@upi" value={form.upiId || ''} onChange={update('upiId')} />
      )}

      {/* COD notice */}
      {method === 'cod' && (
        <div style={{
          padding: '16px', borderRadius: '12px',
          background: 'rgba(160,100,42,0.06)', border: '1px solid rgba(160,110,60,0.2)',
          fontSize: '13px', color: '#7a5c38', lineHeight: 1.6,
        }}>
          💡 Please keep exact change ready at the time of delivery. Our delivery partner does not carry change.
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
        <button
          type="button"
          onClick={handleBack}
          style={{
            flex: '0 0 120px', padding: '15px',
            background: 'transparent',
            border: '1.5px solid rgba(160,110,60,0.3)',
            borderRadius: '14px', cursor: 'pointer',
            fontSize: '13px', fontWeight: 600, color: '#7a5c38',
          }}>← Back</button>

        <button
          type="button"
          onClick={handleNext}
          style={{
            flex: 1, padding: '15px',
            background: 'linear-gradient(135deg, #a0642a, #7a3f10)',
            color: '#fdf5ec', borderRadius: '14px', border: 'none', cursor: 'pointer',
            fontSize: '14px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
            boxShadow: '0 6px 20px rgba(120,70,20,0.3)',
          }}>Review Order →</button>
      </div>

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#a07850', marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <LockIcon /> 256-bit SSL secured payment
      </p>
    </div>
  );
};

export default PaymentForm;