import React, { useState } from 'react';
import {
  Users, Search, Filter, Plus, X, Eye, Edit3, Trash2, Phone, Mail,
  MessageCircle, Download, Upload, Building2, User, MapPin, Briefcase,
  DollarSign, CheckCircle2, Star, ShieldCheck, FileText, ArrowUpRight, Rocket
} from 'lucide-react';

const INITIAL_CLIENTS = [
  {
    id: 'CL-2026-001',
    name: 'Anita Sharma',
    company: 'EduStar Academy',
    contactPerson: 'Anita Sharma',
    email: 'anita@edustar.co.in',
    phone: '+91 76543 21098',
    whatsapp: '+91 76543 21098',
    website: 'edustar.co.in',
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    industry: 'Education',
    service: 'Digital Marketing',
    budget: '₹2,50,000',
    status: 'Active',
    assignedTo: 'Karthik R',
    convertedDate: '2026-07-30',
    source: 'Facebook'
  }
];

const CLIENT_STATUSES = ['Active', 'Onboarding', 'Completed', 'Inactive', 'Suspended'];

export default function ClientsModule({ clientsList = [], onConvertToProject }) {
  const [clients, setClients] = useState(() => {
    return clientsList.length > 0 ? clientsList : INITIAL_CLIENTS;
  });
  
  React.useEffect(() => {
    if (clientsList && clientsList.length > 0) {
      setClients(clientsList);
    }
  }, [clientsList]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [viewClient, setViewClient] = useState(null);
  const [editClient, setEditClient] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', company: '', email: '', phone: '', service: '', budget: '', status: 'Active' });

  const openEditModal = (client) => {
    setEditClient(client);
    setEditFormData({
      name: client.name || '',
      company: client.company || '',
      email: client.email || '',
      phone: client.phone || '',
      service: client.service || '',
      budget: client.budget || '',
      status: client.status || 'Active'
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setClients(prev => prev.map(c => c.id === editClient.id ? { ...c, ...editFormData } : c));
    setEditClient(null);
    alert('Client updated successfully!');
  };

  const filteredClients = clients.filter(client => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = client.name.toLowerCase().includes(q) ||
        client.company.toLowerCase().includes(q) ||
        client.email.toLowerCase().includes(q) ||
        client.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filterStatus && client.status !== filterStatus) return false;
    if (filterIndustry && client.industry !== filterIndustry) return false;
    return true;
  });

  const handleCreateProject = (client) => {
    if (confirm(`Convert client "${client.name} (${client.company})" to a new Project?`)) {
      if (onConvertToProject) {
        onConvertToProject({
          projectName: `${client.company} - ${client.service || 'System Integration'}`,
          clientName: client.name,
          company: client.company,
          service: client.service || 'Custom Development',
          budget: client.budget || '₹3,00,000',
          status: 'In Progress',
          deadline: '2026-10-31',
          assignedTo: client.assignedTo || 'Unassigned',
          createdDate: new Date().toISOString().split('T')[0]
        });
      }
      alert(`🚀 Project "${client.company} - ${client.service}" created successfully in Projects Hub!`);
    }
  };

  const handleDeleteClient = (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>
            👥 Client Management
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>
            Clients Portal
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Manage active converted clients, projects, and contracts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}>
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{clients.length}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Clients</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{clients.filter(c => c.status === 'Active').length}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>Active Clients</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.55rem 0.85rem'
        }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search clients by name, company, email..."
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
          {CLIENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Clients Table */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>CLIENT ID</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>CLIENT NAME</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>COMPANY</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>CONTACT</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>SERVICE</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>STATUS</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>CONVERTED DATE</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>No clients converted yet</div>
                  </td>
                </tr>
              ) : filteredClients.map((client, idx) => (
                <tr key={client.id} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFBFC' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#059669', fontSize: '0.78rem' }}>{client.id}</td>
                  <td style={{ padding: '0.75rem 0.75rem' }}>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{client.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{client.email}</div>
                  </td>
                  <td style={{ padding: '0.75rem 0.75rem', fontWeight: 600, color: '#334155' }}>{client.company}</td>
                  <td style={{ padding: '0.75rem 0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button title="Call" style={{ background: 'rgba(5, 150, 105, 0.1)', border: 'none', borderRadius: '6px', padding: '0.3rem', color: '#059669' }}><Phone size={13} /></button>
                      <button title="Email" style={{ background: 'rgba(37, 99, 235, 0.1)', border: 'none', borderRadius: '6px', padding: '0.3rem', color: '#2563EB' }}><Mail size={13} /></button>
                      <button title="WhatsApp" style={{ background: 'rgba(34, 197, 94, 0.1)', border: 'none', borderRadius: '6px', padding: '0.3rem', color: '#16A34A' }}><MessageCircle size={13} /></button>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 0.75rem' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{client.service}</span>
                  </td>
                  <td style={{ padding: '0.75rem 0.75rem' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>● {client.status || 'Active'}</span>
                  </td>
                  <td style={{ padding: '0.75rem 0.75rem', color: '#64748B', fontWeight: 600 }}>{client.convertedDate || client.date || 'Today'}</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
                      <button title="Convert to Project" onClick={() => handleCreateProject(client)} style={{ background: 'rgba(124, 58, 237, 0.1)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#7C3AED' }}>
                        <Rocket size={14} />
                      </button>
                      <button title="View" onClick={() => setViewClient(client)} style={{ background: 'rgba(37, 99, 235, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#2563EB' }}>
                        <Eye size={14} />
                      </button>
                      <button title="Edit" onClick={() => openEditModal(client)} style={{ background: 'rgba(124, 58, 237, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#7C3AED' }}>
                        <Edit3 size={14} />
                      </button>
                      <button title="Delete" onClick={() => handleDeleteClient(client.id)} style={{ background: 'rgba(225, 29, 72, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#E11D48' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewClient && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem'
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', maxWidth: '500px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Client Profile</h3>
              <button onClick={() => setViewClient(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><strong>ID:</strong> {viewClient.id}</div>
              <div><strong>Name:</strong> {viewClient.name}</div>
              <div><strong>Company:</strong> {viewClient.company}</div>
              <div><strong>Email:</strong> {viewClient.email}</div>
              <div><strong>Phone:</strong> {viewClient.phone}</div>
              <div><strong>Service:</strong> {viewClient.service}</div>
              <div><strong>Budget:</strong> {viewClient.budget}</div>
              <div><strong>Converted Date:</strong> {viewClient.convertedDate || viewClient.date || 'Today'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {editClient && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem'
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.5rem', maxWidth: '520px', width: '100%', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Edit3 size={18} color="#7C3AED" /> Edit Client Details
              </h3>
              <button onClick={() => setEditClient(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Client Name</label>
                  <input style={{ padding: '0.55rem', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.82rem' }} value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Company Name</label>
                  <input style={{ padding: '0.55rem', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.82rem' }} value={editFormData.company} onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Email</label>
                  <input style={{ padding: '0.55rem', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.82rem' }} value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Phone</label>
                  <input style={{ padding: '0.55rem', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.82rem' }} value={editFormData.phone} onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Service</label>
                  <input style={{ padding: '0.55rem', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.82rem' }} value={editFormData.service} onChange={(e) => setEditFormData({ ...editFormData, service: e.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Budget</label>
                  <input style={{ padding: '0.55rem', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.82rem' }} value={editFormData.budget} onChange={(e) => setEditFormData({ ...editFormData, budget: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem', marginTop: '0.75rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setEditClient(null)} style={{ fontSize: '0.8rem' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ fontSize: '0.8rem' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
