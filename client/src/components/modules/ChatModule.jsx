import React, { useState } from 'react';
import { Hash, Send, Bot, Users, Sparkles, Search, Smile, Paperclip } from 'lucide-react';

export default function ChatModule({ channels = [], messages = [], onSendMessage, activeChannel, onSelectChannel }) {
  const [textInput, setTextInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    onSendMessage(textInput);
    setTextInput('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.25rem', height: 'calc(100vh - 180px)' }}>
      
      {/* Channels Sidebar */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>💬 Channels</h3>
          <span className="badge badge-violet">{channels.length} Active</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {channels.map(ch => (
            <div 
              key={ch.id} 
              onClick={() => onSelectChannel(ch.id)}
              style={{ 
                padding: '0.6rem 0.8rem', 
                borderRadius: 'var(--radius-sm)', 
                cursor: 'pointer',
                display: 'flex', 
                alignItems: 'center', 
                justify: 'space-between',
                background: activeChannel === ch.id ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                border: activeChannel === ch.id ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid transparent',
                color: activeChannel === ch.id ? '#7C3AED' : 'var(--text-main)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.85rem' }}>
                <Hash size={16} color={activeChannel === ch.id ? '#7C3AED' : 'var(--text-dim)'} />
                {ch.name}
              </span>

              {ch.unread > 0 && <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{ch.unread}</span>}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', background: 'rgba(8, 145, 178, 0.08)', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(8, 145, 178, 0.2)', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0891B2', fontWeight: 700, marginBottom: '0.2rem' }}>
            <Bot size={14} /> Tip: AI Agent Trigger
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Type <strong>@ai</strong> or <strong>@ops</strong> in any chat to invoke autonomous agents!</p>
        </div>
      </div>

      {/* Main Chat Stream */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FFFFFF' }}>
        
        {/* Active Channel Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Hash size={20} color="#7C3AED" /> #{activeChannel.replace('c-', '')}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time team chat & AI assistant workspace</p>
          </div>

          <span className="badge badge-emerald">● Live Connection</span>
        </div>

        {/* Message Stream */}
        <div style={{ flex: 1, overflowY: 'auto', margin: '1rem 0', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ 
              display: 'flex', 
              gap: '0.85rem',
              alignItems: 'flex-start',
              background: msg.sender.includes('AI') ? 'rgba(124, 58, 237, 0.06)' : 'transparent',
              padding: msg.sender.includes('AI') ? '0.85rem' : '0',
              borderRadius: 'var(--radius-sm)',
              border: msg.sender.includes('AI') ? '1px solid rgba(124, 58, 237, 0.2)' : 'none'
            }}>
              <div style={{ 
                width: '38px', height: '38px', borderRadius: '50%', 
                background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', flexShrink: 0 
              }}>
                {msg.avatar}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{msg.sender}</span>
                  <span className="badge badge-violet" style={{ fontSize: '0.65rem' }}>{msg.role}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{msg.time}</span>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#334155', marginTop: '0.3rem', lineHeight: '1.5' }}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: '#F8FAFC', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <input 
            type="text" 
            placeholder={`Message #${activeChannel.replace('c-', '')} (type @ai to trigger bot)...`}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#0F172A', fontSize: '0.9rem' }}
          />

          <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>
            <Send size={16} /> Send
          </button>
        </form>

      </div>

    </div>
  );
}
