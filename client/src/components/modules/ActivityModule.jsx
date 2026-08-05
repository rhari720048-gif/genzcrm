import React, { useState } from 'react';
import { Activity, ShieldCheck, Filter, Bot, User, CheckCircle2, Code, DollarSign, Users } from 'lucide-react';

export default function ActivityModule({ logs = [] }) {
  const [filterDept, setFilterDept] = useState('All');

  const filteredLogs = filterDept === 'All' 
    ? logs 
    : logs.filter(l => l.department.toLowerCase().includes(filterDept.toLowerCase()));

  const getActionIcon = (type) => {
    switch (type) {
      case 'ai': return <Bot size={18} color="#7C3AED" />;
      case 'deploy': return <Code size={18} color="#0891B2" />;
      case 'sales': return <DollarSign size={18} color="#059669" />;
      case 'hr': return <Users size={18} color="#D97706" />;
      default: return <Activity size={18} color="#E11D48" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>⚡ Activity Timeline & Audit Stream</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complete transparent audit log of all human and AI agent actions across departments</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select 
            value={filterDept} 
            onChange={(e) => setFilterDept(e.target.value)}
            style={{ 
              background: '#FFFFFF', 
              color: '#0F172A', 
              border: '1px solid var(--border-subtle)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              fontWeight: 500
            }}
          >
            <option value="All">All Activity</option>
            <option value="Engineering">Engineering</option>
            <option value="Operations">Operations & AI</option>
            <option value="Product">Product & Design</option>
            <option value="Sales">Sales & Growth</option>
            <option value="HR">People & HR</option>
          </select>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '900px', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
          
          {/* Vertical Timeline Bar */}
          <div style={{ 
            position: 'absolute', left: '19px', top: '10px', bottom: '10px', 
            width: '2px', background: 'var(--border-subtle)', zIndex: 0 
          }} />

          {filteredLogs.map((item, idx) => (
            <div key={item.id || idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              
              {/* Icon Circle */}
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: '#F8FAFC', border: '2px solid var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0 
              }}>
                {getActionIcon(item.type)}
              </div>

              {/* Event Content */}
              <div className="glass-card" style={{ flex: 1, padding: '1rem', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{item.action}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{item.timestamp}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  {item.detail}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span className="badge badge-violet">{item.user}</span>
                  <span className="badge badge-cyan">{item.department}</span>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
