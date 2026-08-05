import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, ChevronLeft, ChevronRight, Users, Sparkles } from 'lucide-react';

export default function CalendarModule({ events = [], onAddEvent }) {
  const [selectedDept, setSelectedDept] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-08-06');
  const [newTime, setNewTime] = useState('11:00 AM - 12:00 PM');
  const [newDept, setNewDept] = useState('Engineering');

  const filteredEvents = selectedDept === 'All' 
    ? events 
    : events.filter(e => e.department === selectedDept || e.department === 'Company Wide');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    onAddEvent({
      title: newTitle,
      date: newDate,
      time: newTime,
      department: newDept,
      type: 'Meeting',
      location: 'Virtual Room'
    });
    setNewTitle('');
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>📅 Company Calendar & Sync</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Unified schedule across Engineering, Product, Marketing, Sales & HR</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select 
            value={selectedDept} 
            onChange={(e) => setSelectedDept(e.target.value)}
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
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product & Design">Product & Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales & Growth">Sales & Growth</option>
          </select>

          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> Schedule Sync Event
          </button>
        </div>
      </div>

      {/* Calendar Grid & List Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Visual August 2026 Calendar Grid */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>August 2026</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }}><ChevronLeft size={16} /></button>
              <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }}><ChevronRight size={16} /></button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const dateStr = `2026-08-${day < 10 ? '0' + day : day}`;
              const hasEvents = events.filter(e => e.date === dateStr);

              return (
                <div key={day} style={{ 
                  background: day === 5 ? 'rgba(124, 58, 237, 0.1)' : '#F8FAFC',
                  border: day === 5 ? '2px solid #7C3AED' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.6rem 0.4rem',
                  minHeight: '65px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: day === 5 ? 800 : 600, color: day === 5 ? '#7C3AED' : '#0F172A' }}>
                    {day}
                  </div>
                  {hasEvents.length > 0 && (
                    <div style={{ fontSize: '0.65rem', background: '#0891B2', color: '#FFF', borderRadius: '4px', padding: '2px 4px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {hasEvents[0].title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Event List */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarIcon size={20} color="#0891B2" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Upcoming Events</h3>
          </div>

          {filteredEvents.map(evt => (
            <div key={evt.id} style={{ 
              background: '#F8FAFC', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: 'var(--radius-md)', 
              padding: '1rem',
              borderLeft: '4px solid #7C3AED'
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{evt.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                <Clock size={14} /> {evt.date} • {evt.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                <MapPin size={14} /> {evt.location}
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <span className="badge badge-violet">{evt.department}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Schedule Event Modal */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '450px', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>📅 Schedule Event Sync</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Event Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="e.g. AI Agent Security Review" 
                  required 
                  style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Department</label>
                <select 
                  value={newDept} 
                  onChange={(e) => setNewDept(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales & Growth">Sales & Growth</option>
                  <option value="Company Wide">Company Wide</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Date</label>
                  <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Time Slot</label>
                  <input type="text" value={newTime} onChange={(e) => setNewTime(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
