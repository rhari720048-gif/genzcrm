import React, { useState } from 'react';
import { 
  Calendar, Clock, User, AlertCircle, Plus, CheckCircle, Trash2, 
  Search, Bot, Sparkles, Filter, Phone, Mail, Check
} from 'lucide-react';

export default function FollowUpsModule({ followUps = [], setFollowUps, onTriggerAI }) {
  const [filter, setFilter] = useState('active'); // 'active', 'overdue', 'completed', 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

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

    const newFollowUp = {
      id: `f-${Date.now()}`,
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

      {/* Grid of Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredList.length === 0 ? (
          <div style={{ 
            background: '#FFFFFF', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '16px', 
            padding: '4rem 2rem', 
            textAlign: 'center' 
          }}>
            <Calendar size={44} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>No Follow-Ups Found</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>There are no follow up items matching your selection filters.</p>
          </div>
        ) : (
          filteredList.map(item => {
            const isCompleted = item.status === 'completed';
            const isOverdue = item.status === 'pending' && item.dueDate < todayStr;

            return (
              <div 
                key={item.id} 
                className="glass-card" 
                style={{ 
                  padding: '1.25rem',
                  background: isCompleted ? '#FAFAFA' : '#FFFFFF',
                  opacity: isCompleted ? 0.78 : 1,
                  borderLeft: `5px solid ${
                    isCompleted ? '#E2E8F0' :
                    isOverdue ? '#EF4444' :
                    item.priority === 'Urgent' ? '#7C3AED' :
                    item.priority === 'High' ? '#F59E0B' : '#0891B2'
                  }`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.25rem'
                }}
              >
                {/* Left Info Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 800, 
                      color: isCompleted ? '#64748B' : '#0F172A',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      margin: 0
                    }}>
                      {item.client}
                    </h3>
                    
                    {/* Priority Badge */}
                    {!isCompleted && (
                      <span className={`badge ${
                        item.priority === 'Urgent' ? 'badge-rose' :
                        item.priority === 'High' ? 'badge-amber' : 'badge-cyan'
                      }`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                        {item.priority}
                      </span>
                    )}

                    {isCompleted && (
                      <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                        Completed
                      </span>
                    )}

                    {isOverdue && (
                      <span className="badge badge-rose" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        <AlertCircle size={10} /> Overdue
                      </span>
                    )}
                  </div>

                  {/* Task Text */}
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: isCompleted ? '#94A3B8' : '#334155',
                    margin: 0,
                    lineHeight: 1.4
                  }}>
                    {item.task}
                  </p>

                  {/* Contact Person Details */}
                  {item.contactPerson && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                      <User size={13} color="#94A3B8" />
                      <span>Contact: <strong>{item.contactPerson}</strong></span>
                      {item.email && <span style={{ color: '#7C3AED', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Mail size={12} /> {item.email}</span>}
                      {item.phone && <span style={{ color: '#0891B2', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Phone size={12} /> {item.phone}</span>}
                    </div>
                  )}
                </div>

                {/* Right Action/Date Column */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', justifyContent: 'space-between', minWidth: '220px' }}>
                  {/* Due Date Indicator */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '0.82rem', 
                      fontWeight: 800, 
                      color: isOverdue ? '#EF4444' : '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      justifyContent: 'flex-end'
                    }}>
                      <Calendar size={13} /> {item.dueDate === todayStr ? 'Today' : item.dueDate}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
                      <Clock size={12} /> {item.dueTime}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    <button
                      onClick={() => {
                        if (confirm(`Convert client "${item.client}" from Follow-up directly to Clients list?`)) {
                          // Remove from follow ups
                          setFollowUps(prev => prev.filter(f => f.id !== item.id));
                          
                          // Trigger client convert callback (if passed down, or mock it)
                          alert(`🎉 Client "${item.client}" converted & transferred to Clients Portal!`);
                        }
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: '1px solid rgba(5, 150, 105, 0.2)',
                        background: '#FFFFFF',
                        color: '#059669',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      title="Convert to Client"
                    >
                      <User size={16} />
                    </button>

                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        background: isCompleted ? '#10B981' : '#FFFFFF',
                        color: isCompleted ? '#FFFFFF' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      title={isCompleted ? 'Mark Active' : 'Mark Completed'}
                    >
                      {isCompleted ? <Check size={16} /> : <CheckCircle size={16} />}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        background: '#FFFFFF',
                        color: '#EF4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      title="Delete Schedule"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
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

    </div>
  );
}
