import React from 'react';
import { 
  Users, Building2, CheckSquare, Calendar, Bot, Activity, ArrowUpRight, 
  TrendingUp, Sparkles, Zap, Plus, ShieldCheck, Flame 
} from 'lucide-react';

export default function DashboardModule({ data, onNavigate, onTriggerAI }) {
  const stats = data?.stats || {
    activeEmployees: 142,
    departmentCount: 6,
    openTasks: 38,
    upcomingMeetings: 4,
    aiTasksCompleted: 1240,
    systemHealth: '99.9%'
  };

  const departments = data?.departmentOverview || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Gen Z Hero Welcome Banner Light Theme */}
      <div className="glass-card" style={{ 
        padding: '2rem', 
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(8, 145, 178, 0.08) 100%)',
        border: '1px solid rgba(124, 58, 237, 0.25)',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-violet">
              <Sparkles size={14} /> IPPA CompanyOS 2.0
            </span>
            <span className="badge badge-cyan">
              <Zap size={14} /> AI Autonomous Layer Active
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            Welcome back to <span className="gradient-text">IPPA Operating System</span> 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '700px' }}>
            All 6 company departments are synchronized on a single real-time platform. AI agents are currently handling <strong>35%</strong> of automated workflow tasks today.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button className="btn-primary" onClick={() => onTriggerAI('ai-ops', 'Optimize current department sprint velocity')}>
              <Bot size={18} /> Launch AI OpsAgent
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('tasks')}>
              <CheckSquare size={18} /> View Open Tasks ({stats.openTasks})
            </button>
          </div>
        </div>

        {/* Ambient glow accent in background */}
        <div style={{ 
          position: 'absolute', right: '-40px', bottom: '-40px', 
          width: '240px', height: '240px', background: 'rgba(124, 58, 237, 0.1)', 
          borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' 
        }} />
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Team</span>
            <Users size={20} color="#7C3AED" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0', color: '#0F172A' }}>
            {stats.activeEmployees}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
            <TrendingUp size={14} /> Across 6 departments
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Open Tasks</span>
            <CheckSquare size={20} color="#0891B2" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0', color: '#0F172A' }}>
            {stats.openTasks}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            12 in review status
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Meetings Today</span>
            <Calendar size={20} color="#E11D48" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0', color: '#0F172A' }}>
            {stats.upcomingMeetings}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#E11D48', fontWeight: 600 }}>
            Next: Q3 UI Sync in 30m
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>AI Actions Saved</span>
            <Bot size={20} color="#059669" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0', color: '#0F172A' }}>
            {stats.aiTasksCompleted}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
            <Flame size={14} /> 184 hrs saved this month
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>System Health</span>
            <ShieldCheck size={20} color="#4F46E5" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0', color: '#0F172A' }}>
            {stats.systemHealth}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
            All systems operational
          </div>
        </div>

      </div>

      {/* Department Status & Quick Hub Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Department Overview */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>🏢 Department Sync Overview</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time status across company departments</p>
            </div>
            <button className="btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => onNavigate('settings')}>
              Manage Departments
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {departments.map((dept, idx) => (
              <div key={idx} style={{ 
                background: '#F8FAFC', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: 'var(--radius-md)', 
                padding: '1rem',
                borderLeft: `4px solid ${dept.bg}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{dept.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{dept.count} members</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: dept.bg, marginTop: '0.4rem', fontWeight: 700 }}>
                  {dept.status}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
                  Lead: {dept.lead}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Quick Trigger Panel */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={20} color="#7C3AED" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>AI Agent Shortcuts</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Trigger autonomous agents directly in workspace:</p>

          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => onTriggerAI('ai-ops', 'Generate daily standup digest')}>
            <Zap size={16} color="#0891B2" /> Daily Standup AI Digest
          </button>
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => onTriggerAI('ai-task', 'Auto-assign pending tasks')}>
            <CheckSquare size={16} color="#7C3AED" /> Auto-Triage Pending Tasks
          </button>
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => onTriggerAI('ai-doc', 'Summarize latest company policy')}>
            <Sparkles size={16} color="#DB2777" /> Summarize Latest Files
          </button>
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => onTriggerAI('ai-hr', 'Check employee onboarding status')}>
            <Users size={16} color="#059669" /> HR Onboarding Status
          </button>
        </div>

      </div>

    </div>
  );
}
