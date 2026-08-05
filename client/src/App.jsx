import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Handshake, Rocket, Code, TestTube, DollarSign, 
  Megaphone, Smartphone, Landmark, UserCheck, HeartHandshake, Headphones, 
  MessageSquare, BarChart3, Bot, Settings, Search, ChevronDown, ChevronRight, 
  Sparkles, Layers, Bell, Crown, ShieldCheck, LogOut, Activity
} from 'lucide-react';

import MasterControlViews from './components/views/MasterControlViews';
import DashboardModule from './components/modules/DashboardModule';
import DetailedPartnershipModule from './components/modules/DetailedPartnershipModule';
import LeadsModule from './components/modules/LeadsModule';
import ClientsModule from './components/modules/ClientsModule';
import ProjectsModule from './components/modules/ProjectsModule';
import LoginPage from './components/auth/LoginPage';
import AIAgentCopilot from './components/ai/AIAgentCopilot';
import GenZLogo from './components/common/GenZLogo';
import FollowUpsModule from './components/modules/FollowUpsModule';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('dashboard');
  const [activeSubModule, setActiveSubModule] = useState('Overview');
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [convertedClients, setConvertedClients] = useState([]);
  const [clientProjects, setClientProjects] = useState([]);

  const handleConvertClientData = (newClient) => {
    setConvertedClients(prev => {
      const nextNum = prev.length + 1;
      const formattedId = `CL-2026-${String(nextNum).padStart(3, '0')}`;
      return [{ ...newClient, id: formattedId }, ...prev];
    });
  };

  const handleConvertToProjectData = (newProject) => {
    setClientProjects(prev => {
      const nextNum = prev.length + 1;
      const formattedId = `PRJ-2026-${String(nextNum).padStart(3, '0')}`;
      return [{ ...newProject, id: formattedId }, ...prev];
    });
  };
  
  // Track open accordion sections
  const [openCategories, setOpenCategories] = useState({
    dashboard: true,
    crm: true,
    bizdev: false,
    projects: false,
    development: false,
    qa: false,
    sales: false,
    marketing: false,
    digitalMarketing: false,
    finance: false,
    hr: false,
    partners: false,
    support: false,
    communication: false,
    reports: false,
    aiCenter: true,
    admin: false
  });

  const [categoryData, setCategoryData] = useState(null);

  // Master Structure Directory (17 Categories & 103 Sub-Modules)
  const masterStructure = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, subModules: ['Overview'] },
    { id: 'crm', label: 'CRM', icon: <Users size={18} />, subModules: ['Leads', 'Follow Ups', 'Clients'] },
    { id: 'bizdev', label: 'Business Development', icon: <Handshake size={18} />, subModules: ['Partnerships', 'Agencies', 'White Label Partners', 'Resellers', 'International Clients', 'Meetings', 'Email Center'] },
    { id: 'projects', label: 'Projects', icon: <Rocket size={18} />, subModules: ['Projects', 'Products', 'Tasks', 'Milestones', 'Sprint Board', 'Time Tracking', 'Files', 'Documentation'] },
    { id: 'development', label: 'Development', icon: <Code size={18} />, subModules: ['GitHub', 'Repositories', 'Branches', 'Pull Requests', 'Deployments', 'API Keys', 'Environments'] },
    { id: 'qa', label: 'Testing (QA)', icon: <TestTube size={18} />, subModules: ['Bug Tracker', 'Test Cases', 'Test Runs', 'Regression Testing', 'Security Scan', 'Performance Testing', 'AI Code Analysis'] },
    { id: 'sales', label: 'Sales', icon: <DollarSign size={18} />, subModules: ['Quotations', 'Contracts', 'Invoices', 'Payments', 'Revenue', 'Refunds'] },
    { id: 'marketing', label: 'Marketing', icon: <Megaphone size={18} />, subModules: ['Leads', 'Campaigns', 'Commission', 'Travel Reports', 'Daily Reports', 'Expenses'] },
    { id: 'digitalMarketing', label: 'Digital Marketing', icon: <Smartphone size={18} />, subModules: ['Clients', 'Social Media', 'Content Calendar', 'Posts', 'Reels', 'SEO', 'Google Ads', 'Meta Ads', 'Analytics', 'Lead Reports'] },
    { id: 'finance', label: 'Finance', icon: <Landmark size={18} />, subModules: ['Income', 'Expenses', 'Company Profit', 'Developer Payments', 'Marketing Commission', 'Partner Commission', 'Travel Expenses', 'Payroll', 'GST', 'Bank Accounts'] },
    { id: 'hr', label: 'HR', icon: <UserCheck size={18} />, subModules: ['Employees', 'Recruitment', 'Attendance', 'Leave', 'Payroll', 'Performance', 'Documents', 'Interns'] },
    { id: 'partners', label: 'Partners', icon: <HeartHandshake size={18} />, subModules: ['Partners', 'Agencies', 'White Label Partners', 'Commission', 'Agreements'] },
    { id: 'support', label: 'Customer Support', icon: <Headphones size={18} />, subModules: ['Tickets', 'Live Chat', 'Knowledge Base', 'Feedback'] },
    { id: 'communication', label: 'Communication', icon: <MessageSquare size={18} />, subModules: ['Email', 'WhatsApp', 'SMS', 'Notifications', 'Meetings', 'Calendar'] },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={18} />, subModules: ['Sales Reports', 'Marketing Reports', 'Finance Reports', 'Employee Reports', 'Project Reports', 'Client Reports', 'Custom Reports'] },
    { id: 'aiCenter', label: 'AI Center', icon: <Bot size={18} />, subModules: ['AI Chat', 'AI Lead Score', 'AI Proposal Generator', 'AI Email Writer', 'AI Sales Prediction', 'AI Code Review', 'AI Marketing Content', 'AI Meeting Summary'] },
    { id: 'admin', label: 'Administration', icon: <Settings size={18} />, subModules: ['Users', 'Roles', 'Permissions', 'Departments', 'Designations', 'Branches', 'Teams', 'Products', 'Company Settings', 'Email Settings', 'WhatsApp API', 'Payment Gateway', 'Integrations', 'Audit Logs', 'Activity Logs', 'Backup & Restore'] }
  ];

  // Fetch data when active category changes
  useEffect(() => {
    fetch(`/api/master/${activeCategory}`)
      .then(res => res.json())
      .then(data => setCategoryData(data))
      .catch(err => console.error(err));
  }, [activeCategory]);

  const toggleCategory = (catId) => {
    setOpenCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleSelectSubModule = (catId, subName) => {
    setActiveCategory(catId);
    setActiveSubModule(subName);
  };

  const handleTriggerAI = (agentId, query) => {
    alert(`🤖 AI Agent Execution: Running "${query}" for ${activeCategory} > ${activeSubModule}`);
  };

  // Filter master structure based on sidebar search input
  const filteredStructure = masterStructure.map(cat => {
    if (!sidebarSearch) return cat;
    const matchCat = cat.label.toLowerCase().includes(sidebarSearch.toLowerCase());
    const matchedSubs = cat.subModules.filter(sub => sub.toLowerCase().includes(sidebarSearch.toLowerCase()));
    if (matchCat || matchedSubs.length > 0) {
      return { ...cat, subModules: matchedSubs.length > 0 ? matchedSubs : cat.subModules };
    }
    return null;
  }).filter(Boolean);

  const [userRole, setUserRole] = useState('Founder');

  const handleRoleLoginSuccess = (selectedRole) => {
    setUserRole(selectedRole || 'Founder');
    setIsAuthenticated(true);

    // Dynamic Role-based Redirect Engine
    switch (selectedRole) {
      case 'Developer':
        setActiveCategory('development');
        setActiveSubModule('Repositories');
        break;
      case 'Marketing':
        setActiveCategory('marketing');
        setActiveSubModule('Campaigns');
        break;
      case 'Tester':
        setActiveCategory('qa');
        setActiveSubModule('Bug Tracker');
        break;
      case 'HR':
        setActiveCategory('hr');
        setActiveSubModule('Employees');
        break;
      case 'Partner':
        setActiveCategory('bizdev');
        setActiveSubModule('Partnerships');
        break;
      case 'Intern':
        setActiveCategory('hr');
        setActiveSubModule('Interns');
        break;
      default: // Founder / CEO -> Admin Dashboard
        setActiveCategory('dashboard');
        setActiveSubModule('Overview');
        break;
    }
  };

  // If not logged in, render the Split-Screen Glassmorphism Login Page
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleRoleLoginSuccess} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      
      {/* Searchable 17-Category Enterprise Sidebar */}
      <aside style={{ 
        width: '300px', 
        background: '#FFFFFF', 
        borderRight: '1px solid var(--border-subtle)', 
        display: 'flex', 
        flexDirection: 'column', 
        justify: 'space-between',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxShadow: '2px 0 10px rgba(0,0,0,0.02)',
        zIndex: 200
      }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          
          {/* Header Brand */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem', paddingLeft: '0.25rem' }}>
            <GenZLogo height={56} />
          </div>

          {/* Quick Sub-module Instant Search */}
          <div className="glass-card" style={{ padding: '0.4rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#F8FAFC', marginBottom: '0.85rem' }}>
            <Search size={14} color="var(--text-dim)" />
            <input 
              type="text" 
              placeholder="Search 103 sub-modules..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#0F172A', fontSize: '0.8rem' }}
            />
          </div>

          {/* Collapsible Accordion Navigation List */}
          <nav style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingRight: '0.25rem' }}>
            {filteredStructure.map(cat => {
              const isOpen = openCategories[cat.id] || sidebarSearch !== '';
              const isCatActive = activeCategory === cat.id;

              return (
                <div key={cat.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Category Header Button */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      width: '100%',
                      padding: '0.5rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      background: isCatActive ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
                      color: isCatActive ? '#7C3AED' : '#0F172A',
                      fontWeight: 700,
                      fontSize: '0.82rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: isCatActive ? '#7C3AED' : '#64748B' }}>{cat.icon}</span>
                      {cat.label}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.6rem', padding: '0.1rem 0.35rem' }}>
                        {cat.subModules.length}
                      </span>
                      {isOpen ? <ChevronDown size={14} color="var(--text-dim)" /> : <ChevronRight size={14} color="var(--text-dim)" />}
                    </div>
                  </button>

                  {/* Sub-Modules Accordion List */}
                  {isOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', paddingLeft: '1.75rem', marginTop: '0.15rem', marginBottom: '0.35rem', borderLeft: '2px solid var(--border-subtle)', marginLeft: '0.75rem' }}>
                      {cat.subModules.map(sub => {
                        const isSubActive = activeCategory === cat.id && activeSubModule === sub;

                        return (
                          <button
                            key={sub}
                            onClick={() => handleSelectSubModule(cat.id, sub)}
                            style={{
                              textAlign: 'left',
                              padding: '0.35rem 0.6rem',
                              borderRadius: 'var(--radius-sm)',
                              background: isSubActive ? '#7C3AED' : 'transparent',
                              color: isSubActive ? '#FFFFFF' : '#334155',
                              fontWeight: isSubActive ? 700 : 500,
                              fontSize: '0.78rem'
                            }}
                          >
                            {sub}
                          </button>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </nav>

        </div>

        {/* Master User Footer */}
        <div style={{ 
          background: '#F8FAFC', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-md)', 
          padding: '0.75rem',
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.65rem',
          marginTop: '0.75rem'
        }}>
          <div style={{ 
            width: '34px', height: '34px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, #7C3AED 0%, #0891B2 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontWeight: 800, color: '#FFF', fontSize: '0.85rem' 
          }}>
            SA
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
              Super Admin Control
            </div>
            <div style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 600 }}>
              Full Master Rights
            </div>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Master Top Header Bar */}
        <header style={{ 
          height: '65px', 
          borderBottom: '1px solid var(--border-subtle)', 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(12px)',
          display: 'flex', 
          alignItems: 'center', 
          justify: 'space-between',
          padding: '0 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          
          {/* Breadcrumb Path */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Layers size={16} color="#7C3AED" />
            <span>Master Control</span>
            <ChevronRight size={14} />
            <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{activeCategory}</span>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 800, color: '#0F172A' }}>{activeSubModule}</span>
          </div>

          {/* Master Search */}
          <div className="glass-card" style={{ width: '380px', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F8FAFC' }}>
            <Search size={16} color="var(--text-dim)" />
            <input 
              type="text" 
              placeholder="Search across all 103 sub-modules & database records..." 
              style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#0F172A', fontSize: '0.85rem' }} 
            />
          </div>

          {/* Header Badges & Sign Out Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-violet" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', fontWeight: 600 }}>
              <Crown size={14} color="#7C3AED" /> Role: {userRole}
            </span>

            <button 
              onClick={() => setIsAuthenticated(false)}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.45rem', 
                fontSize: '0.82rem', 
                padding: '0.5rem 1rem', 
                color: '#FFFFFF', 
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <LogOut size={15} color="#FFFFFF" /> Logout
            </button>
          </div>

        </header>

        {/* Dynamic Category Engine Renderer */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {activeSubModule === 'Leads' ? (
            <LeadsModule onConvertClient={handleConvertClientData} />
          ) : activeSubModule === 'Follow Ups' ? (
            <FollowUpsModule onTriggerAI={handleTriggerAI} />
          ) : activeSubModule === 'Clients' || activeSubModule === 'Won (Clients)' ? (
            <ClientsModule clientsList={convertedClients} onConvertToProject={handleConvertToProjectData} />
          ) : activeSubModule === 'Projects' ? (
            <ProjectsModule projectsList={clientProjects} />
          ) : (
            <MasterControlViews 
              activeCategory={activeCategory} 
              activeSubModule={activeSubModule} 
            />
          )}
        </main>

      </div>

      {/* Floating AI Agent Copilot */}
      <AIAgentCopilot onRunAgent={handleTriggerAI} />

    </div>
  );
}
