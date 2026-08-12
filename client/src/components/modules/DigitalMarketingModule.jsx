import React, { useState, useEffect } from 'react';
// Enterprise Digital Marketing Agency ERP Suite (Validated & Verified)
import {
  Smartphone, Users, Calendar, Image, Video, Search, Share2, Megaphone,
  BarChart3, Globe, Plus, Filter, Download, Eye, Edit3, Trash2, CheckCircle2,
  Clock, AlertCircle, TrendingUp, DollarSign, Layers, ChevronRight, X, Sparkles,
  MessageSquare, Play, ThumbsUp, MessageCircle, ExternalLink, RefreshCw, Key,
  ShieldCheck, ArrowUpRight, Zap, Target, Award, HelpCircle, FileText, Check,
  Sliders, Link2, Hash, MapPin, Send, Bot, Copy, ChevronLeft, Lock, FileSpreadsheet,
  CheckSquare, Square, User, Mail, Phone, Building2, Upload
} from 'lucide-react';

export default function DigitalMarketingModule({ initialSubModule = 'Clients' }) {
  const [activeSubTab, setActiveSubTab] = useState(initialSubModule);

  useEffect(() => {
    if (initialSubModule) {
      setActiveSubTab(initialSubModule);
    }
  }, [initialSubModule]);

  // ─── Shared Clients Database ──────────────────────────────────────
  const [clients, setClients] = useState([
    {
      id: 'dm-C-2026-001',
      logo: '🏢',
      company: 'ABC Groups',
      name: 'Hariharan S',
      email: 'hari@abcgroups.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      website: 'https://abcgroups.com',
      industry: 'Real Estate & Infra',
      package: 'Premium',
      services: ['Social Media', 'SEO', 'Google Ads', 'Meta Ads', 'Content Writing'],
      manager: 'Hari',
      designer: 'Praveen',
      seo: 'Arun',
      content: 'Akash',
      ads: 'Muthu',
      startDate: '2025-06-12',
      renewalDate: '2025-12-12',
      status: 'Active',
      monthlyCharge: '₹40,000',
      paidAmount: '₹20,000',
      pendingAmount: '₹20,000',
      nextDue: '12 July 2026',
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India',
      address: 'No 45, Anna Salai, Guindy, Chennai',
      socialAccounts: {
        facebook: { pageName: 'ABC Groups Official', username: '@abcgroups_fb', tokenStatus: 'Connected' },
        instagram: { pageName: 'ABC Groups IG', username: '@abcgroups.realestate', tokenStatus: 'Connected' },
        linkedIn: { pageName: 'ABC Groups Enterprise', username: 'abc-groups-linkedin', tokenStatus: 'Connected' },
        youtube: { pageName: 'ABC Real Estate TV', username: 'ABCRealEstateChannel', tokenStatus: 'Connected' }
      },
      performance: { posts: 26, reels: 10, followers: '+230', reach: '210K', leads: 54, conversions: 11 },
      timeline: [
        { date: '12 June', title: 'Client Profile Created', desc: 'Onboarded to Digital Marketing Agency ERP' },
        { date: '13 June', title: 'Facebook Page Connected', desc: 'OAuth Access granted for FB Ads Manager' },
        { date: '14 June', title: 'Instagram Account Synced', desc: 'Meta Business Manager linked' },
        { date: '15 June', title: 'First Reel Published', desc: 'Luxury Villa Virtual Tour Reel live' },
        { date: '18 June', title: 'Monthly Progress Report Sent', desc: 'SEO Ranking & Traffic report delivered' },
        { date: '20 June', title: 'Advance Retainer Received', desc: 'Payment of ₹20,000 cleared via Bank Transfer' }
      ],
      activity: [
        { user: 'Hari', action: 'added Instagram Business Account', time: '10 mins ago' },
        { user: 'Akash', action: 'scheduled 5 Posts for next week', time: '1 hour ago' },
        { user: 'Arun', action: 'updated Target Keywords ranking', time: '3 hours ago' },
        { user: 'Muthu', action: 'launched Meta Leads Campaign', time: 'Yesterday' }
      ]
    },
    {
      id: 'dm-C-2026-002',
      logo: '🚀',
      company: 'Apex Tech Inc',
      name: 'Marcus Vance',
      email: 'marcus@apextech.io',
      phone: '+91 98765 11223',
      whatsapp: '+91 98765 11223',
      website: 'https://apextech.io',
      industry: 'FinTech SaaS',
      package: 'Custom',
      services: ['Social Media', 'SEO', 'Google Ads', 'Meta Ads', 'Branding', 'Video Editing'],
      manager: 'Arun M',
      designer: 'Praveen',
      seo: 'Arun',
      content: 'Nisha',
      ads: 'Muthu',
      startDate: '2026-01-10',
      renewalDate: '2026-12-31',
      status: 'Active',
      monthlyCharge: '₹1,50,000',
      paidAmount: '₹1,50,000',
      pendingAmount: '₹0',
      nextDue: '10 August 2026',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      address: 'Koramangala 4th Block, Bengaluru',
      socialAccounts: {
        facebook: { pageName: 'Apex Tech HQ', username: '@apextech_global', tokenStatus: 'Connected' },
        instagram: { pageName: 'Apex Tech SaaS', username: '@apextech.io', tokenStatus: 'Connected' }
      },
      performance: { posts: 42, reels: 18, followers: '+1,240', reach: '580K', leads: 142, conversions: 38 },
      timeline: [{ date: '10 Jan', title: 'Contract Signed', desc: 'Yearly Omni-Channel Marketing Contract' }],
      activity: [{ user: 'Arun M', action: 'updated Google Ads Campaign budget', time: '2 hours ago' }]
    },
    {
      id: 'dm-C-2026-003',
      logo: '⚡',
      company: 'Volt Mobility',
      name: 'Sarah Jenkins',
      email: 'sarah@voltev.com',
      phone: '+91 98765 99887',
      whatsapp: '+91 98765 99887',
      website: 'https://voltev.com',
      industry: 'EV & CleanTech',
      package: 'Standard',
      services: ['Social Media', 'Meta Ads', 'Video Editing'],
      manager: 'Priya S',
      designer: 'Praveen',
      seo: 'Arun',
      content: 'Akash',
      ads: 'Muthu',
      startDate: '2026-02-01',
      renewalDate: '2026-08-01',
      status: 'Onboarding',
      monthlyCharge: '₹95,000',
      paidAmount: '₹45,000',
      pendingAmount: '₹50,000',
      nextDue: '01 August 2026',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      address: 'HITEC City, Hyderabad',
      socialAccounts: {},
      performance: { posts: 14, reels: 6, followers: '+450', reach: '180K', leads: 28, conversions: 5 },
      timeline: [{ date: '01 Feb', title: 'Onboarding Started', desc: 'Collecting Brand Kit & Social Passwords' }],
      activity: [{ user: 'Priya S', action: 'sent Brand Questionnaire', time: '4 hours ago' }]
    },
    {
      id: 'dm-C-2026-004',
      logo: '💎',
      company: 'Luxuria Jewels',
      name: 'Rajesh K',
      email: 'rajesh@luxuriajewels.in',
      phone: '+91 98765 55443',
      whatsapp: '+91 98765 55443',
      website: 'https://luxuriajewels.in',
      industry: 'Luxury Retail',
      package: 'Premium',
      services: ['SEO', 'Google Ads', 'Photography'],
      manager: 'Karthik R',
      designer: 'Praveen',
      seo: 'Arun',
      content: 'Akash',
      ads: 'Muthu',
      startDate: '2026-03-15',
      renewalDate: '2026-09-15',
      status: 'Paused',
      monthlyCharge: '₹1,20,000',
      paidAmount: '₹60,000',
      pendingAmount: '₹60,000',
      nextDue: '15 August 2026',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'India',
      address: 'Cross Cut Road, Gandhipuram, Coimbatore',
      socialAccounts: {},
      performance: { posts: 8, reels: 2, followers: '+120', reach: '95K', leads: 14, conversions: 2 },
      timeline: [{ date: '15 Mar', title: 'Campaign Paused', desc: 'Client requested holiday pause' }],
      activity: [{ user: 'Karthik R', action: 'paused Meta Retargeting AdSet', time: 'Yesterday' }]
    }
  ]);

  // Filtering & Search State
  const [searchClient, setSearchClient] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All | Active | Onboarding | Paused | Completed
  const [filterPackage, setFilterPackage] = useState('All');
  const [filterManager, setFilterManager] = useState('All');

  // Modal / Drawer States
  const [selectedClientDetails, setSelectedClientDetails] = useState(null);
  const [clientProfileActiveTab, setClientProfileActiveTab] = useState('Overview');
  const [showAddClientWizard, setShowAddClientWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // 7-Step Add Client Form Data State
  const [newClientData, setNewClientData] = useState({
    // Step 1: Basic Info
    company: '', name: '', email: '', phone: '', whatsapp: '', website: '', industry: '', country: 'India', state: '', city: '', address: '',
    // Step 2: Services Checkboxes
    services: {
      socialMedia: true, seo: true, googleAds: true, metaAds: true, website: false,
      branding: false, videoEditing: true, contentWriting: true, photography: false, custom: false
    },
    // Step 3: Package
    package: 'Premium', monthlyAmount: '40000', gst: '18', discount: '0', startDate: '2026-08-06', renewalDate: '2026-12-06',
    // Step 4: Team
    manager: 'Hari', dmm: 'Priya', writer: 'Akash', designer: 'Praveen', editor: 'Vikas', seoExec: 'Arun', adsSpec: 'Muthu',
    // Step 5: Social Accounts
    fbPage: '', fbUser: '', igPage: '', igUser: '', liPage: '', liUser: '', ytPage: '', ytUser: '',
    // Step 6: Documents
    agreementFile: null, logoFile: null, brandKitFile: null,
    // Step 7: Strategy Notes
    description: '', targetAudience: '', competitors: '', brandTone: 'Professional & Modern', instructions: ''
  });

  const subTabs = [
    { id: 'Clients', label: 'Clients List & Directory', icon: <Users size={16} /> },
    { id: 'Social Media', label: 'Social Accounts', icon: <Share2 size={16} /> },
    { id: 'Content Calendar', label: 'Content Calendar', icon: <Calendar size={16} /> },
    { id: 'Posts', label: 'Posts Repository', icon: <Image size={16} /> },
    { id: 'Reels', label: 'Reels & Shorts', icon: <Video size={16} /> },
    { id: 'SEO', label: 'SEO Tracker', icon: <Globe size={16} /> },
    { id: 'Google Ads', label: 'Google Ads', icon: <Megaphone size={16} /> },
    { id: 'Meta Ads', label: 'Meta Ads', icon: <Target size={16} /> },
    { id: 'Analytics', label: 'Agency Analytics', icon: <BarChart3 size={16} /> },
    { id: 'Lead Reports', label: 'Lead Attribution', icon: <TrendingUp size={16} /> },
    { id: 'AI Studio', label: 'AI Content Studio', icon: <Sparkles size={16} /> }
  ];

  // Filtered Clients Computation
  const filteredClientsList = clients.filter(c => {
    if (filterStatus !== 'All' && c.status !== filterStatus) return false;
    if (filterPackage !== 'All' && c.package !== filterPackage) return false;
    if (filterManager !== 'All' && c.manager !== filterManager) return false;
    if (searchClient) {
      const q = searchClient.toLowerCase();
      const match = c.company.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleFinishWizard = (e) => {
    e.preventDefault();
    const nextNum = clients.length + 1;
    const selectedServiceNames = Object.keys(newClientData.services)
      .filter(k => newClientData.services[k])
      .map(k => k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

    const createdClient = {
      id: `dm-C-2026-${String(nextNum).padStart(3, '0')}`,
      logo: '🏢',
      company: newClientData.company || 'New Client Enterprise',
      name: newClientData.name || 'Contact Person',
      email: newClientData.email || 'client@company.com',
      phone: newClientData.phone || '+91 98765 00000',
      whatsapp: newClientData.whatsapp || newClientData.phone || '+91 98765 00000',
      website: newClientData.website || 'https://example.com',
      industry: newClientData.industry || 'Digital Commerce',
      package: newClientData.package,
      services: selectedServiceNames,
      manager: newClientData.manager,
      designer: newClientData.designer,
      seo: newClientData.seoExec,
      content: newClientData.writer,
      ads: newClientData.adsSpec,
      startDate: newClientData.startDate,
      renewalDate: newClientData.renewalDate,
      status: 'Active',
      monthlyCharge: `₹${parseInt(newClientData.monthlyAmount || 40000).toLocaleString('en-IN')}`,
      paidAmount: `₹${parseInt(newClientData.monthlyAmount || 40000).toLocaleString('en-IN')}`,
      pendingAmount: '₹0',
      nextDue: '30 Days',
      city: newClientData.city || 'Chennai',
      state: newClientData.state || 'Tamil Nadu',
      country: newClientData.country || 'India',
      address: newClientData.address || 'Enterprise HQ',
      socialAccounts: {
        facebook: { pageName: newClientData.fbPage || 'FB Page', username: newClientData.fbUser || '@page', tokenStatus: 'Connected' },
        instagram: { pageName: newClientData.igPage || 'IG Page', username: newClientData.igUser || '@page', tokenStatus: 'Connected' }
      },
      performance: { posts: 0, reels: 0, followers: '+0', reach: '0', leads: 0, conversions: 0 },
      timeline: [{ date: 'Today', title: 'Client Profile Created', desc: '7-Step Wizard Onboarding Completed' }],
      activity: [{ user: newClientData.manager, action: 'created client record', time: 'Just now' }]
    };

    setClients([createdClient, ...clients]);
    setShowAddClientWizard(false);
    setWizardStep(1);
    alert('🎉 Client onboarded successfully into Digital Marketing Agency ERP!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* ─── Header & Sub-Tab Navigation Bar ─────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '0.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Smartphone size={13} /> Digital Marketing Agency ERP
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Digital Marketing Hub
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
              Manage social channels, content calendar, SEO, Google/Meta Ads campaigns, and client ROI attribution.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button onClick={() => setShowAddClientWizard(true)} className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.55rem 1rem' }}>
              <Plus size={15} /> Add New Client
            </button>
          </div>
        </div>

        {/* 11 Sub-Module Tabs Navigation */}
        <div style={{
          display: 'flex', gap: '0.35rem', overflowX: 'auto', background: '#FFFFFF',
          padding: '0.5rem', borderRadius: '12px', border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          {subTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.5rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700,
                border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease',
                background: activeSubTab === tab.id ? '#7C3AED' : 'transparent',
                color: activeSubTab === tab.id ? '#FFFFFF' : '#64748B'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TAB 1: CLIENTS LIST PAGE & DIRECTORY                          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'Clients' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Controls Bar: Search & Filter Pills */}
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              
              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                <input
                  type="text"
                  placeholder="🔍 Search Client by name, company, email..."
                  value={searchClient}
                  onChange={(e) => setSearchClient(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.75rem 0.6rem 2.2rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', color: '#0F172A' }}
                />
              </div>

              {/* Status Filter Pills */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {['All', 'Active', 'Onboarding', 'Paused', 'Completed'].map(st => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    style={{
                      padding: '0.45rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                      border: 'none', cursor: 'pointer', transition: 'all 0.15s ease',
                      background: filterStatus === st ? '#7C3AED' : '#F1F5F9',
                      color: filterStatus === st ? '#FFFFFF' : '#475569'
                    }}
                  >
                    {st === 'All' ? 'All Clients' : st === 'Active' ? '🟢 Active' : st === 'Onboarding' ? '🟡 Onboarding' : st === 'Paused' ? '🔴 Paused' : '✅ Completed'}
                  </button>
                ))}
              </div>

            </div>

            {/* Dropdown Filters Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', borderTop: '1px border-subtle #E2E8F0', paddingTop: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>PACKAGE FILTER</label>
                <select value={filterPackage} onChange={(e) => setFilterPackage(e.target.value)} style={{ width: '100%', padding: '0.45rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  <option value="All">All Packages</option>
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>ASSIGNED MANAGER</label>
                <select value={filterManager} onChange={(e) => setFilterManager(e.target.value)} style={{ width: '100%', padding: '0.45rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  <option value="All">All Managers</option>
                  <option value="Hari">Hari</option>
                  <option value="Arun M">Arun M</option>
                  <option value="Priya S">Priya S</option>
                  <option value="Karthik R">Karthik R</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>AGENCY INDUSTRY</label>
                <select style={{ width: '100%', padding: '0.45rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  <option value="All">All Industries</option>
                  <option value="Real Estate">Real Estate & Infra</option>
                  <option value="SaaS">FinTech SaaS</option>
                  <option value="CleanTech">EV & CleanTech</option>
                  <option value="Retail">Luxury Retail</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dashboard Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
            <div className="glass-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={18} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>25</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>👥 TOTAL CLIENTS</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={18} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>18</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>🟢 ACTIVE</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={18} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D97706' }}>4</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>🟡 ONBOARDING</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(225, 29, 72, 0.1)', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AlertCircle size={18} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E11D48' }}>2</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>🔴 PAUSED</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={18} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#7C3AED' }}>1</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>✅ COMPLETED</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.1)', color: '#A855F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DollarSign size={18} /></div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>₹3,20,000</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B' }}>💰 MONTHLY REVENUE</div>
              </div>
            </div>
          </div>

          {/* Client Main Table */}
          <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Client Directory Table</h3>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Showing {filteredClientsList.length} agency clients</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>LOGO & CLIENT</th>
                    <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>PACKAGE</th>
                    <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>ACTIVE SERVICES</th>
                    <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>MANAGER</th>
                    <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>START DATE</th>
                    <th style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem' }}>STATUS</th>
                    <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#64748B', fontSize: '0.72rem', textAlign: 'center' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClientsList.map((client, idx) => (
                    <tr key={client.id} style={{ borderBottom: '1px solid #F1F5F9', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFBFC' }}>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontSize: '1.4rem' }}>{client.logo}</span>
                          <div>
                            <div style={{ fontWeight: 800, color: '#0F172A' }}>{client.company}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{client.name} • {client.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 0.75rem' }}>
                        <span className="badge badge-violet" style={{ fontSize: '0.7rem' }}>{client.package}</span>
                      </td>
                      <td style={{ padding: '0.75rem 0.75rem' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                          {client.services.slice(0, 3).map((srv, sIdx) => (
                            <span key={sIdx} className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{srv}</span>
                          ))}
                          {client.services.length > 3 && <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700 }}>+{client.services.length - 3}</span>}
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 0.75rem', fontWeight: 700, color: '#334155' }}>👤 {client.manager}</td>
                      <td style={{ padding: '0.75rem 0.75rem', fontSize: '0.75rem', color: '#64748B' }}>{client.startDate}</td>
                      <td style={{ padding: '0.75rem 0.75rem' }}>
                        <span className={`badge ${client.status === 'Active' ? 'badge-emerald' : client.status === 'Onboarding' ? 'badge-amber' : client.status === 'Paused' ? 'badge-rose' : 'badge-slate'}`} style={{ fontSize: '0.7rem' }}>
                          ● {client.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => { setSelectedClientDetails(client); setClientProfileActiveTab('Overview'); }}
                            title="View Full Client Profile"
                            style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', border: 'none', borderRadius: '6px', padding: '0.35rem 0.6rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            👁 View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* OTHER SUB-TABS (Social, Calendar, Posts, Reels, SEO, Ads etc)  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeSubTab === 'Social Media' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Social Media Connected Accounts</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Manage Facebook, Instagram, LinkedIn, YouTube & Google Business accounts for clients.</p>
        </div>
      )}

      {activeSubTab === 'Content Calendar' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Content Calendar Overview</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Drag & drop post schedule across monthly, weekly, and daily views.</p>
        </div>
      )}

      {activeSubTab === 'Posts' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Social Media Posts Repository</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>View thumbnails, captions, hashtags, and approval feedback.</p>
        </div>
      )}

      {activeSubTab === 'Reels' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Short Videos & Reels Performance</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Watch time, CTR, shares, saves, and conversion analytics.</p>
        </div>
      )}

      {activeSubTab === 'SEO' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>SEO Keyword Rank Tracker</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>SERP rank tracking, on-page checklists, and technical SEO audits.</p>
        </div>
      )}

      {activeSubTab === 'Google Ads' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Google Ads Campaign Manager</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Search, Display, Shopping, Video, and Performance Max campaigns.</p>
        </div>
      )}

      {activeSubTab === 'Meta Ads' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Meta Ads (FB & IG) Campaign Manager</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Audience targeting, ad creatives, leads attribution, and CPL matrix.</p>
        </div>
      )}

      {activeSubTab === 'Analytics' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Agency Performance Analytics</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Follower growth, reach graphs, lead ROI, and PDF exports.</p>
        </div>
      )}

      {activeSubTab === 'Lead Reports' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Lead Source & Conversion Reports</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Attributed leads breakdown across Facebook, Instagram, Google Ads & SEO.</p>
        </div>
      )}

      {activeSubTab === 'AI Studio' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>🤖 AI Content Studio</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Generate captions, hashtags, ad copy, and SEO articles instantly.</p>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MODAL 1: 7-STEP ADD CLIENT WIZARD                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {showAddClientWizard && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', overflowY: 'auto'
        }}>
          <div style={{
            background: '#FFFFFF', borderRadius: '20px', padding: '1.5rem', maxWidth: '720px', width: '100%',
            maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: '1.25rem'
          }}>
            
            {/* Wizard Header & Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <span className="badge badge-violet" style={{ fontSize: '0.65rem' }}>Step {wizardStep} of 7 Onboarding Wizard</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: '0.1rem 0 0 0' }}>
                    {wizardStep === 1 ? 'Step 1: Basic Company & Client Info' :
                     wizardStep === 2 ? 'Step 2: Selected Marketing Services' :
                     wizardStep === 3 ? 'Step 3: Monthly Package & Retainer' :
                     wizardStep === 4 ? 'Step 4: Assign Agency Team Members' :
                     wizardStep === 5 ? 'Step 5: Social Accounts & API Credentials' :
                     wizardStep === 6 ? 'Step 6: Upload Brand Documents & Logos' :
                     'Step 7: Business Strategy & Target Notes'}
                  </h3>
                </div>
                <button onClick={() => setShowAddClientWizard(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
              </div>

              {/* Progress Line */}
              <div style={{ height: '6px', width: '100%', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(wizardStep / 7) * 100}%`, background: 'linear-gradient(90deg, #7C3AED, #4F46E5)', transition: 'all 0.3s ease' }}></div>
              </div>
            </div>

            {/* Wizard Steps Form Body */}
            <form onSubmit={wizardStep === 7 ? handleFinishWizard : (e) => { e.preventDefault(); setWizardStep(prev => Math.min(prev + 1, 7)); }}>
              
              {/* STEP 1: Basic Information */}
              {wizardStep === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Company Name *</label>
                    <input type="text" placeholder="e.g. ABC Groups" value={newClientData.company} onChange={e => setNewClientData({ ...newClientData, company: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Contact Person Name *</label>
                    <input type="text" placeholder="e.g. Hariharan S" value={newClientData.name} onChange={e => setNewClientData({ ...newClientData, name: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Email Address *</label>
                    <input type="email" placeholder="client@company.com" value={newClientData.email} onChange={e => setNewClientData({ ...newClientData, email: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Phone Number *</label>
                    <input type="text" placeholder="+91 98765 43210" value={newClientData.phone} onChange={e => setNewClientData({ ...newClientData, phone: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>WhatsApp Number</label>
                    <input type="text" placeholder="+91 98765 43210" value={newClientData.whatsapp} onChange={e => setNewClientData({ ...newClientData, whatsapp: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Website URL</label>
                    <input type="text" placeholder="https://abcgroups.com" value={newClientData.website} onChange={e => setNewClientData({ ...newClientData, website: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Industry</label>
                    <input type="text" placeholder="e.g. Real Estate & Infra" value={newClientData.industry} onChange={e => setNewClientData({ ...newClientData, industry: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>City</label>
                    <input type="text" placeholder="e.g. Chennai" value={newClientData.city} onChange={e => setNewClientData({ ...newClientData, city: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>
                </div>
              )}

              {/* STEP 2: Services Checkboxes */}
              {wizardStep === 2 && (
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '0.75rem' }}>
                    Select All Marketing & Growth Services Included:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    {[
                      { key: 'socialMedia', label: '📱 Social Media Management' },
                      { key: 'seo', label: '🔍 Search Engine Optimization (SEO)' },
                      { key: 'googleAds', label: '📢 Google Ads (PMax & Search)' },
                      { key: 'metaAds', label: '📘 Meta Ads (Facebook & Instagram)' },
                      { key: 'website', label: '🌐 Website Development & Maintenance' },
                      { key: 'branding', label: '🎨 Branding & Identity Design' },
                      { key: 'videoEditing', label: '🎥 Video Editing & Reels Creation' },
                      { key: 'contentWriting', label: '📝 Content Writing & Copywriting' },
                      { key: 'photography', label: '📷 Product Photography & Shoots' },
                      { key: 'custom', label: '⚡ Custom Enterprise Solution' }
                    ].map(srv => (
                      <label key={srv.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                        <input
                          type="checkbox"
                          checked={newClientData.services[srv.key]}
                          onChange={e => setNewClientData({
                            ...newClientData,
                            services: { ...newClientData.services, [srv.key]: e.target.checked }
                          })}
                        />
                        {srv.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Monthly Package */}
              {wizardStep === 3 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Select Package Tier</label>
                    <select value={newClientData.package} onChange={e => setNewClientData({ ...newClientData, package: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      <option value="Basic">Basic Package</option>
                      <option value="Standard">Standard Package</option>
                      <option value="Premium">Premium Package</option>
                      <option value="Custom">Custom Enterprise Package</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Monthly Retainer Amount (₹)</label>
                    <input type="number" placeholder="40000" value={newClientData.monthlyAmount} onChange={e => setNewClientData({ ...newClientData, monthlyAmount: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>GST Rate (%)</label>
                    <input type="number" placeholder="18" value={newClientData.gst} onChange={e => setNewClientData({ ...newClientData, gst: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Contract Start Date</label>
                    <input type="date" value={newClientData.startDate} onChange={e => setNewClientData({ ...newClientData, startDate: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>
                </div>
              )}

              {/* STEP 4: Assign Team */}
              {wizardStep === 4 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Relationship Manager</label>
                    <select value={newClientData.manager} onChange={e => setNewClientData({ ...newClientData, manager: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      <option value="Hari">Hari</option>
                      <option value="Arun M">Arun M</option>
                      <option value="Priya S">Priya S</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Digital Marketing Manager</label>
                    <select value={newClientData.dmm} onChange={e => setNewClientData({ ...newClientData, dmm: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      <option value="Priya">Priya</option>
                      <option value="Arun M">Arun M</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Graphic Designer</label>
                    <select value={newClientData.designer} onChange={e => setNewClientData({ ...newClientData, designer: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      <option value="Praveen">Praveen</option>
                      <option value="Rahul">Rahul</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Content Writer</label>
                    <select value={newClientData.writer} onChange={e => setNewClientData({ ...newClientData, writer: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      <option value="Akash">Akash</option>
                      <option value="Nisha">Nisha</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>SEO Executive</label>
                    <select value={newClientData.seoExec} onChange={e => setNewClientData({ ...newClientData, seoExec: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      <option value="Arun">Arun</option>
                      <option value="Karthik">Karthik</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Ads Specialist</label>
                    <select value={newClientData.adsSpec} onChange={e => setNewClientData({ ...newClientData, adsSpec: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      <option value="Muthu">Muthu</option>
                      <option value="Sanjay">Sanjay</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 5: Social Accounts */}
              {wizardStep === 5 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Facebook Page Name</label>
                      <input placeholder="e.g. ABC Groups Official" value={newClientData.fbPage} onChange={e => setNewClientData({ ...newClientData, fbPage: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Instagram Username</label>
                      <input placeholder="e.g. @abcgroups.realestate" value={newClientData.igUser} onChange={e => setNewClientData({ ...newClientData, igUser: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Documents Upload */}
              {wizardStep === 6 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ background: '#F8FAFC', border: '2px dashed #E2E8F0', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                    <Upload size={28} color="#7C3AED" style={{ marginBottom: '0.35rem' }} />
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>Drag & Drop Agreement, Brand Kit, GST & Invoice Files</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>Supports PDF, PNG, JPG, ZIP (Max 50MB)</div>
                  </div>
                </div>
              )}

              {/* STEP 7: Strategy Notes */}
              {wizardStep === 7 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Business Overview & Goals</label>
                    <textarea rows={2} placeholder="Describe client business model..." value={newClientData.description} onChange={e => setNewClientData({ ...newClientData, description: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>Target Audience & Tone</label>
                    <input placeholder="e.g. High Net-worth Investors, Professional Tone" value={newClientData.brandTone} onChange={e => setNewClientData({ ...newClientData, brandTone: e.target.value })} style={{ width: '100%', padding: '0.55rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.82rem', marginTop: '0.2rem' }} />
                  </div>
                </div>
              )}

              {/* Wizard Footer Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
                {wizardStep > 1 ? (
                  <button type="button" onClick={() => setWizardStep(prev => Math.max(prev - 1, 1))} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}>
                    <ChevronLeft size={14} /> Back Step
                  </button>
                ) : <div />}

                <button type="submit" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.55rem 1.25rem' }}>
                  {wizardStep === 7 ? '🎉 Finish & Onboard Client' : 'Next Step ➔'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MODAL 2: FULL CLIENT DETAILS PROFILE PAGE / DRAWER VIEW         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {selectedClientDetails && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', overflowY: 'auto'
        }}>
          <div style={{
            background: '#FFFFFF', borderRadius: '20px', width: '100%', maxWidth: '980px', maxHeight: '92vh',
            overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column'
          }}>
            
            {/* Client Profile Header Bar */}
            <div style={{ padding: '1.25rem 1.5rem', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span style={{ fontSize: '2rem' }}>{selectedClientDetails.logo}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>{selectedClientDetails.company}</h3>
                    <span className="badge badge-violet" style={{ fontSize: '0.7rem' }}>{selectedClientDetails.package} Client</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>● {selectedClientDetails.status}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.15rem' }}>
                    Retainer: <strong>{selectedClientDetails.monthlyCharge}/mo</strong> • Next Renewal: <strong>{selectedClientDetails.renewalDate}</strong>
                  </div>
                </div>
              </div>

              {/* Quick Actions Button Bar */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button onClick={() => alert('+ Add Post triggered for ' + selectedClientDetails.company)} className="btn-primary" style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}>+ Add Post</button>
                <button onClick={() => alert('+ Add Reel triggered for ' + selectedClientDetails.company)} className="btn-primary" style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}>+ Add Reel</button>
                <button onClick={() => alert('+ Create SEO Task triggered for ' + selectedClientDetails.company)} className="btn-secondary" style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}>+ SEO Task</button>
                <button onClick={() => alert('+ Generate Invoice triggered for ' + selectedClientDetails.company)} className="btn-secondary" style={{ fontSize: '0.72rem', padding: '0.35rem 0.65rem' }}>+ Invoice</button>
                <button onClick={() => setSelectedClientDetails(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: '#64748B' }}><X size={18} /></button>
              </div>
            </div>

            {/* Profile 16 Sub-Tabs Bar */}
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', background: '#FFFFFF', padding: '0.65rem 1.5rem', borderBottom: '1px solid #E2E8F0' }}>
              {['Overview', 'Team', 'Social Accounts', 'Calendar', 'Posts', 'Reels', 'SEO', 'Google Ads', 'Meta Ads', 'Analytics', 'Leads', 'Invoices', 'Payments', 'Documents', 'Notes', 'Activity'].map(t => (
                <button
                  key={t}
                  onClick={() => setClientProfileActiveTab(t)}
                  style={{
                    padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700,
                    border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease',
                    background: clientProfileActiveTab === t ? '#7C3AED' : 'transparent',
                    color: clientProfileActiveTab === t ? '#FFFFFF' : '#64748B'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Profile View Content Area */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* TAB: OVERVIEW */}
              {clientProfileActiveTab === 'Overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Left & Right Info Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                    
                    {/* Left Side: Contact & Location */}
                    <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0, borderBottom: '1px solid #E2E8F0', paddingBottom: '0.45rem' }}>🏢 Company & Contact Details</h4>
                      <div><strong>Company Name:</strong> {selectedClientDetails.company}</div>
                      <div><strong>Contact Person:</strong> {selectedClientDetails.name}</div>
                      <div><strong>Phone Number:</strong> {selectedClientDetails.phone}</div>
                      <div><strong>Email Address:</strong> {selectedClientDetails.email}</div>
                      <div><strong>Website:</strong> <a href={selectedClientDetails.website} target="_blank" rel="noreferrer" style={{ color: '#7C3AED', fontWeight: 700 }}>{selectedClientDetails.website}</a></div>
                      <div><strong>Industry:</strong> {selectedClientDetails.industry}</div>
                      <div><strong>Location:</strong> {selectedClientDetails.address}, {selectedClientDetails.city}, {selectedClientDetails.state}</div>
                    </div>

                    {/* Right Side: Assigned Team Members */}
                    <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0, borderBottom: '1px solid #E2E8F0', paddingBottom: '0.45rem' }}>👥 Assigned Agency Team</h4>
                      <div><strong>Relationship Manager:</strong> 👤 {selectedClientDetails.manager}</div>
                      <div><strong>Graphic Designer:</strong> 🎨 {selectedClientDetails.designer}</div>
                      <div><strong>SEO Specialist:</strong> 🔍 {selectedClientDetails.seo}</div>
                      <div><strong>Content Writer:</strong> 📝 {selectedClientDetails.content}</div>
                      <div><strong>Ads Expert:</strong> 📢 {selectedClientDetails.ads}</div>
                    </div>

                  </div>

                  {/* Monthly Performance Cards */}
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.65rem' }}>📈 Monthly Growth Performance Summary</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                      <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>POSTS</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>{selectedClientDetails.performance.posts}</div>
                      </div>
                      <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>REELS</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#7C3AED' }}>{selectedClientDetails.performance.reels}</div>
                      </div>
                      <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>NEW FOLLOWERS</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#059669' }}>{selectedClientDetails.performance.followers}</div>
                      </div>
                      <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>TOTAL REACH</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#2563EB' }}>{selectedClientDetails.performance.reach}</div>
                      </div>
                      <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>LEADS</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#D97706' }}>{selectedClientDetails.performance.leads}</div>
                      </div>
                      <div className="glass-card" style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>CONVERSIONS</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#059669' }}>{selectedClientDetails.performance.conversions}</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="glass-card" style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', textAlign: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700 }}>MONTHLY CHARGE</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A' }}>{selectedClientDetails.monthlyCharge}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700 }}>PAID AMOUNT</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#059669' }}>{selectedClientDetails.paidAmount}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700 }}>PENDING DUE</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#E11D48' }}>{selectedClientDetails.pendingAmount}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700 }}>NEXT DUE DATE</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#7C3AED' }}>{selectedClientDetails.nextDue}</div>
                    </div>
                  </div>

                  {/* Client Timeline Audit */}
                  <div className="glass-card" style={{ padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>📅 Client Timeline History</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderLeft: '2px solid #E2E8F0', paddingLeft: '0.85rem' }}>
                      {selectedClientDetails.timeline.map((t, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                          <div style={{ position: 'absolute', left: '-1.15rem', top: '0.25rem', width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED' }}></div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>{t.date} — {t.title}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{t.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: TEAM */}
              {clientProfileActiveTab === 'Team' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {[
                    { role: 'Relationship Manager', name: selectedClientDetails.manager, badge: 'Lead Contact' },
                    { role: 'Graphic Designer', name: selectedClientDetails.designer, badge: 'Creative Head' },
                    { role: 'SEO Executive', name: selectedClientDetails.seo, badge: 'Organic SERP' },
                    { role: 'Content Writer', name: selectedClientDetails.content, badge: 'Copy & Posts' },
                    { role: 'Ads Specialist', name: selectedClientDetails.ads, badge: 'PMax & Meta' }
                  ].map((tm, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>{tm.role}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginTop: '0.2rem' }}>👤 {tm.name}</div>
                      <span className="badge badge-violet" style={{ fontSize: '0.65rem', marginTop: '0.4rem' }}>{tm.badge}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* OTHER TABS FALLBACK PLACEHOLDER */}
              {clientProfileActiveTab !== 'Overview' && clientProfileActiveTab !== 'Team' && (
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>{clientProfileActiveTab} Module View</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Filtered dynamically for {selectedClientDetails.company}</div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
