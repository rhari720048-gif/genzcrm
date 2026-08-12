import React, { useState } from 'react';
import {
  Plus, Search, Filter, X, ChevronDown, ChevronRight, Eye, Edit3, Trash2,
  Phone, Mail, MessageCircle, Globe, Building2, User, MapPin, Briefcase,
  DollarSign, Tag, Calendar, Download, Upload, MoreVertical, CheckCircle2,
  Clock, AlertCircle, XCircle, TrendingUp, Users, ArrowUpRight, RefreshCw,
  Star, Send, UserCheck
} from 'lucide-react';

const SAMPLE_LEADS = [];

// ─── Constants ────────────────────────────────────────────────────
const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost', 'Follow Up'];
const LEAD_SOURCES = ['Facebook', 'Instagram', 'LinkedIn', 'Google Ads', 'Website', 'Referral', 'Cold Call', 'Email', 'Walk-in', 'Partner', 'Agency', 'Other'];
const INTERESTED_SERVICES = ['Website', 'CRM', 'Mobile App', 'AI Agent', 'Digital Marketing', 'SEO', 'Software Development', 'Other'];
const INDUSTRIES = ['IT Services', 'E-Commerce', 'Real Estate', 'Healthcare', 'FinTech', 'Education', 'Construction', 'Agriculture', 'Manufacturing', 'Retail', 'Logistics', 'Other'];
const BUSINESS_TYPES = ['Startup', 'SME', 'Enterprise', 'Government', 'Non-Profit', 'Freelancer'];
const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'];
const ASSIGNED_USERS = ['Arun M', 'Priya S', 'Karthik R', 'Deepak V', 'Nisha T'];
const COUNTRIES = ['India', 'USA', 'UK', 'UAE', 'Singapore', 'Australia', 'Canada', 'Germany', 'Other'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

const STATUS_COLORS = {
  'New': { bg: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', border: 'rgba(37, 99, 235, 0.25)' },
  'Contacted': { bg: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED', border: 'rgba(124, 58, 237, 0.25)' },
  'Qualified': { bg: 'rgba(8, 145, 178, 0.1)', color: '#0891B2', border: 'rgba(8, 145, 178, 0.25)' },
  'Proposal Sent': { bg: 'rgba(217, 119, 6, 0.1)', color: '#D97706', border: 'rgba(217, 119, 6, 0.25)' },
  'Negotiation': { bg: 'rgba(168, 85, 247, 0.1)', color: '#A855F7', border: 'rgba(168, 85, 247, 0.25)' },
  'Won': { bg: 'rgba(5, 150, 105, 0.1)', color: '#059669', border: 'rgba(5, 150, 105, 0.25)' },
  'Lost': { bg: 'rgba(225, 29, 72, 0.1)', color: '#E11D48', border: 'rgba(225, 29, 72, 0.25)' },
  'Follow Up': { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: 'rgba(245, 158, 11, 0.25)' },
};

const PRIORITY_COLORS = {
  'Low': { bg: '#F0FDF4', color: '#059669' },
  'Medium': { bg: '#FFFBEB', color: '#D97706' },
  'High': { bg: '#FEF2F2', color: '#E11D48' },
  'Critical': { bg: '#FDF2F8', color: '#BE185D' },
};

// ─── Reusable Form Field Component ───────────────────────────────
function FormField({ label, children, required = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {label}
        {required && <span style={{ color: '#E11D48' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Reusable Input Style ────────────────────────────────────────
const inputStyle = {
  padding: '0.6rem 0.75rem',
  background: '#F8FAFC',
  border: '1px solid #E2E8F0',
  borderRadius: '8px',
  fontSize: '0.82rem',
  fontWeight: 500,
  color: '#0F172A',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  width: '100%',
  fontFamily: 'Inter, sans-serif',
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394A3B8' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.75rem center',
  paddingRight: '2rem',
};

// ═══════════════════════════════════════════════════════════════════
// MAIN LEADS MODULE COMPONENT
// ═══════════════════════════════════════════════════════════════════
export default function LeadsModule({ onConvertClient, onScheduleFollowUp }) {
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewLead, setViewLead] = useState(null);
  const [detailTab, setDetailTab] = useState('overview'); // 'overview', 'activities', 'notes', 'followups', 'quotations', 'files'
  const [editLead, setEditLead] = useState(null);

  // Smart Communication Action States
  const [activeCall, setActiveCall] = useState(null); // stores lead object for dialing
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState(null);
  const [callStatus, setCallStatus] = useState('connecting'); // 'connecting', 'active', 'ended'
  
  const [activeMail, setActiveMail] = useState(null); // stores lead object for emailing
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [emailStatus, setEmailStatus] = useState('idle'); // 'idle', 'sending', 'sent'

  const [activeWhatsApp, setActiveWhatsApp] = useState(null); // stores lead object for whatsapp
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [whatsappStatus, setWhatsappStatus] = useState('idle'); // 'idle', 'sending', 'sent'

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [filterAssigned, setFilterAssigned] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // Add/Edit Form State
  const [formData, setFormData] = useState({
    name: '', company: '', contactPerson: '', email: '', phone: '', whatsapp: '', website: '',
    country: '', state: '', city: '', address: '', pincode: '',
    industry: '', businessType: '', companySize: '', service: '', budget: '',
    source: '', status: 'New', assignedTo: '', priority: 'Medium', notes: '',
    scheduleFollowUp: false,
    followUpDate: '',
    followUpTime: '10:00 AM',
    followUpTask: ''
  });

  // Form active section tab
  const [formSection, setFormSection] = useState('basic');

  // ─── Computed Stats ─────────────────────────────────────────────
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'New').length,
    qualified: leads.filter(l => l.status === 'Qualified').length,
    won: leads.filter(l => l.status === 'Won').length,
    lost: leads.filter(l => l.status === 'Lost').length,
    contacted: leads.filter(l => l.status === 'Contacted' || l.status === 'Follow Up').length,
  };

  // ─── Filter Logic ──────────────────────────────────────────────
  const filteredLeads = leads.filter(lead => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filterStatus && lead.status !== filterStatus) return false;
    if (filterSource && lead.source !== filterSource) return false;
    if (filterAssigned && lead.assignedTo !== filterAssigned) return false;
    if (filterCountry && lead.country !== filterCountry) return false;
    if (filterIndustry && lead.industry !== filterIndustry) return false;
    if (filterDateFrom && lead.date < filterDateFrom) return false;
    if (filterDateTo && lead.date > filterDateTo) return false;
    return true;
  });

  // ─── Handlers ──────────────────────────────────────────────────
  const resetForm = () => {
    setFormData({
      name: '', company: '', contactPerson: '', email: '', phone: '', whatsapp: '', website: '',
      country: '', state: '', city: '', address: '', pincode: '',
      industry: '', businessType: '', companySize: '', service: '', budget: '',
      source: '', status: 'New', assignedTo: '', priority: 'Medium', notes: '',
      scheduleFollowUp: false,
      followUpDate: '',
      followUpTime: '10:00 AM',
      followUpTask: ''
    });
    setFormSection('basic');
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const newLead = {
      ...formData,
      id: `genz-L-2026-${String(leads.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      leadAddedDate: new Date().toISOString().split('T')[0], // Track lead registration timestamp
    };

    if (newLead.scheduleFollowUp) {
      if (!newLead.followUpDate) {
        alert('Please select a Follow-Up date!');
        return;
      }
      
      // Dispatch to Follow Ups list
      if (onScheduleFollowUp) {
        onScheduleFollowUp({
          id: `f-${Date.now()}`,
          client: newLead.company || newLead.name,
          contactPerson: newLead.contactPerson || newLead.name,
          task: newLead.followUpTask || newLead.notes || 'Routine follow-up call',
          dueDate: newLead.followUpDate,
          dueTime: newLead.followUpTime || '10:00 AM',
          priority: newLead.priority || 'Medium',
          status: 'pending',
          email: newLead.email,
          phone: newLead.phone
        });
      }
      
      setShowAddForm(false);
      resetForm();
      alert(`📅 Lead "${newLead.name}" added and transferred to Follow Ups portal!`);
      return;
    }

    setLeads(prev => [newLead, ...prev]);
    setShowAddForm(false);
    resetForm();
  };

  const handleEditLead = (e) => {
    e.preventDefault();
    const updatedLead = { ...formData, id: editLead.id, date: editLead.date };
    
    // Explicit Schedule Follow-Up switch trigger
    if (updatedLead.scheduleFollowUp) {
      if (!updatedLead.followUpDate) {
        alert('Please select a Follow-Up date!');
        return;
      }
      
      // Remove from Leads database
      setLeads(prev => prev.filter(l => l.id !== editLead.id));
      
      // Dispatch to Follow Ups list
      if (onScheduleFollowUp) {
        onScheduleFollowUp({
          id: `f-${Date.now()}`,
          client: updatedLead.company,
          contactPerson: updatedLead.contactPerson || updatedLead.name,
          task: updatedLead.followUpTask || updatedLead.notes || 'Routine follow-up call',
          dueDate: updatedLead.followUpDate,
          dueTime: updatedLead.followUpTime || '10:00 AM',
          priority: updatedLead.priority || 'Medium',
          status: 'pending',
          email: updatedLead.email,
          phone: updatedLead.phone
        });
      }
      
      setEditLead(null);
      setShowAddForm(false);
      resetForm();
      alert(`📅 Lead "${updatedLead.name}" has been scheduled for follow-up and transferred to Follow Ups portal!`);
      return;
    }

    setLeads(prev => prev.map(l => l.id === editLead.id ? updatedLead : l));
    setEditLead(null);
    setShowAddForm(false);
    resetForm();
  };

  const handleConvertToClient = (lead) => {
    if (confirm(`Convert lead "${lead.name} (${lead.company})" to a Client and move from Leads?`)) {
      setLeads(prev => prev.filter(l => l.id !== lead.id));
      if (onConvertClient) {
        onConvertClient({
          name: lead.name,
          company: lead.company,
          contactPerson: lead.contactPerson || lead.name,
          email: lead.email,
          phone: lead.phone,
          whatsapp: lead.whatsapp,
          website: lead.website,
          country: lead.country,
          state: lead.state,
          city: lead.city,
          industry: lead.industry,
          service: lead.service,
          budget: lead.budget,
          status: 'Active',
          assignedTo: lead.assignedTo,
          leadAddedDate: lead.leadAddedDate || lead.date || new Date().toISOString().split('T')[0], // Retain lead timestamp
          clientConvertedDate: new Date().toISOString().split('T')[0], // Track client conversion timestamp
          convertedDate: new Date().toISOString().split('T')[0],
          source: lead.source
        });
      }
      if (viewLead && viewLead.id === lead.id) {
        setViewLead(null);
      }
    }
  };

  const handleScheduleFollowUpForLead = (lead) => {
    const dueDate = prompt(`Enter Follow-Up Date for "${lead.name} (${lead.company})":`, new Date().toISOString().split('T')[0]);
    if (!dueDate) return;
    const task = prompt(`Enter Follow-Up Task/Notes:`, `Follow up call with ${lead.name}`);
    if (!task) return;

    setLeads(prev => prev.filter(l => l.id !== lead.id));
    if (onScheduleFollowUp) {
      onScheduleFollowUp({
        id: `f-${Date.now()}`,
        client: lead.company || lead.name,
        contactPerson: lead.contactPerson || lead.name,
        task: task,
        dueDate: dueDate,
        dueTime: '10:00 AM',
        priority: lead.priority || 'Medium',
        status: 'pending',
        email: lead.email,
        phone: lead.phone
      });
    }
    if (viewLead && viewLead.id === lead.id) {
      setViewLead(null);
    }
    alert(`📅 Lead "${lead.name}" transferred to Follow Ups portal!`);
  };

  const handleDeleteLead = (id) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(l => l.id !== id));
    }
  };

  const openEditForm = (lead) => {
    setFormData({ ...lead });
    setEditLead(lead);
    setShowAddForm(true);
    setFormSection('basic');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterStatus('');
    setFilterSource('');
    setFilterAssigned('');
    setFilterCountry('');
    setFilterIndustry('');
    setFilterDateFrom('');
    setFilterDateTo('');
  };

  const activeFilterCount = [filterStatus, filterSource, filterAssigned, filterCountry, filterIndustry, filterDateFrom, filterDateTo].filter(Boolean).length;

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ─── Page Header ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-violet" style={{ marginBottom: '0.4rem' }}>
            📊 CRM Module
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A' }}>
            Leads Management
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Track, manage & convert leads into paying clients.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}>
            <Download size={15} /> Export
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}>
            <Upload size={15} /> Import
          </button>
          <button
            className="btn-primary"
            onClick={() => { resetForm(); setEditLead(null); setShowAddForm(true); }}
            style={{ fontSize: '0.82rem', padding: '0.55rem 1.1rem' }}
          >
            <Plus size={16} /> Add Lead
          </button>
        </div>
      </div>

      {/* ─── Stats Cards ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
        {[
          { label: 'Total Leads', value: stats.total, icon: <Users size={18} />, color: '#2563EB', bg: 'rgba(37, 99, 235, 0.08)' },
          { label: 'New Leads', value: stats.new, icon: <Star size={18} />, color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.08)' },
          { label: 'Contacted', value: stats.contacted, icon: <Phone size={18} />, color: '#0891B2', bg: 'rgba(8, 145, 178, 0.08)' },
          { label: 'Qualified', value: stats.qualified, icon: <CheckCircle2 size={18} />, color: '#D97706', bg: 'rgba(217, 119, 6, 0.08)' },
          { label: 'Won', value: stats.won, icon: <TrendingUp size={18} />, color: '#059669', bg: 'rgba(5, 150, 105, 0.08)' },
          { label: 'Lost', value: stats.lost, icon: <XCircle size={18} />, color: '#E11D48', bg: 'rgba(225, 29, 72, 0.08)' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>{stat.value}</div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Search & Filter Bar ─────────────────────────────────── */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{
            flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.55rem 0.85rem'
          }}>
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              placeholder="Search by name, company, email, phone or lead ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#0F172A', fontSize: '0.82rem', fontWeight: 500 }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#94A3B8' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary"
            style={{
              fontSize: '0.8rem', padding: '0.5rem 0.85rem',
              background: showFilters ? 'rgba(124, 58, 237, 0.08)' : '#FFFFFF',
              color: showFilters ? '#7C3AED' : 'var(--text-main)',
              border: showFilters ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid var(--border-subtle)'
            }}
          >
            <Filter size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span style={{
                background: '#7C3AED', color: '#FFF', borderRadius: '50%',
                width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 800
              }}>{activeFilterCount}</span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button onClick={clearAllFilters} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: '#E11D48', fontWeight: 700 }}>
              Clear All
            </button>
          )}

          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginLeft: 'auto' }}>
            Showing {filteredLeads.length} of {leads.length} leads
          </span>
        </div>

        {/* Expanded Filters Panel */}
        {showFilters && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem',
            padding: '1rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0'
          }}>
            <FormField label="Lead Status">
              <select style={selectStyle} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Statuses</option>
                {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Lead Source">
              <select style={selectStyle} value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
                <option value="">All Sources</option>
                {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>
            <FormField label="Assigned To">
              <select style={selectStyle} value={filterAssigned} onChange={(e) => setFilterAssigned(e.target.value)}>
                <option value="">All Members</option>
                {ASSIGNED_USERS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </FormField>
            <FormField label="Country">
              <select style={selectStyle} value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}>
                <option value="">All Countries</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Industry">
              <select style={selectStyle} value={filterIndustry} onChange={(e) => setFilterIndustry(e.target.value)}>
                <option value="">All Industries</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </FormField>
            <FormField label="Date From">
              <input type="date" style={inputStyle} value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} />
            </FormField>
            <FormField label="Date To">
              <input type="date" style={inputStyle} value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} />
            </FormField>
          </div>
        )}
      </div>

      {/* ─── Leads Table ─────────────────────────────────────────── */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>LEAD ID</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>LEAD NAME</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>COMPANY</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>CONTACT</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>SERVICE</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>STATUS</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>SOURCE</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>ASSIGNED</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>BUDGET</th>
                <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em' }}>PRIORITY</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', letterSpacing: '0.04em', textAlign: 'center' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>No leads found</div>
                    <div style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>Try adjusting your search or filters</div>
                  </td>
                </tr>
              ) : filteredLeads.map((lead, idx) => {
                const sc = STATUS_COLORS[lead.status] || STATUS_COLORS['New'];
                const pc = PRIORITY_COLORS[lead.priority] || PRIORITY_COLORS['Medium'];
                return (
                  <tr key={lead.id} style={{
                    borderBottom: '1px solid #F1F5F9',
                    background: idx % 2 === 0 ? '#FFFFFF' : '#FAFBFC',
                    transition: 'background 0.15s ease',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F0F4FF'}
                    onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? '#FFFFFF' : '#FAFBFC'}
                  >
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#2563EB', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{lead.id}</td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{lead.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>{lead.email}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{lead.company}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.1rem' }}>{lead.country}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button 
                          title="Call" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCall(lead);
                            setCallStatus('connecting');
                            setCallDuration(0);
                            const interval = setInterval(() => {
                              setCallDuration(d => d + 1);
                            }, 1000);
                            setCallTimer(interval);
                          }} 
                          style={{ background: 'rgba(5, 150, 105, 0.1)', border: 'none', borderRadius: '6px', padding: '0.3rem', cursor: 'pointer', color: '#059669' }}
                        >
                          <Phone size={13} />
                        </button>
                        <button 
                          title="Email" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMail(lead);
                            setEmailSubject(`Proposal for ${lead.company} - GNZ CRM`);
                            setEmailBody(`Hi ${lead.name},\n\nWe would like to follow up regarding the ${lead.service} requirements for ${lead.company}.\n\nBest Regards,\nGNZ Team`);
                            setEmailStatus('idle');
                          }} 
                          style={{ background: 'rgba(37, 99, 235, 0.1)', border: 'none', borderRadius: '6px', padding: '0.3rem', cursor: 'pointer', color: '#2563EB' }}
                        >
                          <Mail size={13} />
                        </button>
                        <button 
                          title="WhatsApp" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveWhatsApp(lead);
                            setWhatsappMessage(`Hello ${lead.name}, this is GNZ CRM regarding your interest in our ${lead.service} services.`);
                            setWhatsappStatus('idle');
                          }} 
                          style={{ background: 'rgba(34, 197, 94, 0.1)', border: 'none', borderRadius: '6px', padding: '0.3rem', cursor: 'pointer', color: '#16A34A' }}
                        >
                          <MessageCircle size={13} />
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{lead.service}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <span style={{
                        padding: '0.2rem 0.55rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700,
                        background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, display: 'inline-flex', alignItems: 'center', gap: '0.25rem'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: sc.color, display: 'inline-block' }}></span>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 0.75rem', fontWeight: 600, color: '#64748B', fontSize: '0.78rem' }}>{lead.source}</td>
                    <td style={{ padding: '0.75rem 0.75rem', fontWeight: 600, color: '#334155', fontSize: '0.78rem' }}>{lead.assignedTo}</td>
                    <td style={{ padding: '0.75rem 0.75rem', fontWeight: 700, color: '#0F172A', fontSize: '0.82rem' }}>{lead.budget}</td>
                    <td style={{ padding: '0.75rem 0.75rem' }}>
                      <span style={{
                        padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700,
                        background: pc.bg, color: pc.color
                      }}>
                        {lead.priority}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
                        <button title="Convert to Client" onClick={(e) => { e.stopPropagation(); handleConvertToClient(lead); }} style={{ background: 'rgba(5, 150, 105, 0.1)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#059669' }}>
                          <UserCheck size={14} />
                        </button>
                        <button title="View" onClick={(e) => { e.stopPropagation(); setViewLead(lead); }} style={{ background: 'rgba(37, 99, 235, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#2563EB' }}>
                          <Eye size={14} />
                        </button>
                        <button title="Edit / Move to Follow-up" onClick={(e) => { e.stopPropagation(); openEditForm(lead); }} style={{ background: 'rgba(124, 58, 237, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#7C3AED' }}>
                          <Edit3 size={14} />
                        </button>
                        <button title="Delete" onClick={(e) => { e.stopPropagation(); handleDeleteLead(lead.id); }} style={{ background: 'rgba(225, 29, 72, 0.08)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: '#E11D48' }}>
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

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ADD / EDIT LEAD MODAL                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {showAddForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          padding: '1rem', overflowY: 'auto'
        }}>
          <div style={{
            background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            width: '100%', maxWidth: '720px', maxHeight: '88vh', display: 'flex', flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: '#F8FAFC'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={20} color="#7C3AED" />
                  {editLead ? 'Edit Lead' : 'Add New Lead'}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem' }}>
                  {editLead ? `Editing ${editLead.id}` : 'Fill in the details to create a new lead'}
                </p>
              </div>
              <button
                onClick={() => { setShowAddForm(false); setEditLead(null); resetForm(); }}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Section Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', padding: '0 1.5rem', background: '#FFFFFF' }}>
              {[
                { id: 'basic', label: 'Basic Details', icon: <User size={14} /> },
                { id: 'address', label: 'Address', icon: <MapPin size={14} /> },
                { id: 'business', label: 'Business Details', icon: <Briefcase size={14} /> },
                { id: 'source', label: 'Source & Assignment', icon: <Tag size={14} /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFormSection(tab.id)}
                  style={{
                    padding: '0.75rem 1rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                    background: 'none', border: 'none',
                    color: formSection === tab.id ? '#7C3AED' : '#64748B',
                    borderBottom: formSection === tab.id ? '2px solid #7C3AED' : '2px solid transparent',
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Form Body */}
            <form onSubmit={editLead ? handleEditLead : handleAddLead} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>

              {/* ─── Basic Details Section ─── */}
              {formSection === 'basic' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <FormField label="Lead Name" required>
                    <input style={inputStyle} placeholder="Enter lead name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </FormField>
                  <FormField label="Company Name" required>
                    <input style={inputStyle} placeholder="Enter company name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
                  </FormField>
                  <FormField label="Contact Person">
                    <input style={inputStyle} placeholder="Enter contact person" value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} />
                  </FormField>
                  <FormField label="Email" required>
                    <input style={inputStyle} type="email" placeholder="name@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </FormField>
                  <FormField label="Phone">
                    <input style={inputStyle} placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </FormField>
                  <FormField label="WhatsApp">
                    <input style={inputStyle} placeholder="+91 98765 43210" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} />
                  </FormField>
                  <div style={{ gridColumn: 'span 2' }}>
                    <FormField label="Website">
                      <input style={inputStyle} placeholder="https://example.com" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                    </FormField>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <FormField label="Short Notes (Project specs / CRM requirements)">
                      <textarea
                        style={{ ...inputStyle, minHeight: '65px', resize: 'vertical' }}
                        placeholder="Enter short notes about project specifications (e.g. Lead CRM specs, features)..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </FormField>
                  </div>

                  {/* Explicit Move to Follow-ups Selector Block */}
                  <div style={{ gridColumn: 'span 2', background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0', marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="checkbox" 
                        id="scheduleFollowUp"
                        checked={formData.scheduleFollowUp || false} 
                        onChange={(e) => setFormData({ ...formData, scheduleFollowUp: e.target.checked })}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <label htmlFor="scheduleFollowUp" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#7C3AED', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={15} /> Move to Follow-Ups (Schedule Date & Time)
                      </label>
                    </div>

                    {formData.scheduleFollowUp && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '0.75rem' }}>
                        <FormField label="Follow-Up Date" required>
                          <input 
                            type="date" 
                            style={inputStyle}
                            value={formData.followUpDate || ''} 
                            onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                          />
                        </FormField>
                        <FormField label="Follow-Up Time">
                          <input 
                            type="text" 
                            placeholder="10:00 AM"
                            style={inputStyle}
                            value={formData.followUpTime || '10:00 AM'} 
                            onChange={(e) => setFormData({ ...formData, followUpTime: e.target.value })}
                          />
                        </FormField>
                        <div style={{ gridColumn: 'span 2' }}>
                          <FormField label="Follow-Up Task Notes" required>
                            <textarea
                              placeholder="Write follow up notes/action items (e.g. call back details, pricing query, call later)..."
                              style={{ ...inputStyle, minHeight: '50px', resize: 'vertical' }}
                              value={formData.followUpTask || ''}
                              onChange={(e) => setFormData({ ...formData, followUpTask: e.target.value })}
                            />
                          </FormField>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── Address Section ─── */}
              {formSection === 'address' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <FormField label="Country">
                    <select style={selectStyle} value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                      <option value="">Select Country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </FormField>
                  <FormField label="State">
                    <input style={inputStyle} placeholder="Enter state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                  </FormField>
                  <FormField label="City">
                    <input style={inputStyle} placeholder="Enter city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                  </FormField>
                  <FormField label="Pincode">
                    <input style={inputStyle} placeholder="Enter pincode" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} />
                  </FormField>
                  <div style={{ gridColumn: 'span 2' }}>
                    <FormField label="Full Address">
                      <textarea
                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                        placeholder="Enter full address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {/* ─── Business Details Section ─── */}
              {formSection === 'business' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <FormField label="Industry">
                    <select style={selectStyle} value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })}>
                      <option value="">Select Industry</option>
                      {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Business Type">
                    <select style={selectStyle} value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}>
                      <option value="">Select Type</option>
                      {BUSINESS_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Company Size">
                    <select style={selectStyle} value={formData.companySize} onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}>
                      <option value="">Select Size</option>
                      {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Expected Budget">
                    <input style={inputStyle} placeholder="₹5,00,000" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
                  </FormField>
                  <div style={{ gridColumn: 'span 2' }}>
                    <FormField label="Interested Service" required>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                        {INTERESTED_SERVICES.map(svc => (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: svc })}
                            style={{
                              padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                              background: formData.service === svc ? '#7C3AED' : '#F8FAFC',
                              color: formData.service === svc ? '#FFFFFF' : '#334155',
                              border: formData.service === svc ? '1px solid #7C3AED' : '1px solid #E2E8F0',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {svc}
                          </button>
                        ))}
                      </div>
                    </FormField>
                  </div>
                </div>
              )}

              {/* ─── Source & Assignment Section ─── */}
              {formSection === 'source' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <FormField label="Lead Source" required>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                        {LEAD_SOURCES.map(src => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setFormData({ ...formData, source: src })}
                            style={{
                              padding: '0.4rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                              background: formData.source === src ? '#2563EB' : '#F8FAFC',
                              color: formData.source === src ? '#FFFFFF' : '#334155',
                              border: formData.source === src ? '1px solid #2563EB' : '1px solid #E2E8F0',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {src}
                          </button>
                        ))}
                      </div>
                    </FormField>
                  </div>
                  <FormField label="Lead Status">
                    <select style={selectStyle} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                      {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Assigned To">
                    <select style={selectStyle} value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}>
                      <option value="">Select Team Member</option>
                      {ASSIGNED_USERS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Priority">
                    <select style={selectStyle} value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                      {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </FormField>
                  <div style={{ gridColumn: 'span 2' }}>
                    <FormField label="Notes">
                      <textarea
                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                        placeholder="Any additional notes about this lead..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {/* Navigation & Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['basic', 'address', 'business', 'source'].map((sec, idx, arr) => (
                    <div
                      key={sec}
                      style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: formSection === sec ? '#7C3AED' : '#E2E8F0',
                        transition: 'background 0.2s ease'
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  {formSection !== 'basic' && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        const tabs = ['basic', 'address', 'business', 'source'];
                        const idx = tabs.indexOf(formSection);
                        if (idx > 0) setFormSection(tabs[idx - 1]);
                      }}
                      style={{ fontSize: '0.82rem' }}
                    >
                      Previous
                    </button>
                  )}
                  {formSection !== 'source' ? (
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        const tabs = ['basic', 'address', 'business', 'source'];
                        const idx = tabs.indexOf(formSection);
                        if (idx < tabs.length - 1) setFormSection(tabs[idx + 1]);
                      }}
                      style={{ fontSize: '0.82rem' }}
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  ) : (
                    <button type="submit" className="btn-primary" style={{ fontSize: '0.82rem', background: 'linear-gradient(135deg, #059669 0%, #0891B2 100%)' }}>
                      <CheckCircle2 size={15} />
                      {editLead ? 'Update Lead' : 'Save Lead'}
                    </button>
                  )}
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* VIEW LEAD DETAIL MODAL                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {viewLead && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          padding: '1rem', overflowY: 'auto'
        }}>
          <div style={{
            background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            width: '100%', maxWidth: '640px', maxHeight: '88vh', overflowY: 'auto'
          }}>
            {/* View Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Lead Details</h3>
                <p style={{ fontSize: '0.78rem', color: '#64748B' }}>{viewLead.id} • Created {viewLead.date}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleConvertToClient(viewLead)} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem', color: '#059669', borderColor: 'rgba(5, 150, 105, 0.3)' }}>
                  <UserCheck size={13} /> Convert to Client
                </button>
                <button onClick={() => { openEditForm(viewLead); setViewLead(null); }} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}>
                  <Edit3 size={13} /> Edit
                </button>
                <button onClick={() => setViewLead(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: '#64748B' }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* View Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Name & Status Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{viewLead.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>{viewLead.company}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{
                    padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                    background: (STATUS_COLORS[viewLead.status] || STATUS_COLORS['New']).bg,
                    color: (STATUS_COLORS[viewLead.status] || STATUS_COLORS['New']).color,
                    border: `1px solid ${(STATUS_COLORS[viewLead.status] || STATUS_COLORS['New']).border}`
                  }}>
                    {viewLead.status}
                  </span>
                  <span style={{
                    padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700,
                    background: (PRIORITY_COLORS[viewLead.priority] || PRIORITY_COLORS['Medium']).bg,
                    color: (PRIORITY_COLORS[viewLead.priority] || PRIORITY_COLORS['Medium']).color,
                  }}>
                    {viewLead.priority}
                  </span>
                </div>
              </div>

              {/* Sub-Tabs Bar: Activities, Notes, Follow-ups, Quotations, Files */}
              <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', gap: '0.5rem' }}>
                {[
                  { id: 'overview', label: 'Overview', icon: <User size={13} /> },
                  { id: 'activities', label: 'Activities', icon: <TrendingUp size={13} /> },
                  { id: 'notes', label: 'Notes', icon: <FileText size={13} /> },
                  { id: 'followups', label: 'Follow-ups', icon: <Calendar size={13} /> },
                  { id: 'quotations', label: 'Quotations', icon: <ShieldCheck size={13} /> },
                  { id: 'files', label: 'Files', icon: <Download size={13} /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setDetailTab(tab.id)}
                    style={{
                      padding: '0.5rem 0.75rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                      background: 'none', border: 'none',
                      color: detailTab === tab.id ? '#7C3AED' : '#64748B',
                      borderBottom: detailTab === tab.id ? '2px solid #7C3AED' : '2px solid transparent',
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Overview Tab Content */}
              {detailTab === 'overview' && (
                <>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => {
                        setActiveCall(viewLead);
                        setCallStatus('connecting');
                        setCallDuration(0);
                        const interval = setInterval(() => {
                          setCallDuration(d => d + 1);
                        }, 1000);
                        setCallTimer(interval);
                      }}
                      className="btn-secondary" 
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', padding: '0.4rem 0.75rem', color: '#059669', cursor: 'pointer' }}
                    >
                      <Phone size={13} /> Call
                    </button>
                    <button 
                      onClick={() => {
                        setActiveMail(viewLead);
                        setEmailSubject(`Proposal for ${viewLead.company} - GNZ CRM`);
                        setEmailBody(`Hi ${viewLead.name},\n\nWe would like to follow up regarding the ${viewLead.service} requirements for ${viewLead.company}.\n\nBest Regards,\nGNZ Team`);
                        setEmailStatus('idle');
                      }}
                      className="btn-secondary" 
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', padding: '0.4rem 0.75rem', color: '#2563EB', cursor: 'pointer' }}
                    >
                      <Mail size={13} /> Email
                    </button>
                    <button 
                      onClick={() => {
                        setActiveWhatsApp(viewLead);
                        setWhatsappMessage(`Hello ${viewLead.name}, this is GNZ CRM regarding your interest in our ${viewLead.service} services.`);
                        setWhatsappStatus('idle');
                      }}
                      className="btn-secondary" 
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', padding: '0.4rem 0.75rem', color: '#16A34A', cursor: 'pointer' }}
                    >
                      <MessageCircle size={13} /> WhatsApp
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
                    {[
                      { label: 'Contact Person', value: viewLead.contactPerson },
                      { label: 'Email', value: viewLead.email },
                      { label: 'Phone', value: viewLead.phone },
                      { label: 'WhatsApp', value: viewLead.whatsapp },
                      { label: 'Website', value: viewLead.website },
                      { label: 'Country', value: viewLead.country },
                      { label: 'State / City', value: `${viewLead.state}, ${viewLead.city}` },
                      { label: 'Industry', value: viewLead.industry },
                      { label: 'Interested Service', value: viewLead.service },
                      { label: 'Expected Budget', value: viewLead.budget },
                      { label: 'Lead Source', value: viewLead.source },
                      { label: 'Assigned To', value: viewLead.assignedTo },
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>{item.label}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginTop: '0.15rem' }}>{item.value || '—'}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Activities Tab */}
              {detailTab === 'activities' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Recent Activity Logs</div>
                    <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>+ Log Activity</button>
                  </div>
                  {[
                    { action: 'Initial Discovery Call Completed', date: 'Today, 10:30 AM', user: viewLead.assignedTo || 'Admin' },
                    { action: 'Proposal Document Sent via Email', date: 'Yesterday, 4:15 PM', user: viewLead.assignedTo || 'Admin' },
                    { action: 'Lead Created from Source: ' + viewLead.source, date: viewLead.date, user: 'System' }
                  ].map((act, i) => (
                    <div key={i} style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', borderLeft: '3px solid #7C3AED', fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{act.action}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>By {act.user} • {act.date}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes Tab */}
              {detailTab === 'notes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Lead Notes</div>
                  <div style={{ padding: '0.85rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                    {viewLead.notes || 'Client is interested in expanding their web portal and mobile app infrastructure. High intent for immediate conversion.'}
                  </div>
                </div>
              )}

              {/* Follow-ups Tab */}
              {detailTab === 'followups' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Scheduled Follow-ups</div>
                    <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>+ Add Follow-up</button>
                  </div>
                  {[
                    { title: 'Technical Proposal Discussion Call', date: 'Tomorrow, 2:00 PM', status: 'Scheduled' },
                    { title: 'Budget & Pricing Approval Meeting', date: 'Next Monday, 11:00 AM', status: 'Pending' }
                  ].map((fol, i) => (
                    <div key={i} style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{fol.title}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>📅 {fol.date}</div>
                      </div>
                      <span className="badge badge-violet">{fol.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quotations Tab */}
              {detailTab === 'quotations' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Quotations & Estimates</div>
                    <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>+ Create Quote</button>
                  </div>
                  <div style={{ padding: '0.85rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>Quote #QT-2026-088 for {viewLead.service || 'System Integration'}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>Amount: {viewLead.budget || '₹5,00,000'} • Sent on {viewLead.date}</div>
                    </div>
                    <span className="badge badge-emerald">Sent</span>
                  </div>
                </div>
              )}

              {/* Files Tab */}
              {detailTab === 'files' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Attached Documents</div>
                    <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>+ Upload File</button>
                  </div>
                  {[
                    { name: 'Requirement_Specification.pdf', size: '2.4 MB', date: viewLead.date },
                    { name: 'Company_Profile_Deck.pdf', size: '4.1 MB', date: viewLead.date }
                  ].map((f, i) => (
                    <div key={i} style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>📄 {f.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{f.size} • {f.date}</div>
                    </div>
                  ))}
                </div>
              )}

            </div>
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
            <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{activeCall.name}</div>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.15rem' }}>{activeCall.company}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#38BDF8', marginTop: '0.5rem' }}>{activeCall.phone}</div>
            
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
                📧 Send Email Proposal
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
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>{activeMail.name} &lt;{activeMail.email}&gt;</span>
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
                    setEmailStatus('sending');
                    setTimeout(() => {
                      setEmailStatus('sent');
                      alert('Email sent successfully!');
                      setActiveMail(null);
                    }, 1200);
                  }}
                  className="btn-primary" 
                  style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {emailStatus === 'sending' ? 'Sending...' : <><Send size={15} /> Send Mail</>}
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
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>{activeWhatsApp.whatsapp || activeWhatsApp.phone}</span>
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
                    setWhatsappStatus('sending');
                    setTimeout(() => {
                      setWhatsappStatus('sent');
                      alert('WhatsApp Message dispatched!');
                      setActiveWhatsApp(null);
                    }, 1000);
                  }}
                  className="btn-primary" 
                  style={{ fontWeight: 600, background: '#16A34A', border: 'none', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)' }}
                >
                  {whatsappStatus === 'sending' ? 'Sending...' : 'Send WhatsApp'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
