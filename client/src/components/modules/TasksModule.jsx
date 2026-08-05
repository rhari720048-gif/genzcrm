import React, { useState } from 'react';
import { CheckSquare, Plus, Filter, LayoutGrid, List, Clock, User, AlertCircle, Bot, Sparkles } from 'lucide-react';

export default function TasksModule({ tasks = [], onAddTask, onUpdateTaskStatus, onTriggerAI }) {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [selectedDept, setSelectedDept] = useState('All');
  const [showModal, setShowModal] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [priority, setPriority] = useState('medium');
  const [assignee, setAssignee] = useState('Alex Chen');

  const filteredTasks = selectedDept === 'All' 
    ? tasks 
    : tasks.filter(t => t.department === selectedDept);

  const columns = [
    { id: 'todo', title: '📋 To Do', badge: 'badge-cyan' },
    { id: 'in_progress', title: '⚡ In Progress', badge: 'badge-violet' },
    { id: 'in_review', title: '🔍 In Review', badge: 'badge-amber' },
    { id: 'done', title: '✅ Completed', badge: 'badge-emerald' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddTask({
      title,
      description,
      status: 'todo',
      priority,
      department,
      assignee,
      dueDate: '2026-08-12'
    });
    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'high': return <span className="badge badge-rose">High</span>;
      case 'medium': return <span className="badge badge-amber">Medium</span>;
      default: return <span className="badge badge-cyan">Low</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>⚡ Tasks & Department Kanban</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Track deliverables across all departments with AI Task Copilot</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          
          {/* View Toggle */}
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <button className={`btn-secondary ${viewMode === 'kanban' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setViewMode('kanban')}>
              <LayoutGrid size={14} /> Kanban
            </button>
            <button className={`btn-secondary ${viewMode === 'list' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setViewMode('list')}>
              <List size={14} /> List
            </button>
          </div>

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
            <option value="Sales & Growth">Sales & Growth</option>
            <option value="People & HR">People & HR</option>
            <option value="Operations & AI">Operations & AI</option>
          </select>

          <button className="btn-secondary" style={{ color: '#7C3AED', borderColor: 'rgba(124, 58, 237, 0.4)' }} onClick={() => onTriggerAI('ai-task', 'Auto triage high priority tasks')}>
            <Bot size={16} /> AI Triage
          </button>

          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} /> New Task
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', overflowX: 'auto', minHeight: '550px' }}>
          {columns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);

            return (
              <div key={col.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#F8FAFC' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>{col.title}</h3>
                  <span className={`badge ${col.badge}`}>{colTasks.length}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                  {colTasks.length === 0 ? (
                    <div style={{ border: '2px dashed var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      No tasks in this stage
                    </div>
                  ) : (
                    colTasks.map(task => (
                      <div key={task.id} className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'grab', background: '#FFFFFF' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="badge badge-violet" style={{ fontSize: '0.7rem' }}>{task.department}</span>
                          {getPriorityBadge(task.priority)}
                        </div>

                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{task.title}</div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {task.description}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <User size={12} /> {task.assignee}
                          </span>
                          
                          <select 
                            value={task.status} 
                            onChange={(e) => onUpdateTaskStatus(task.id, e.target.value)}
                            style={{ background: '#F1F5F9', color: '#0F172A', border: '1px solid var(--border-subtle)', fontSize: '0.75rem', borderRadius: '4px', padding: '2px 4px' }}
                          >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="in_review">In Review</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="glass-card" style={{ padding: '1rem', background: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <th style={{ padding: '0.75rem' }}>TASK TITLE</th>
                <th style={{ padding: '0.75rem' }}>DEPARTMENT</th>
                <th style={{ padding: '0.75rem' }}>PRIORITY</th>
                <th style={{ padding: '0.75rem' }}>ASSIGNEE</th>
                <th style={{ padding: '0.75rem' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600, color: '#0F172A' }}>{t.title}</td>
                  <td style={{ padding: '0.75rem' }}><span className="badge badge-violet">{t.department}</span></td>
                  <td style={{ padding: '0.75rem' }}>{getPriorityBadge(t.priority)}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{t.assignee}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <select 
                      value={t.status} 
                      onChange={(e) => onUpdateTaskStatus(t.id, e.target.value)}
                      style={{ background: '#F8FAFC', color: '#0F172A', border: '1px solid var(--border-subtle)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)' }}
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="in_review">In Review</option>
                      <option value="done">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Task Modal */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '500px', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>⚡ Create Department Task</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Task Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Build Real-time Activity WebSockets" 
                  required 
                  style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Detailed requirements for team or AI copilot..." 
                  rows={3}
                  style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} 
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Department</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }}>
                    <option value="Engineering">Engineering</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Sales & Growth">Sales & Growth</option>
                    <option value="People & HR">People & HR</option>
                    <option value="Operations & AI">Operations & AI</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
