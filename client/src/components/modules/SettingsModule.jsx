import React, { useState } from 'react';
import { Settings, Shield, Bot, Moon, Layers, Users, Check, Save } from 'lucide-react';

export default function SettingsModule({ config, aiAgents }) {
  const [companyName, setCompanyName] = useState(config?.companyName || 'IPPA Technologies');
  const [aiEnabled, setAiEnabled] = useState(config?.aiEnabled ?? true);
  const [autoSummarize, setAutoSummarize] = useState(config?.autoSummarizeMeetings ?? true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '900px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>⚙️ System Settings & AI Governance</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configure company profile, department access controls, theme, and autonomous AI agents</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Company Profile Settings */}
        <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="#0891B2" /> Company Identity
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Company Name</label>
              <input 
                type="text" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Platform Mode</label>
              <input 
                type="text" 
                value="IPPA CompanyOS — Gen Z Edition" 
                disabled 
                style={{ width: '100%', padding: '0.6rem', background: '#F1F5F9', border: '1px solid var(--border-subtle)', color: 'var(--text-dim)', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} 
              />
            </div>
          </div>
        </div>

        {/* AI Agent Permissions & Toggles */}
        <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={18} color="#7C3AED" /> AI Agent Governance & Autonomy
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem' }}>Global AI Agents Enablement</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Allow department members to summon @ai agents in chat, docs, and tasks</div>
              </div>
              <input 
                type="checkbox" 
                checked={aiEnabled} 
                onChange={(e) => setAiEnabled(e.target.checked)} 
                style={{ width: '20px', height: '20px', accentColor: '#7C3AED', cursor: 'pointer' }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.95rem' }}>Auto-Summarize Meetings & Transcripts</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Doc Synthesizer automatically generates executive notes after call ends</div>
              </div>
              <input 
                type="checkbox" 
                checked={autoSummarize} 
                onChange={(e) => setAutoSummarize(e.target.checked)} 
                style={{ width: '20px', height: '20px', accentColor: '#0891B2', cursor: 'pointer' }} 
              />
            </div>
          </div>
        </div>

        {/* Active Registered AI Agents */}
        <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>🤖 Registered AI Agents Directory</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {(aiAgents || []).map(agent => (
              <div key={agent.id} style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {agent.avatar} {agent.name}
                  </span>
                  <span className="badge badge-emerald">Active</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                  Trigger: <code style={{ color: '#0891B2', fontWeight: 700 }}>{agent.trigger}</code> • {agent.category}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  {agent.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            <Save size={18} /> Save CompanyOS Settings
          </button>
          {savedSuccess && <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.9rem' }}>✓ Settings updated successfully!</span>}
        </div>

      </form>

    </div>
  );
}
