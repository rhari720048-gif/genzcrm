import React from 'react';
import { CheckCircle2, Clock, Trash2 } from 'lucide-react';

export default function ProjectsHistoryModule({ historyList = [], setHistoryList }) {
  const handleDeleteLog = (id) => {
    if (confirm('Are you sure you want to delete this completion log history?')) {
      if (setHistoryList) {
        setHistoryList(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <span className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
          📜 Completion Audit Logs
        </span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>
          Projects History
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          Review completed projects, assignment distributions, and completion timestamps.
        </p>
      </div>

      {/* History Table */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>HISTORY ID</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>PROJECT NAME</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>ASSIGNED USER</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>COMPLETED AT (DATE & TIME)</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em', textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {historyList.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>No projects completed yet</div>
                    <div style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>Completed projects will register here dynamically</div>
                  </td>
                </tr>
              ) : historyList.map((log, idx) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFBFC' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#059669', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{log.id}</td>
                  <td style={{ padding: '0.75rem 0.75rem', fontWeight: 700, color: '#0F172A' }}>{log.projectName}</td>
                  <td style={{ padding: '0.75rem 0.75rem', fontWeight: 600, color: '#475569' }}>
                    <span className="badge badge-violet" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>{log.assignedTo}</span>
                  </td>
                  <td style={{ padding: '0.75rem 0.75rem', color: '#64748B', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} color="#059669" /> {log.completedAt}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                    <button 
                      title="Delete History Log" 
                      onClick={() => handleDeleteLog(log.id)} 
                      style={{ background: 'rgba(225, 29, 72, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#E11D48' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
