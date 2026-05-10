import React from 'react';
import { CheckIcon } from './Checkouticons';

const steps = ['Delivery', 'Payment', 'Confirm'];

const StepIndicator = ({ currentStep }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '40px', gap: '0',
  }}>
    {steps.map((label, i) => {
      const done = i < currentStep;
      const active = i === currentStep;
      return (
        <React.Fragment key={label}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: done
                ? 'linear-gradient(135deg, #a0642a, #7a3f10)'
                : active
                  ? 'linear-gradient(135deg, #c8843a, #a0642a)'
                  : 'rgba(200,170,130,0.25)',
              border: active ? '2px solid #a0642a' : done ? 'none' : '2px solid rgba(160,110,60,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: done || active ? '#fdf5ec' : '#a07850',
              fontSize: '14px', fontWeight: 700,
              boxShadow: active ? '0 4px 16px rgba(120,70,20,0.3)' : 'none',
              transition: 'all 0.3s',
            }}>
              {done ? <CheckIcon /> : i + 1}
            </div>
            <span style={{
              fontSize: '11px', fontWeight: active ? 700 : 500,
              color: active ? '#7a3f10' : done ? '#a0642a' : '#b09070',
              letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              width: '80px', height: '2px', marginBottom: '24px',
              background: i < currentStep
                ? 'linear-gradient(90deg, #a0642a, #c8843a)'
                : 'rgba(160,110,60,0.2)',
              transition: 'background 0.3s',
            }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default StepIndicator;