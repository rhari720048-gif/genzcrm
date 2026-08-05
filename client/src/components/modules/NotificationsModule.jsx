import React, { useState } from 'react';
import { Bell, Check, Bot, AtSign, Calendar, FileText, Filter, AlertCircle } from 'lucide-react';

export default function NotificationsModule({ notifications = [], onMarkRead }) {
  const [filter, setFilter] = useState('all');

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'urgent') return n.urgent;
    if (filter === 'ai') return n.type === 'ai';
    return true;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'ai': return <Bot size={18} color="#7C3AED" />;
      case 'mention': return <AtSign size={18} color="#0891B2" />;
      case 'meeting': return <Calendar size={18} color="#DB2777" />;
      case 'file': return <FileText size={18} color="#059669" />;
      default: return <Bell size={18} color="#D97706" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>🔔 Notifications Center</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time notifications, AI insights, mentions, and urgent alerts</p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: '#FFFFFF', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <button className={`btn-secondary ${filter === 'all' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setFilter('all')}>
            All ({notifications.length})
          </button>
          <button className={`btn-secondary ${filter === 'unread' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setFilter('unread')}>
            Unread ({notifications.filter(n => !n.read).length})
          </button>
          <button className={`btn-secondary ${filter === 'urgent' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setFilter('urgent')}>
            Urgent
          </button>
          <button className={`btn-secondary ${filter === 'ai' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setFilter('ai')}>
            AI Insights
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', background: '#FFFFFF' }}>
            No notifications match your current filter.
          </div>
        ) : (
          filtered.map(item => (
            <div key={item.id} className="glass-card" style={{ 
              padding: '1.2rem', 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '1rem',
              borderLeft: item.urgent ? '4px solid #E11D48' : item.read ? '1px solid var(--border-subtle)' : '4px solid #7C3AED',
              background: item.read ? '#FFFFFF' : 'rgba(124, 58, 237, 0.04)'
            }}>
              <div style={{ 
                background: '#F1F5F9', 
                padding: '0.6rem', 
                borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {getTypeIcon(item.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{item.title}</span>
                  {item.urgent && <span className="badge badge-rose"><AlertCircle size={12} /> Urgent</span>}
                  {!item.read && <span className="badge badge-violet">New</span>}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#334155' }}>{item.description}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
                  {item.time}
                </div>
              </div>

              {!item.read && (
                <button className="btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }} onClick={() => onMarkRead(item.id)}>
                  <Check size={14} /> Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
