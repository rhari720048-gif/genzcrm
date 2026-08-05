import React, { useState } from 'react';
import { CheckCircle2, Clock, Trash2, Eye, X } from 'lucide-react';

export default function ProjectsHistoryModule({ historyList = [], setHistoryList }) {
  const [viewHistory, setViewHistory] = useState(null);

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
                  <td style={{ padding: '0.75rem 0.75rem', fontWeight: 700, color: '#64748B', textDecoration: 'line-through', opacity: 0.7 }}>{log.projectName}</td>
                  <td style={{ padding: '0.75rem 0.75rem', fontWeight: 600, color: '#475569' }}>
                    <span className="badge badge-violet" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>{log.assignedTo}</span>
                  </td>
                  <td style={{ padding: '0.75rem 0.75rem', color: '#64748B', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} color="#059669" /> {log.completedAt}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                      <button 
                        title="View Details" 
                        onClick={() => setViewHistory(log)} 
                        style={{ background: 'rgba(37, 99, 235, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#2563EB' }}
                      >
                        <Eye size={13} />
                      </button>
                      <button 
                        title="Delete History Log" 
                        onClick={() => handleDeleteLog(log.id)} 
                        style={{ background: 'rgba(225, 29, 72, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#E11D48' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Historical Project Details Modal */}
      {viewHistory && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem'
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', maxWidth: '520px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem', marginBottom: '0.2rem' }}>Audit Overview</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Project Completion Details</h3>
              </div>
              <button onClick={() => setViewHistory(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={18} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: '#334155' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                <span style={{ fontWeight: 700, color: '#64748B' }}>History ID:</span>
                <span style={{ fontWeight: 800, color: '#059669' }}>{viewHistory.id}</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                <span style={{ fontWeight: 700, color: '#64748B' }}>Project Name:</span>
                <span style={{ fontWeight: 800, color: '#0F172A', textDecoration: 'line-through' }}>{viewHistory.projectName}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                <span style={{ fontWeight: 700, color: '#64748B' }}>Assigned User:</span>
                <span style={{ fontWeight: 700, color: '#4F46E5' }}>{viewHistory.assignedTo}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                <span style={{ fontWeight: 700, color: '#64748B' }}>Completed Time:</span>
                <span style={{ fontWeight: 700, color: '#D97706' }}>{viewHistory.completedAt}</span>
              </div>

              {/* Dynamic historical lead input data details block */}
              {viewHistory.details ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                    <span style={{ fontWeight: 700, color: '#64748B' }}>Project ID:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{viewHistory.details.id}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                    <span style={{ fontWeight: 700, color: '#64748B' }}>Client Name:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{viewHistory.details.clientName}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                    <span style={{ fontWeight: 700, color: '#64748B' }}>Company Name:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{viewHistory.details.company}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                    <span style={{ fontWeight: 700, color: '#64748B' }}>Service:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{viewHistory.details.service}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                    <span style={{ fontWeight: 700, color: '#64748B' }}>Budget:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{viewHistory.details.budget}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                    <span style={{ fontWeight: 700, color: '#64748B' }}>Created Date:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{viewHistory.details.createdDate}</span>
                  </div>
                  {viewHistory.details.deadline && (
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderBottom: '1px dashed #F1F5F9', paddingBottom: '0.55rem' }}>
                      <span style={{ fontWeight: 700, color: '#64748B' }}>Target Deadline:</span>
                      <span style={{ fontWeight: 700, color: '#E11D48' }}>{viewHistory.details.deadline}</span>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ padding: '0.5rem', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.75rem', color: '#64748B', textAlign: 'center' }}>
                  No lead details stored for this legacy log entry.
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn-secondary" onClick={() => setViewHistory(null)} style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}>Close Audit</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
