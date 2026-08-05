import React, { useState } from 'react';
import {
  Rocket, Search, Filter, Plus, X, Eye, Edit3, Trash2, Phone, Mail,
  MessageCircle, Download, Upload, Building2, User, MapPin, Briefcase,
  DollarSign, CheckCircle2, Star, ShieldCheck, FileText, ArrowUpRight, Clock, AlertCircle
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'PRJ-2026-001',
    projectName: 'EduStar Academy Web Portal',
    clientName: 'Anita Sharma',
    company: 'EduStar Academy',
    service: 'Digital Marketing & Web',
    budget: '₹2,50,000',
    status: 'In Progress',
    deadline: '2026-09-30',
    assignedTo: 'Karthik R',
    createdDate: '2026-07-30'
  }
];

const PROJECT_STATUSES = ['Planning', 'In Progress', 'In Review', 'Completed', 'On Hold'];

const STATUS_COLORS = {
  'Planning': { bg: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED', border: 'rgba(124, 58, 237, 0.25)' },
  'In Progress': { bg: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', border: 'rgba(37, 99, 235, 0.25)' },
  'In Review': { bg: 'rgba(217, 119, 6, 0.1)', color: '#D97706', border: 'rgba(217, 119, 6, 0.25)' },
  'Completed': { bg: 'rgba(5, 150, 105, 0.1)', color: '#059669', border: 'rgba(5, 150, 105, 0.25)' },
  'On Hold': { bg: 'rgba(225, 29, 72, 0.1)', color: '#E11D48', border: 'rgba(225, 29, 72, 0.25)' },
};

export default function ProjectsModule({ projectsList = [] }) {
  const [projects, setProjects] = useState(() => {
    return projectsList.length > 0 ? projectsList : INITIAL_PROJECTS;
  });

  React.useEffect(() => {
    if (projectsList && projectsList.length > 0) {
      setProjects(projectsList);
    }
  }, [projectsList]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewProject, setViewProject] = useState(null);

  const filteredProjects = projects.filter(prj => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = prj.projectName.toLowerCase().includes(q) ||
        prj.clientName.toLowerCase().includes(q) ||
        prj.company.toLowerCase().includes(q) ||
        prj.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filterStatus && prj.status !== filterStatus) return false;
    return true;
  });

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-violet" style={{ marginBottom: '0.4rem' }}>
            🚀 Project Management
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>
            Projects Hub
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Track client project deliverables, timelines, and execution.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}>
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
            <Rocket size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{projects.length}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Projects</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{projects.filter(p => p.status === 'In Progress').length}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>In Progress</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{projects.filter(p => p.status === 'Completed').length}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>Completed</div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.55rem 0.85rem'
        }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search projects by title, client name, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#0F172A', fontSize: '0.82rem', fontWeight: 500 }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '0.55rem 0.85rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 500, color: '#0F172A', outline: 'none' }}
        >
          <option value="">All Statuses</option>
          {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Projects Table */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>PROJECT ID</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>PROJECT NAME</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>CLIENT / COMPANY</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>SERVICE</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>STATUS</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>BUDGET</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>ASSIGNED TO</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>No active projects</div>
                  </td>
                </tr>
              ) : filteredProjects.map((prj, idx) => {
                const sc = STATUS_COLORS[prj.status] || STATUS_COLORS['In Progress'];
                return (
                  <tr key={prj.id} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFBFC' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#7C3AED', fontSize: '0.78rem' }}>{prj.id}</td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{prj.projectName}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{prj.company}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{prj.clientName}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{prj.service}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <span style={{
                        padding: '0.2rem 0.55rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700,
                        background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`
                      }}>
                        ● {prj.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem', fontWeight: 700, color: '#0F172A' }}>{prj.budget}</td>
                    <td style={{ padding: '0.75rem 0.75rem', color: '#64748B', fontWeight: 600 }}>{prj.assignedTo || 'Unassigned'}</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
                        <button title="View Details" onClick={() => setViewProject(prj)} style={{ background: 'rgba(37, 99, 235, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#2563EB' }}>
                          <Eye size={14} />
                        </button>
                        <button title="Delete" onClick={() => handleDeleteProject(prj.id)} style={{ background: 'rgba(225, 29, 72, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#E11D48' }}>
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

      {/* View Project Modal */}
      {viewProject && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem'
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', maxWidth: '500px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Project Overview</h3>
              <button onClick={() => setViewProject(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><strong>Project ID:</strong> {viewProject.id}</div>
              <div><strong>Project Title:</strong> {viewProject.projectName}</div>
              <div><strong>Company:</strong> {viewProject.company}</div>
              <div><strong>Client Name:</strong> {viewProject.clientName}</div>
              <div><strong>Service:</strong> {viewProject.service}</div>
              <div><strong>Budget:</strong> {viewProject.budget}</div>
              <div><strong>Status:</strong> {viewProject.status}</div>
              <div><strong>Assigned To:</strong> {viewProject.assignedTo}</div>
              <div><strong>Created Date:</strong> {viewProject.createdDate || 'Today'}</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
