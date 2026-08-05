import React from 'react';

export default function GenZLogo({ height = 64, style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', ...style }}>
      <img 
        src="/genz-neural-logo.png" 
        alt="GENZ Neural-X Logo" 
        style={{ 
          height: `${height}px`, 
          width: 'auto', 
          objectFit: 'contain',
          display: 'block'
        }} 
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          fontSize: '1.4rem', 
          fontWeight: 900, 
          letterSpacing: '-0.02em', 
          color: '#0F172A',
          lineHeight: 1.1
        }}>
          GENZ <span style={{ color: '#7C3AED' }}>CRM</span>
        </span>
        <span style={{ 
          fontSize: '0.7rem', 
          fontWeight: 700, 
          color: '#64748B', 
          letterSpacing: '0.08em', 
          textTransform: 'uppercase' 
        }}>
          Neural-X Company OS
        </span>
      </div>
    </div>
  );
}
