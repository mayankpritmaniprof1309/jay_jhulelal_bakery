import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import StepIndicator from './Stepindicator';
import DeliveryForm from './deliveryform';
import PaymentForm from './Paymentform';
import OrderReview from './OrderReview';
import OrderSuccess from './Ordersuccess';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', address: '',
    city: '', state: '', pincode: '', landmark: '',
    deliveryType: '0',
    paymentMethod: 'card',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
    upiId: '',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      setStep(3); // success screen
      setPlacing(false);
    }, 1800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #fdf5ec 0%, #f5e9d6 50%, #ede0cc 100%)',
      padding: '40px 24px 60px',
      fontFamily: "'Lora', serif",
    }}>
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lora:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Page title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(26px, 5vw, 36px)',
            color: '#3b2409', fontWeight: 800, marginBottom: '6px',
          }}>Checkout</h1>
          <p style={{ fontSize: '13px', color: '#a07850' }}>
            {cart.length} item{cart.length !== 1 ? 's' : ''} · ₹{total} total
          </p>
        </div>

        {/* Step indicator (hide on success) */}
        {step < 3 && <StepIndicator currentStep={step} />}

        {/* Card */}
        <div style={{
          background: 'rgba(255,252,248,0.85)',
          borderRadius: '24px',
          border: '1px solid rgba(180,130,80,0.18)',
          padding: 'clamp(24px, 5vw, 40px)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 12px 48px rgba(120,70,20,0.1)',
        }}>
          {step === 0 && (
            <DeliveryForm form={form} setForm={setForm} onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <PaymentForm form={form} setForm={setForm} onNext={() => setStep(2)} onBack={() => setStep(0)} />
          )}
          {step === 2 && (
            <OrderReview
              form={form} cart={cart} total={total}
              onPlace={handlePlaceOrder} onBack={() => setStep(1)}
              placing={placing}
            />
          )}
          {step === 3 && (
            <OrderSuccess onContinue={() => navigate('/product')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;