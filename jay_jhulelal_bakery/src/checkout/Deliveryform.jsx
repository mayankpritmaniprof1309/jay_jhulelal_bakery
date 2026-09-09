import React, { useState, useEffect } from 'react';
import FormField from './Formfield';
import { LocationIcon } from './Checkouticons';

const DeliveryForm = ({ form, setForm, onNext }) => {
  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("bakery_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.error("Failed to parse user from localStorage");
      }
    }
  }, []);

  // Wraping everything in a <form> and handle submit here
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #a0642a, #7a3f10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fdf5ec', boxShadow: '0 4px 12px rgba(120,70,20,0.25)',
        }}><LocationIcon /></div>
        <div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px', color: '#3b2409', fontWeight: 700, margin: 0,
          }}>Delivery Details</h2>
          <p style={{ fontSize: '12px', color: '#a07850', margin: 0 }}>Where should we deliver your order?</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <FormField label="Full Name" placeholder="first name" readOnly
          value={user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : ''}
          onChange={update('fullName')} />
        <FormField label="Phone Number" required={true} type="tel" placeholder="+91 98765 43210"
          value={form.phone} onChange={update('phone')} />
        <FormField label="Email" type="email" placeholder="email" readOnly
          value={user?.email ?? ''}
          onChange={update('email')} />
        <FormField label="Address Line" required={true} placeholder="House no, Street, Area"
          value={form.address} onChange={update('address')} />
        <FormField label="City" required={true} placeholder="Anand" value={form.city} onChange={update('city')} half />
        <FormField label="State" required={true} placeholder="Gujarat" value={form.state} onChange={update('state')} half />
        <FormField label="Pincode" required={true} placeholder="395001" type="tel" value={form.pincode} onChange={update('pincode')} half />
        <FormField label="Landmark (optional)" placeholder="Near SBI Bank"
          value={form.landmark} onChange={update('landmark')} half />
      </div>

      {/* Delivery type */}
      <div style={{ marginTop: '24px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#7a5c38', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px' }}>Delivery Type</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Standard (Free)', 'Express (₹49)'].map((opt, i) => (
            <label key={opt} style={{
              flex: 1, padding: '14px 16px', borderRadius: '12px',
              border: `1.5px solid ${form.deliveryType === String(i) ? '#a0642a' : 'rgba(160,110,60,0.25)'}`,
              background: form.deliveryType === String(i) ? 'rgba(160,100,42,0.08)' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
              transition: 'all 0.2s',
            }}>
              <input type="radio" name="delivery" value={String(i)}
                checked={form.deliveryType === String(i)}
                onChange={update('deliveryType')}
                style={{ accentColor: '#a0642a' }} />
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#3b2409', margin: 0 }}>{opt}</p>
                <p style={{ fontSize: '11px', color: '#a07850', margin: 0 }}>{i === 0 ? '2–3 business days' : 'Same day delivery'}</p>
              </div>
            </label>
          ))}
        </div>
      </div>


      <button
        type="submit"
        style={{
          marginTop: '28px', width: '100%', padding: '15px',
          background: 'linear-gradient(135deg, #a0642a, #7a3f10)',
          color: '#fdf5ec', borderRadius: '14px', border: 'none', cursor: 'pointer',
          fontSize: '14px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase',
          boxShadow: '0 6px 20px rgba(120,70,20,0.3)', transition: 'all 0.2s',
        }}>
        Continue to Payment →
      </button>
    </form>
  );
};

export default DeliveryForm;