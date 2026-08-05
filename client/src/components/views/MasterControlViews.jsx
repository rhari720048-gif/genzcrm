import React from 'react';
import { Clock, Sparkles, Rocket } from 'lucide-react';

export default function MasterControlViews({ activeCategory, activeSubModule }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid var(--border-subtle)',
      minHeight: 'calc(100vh - 140px)',
      padding: '3rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.04)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Soft Glow */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, rgba(255,255,255,0) 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        textAlign: 'center',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Animated Icon Badge */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#7C3AED',
          boxShadow: '0 8px 20px rgba(124, 58, 237, 0.12)'
        }}>
          <Clock size={30} />
        </div>

        {/* Category & Submodule Breadcrumb Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#7C3AED',
          background: 'rgba(124, 58, 237, 0.08)',
          padding: '0.35rem 0.85rem',
          borderRadius: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}>
          <Sparkles size={13} /> {activeCategory} &bull; {activeSubModule}
        </div>

        {/* Main Heading */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 900,
          color: '#0F172A',
          letterSpacing: '-0.03em',
          margin: 0
        }}>
          {activeSubModule} <span style={{ color: '#7C3AED' }}>Coming Soon</span>
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '0.95rem',
          color: '#64748B',
          lineHeight: 1.6,
          margin: 0
        }}>
          We are building something powerful! The <strong>{activeSubModule}</strong> module under <strong>{activeCategory}</strong> is currently under active development and will be live shortly.
        </p>

        {/* Status Tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '12px',
          background: '#F8FAFC',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#334155'
        }}>
          <Rocket size={15} color="#0891B2" />
          Scheduled in Next Sprint Release
        </div>
      </div>
    </div>
  );
}
