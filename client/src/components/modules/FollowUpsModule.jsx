import React, { useState } from 'react';
import { 
  Calendar, Clock, User, AlertCircle, Plus, CheckCircle, Trash2, 
  Search, Bot, Sparkles, Filter, Phone, Mail, Check, MessageCircle, Send
} from 'lucide-react';

export default function FollowUpsModule({ followUps = [], setFollowUps, onTriggerAI }) {
  const [filter, setFilter] = useState('active'); // 'active', 'overdue', 'completed', 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // smart communication states inside Follow Ups
  const [activeCall, setActiveCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState(null);
  const [activeMail, setActiveMail] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [activeWhatsApp, setActiveWhatsApp] = useState(null);
  const [whatsappMessage, setWhatsappMessage] = useState('');

  // Form states
  const [client, setClient] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('12:00 PM');
  const [priority, setPriority] = useState('Medium');
  const [contactMethod, setContactMethod] = useState('Email');
  const [contactValue, setContactValue] = useState('');

  const todayStr = '2026-08-05';

  const handleAddFollowUp = (e) => {
    e.preventDefault();
    if (!client || !task || !dueDate) return;

    const nextNum = followUps.length + 1;
    const newFollowUp = {
      id: `genz-F-2026-${String(nextNum).padStart(2, '0')}`,
      client,
      contactPerson,
      task,
      dueDate,
      dueTime,
      priority,
      status: 'pending',
      email: contactMethod === 'Email' ? contactValue : undefined,
      phone: contactMethod === 'Phone' ? contactValue : undefined
    };

    setFollowUps([newFollowUp, ...followUps]);
    
    // Reset Form
    setClient('');
    setContactPerson('');
    setTask('');
    setDueDate('');
    setDueTime('12:00 PM');
    setPriority('Medium');
    setContactValue('');
    setShowModal(false);
  };

  const handleToggleStatus = (id) => {
    setFollowUps(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'completed' ? 'pending' : 'completed' };
      }
      return item;
    }));
  };

  const handleDelete = (id) => {
    setFollowUps(prev => prev.filter(item => item.id !== id));
  };

  const handleAiSort = () => {
    if (onTriggerAI) {
      onTriggerAI('ai-followups', 'Auto-sort pending followups by urgency level');
    }
    
    // Sort logic (Urgent -> High -> Medium -> Completed last)
    const priorityWeight = { 'Urgent': 3, 'High': 2, 'Medium': 1 };
    
    setFollowUps(prev => {
      const sorted = [...prev].sort((a, b) => {
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (a.status !== 'completed' && b.status === 'completed') return -1;
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      });
      return sorted;
    });
  };

  // Filter calculations
  const filteredList = followUps.filter(item => {
    // Search filter
    const matchesSearch = 
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.contactPerson && item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Status / Overdue filter
    const isOverdue = item.status === 'pending' && item.dueDate < todayStr;

    if (filter === 'active') return item.status === 'pending' && !isOverdue;
    if (filter === 'overdue') return isOverdue;
    if (filter === 'completed') return item.status === 'completed';
    return true; // 'all'
  }).sort((a, b) => {
    // Sort primarily by id alphabetically/numerically so f-1 is first, f-2 second, etc.
    return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
  });

  // Count highlights
  const activeCount = followUps.filter(i => i.status === 'pending' && i.dueDate >= todayStr).length;
  const overdueCount = followUps.filter(i => i.status === 'pending' && i.dueDate < todayStr).length;
  const completedCount = followUps.filter(i => i.status === 'completed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.025em' }}>
            Client Follow-Ups
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Schedule, manage, and execute pipeline contact reminders with smart triage
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            className="btn-secondary" 
            style={{ 
              color: '#7C3AED', 
              borderColor: 'rgba(124, 58, 237, 0.3)',
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem',
              fontWeight: 600
            }} 
            onClick={handleAiSort}
          >
            <Bot size={16} /> AI Smart Priority
          </button>
          
          <button 
            className="btn-primary" 
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
          >
            <Plus size={18} /> Schedule Follow Up
          </button>
        </div>
      </div>

      {/* KPI Highlight Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #7C3AED' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>ACTIVE SCHEDULES</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>{activeCount}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #EF4444', background: 'rgba(239, 68, 68, 0.02)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EF4444' }}>OVERDUE VERIFICATIONS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#EF4444', marginTop: '0.25rem' }}>{overdueCount}</div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #10B981' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>COMPLETED TODAY</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10B981', marginTop: '0.25rem' }}>{completedCount}</div>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1rem',
        padding: '1rem',
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)'
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.35rem', background: '#F8FAFC', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
          {[
            { id: 'active', label: 'Active Tasks' },
            { id: 'overdue', label: 'Overdue' },
            { id: 'completed', label: 'Completed' },
            { id: 'all', label: 'All Schedules' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: '8px',
                border: 'none',
                background: filter === tab.id ? '#7C3AED' : 'transparent',
                color: filter === tab.id ? '#FFFFFF' : '#64748B',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: '#F8FAFC', 
          border: '1px solid var(--border-subtle)', 
          padding: '0.45rem 0.85rem', 
          borderRadius: '10px',
          width: '280px'
        }}>
          <Search size={16} color="var(--text-dim)" />
          <input 
            type="text" 
            placeholder="Search client name or action..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.82rem', color: '#0F172A' }}
          />
        </div>
      </div>

      {/* ─── Follow Ups Table ───────────────────────────────────────── */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>SCHEDULE ID</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>CLIENT / COMPANY</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>CONTACT PERSON</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>FOLLOW-UP TASK & NOTES</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>DUE DATE & TIME</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>PRIORITY</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>STATUS</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em', textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <Calendar size={44} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>No Follow-Ups Found</div>
                    <div style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>There are no follow up items matching your selection filters.</div>
                  </td>
                </tr>
              ) : filteredList.map((item, idx) => {
                const isCompleted = item.status === 'completed';
                const isOverdue = item.status === 'pending' && item.dueDate < todayStr;
                
                return (
                  <tr key={item.id} style={{
                    borderBottom: '1px solid #F1F5F9',
                    background: idx % 2 === 0 ? '#FFFFFF' : '#FAFBFC',
                    transition: 'background 0.15s ease',
                    cursor: 'pointer',
                    opacity: isCompleted ? 0.75 : 1
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F0F4FF'}
                    onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? '#FFFFFF' : '#FAFBFC'}
                  >
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#D97706', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{item.id}</td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{item.client}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{item.contactPerson || '—'}</div>
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.15rem' }}>
                        {item.email && <span style={{ fontSize: '0.7rem', color: '#7C3AED', display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}><Mail size={10} /> {item.email}</span>}
                        {item.phone && <span style={{ fontSize: '0.7rem', color: '#0891B2', display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}><Phone size={10} /> {item.phone}</span>}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem', maxWidth: '300px' }}>
                      <div style={{ color: '#475569', fontWeight: 500, whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.3' }}>{item.task}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <div style={{ fontWeight: 700, color: isOverdue ? '#EF4444' : '#0F172A', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={12} /> {item.dueDate === todayStr ? 'Today' : item.dueDate}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem' }}>
                        <Clock size={11} /> {item.dueTime}
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <span className={`badge ${
                        item.priority === 'Urgent' ? 'badge-rose' :
                        item.priority === 'High' ? 'badge-amber' : 'badge-cyan'
                      }`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                        {item.priority}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      {isCompleted ? (
                        <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>Completed</span>
                      ) : isOverdue ? (
                        <span className="badge badge-rose" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                          <AlertCircle size={10} /> Overdue
                        </span>
                      ) : (
                        <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>Pending</span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            if (confirm(`Convert client "${item.client}" from Follow-up directly to Clients list?`)) {
                              setFollowUps(prev => prev.filter(f => f.id !== item.id));
                              alert(`🎉 Client "${item.client}" converted & transferred to Clients Portal!`);
                            }
                          }}
                          style={{ background: 'rgba(5, 150, 105, 0.1)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#059669' }}
                          title="Convert to Client"
                        >
                          <User size={14} />
                        </button>
                        
                        <button
                          onClick={() => {
                            setActiveCall(item);
                            setCallDuration(0);
                            const interval = setInterval(() => {
                              setCallDuration(d => d + 1);
                            }, 1000);
                            setCallTimer(interval);
                          }}
                          style={{ background: 'rgba(5, 150, 105, 0.1)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#059669' }}
                          title="Quick Call"
                        >
                          <Phone size={13} />
                        </button>

                        <button
                          onClick={() => {
                            setActiveMail(item);
                            setEmailSubject(`Follow-up proposal: ${item.client}`);
                            setEmailBody(`Hi ${item.contactPerson || 'there'},\n\nWe would like to follow up regarding: ${item.task}.\n\nBest Regards,\nGNZ CRM Team`);
                          }}
                          style={{ background: 'rgba(37, 99, 235, 0.1)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#2563EB' }}
                          title="Send Mail"
                        >
                          <Mail size={13} />
                        </button>

                        <button
                          onClick={() => {
                            setActiveWhatsApp(item);
                            setWhatsappMessage(`Hello ${item.contactPerson || item.client}, this is GNZ CRM following up on your project requirements: ${item.task}`);
                          }}
                          style={{ background: 'rgba(34, 197, 94, 0.1)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#16A34A' }}
                          title="WhatsApp"
                        >
                          <MessageCircle size={13} />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(item.id)}
                          style={{ background: 'rgba(225, 29, 72, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#E11D48' }}
                          title="Delete Schedule"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Follow-Up Drawer Modal */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '520px', background: '#FFFFFF', boxShadow: '0 20px 45px rgba(0,0,0,0.18)', borderRadius: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
                Schedule Client Follow Up
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', color: '#64748B', cursor: 'pointer', fontWeight: 'bold' }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddFollowUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Company / Client Name *</label>
                  <input 
                    type="text" 
                    value={client} 
                    onChange={(e) => setClient(e.target.value)} 
                    placeholder="e.g. Acme Corp" 
                    required 
                    style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Contact Person Name</label>
                  <input 
                    type="text" 
                    value={contactPerson} 
                    onChange={(e) => setContactPerson(e.target.value)} 
                    placeholder="e.g. John Doe (VP)" 
                    style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Task / Follow Up Detail Description *</label>
                <textarea 
                  value={task} 
                  onChange={(e) => setTask(e.target.value)} 
                  placeholder="Describe what needs to be accomplished (e.g. Call to finalize Q3 contract options)..." 
                  rows={3}
                  required
                  style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem', resize: 'vertical' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Due Date *</label>
                  <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Due Time</label>
                  <input 
                    type="text" 
                    value={dueTime} 
                    onChange={(e) => setDueTime(e.target.value)} 
                    placeholder="e.g. 02:00 PM" 
                    style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Priority Urgency</label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)} 
                    style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem' }}
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Contact Channel</label>
                  <select 
                    value={contactMethod} 
                    onChange={(e) => setContactMethod(e.target.value)} 
                    style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem' }}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Contact Details (Email Address / Phone Number)</label>
                <input 
                  type="text" 
                  value={contactValue} 
                  onChange={(e) => setContactValue(e.target.value)} 
                  placeholder={contactMethod === 'Email' ? "e.g. client@company.com" : "e.g. +1 555-0199"} 
                  style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)} style={{ fontWeight: 600 }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ fontWeight: 600 }}>Schedule Schedule</button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SMART CALL DIALER COMPONENT                                */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeCall && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: '320px', background: '#0F172A', color: '#FFFFFF',
          borderRadius: '16px', padding: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 1100,
          border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              GNZ Smart Dialer
            </span>
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Active Connection</span>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{activeCall.client}</div>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.15rem' }}>{activeCall.contactPerson}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#38BDF8', marginTop: '0.5rem' }}>{activeCall.phone || 'N/A'}</div>
            
            {/* Live timer display */}
            <div style={{ fontSize: '1.6rem', fontWeight: 900, marginTop: '1rem', fontFamily: 'monospace', color: '#10B981' }}>
              {Math.floor(callDuration / 60)}:{String(callDuration % 60).padStart(2, '0')}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => {
                if (callTimer) clearInterval(callTimer);
                setActiveCall(null);
              }}
              style={{
                flex: 1, padding: '0.75rem', background: '#EF4444', color: '#FFFFFF',
                border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer',
                textAlign: 'center', fontSize: '0.85rem'
              }}
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SMART EMAIL COMPOSER PANEL                                 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeMail && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '560px', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                📧 Send Follow-up Email
              </h3>
              <button 
                onClick={() => setActiveMail(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', color: '#64748B', cursor: 'pointer', fontWeight: 'bold' }}
              >
                &times;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>To:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>{activeMail.client} &lt;{activeMail.email || 'client@company.com'}&gt;</span>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Subject</label>
                <input 
                  type="text" 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Message Body</label>
                <textarea 
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={6}
                  style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setActiveMail(null)} style={{ fontWeight: 600 }}>Cancel</button>
                <button 
                  onClick={() => {
                    alert('Email sent successfully!');
                    setActiveMail(null);
                  }}
                  className="btn-primary" 
                  style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Send size={15} /> Send Mail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SMART WHATSAPP DISPATCH COMPONENT                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeWhatsApp && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '480px', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageCircle size={22} color="#16A34A" /> WhatsApp message
              </h3>
              <button 
                onClick={() => setActiveWhatsApp(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', color: '#64748B', cursor: 'pointer', fontWeight: 'bold' }}
              >
                &times;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>To Number:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{activeWhatsApp.phone || 'N/A'}</span>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>Template Message</label>
                <textarea 
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  rows={4}
                  style={{ width: '100%', padding: '0.65rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#0F172A', marginTop: '0.3rem', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setActiveWhatsApp(null)} style={{ fontWeight: 600 }}>Cancel</button>
                <button 
                  onClick={() => {
                    alert('WhatsApp Message dispatched!');
                    setActiveWhatsApp(null);
                  }}
                  className="btn-primary" 
                  style={{ fontWeight: 600, background: '#16A34A', border: 'none', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)' }}
                >
                  Send WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
