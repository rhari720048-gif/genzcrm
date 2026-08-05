import React, { useState } from 'react';
import { 
  Handshake, Building, Percent, Briefcase, DollarSign, FileText, 
  TrendingUp, Zap, Plus, ShieldCheck, ExternalLink, HelpCircle, User, Download, 
  CheckCircle, Eye, Edit3, Trash2, ShieldOff, UserPlus, Filter, Search, Mail, 
  Phone, Globe, MapPin, Calendar, Clock, Lock, MessageSquare, AlertCircle, Video, Check, 
  Bell, Database, BarChart3, Settings, Award, ArrowUpRight, Flame 
} from 'lucide-react';

export default function DetailedPartnershipModule() {
  const [viewMode, setViewMode] = useState('admin'); // 'admin' or 'partner_portal'
  
  // Sidebar Sub-Menu Navigation under Business > Partnerships
  const [partnershipSubTab, setPartnershipSubTab] = useState('dashboard'); 
  // Options: 'dashboard', 'all_partners', 'add_partner', 'projects', 'commissions', 'payments', 'agreements', 'documents', 'reports', 'settings', 'notifications', 'db_schema'
  
  const [selectedReportType, setSelectedReportType] = useState('performance');
  // Report Options: 'performance', 'revenue', 'commission', 'country', 'top', 'inactive', 'monthly'

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modals state
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [showAssignProjectModal, setShowAssignProjectModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  // Partners Data Store
  const [partners, setPartners] = useState([
    {
      id: 'P-101',
      company: 'Nexus Digital Agency',
      contactPerson: 'Sarah Jenkins',
      designation: 'Managing Director',
      email: 'sarah@nexusdigital.io',
      phone: '+1 415-555-0192',
      country: 'United States 🇺🇸',
      type: 'Agency Partner',
      projectsCount: 6,
      revenue: '$145,000',
      status: 'Active',
      assignedManager: 'Alex Chen (Senior Lead)',
      commissionPaid: '$22,500',
      commissionPending: '$6,500',
      partnerSince: '2025-03-15'
    },
    {
      id: 'P-102',
      company: 'Apex Growth Labs',
      contactPerson: 'Jordan Vance',
      designation: 'VP Partnerships',
      email: 'jordan@apexgrowth.com',
      phone: '+44 20-7946-0912',
      country: 'United Kingdom 🇬🇧',
      type: 'Referral Partner',
      projectsCount: 4,
      revenue: '$88,000',
      status: 'Active',
      assignedManager: 'Maya Lin',
      commissionPaid: '$13,200',
      commissionPending: '$3,800',
      partnerSince: '2025-06-20'
    },
    {
      id: 'P-103',
      company: 'CloudScale Systems GmbH',
      contactPerson: 'Devon Kai',
      designation: 'Head of Ecosystem',
      email: 'devon@cloudscale.de',
      phone: '+49 30-1234-5678',
      country: 'Germany 🇩🇪',
      type: 'Enterprise Tech Partner',
      projectsCount: 8,
      revenue: '$310,000',
      status: 'Active',
      assignedManager: 'Alex Chen',
      commissionPaid: '$62,000',
      commissionPending: '$15,500',
      partnerSince: '2024-11-01'
    },
    {
      id: 'P-104',
      company: 'Nordic Resellers AS',
      contactPerson: 'Astrid Lind',
      designation: 'Partner Lead',
      email: 'astrid@nordicresell.no',
      phone: '+47 22-123-456',
      country: 'Norway 🇳🇴',
      type: 'Reseller',
      projectsCount: 2,
      revenue: '$42,000',
      status: 'Inactive',
      assignedManager: 'Priya Sharma',
      commissionPaid: '$4,200',
      commissionPending: '$0',
      partnerSince: '2025-09-10'
    }
  ]);

  // Partnership Notifications Stream
  const partnershipNotifications = [
    { id: 'pn-1', type: 'project', title: 'New Project Assigned', desc: 'CarePulse AI CRM assigned to Nexus Digital Agency', time: '10 mins ago', icon: '🚀', unread: true },
    { id: 'pn-2', type: 'invoice', title: 'Invoice Generated', desc: 'Invoice INV-2026-089 generated for $8,200', time: '1 hour ago', icon: '🧾', unread: true },
    { id: 'pn-3', type: 'payment', title: 'Payment Received', desc: '$85,000 received for HealthTech AI CRM Project', time: '3 hours ago', icon: '💵', unread: false },
    { id: 'pn-4', type: 'agreement', title: 'Agreement Expiring Soon', desc: 'CloudScale Systems MOU renewal due in 15 days', time: '1 day ago', icon: '📄', unread: false },
    { id: 'pn-5', type: 'meeting', title: 'Meeting Reminder', desc: 'Q3 Growth Alignment with Apex Growth Labs today at 3:00 PM', time: '2 hours ago', icon: '📅', unread: true },
    { id: 'pn-6', type: 'document', title: 'Document Uploaded', desc: 'Nexus_Digital_MOU_Signed_v2.pdf uploaded by partner', time: 'Yesterday', icon: '📂', unread: false }
  ];

  // Recommended Database Schema Tables
  const dbSchemaTables = [
    { name: 'partners', fields: 'id, company_name, partner_type, status, country, assigned_manager_id, created_at', count: '4 rows' },
    { name: 'partner_contacts', fields: 'id, partner_id, contact_name, designation, email, phone, whatsapp', count: '8 rows' },
    { name: 'partner_projects', fields: 'id, partner_id, project_name, client_name, amount, dev_cost, company_profit, status', count: '20 rows' },
    { name: 'partner_commissions', fields: 'id, partner_id, project_id, rate_percentage, amount, status, paid_date', count: '18 rows' },
    { name: 'partner_payments', fields: 'id, partner_id, invoice_id, amount, payment_method, transaction_id, status', count: '14 rows' },
    { name: 'partner_documents', fields: 'id, partner_id, doc_type, file_name, file_size, upload_date', count: '12 rows' },
    { name: 'partner_meetings', fields: 'id, partner_id, meeting_date, meeting_type, notes, follow_up_date', count: '15 rows' },
    { name: 'partner_notes', fields: 'id, partner_id, note_type, content, author_id, created_at', count: '22 rows' },
    { name: 'partner_activity_logs', fields: 'id, partner_id, action_type, detail, timestamp', count: '142 rows' },
    { name: 'partner_invoices', fields: 'id, partner_id, invoice_number, total_amount, status, due_date', count: '28 rows' },
    { name: 'partner_email_logs', fields: 'id, partner_id, subject, template_name, status, sent_at', count: '54 rows' },
    { name: 'partner_support_tickets', fields: 'id, partner_id, ticket_subject, priority, status, created_at', count: '6 rows' }
  ];

  const currentPartner = selectedPartner || partners[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header & Dual View Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-violet" style={{ marginBottom: '0.4rem' }}>
            🎯 Business &gt; Partnerships Suite
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>
            Partnerships Hub
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Complete 10-section sidebar ecosystem, 7 report types, real-time alerts, and 12 database tables
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <button 
              className={`btn-secondary ${viewMode === 'admin' ? 'btn-primary' : ''}`} 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} 
              onClick={() => setViewMode('admin')}
            >
              <Building size={14} /> Admin Control View
            </button>
            <button 
              className={`btn-secondary ${viewMode === 'partner_portal' ? 'btn-primary' : ''}`} 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} 
              onClick={() => setViewMode('partner_portal')}
            >
              <Globe size={14} /> Partner Portal View
            </button>
          </div>

          {viewMode === 'admin' && (
            <button className="btn-primary" onClick={() => setShowAddPartnerModal(true)}>
              <Plus size={18} /> Add Partner
            </button>
          )}
        </div>
      </div>

      {/* Target Sidebar Structure (10 Sub-Nav Tabs under Business > Partnerships) */}
      <div style={{ display: 'flex', gap: '0.4rem', background: '#FFFFFF', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', overflowX: 'auto' }}>
        {[
          { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={14} /> },
          { id: 'all_partners', label: 'All Partners', icon: <Handshake size={14} /> },
          { id: 'add_partner', label: 'Add Partner', icon: <Plus size={14} /> },
          { id: 'projects', label: 'Projects', icon: <Briefcase size={14} /> },
          { id: 'commissions', label: 'Commissions', icon: <Percent size={14} /> },
          { id: 'payments', label: 'Payments', icon: <DollarSign size={14} /> },
          { id: 'agreements', label: 'Agreements', icon: <FileText size={14} /> },
          { id: 'documents', label: 'Documents', icon: <FileText size={14} /> },
          { id: 'reports', label: 'Reports', icon: <TrendingUp size={14} /> },
          { id: 'notifications', label: 'Alerts', icon: <Bell size={14} /> },
          { id: 'db_schema', label: 'Database Tables', icon: <Database size={14} /> },
          { id: 'settings', label: 'Settings', icon: <Settings size={14} /> }
        ].map(tab => (
          <button 
            key={tab.id}
            className={`btn-secondary ${partnershipSubTab === tab.id ? 'btn-primary' : ''}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            onClick={() => {
              if (tab.id === 'add_partner') {
                setShowAddPartnerModal(true);
              } else {
                setPartnershipSubTab(tab.id);
              }
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. SUB-TAB: DASHBOARD */}
      {/* ========================================================================= */}
      {partnershipSubTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Partners</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: '0.3rem 0' }}>{partners.length}</div>
              <span className="badge badge-violet">4 Global Regions</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Partners</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', margin: '0.3rem 0' }}>3 Active</div>
              <span className="badge badge-emerald">100% Compliance</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Revenue from Partners</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: '0.3rem 0' }}>$585,000</div>
              <span className="badge badge-emerald">+28% YoY Growth</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Commission</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706', margin: '0.3rem 0' }}>$25,800</div>
              <span className="badge badge-amber">Due Net 30</span>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-TAB: ALL PARTNERS DIRECTORY */}
      {/* ========================================================================= */}
      {partnershipSubTab === 'all_partners' && (
        <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
            📋 All Company Partners Directory
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>ID</th>
                  <th style={{ padding: '0.75rem' }}>COMPANY</th>
                  <th style={{ padding: '0.75rem' }}>CONTACT</th>
                  <th style={{ padding: '0.75rem' }}>COUNTRY</th>
                  <th style={{ padding: '0.75rem' }}>TYPE</th>
                  <th style={{ padding: '0.75rem' }}>REVENUE</th>
                  <th style={{ padding: '0.75rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {partners.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#7C3AED' }}>{p.id}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#0F172A' }}>{p.company}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{p.contactPerson} ({p.email})</td>
                    <td style={{ padding: '0.75rem' }}>{p.country}</td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-violet">{p.type}</span></td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: '#059669' }}>{p.revenue}</td>
                    <td style={{ padding: '0.75rem' }}><span className={`badge ${p.status === 'Active' ? 'badge-emerald' : 'badge-amber'}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SUB-TAB: REPORTS (7 Specialized Partnership Report Views) */}
      {/* ========================================================================= */}
      {partnershipSubTab === 'reports' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Report Category Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', background: '#F8FAFC', padding: '0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', overflowX: 'auto' }}>
            {[
              { id: 'performance', label: '1. Partner Performance' },
              { id: 'revenue', label: '2. Revenue by Partner' },
              { id: 'commission', label: '3. Commission Report' },
              { id: 'country', label: '4. Country-wise Report' },
              { id: 'top', label: '5. Top Partners' },
              { id: 'inactive', label: '6. Inactive Partners' },
              { id: 'monthly', label: '7. Monthly Partnership Report' }
            ].map(rep => (
              <button 
                key={rep.id}
                className={`btn-secondary ${selectedReportType === rep.id ? 'btn-primary' : ''}`}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                onClick={() => setSelectedReportType(rep.id)}
              >
                {rep.label}
              </button>
            ))}
          </div>

          {/* Active Report View Display */}
          <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', textTransform: 'capitalize' }}>
              📊 {selectedReportType} Report Analysis
            </h3>

            <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>Report View: {selectedReportType.toUpperCase()}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Generated live from Master Partner Analytics DB</div>
                </div>

                <button className="btn-secondary">
                  <Download size={14} /> Export CSV / PDF
                </button>
              </div>

              {/* Report Data Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>PARTNER NAME</th>
                    <th style={{ padding: '0.75rem' }}>METRIC / CATEGORY</th>
                    <th style={{ padding: '0.75rem' }}>VALUE / OUTPUT</th>
                    <th style={{ padding: '0.75rem' }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 700, color: '#0F172A' }}>{p.company}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{selectedReportType} Metric</td>
                      <td style={{ padding: '0.75rem', fontWeight: 700, color: '#059669' }}>{p.revenue}</td>
                      <td style={{ padding: '0.75rem' }}><span className="badge badge-emerald">Verified Report</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUB-TAB: NOTIFICATIONS CENTER */}
      {/* ========================================================================= */}
      {partnershipSubTab === 'notifications' && (
        <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} color="#7C3AED" /> Partnership Real-time Alerts & Notifications
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {partnershipNotifications.map(notif => (
              <div key={notif.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: notif.unread ? 'rgba(124, 58, 237, 0.05)' : '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '1.3rem' }}>{notif.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{notif.title}</span>
                    {notif.unread && <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>New Alert</span>}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.2rem' }}>{notif.desc}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.3rem', display: 'block' }}>{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SUB-TAB: 12 RECOMMENDED DATABASE TABLES SCHEMAS */}
      {/* ========================================================================= */}
      {partnershipSubTab === 'db_schema' && (
        <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={20} color="#0891B2" /> Partnership System Database Schema (12 Tables)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            SQL database tables powering the IPPA Partnership Ecosystem:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {dbSchemaTables.map(tbl => (
              <div key={tbl.name} style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontWeight: 800, color: '#7C3AED', fontSize: '0.9rem' }}>table: {tbl.name}</code>
                  <span className="badge badge-cyan">{tbl.count}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', wordBreak: 'break-all' }}>
                  Fields: {tbl.fields}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add Partner Component */}
      {showAddPartnerModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '600px', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>➕ Add New Partner to Ecosystem</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Company Name *" style={{ padding: '0.5rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }} />
              <input type="text" placeholder="Contact Person Name *" style={{ padding: '0.5rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }} />
              <input type="email" placeholder="Email Address *" style={{ padding: '0.5rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button className="btn-secondary" onClick={() => setShowAddPartnerModal(false)}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowAddPartnerModal(false)}>Register Partner</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
