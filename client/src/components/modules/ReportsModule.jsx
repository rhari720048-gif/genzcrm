import React from 'react';
import { BarChart3, TrendingUp, Zap, Download, Award, ShieldCheck, Flame, Sparkles } from 'lucide-react';

export default function ReportsModule({ reports }) {
  const data = reports || {
    departmentEfficiency: [
      { name: 'Engineering', output: 94, goal: 90, aiContribution: '35%' },
      { name: 'Product & Design', output: 98, goal: 92, aiContribution: '42%' },
      { name: 'Sales & Growth', output: 89, goal: 85, aiContribution: '28%' },
      { name: 'Marketing', output: 91, goal: 88, aiContribution: '30%' },
      { name: 'Operations', output: 99, goal: 95, aiContribution: '65%' }
    ],
    monthlyMetrics: [
      { month: 'Mar', productivity: 72, automatedTasks: 310 },
      { month: 'Apr', productivity: 78, automatedTasks: 450 },
      { month: 'May', productivity: 84, automatedTasks: 620 },
      { month: 'Jun', productivity: 89, automatedTasks: 890 },
      { month: 'Jul', productivity: 95, automatedTasks: 1240 }
    ],
    aiMetrics: {
      totalAgentCalls: 4520,
      hoursSavedPerWeek: 184,
      activeAgents: 4,
      accuracyRate: '98.4%'
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>📊 Reports & Executive Analytics</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Department velocity, AI automation ROI, and output benchmarks</p>
        </div>

        <button className="btn-secondary">
          <Download size={16} /> Export Q3 PDF Summary
        </button>
      </div>

      {/* Top AI Impact Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        
        <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>Total AI Agent Executions</span>
            <Zap size={18} color="#7C3AED" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#0F172A' }}>
            {data.aiMetrics.totalAgentCalls}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>+28% month-over-month</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>Weekly Hours Saved</span>
            <Flame size={18} color="#0891B2" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#0F172A' }}>
            {data.aiMetrics.hoursSavedPerWeek} hrs
          </div>
          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Equivalent to 4.5 full-time FTEs</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>AI Accuracy Rate</span>
            <ShieldCheck size={18} color="#059669" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#0F172A' }}>
            {data.aiMetrics.accuracyRate}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Zero security compliance flags</div>
        </div>

      </div>

      {/* Main Visual Reports */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        
        {/* Department Efficiency Progress Bars */}
        <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>🏢 Department Productivity vs Goal</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {data.departmentEfficiency.map((dept, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>{dept.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Output: <strong style={{ color: '#059669' }}>{dept.output}%</strong> (Goal: {dept.goal}%) • AI Impact: {dept.aiContribution}
                  </span>
                </div>

                <div style={{ width: '100%', height: '10px', background: '#E2E8F0', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${dept.output}%`, 
                    height: '100%', 
                    background: i % 2 === 0 ? 'linear-gradient(90deg, #7C3AED, #0891B2)' : 'linear-gradient(90deg, #0891B2, #059669)',
                    borderRadius: '5px' 
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Automation Growth */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>🚀 Automation Scale Trend</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {data.monthlyMetrics.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{m.month} 2026</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.automatedTasks} automated tasks</div>
                </div>
                <span className="badge badge-violet">{m.productivity}% Productivity</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
