import React from 'react';

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  borderRadius: '12px',
  border: '1.5px solid rgba(160,110,60,0.25)',
  background: 'rgba(255,255,255,0.7)',
  fontSize: '14px',
  color: '#3b2409',
  outline: 'none',
  fontFamily: "'Lora', serif",
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const FormField = ({ label, type = 'text', placeholder, value, onChange, half, readOnly}) => (
  <div style={{ flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: half ? '140px' : 'auto' }}>
    <label style={{
      display: 'block', fontSize: '11px', fontWeight: 700,
      color: '#7a5c38', letterSpacing: '0.8px',
      textTransform: 'uppercase', marginBottom: '7px',
    }}>{label}</label>
    <input
      readOnly={readOnly} 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={inputStyle}
      onFocus={e => {
        e.target.style.borderColor = '#a0642a';
        e.target.style.boxShadow = '0 0 0 3px rgba(160,100,42,0.1)';
      }}
      onBlur={e => {
        e.target.style.borderColor = 'rgba(160,110,60,0.25)';
        e.target.style.boxShadow = 'none';
      }}
    />
  </div>
);

export default FormField;