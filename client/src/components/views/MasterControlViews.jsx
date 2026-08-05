import React from 'react';

export default function MasterControlViews({ activeCategory, activeSubModule }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '16px',
      border: '1px solid var(--border-subtle)',
      minHeight: 'calc(100vh - 140px)',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.03)'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#94A3B8',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          {activeCategory} / {activeSubModule}
        </div>
        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '-0.02em'
        }}>
          {activeSubModule} Page
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: '#64748B',
          lineHeight: 1.5
        }}>
          Clean white workspace ready for customization.
        </p>
      </div>
    </div>
  );
}
