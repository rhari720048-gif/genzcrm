import React, { useState } from 'react';
import { 
  Handshake, Building, Percent, Briefcase, DollarSign, FileText, 
  TrendingUp, Zap, Plus, ShieldCheck, ExternalLink, HelpCircle, User, Download, CheckCircle 
} from 'lucide-react';

export default function PartnershipModule({ data, onAddPartner }) {
  const [activeTab, setActiveTab] = useState('admin'); // 'admin' or 'partner'
  const [selectedPartnerId, setSelectedPartnerId] = useState('p-1');
  const [showModal, setShowModal] = useState(false);

  // New Partner Form state
  const [name, setName] = useState('');
  const [type, setType] = useState('Agency Partner');
  const [commission, setCommission] = useState(20);
  const [contact, setContact] = useState('');

  const adminPartners = data?.adminPartners || [];
  
  // Dynamic partner profile data generator based on selected logged-in partner
  const getLoggedInPartnerData = () => {
    const p = adminPartners.find(item => item.id === selectedPartnerId) || adminPartners[0];
    if (!p) return data?.partnerPortal;

    return {
      partnerInfo: {
        name: p.name,
        tier: `${p.type} • Verified Partner`,
        commissionRate: `${p.commission}%`,
        accountManager: 'Alex Chen (Senior Partner Manager)',
        email: p.contact
      },
      summary: {
        totalEarned: p.totalPayments,
        pendingPayout: p.pendingPayout,
        activeProjects: p.projects,
        conversionRate: p.performance
      },
      projectsGiven: [
        { id: 'proj-1', name: `${p.name} - Enterprise CRM Launch`, client: 'CarePulse Corp', value: '$85,000', commission: `$${(85000 * (p.commission / 100)).toLocaleString()}`, status: 'In Progress', date: 'Jul 2026' },
        { id: 'proj-2', name: `${p.name} - Fintech Gateway`, client: 'PaySwift Inc', value: '$60,000', commission: `$${(60000 * (p.commission / 100)).toLocaleString()}`, status: 'Completed', date: 'Jun 2026' },
        { id: 'proj-3', name: `${p.name} - RetailPOS Migration`, client: 'ShopNext Retail', value: '$45,000', commission: `$${(45000 * (p.commission / 100)).toLocaleString()}`, status: 'Completed', date: 'May 2026' }
      ],
      paymentsLog: [
        { id: 'pay-101', date: '2026-07-15', amount: `$${(12000 * (p.commission / 20)).toLocaleString()}`, method: 'Direct ACH Wire', status: 'Paid', invoice: 'INV-2026-071' },
        { id: 'pay-102', date: '2026-06-10', amount: `$${(9000 * (p.commission / 20)).toLocaleString()}`, method: 'Direct ACH Wire', status: 'Paid', invoice: 'INV-2026-058' },
        { id: 'pay-103', date: '2026-08-15', amount: p.pendingPayout, method: 'Scheduled ACH Wire', status: 'Pending Approval', invoice: 'INV-2026-089' }
      ],
      documents: [
        { id: 'doc-p1', name: `${p.name.replace(/\s+/g, '_')}_MOU_Signed.pdf`, size: '2.4 MB', type: 'Contract PDF', updated: '2026-01-10' },
        { id: 'doc-p2', name: 'IPPA_CompanyOS_Partner_Sales_Deck.pptx', size: '12.8 MB', type: 'Sales Deck', updated: '2026-07-01' },
        { id: 'doc-p3', name: 'GenZ_Brand_Guidelines_Partner_Kit.zip', size: '24.5 MB', type: 'Brand Assets', updated: '2026-06-15' }
      ]
    };
  };

  const partnerPortal = getLoggedInPartnerData();

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onAddPartner({
      name,
      type,
      commission: Number(commission),
      projects: 0,
      contact
    });
    setName('');
    setContact('');
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Module Header & Dual Portal Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🤝 Partnership & Ecosystem Module
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Manage agency partners, referral commissions, deal flow, contracts, and partner portals
          </p>
        </div>

        {/* Dual Mode Switcher */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          
          {/* Partner Selector when in Partner Portal view */}
          {activeTab === 'partner' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Logged in as:</span>
              <select 
                value={selectedPartnerId} 
                onChange={(e) => setSelectedPartnerId(e.target.value)}
                style={{ 
                  background: '#FFFFFF', 
                  color: '#7C3AED', 
                  border: '1px solid var(--border-active)',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                {adminPartners.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: 'flex', background: '#FFFFFF', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <button 
              className={`btn-secondary ${activeTab === 'admin' ? 'btn-primary' : ''}`} 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} 
              onClick={() => setActiveTab('admin')}
            >
              🏢 Admin Portal View
            </button>
            <button 
              className={`btn-secondary ${activeTab === 'partner' ? 'btn-primary' : ''}`} 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} 
              onClick={() => setActiveTab('partner')}
            >
              🌐 Partner Portal View
            </button>
          </div>

          {activeTab === 'admin' && (
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={18} /> Add Partner
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ADMIN PORTAL VIEW (Internal Company Team) */}
      {/* ========================================================================= */}
      {activeTab === 'admin' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Admin KPI Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Total Partners</span>
                <Handshake size={18} color="#7C3AED" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#0F172A' }}>
                {adminPartners.length}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>4 Active Tier 1 Partners</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Active Partner Deals</span>
                <Zap size={18} color="#0891B2" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#0F172A' }}>
                11 Deals
              </div>
              <div style={{ fontSize: '0.8rem', color: '#0891B2', fontWeight: 600 }}>$265k ARR Pipeline</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Total Commissions Paid</span>
                <DollarSign size={18} color="#059669" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#0F172A' }}>
                $177,900
              </div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Avg 18.5% Commission Rate</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>Pending Payouts</span>
                <TrendingUp size={18} color="#D97706" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#0F172A' }}>
                $32,800
              </div>
              <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600 }}>Scheduled for Aug 15</div>
            </div>
          </div>

          {/* Admin Partner List Table */}
          <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
              🤝 Company Partner Directory & Performance Matrix
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <th style={{ padding: '0.85rem' }}>PARTNER NAME</th>
                    <th style={{ padding: '0.85rem' }}>PARTNER TYPE</th>
                    <th style={{ padding: '0.85rem' }}>COMMISSION %</th>
                    <th style={{ padding: '0.85rem' }}>PROJECTS</th>
                    <th style={{ padding: '0.85rem' }}>TOTAL PAYMENTS</th>
                    <th style={{ padding: '0.85rem' }}>CONTRACT STATUS</th>
                    <th style={{ padding: '0.85rem' }}>PERFORMANCE</th>
                    <th style={{ padding: '0.85rem' }}>ACTIVE DEALS</th>
                  </tr>
                </thead>
                <tbody>
                  {adminPartners.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      
                      {/* Partner Name & Contact */}
                      <td style={{ padding: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                        <div>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 400 }}>{p.contact}</div>
                      </td>

                      {/* Partner Type */}
                      <td style={{ padding: '0.85rem' }}>
                        <span className="badge badge-violet">{p.type}</span>
                      </td>

                      {/* Commission % */}
                      <td style={{ padding: '0.85rem', fontWeight: 700, color: '#0891B2' }}>
                        {p.commission}%
                      </td>

                      {/* Projects */}
                      <td style={{ padding: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
                        {p.projects} Delivered
                      </td>

                      {/* Payments */}
                      <td style={{ padding: '0.85rem' }}>
                        <div style={{ fontWeight: 700, color: '#059669' }}>{p.totalPayments}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Pending: {p.pendingPayout}</div>
                      </td>

                      {/* Contracts */}
                      <td style={{ padding: '0.85rem' }}>
                        <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                          <ShieldCheck size={12} /> {p.contractStatus}
                        </span>
                      </td>

                      {/* Performance */}
                      <td style={{ padding: '0.85rem', fontWeight: 600, color: '#7C3AED' }}>
                        {p.performance}
                      </td>

                      {/* Active Deals */}
                      <td style={{ padding: '0.85rem' }}>
                        <span className="badge badge-amber">{p.activeDeals} Active Pipeline</span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PARTNER PORTAL VIEW (External Partner Experience) */}
      {/* ========================================================================= */}
      {activeTab === 'partner' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Partner Portal Welcome Banner */}
          <div className="glass-card" style={{ 
            padding: '2rem', 
            background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
            border: '1px solid rgba(8, 145, 178, 0.25)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
                  🌐 {partnerPortal.partnerInfo.tier}
                </span>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>
                  Welcome, <span className="gradient-text">{partnerPortal.partnerInfo.name}</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.3rem' }}>
                  Your dedicated IPPA Partner Dashboard. Track referred projects, commission payouts, and partner resources.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>YOUR COMMISSION RATE</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#7C3AED' }}>{partnerPortal.partnerInfo.commissionRate}</div>
              </div>
            </div>
          </div>

          {/* Partner Metrics Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Earned Commission</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#059669' }}>
                {partnerPortal.summary.totalEarned}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Paid via ACH Wire</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Upcoming Pending Payout</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#D97706' }}>
                {partnerPortal.summary.pendingPayout}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600 }}>Scheduled for Aug 15</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Projects Given</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#0F172A' }}>
                {partnerPortal.summary.activeProjects} Projects
              </div>
              <div style={{ fontSize: '0.8rem', color: '#0891B2', fontWeight: 600 }}>4 Active Deals in Pipeline</div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Conversion Rate</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.4rem 0', color: '#7C3AED' }}>
                {partnerPortal.summary.conversionRate}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#7C3AED', fontWeight: 600 }}>High Performing Partner</div>
            </div>
          </div>

          {/* Dual Split: Projects Given & Payments Log */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
            
            {/* Projects Given */}
            <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={18} color="#0891B2" /> Projects Given & Referral Pipeline
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      <th style={{ padding: '0.75rem' }}>PROJECT NAME</th>
                      <th style={{ padding: '0.75rem' }}>CLIENT</th>
                      <th style={{ padding: '0.75rem' }}>DEAL VALUE</th>
                      <th style={{ padding: '0.75rem' }}>COMMISSION</th>
                      <th style={{ padding: '0.75rem' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerPortal.projectsGiven.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 700, color: '#0F172A' }}>{p.name}</td>
                        <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{p.client}</td>
                        <td style={{ padding: '0.75rem', fontWeight: 600, color: '#0F172A' }}>{p.value}</td>
                        <td style={{ padding: '0.75rem', fontWeight: 700, color: '#059669' }}>{p.commission}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span className={`badge ${p.status === 'Completed' ? 'badge-emerald' : p.status === 'In Progress' ? 'badge-violet' : 'badge-amber'}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payments & Payout History */}
            <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={18} color="#059669" /> Payout & Payments Log
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {partnerPortal.paymentsLog.map(pay => (
                  <div key={pay.id} style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#059669', fontSize: '1rem' }}>{pay.amount}</span>
                      <span className={`badge ${pay.status === 'Paid' ? 'badge-emerald' : 'badge-amber'}`}>{pay.status}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                      Date: {pay.date} • {pay.method} • Invoice: {pay.invoice}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Partner Documents & Support Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            {/* Documents Workspace */}
            <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} color="#7C3AED" /> Partner Documents & Contracts
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {partnerPortal.documents.map(doc => (
                  <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={18} color="#7C3AED" />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '0.85rem' }}>{doc.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.type} • {doc.size}</div>
                      </div>
                    </div>
                    <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}>
                      <Download size={14} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Support & Account Manager Widget */}
            <div className="glass-card" style={{ padding: '1.5rem', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle size={18} color="#0891B2" /> Partner Support & Lead Contact
              </h3>

              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #0891B2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 800 }}>
                  AC
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{partnerPortal.partnerInfo.accountManager}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct Email: {partnerPortal.partnerInfo.email}</div>
                  <span className="badge badge-emerald" style={{ marginTop: '0.3rem' }}>Online for Instant Huddle</span>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <HelpCircle size={16} /> Open Partner Help Desk Ticket
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Add New Partner Modal (Admin Portal) */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '450px', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>🤝 Add New Company Partner</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Partner / Agency Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g. Acme Tech Solutions" 
                  required 
                  style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Partner Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }}>
                  <option value="Agency Partner">Agency Partner</option>
                  <option value="Referral Partner">Referral Partner</option>
                  <option value="Enterprise Tech Partner">Enterprise Tech Partner</option>
                  <option value="Affiliate Partner">Affiliate Partner</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Commission Rate (%)</label>
                  <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Contact Email</label>
                  <input type="email" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="contact@partner.com" style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Register Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
