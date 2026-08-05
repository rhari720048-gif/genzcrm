import React, { useState } from 'react';
import { Video, Mic, Clock, Users, Link, FileText, Sparkles, Plus, ExternalLink } from 'lucide-react';

export default function MeetingsModule({ meetings = [], onTriggerAI }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedMeeting, setSelectedMeeting] = useState(meetings[0] || null);
  const [summaryOutput, setSummaryOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = (meet) => {
    setIsGenerating(true);
    setTimeout(() => {
      setSummaryOutput(`✨ AI Generated Meeting Summary for "${meet.title}":\n\n- Key Decisions: Agreed to deploy CompanyOS 2.0 theme update to production.\n- Action Items: Alex Chen to verify Node.js cluster setup; Maya Lin to finalize contrast tokens.\n- Next Sync: Scheduled for Aug 8, 2026.`);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>📹 Virtual Meetings & Sync Rooms</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Join live video rooms, review transcripts, and auto-summarize key decisions with AI</p>
        </div>

        <button className="btn-cyber">
          <Video size={18} /> Start Instant Huddle
        </button>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', gap: '1.5rem' }}>
        
        {/* Left Column: Meeting List */}
        <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Upcoming & Recent Calls</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {meetings.map(m => (
              <div 
                key={m.id} 
                className="glass-card" 
                onClick={() => setSelectedMeeting(m)}
                style={{ 
                  padding: '1rem', 
                  cursor: 'pointer',
                  border: selectedMeeting?.id === m.id ? '1px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                  background: selectedMeeting?.id === m.id ? 'rgba(124, 58, 237, 0.08)' : '#F8FAFC'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{m.title}</div>
                  <span className="badge badge-violet">{m.duration}</span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} /> {m.time}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Users size={14} /> Host: {m.host} ({m.attendees.length} attendees)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Selected Meeting Details & AI Summarizer */}
        {selectedMeeting && (
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#FFFFFF' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>Active Room</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>{selectedMeeting.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Host: {selectedMeeting.host} • Time: {selectedMeeting.time}
                </p>
              </div>

              <a 
                href={`https://${selectedMeeting.room}`} 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary" 
                style={{ textDecoration: 'none' }}
              >
                <Video size={16} /> Join Video Room <ExternalLink size={14} />
              </a>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.4rem' }}>AGENDA & NOTES</div>
              <p style={{ fontSize: '0.9rem', color: '#1E293B' }}>{selectedMeeting.summary}</p>
            </div>

            {/* AI Summary Generator Widget */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(8, 145, 178, 0.05) 100%)', 
              padding: '1.25rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid rgba(124, 58, 237, 0.25)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} color="#7C3AED" />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>Doc Synthesizer AI Notes</span>
                </div>

                <button 
                  className="btn-secondary" 
                  style={{ fontSize: '0.8rem', color: '#7C3AED', borderColor: 'rgba(124, 58, 237, 0.4)' }}
                  onClick={() => handleGenerateSummary(selectedMeeting)}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Synthesizing...' : 'Generate AI Summary'}
                </button>
              </div>

              {summaryOutput ? (
                <div style={{ fontSize: '0.85rem', color: '#0F172A', whiteSpace: 'pre-wrap', background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  {summaryOutput}
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Click above to let Doc Synthesizer extract meeting highlights, decision points, and follow-up tasks automatically.
                </p>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
