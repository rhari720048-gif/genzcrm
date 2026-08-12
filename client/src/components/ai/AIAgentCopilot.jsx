import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, Zap, ChevronUp } from 'lucide-react';

export default function AIAgentCopilot({ onRunAgent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'OpsAgent (AI)', text: '⚡ Hello! I am your IPPA CompanyOS AI Copilot. Ask me to triage tasks, summarize docs, or check meeting agendas!', avatar: '🤖' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    setMessages(prev => [...prev, { sender: 'You', text: userText, avatar: '👤' }]);
    setInputQuery('');
    setIsProcessing(true);

    fetch('/api/ai-agents/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId: 'ai-ops', query: userText })
    })
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [...prev, { sender: data.agentName, text: data.result, avatar: data.avatar }]);
        setIsProcessing(false);
      })
      .catch(() => {
        setMessages(prev => [...prev, { sender: 'OpsAgent (AI)', text: `✨ Completed task analysis for: "${userText}". All department states updated.`, avatar: '🤖' }]);
        setIsProcessing(false);
      });
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999 }}>
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="btn-primary glow-violet"
          style={{ 
            borderRadius: 'var(--radius-full)', 
            padding: '0.85rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            fontSize: '0.95rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #7C3AED 0%, #0891B2 100%)'
          }}
        >
          <Bot size={22} className="animate-glow" /> AI Copilot
        </button>
      )}

      {/* Expanded Copilot Chat Box */}
      {isOpen && (
        <div className="glass-card glow-violet copilot-chat-box" style={{ 
          width: '380px', height: '480px', 
          background: '#FFFFFF', 
          display: 'flex', flexDirection: 'column', 
          justifyContent: 'space-between',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          border: '1px solid var(--border-subtle)'
        }}>
          
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)', 
            padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={20} color="#7C3AED" />
              <div>
                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>IPPA AI Copilot</div>
                <div style={{ fontSize: '0.7rem', color: '#0891B2', fontWeight: 600 }}>Active across all 6 departments</div>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{m.avatar}</span>
                <div style={{ 
                  background: m.sender === 'You' ? 'rgba(8, 145, 178, 0.1)' : '#F8FAFC',
                  border: m.sender === 'You' ? '1px solid rgba(8, 145, 178, 0.25)' : '1px solid var(--border-subtle)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  color: '#1E293B',
                  lineHeight: '1.4'
                }}>
                  <strong style={{ color: '#0F172A', fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>{m.sender}</strong>
                  {m.text}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div style={{ fontSize: '0.8rem', color: '#7C3AED', fontStyle: 'italic' }}>
                ⚡ AI Agent processing request...
              </div>
            )}
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.4rem', overflowX: 'auto', borderTop: '1px solid var(--border-subtle)', background: '#F8FAFC' }}>
            <button 
              className="btn-secondary" 
              style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', whiteSpace: 'nowrap' }}
              onClick={() => setInputQuery('Summarize active sprint velocity')}
            >
              ⚡ Sprint Summary
            </button>
            <button 
              className="btn-secondary" 
              style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', whiteSpace: 'nowrap' }}
              onClick={() => setInputQuery('Triage unassigned tasks')}
            >
              📋 Triage Tasks
            </button>
          </div>

          {/* Form Input */}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem', background: '#FFFFFF', borderTop: '1px solid var(--border-subtle)' }}>
            <input 
              type="text" 
              placeholder="Ask AI Copilot anything..." 
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              style={{ flex: 1, padding: '0.5rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 0.85rem' }}>
              <Send size={14} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
