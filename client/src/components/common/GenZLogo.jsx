import React from 'react';

export default function GenZLogo({ height = 52, style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', ...style }}>
      {/* Official Logo Graphic Mark */}
      <img 
        src="/genz-logo-cropped.png" 
        alt="Company Logo" 
        style={{ 
          height: `${height}px`, 
          width: 'auto', 
          objectFit: 'contain', 
          display: 'block',
          filter: 'drop-shadow(0 4px 10px rgba(37, 99, 235, 0.15))'
        }} 
      />
    </div>
  );
}
