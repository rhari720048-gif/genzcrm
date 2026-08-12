import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// =========================================================================
// MASTER CONTROL ADMIN PANEL DATA STORE (17 CATEGORIES & 103 SUB-MODULES)
// =========================================================================

const masterStore = {
  // 1. Dashboard
  dashboard: {
    stats: {
      totalRevenue: '$1,480,000',
      activeProjects: 24,
      totalLeads: 1420,
      activePartners: 18,
      qaPassRate: '99.2%',
      aiActions: 4520
    },
    systemStatus: 'Master System Fully Operational (All 17 Departments Connected)'
  },

  // 2. CRM
  crm: {
    leads: [
      { id: 'l-1', name: 'Quantum AI Systems', contact: 'CEO Marcus Vance', value: '$120,000', status: 'Hot Lead', source: 'Inbound Web' },
      { id: 'l-2', name: 'Global Logistics Corp', contact: 'CTO Sarah Jenkins', value: '$75,000', status: 'Negotiation', source: 'Partner Referral' }
    ],
    clients: [
      { id: 'c-1', name: 'CarePulse Health', tier: 'Enterprise', arr: '$240,000', accountMgr: 'Alex Chen' },
      { id: 'c-2', name: 'PaySwift Fintech', tier: 'Gold Tier', arr: '$180,000', accountMgr: 'Priya Sharma' }
    ],
    contacts: [
      { id: 'cnt-1', name: 'Marcus Vance', title: 'CEO', company: 'Quantum AI', phone: '+1 415-555-0192', email: 'marcus@quantum.ai' },
      { id: 'cnt-2', name: 'Sarah Jenkins', title: 'CTO', company: 'Global Logistics', phone: '+1 212-555-0144', email: 'sarah@globallog.com' }
    ],
    deals: [
      { id: 'd-1', title: 'CarePulse AI Suite Expansion', value: '$120,000', stage: 'Proposal Sent', probability: '85%' },
      { id: 'd-2', title: 'PaySwift Gateway v3 Deployment', value: '$85,000', stage: 'Contract Review', probability: '95%' }
    ],
    followUps: [
      { id: 'f-1', client: 'Quantum AI', task: 'Send AI Proposal Deck', dueDate: 'Today, 3:00 PM', priority: 'High' },
      { id: 'f-2', client: 'PaySwift', task: 'Legal SLA Signing', dueDate: 'Tomorrow', priority: 'Urgent' }
    ],
    activities: [
      { id: 'a-1', user: 'Alex Chen', detail: 'Sent custom quote to Quantum AI Systems', time: '10 mins ago' },
      { id: 'a-2', user: 'AI Lead Scorer', detail: 'Scored Global Logistics Lead: 92/100 (Hot)', time: '25 mins ago' }
    ]
  },

  // 3. Business Development
  bizdev: {
    partnerships: [
      { name: 'Nexus Digital Agency', type: 'Agency Partner', commission: '20%', activeDeals: 4, payouts: '$42,500' },
      { name: 'CloudScale Systems', type: 'Enterprise Tech', commission: '25%', activeDeals: 6, payouts: '$95,000' }
    ],
    agencies: [{ name: 'Apex Growth Labs', leadsReferred: 14, revenueGenerated: '$140,000' }],
    whiteLabel: [{ partner: 'Global SaaS Resellers LLC', branding: 'Custom Domain & Logo Active' }],
    resellers: [{ region: 'EMEA Region', reseller: 'Nordic Tech Distribution', margin: '30%' }],
    internationalClients: [{ client: 'Tokyo Tech Corp', country: 'Japan 🇯🇵', dealSize: '$310,000' }],
    meetings: [{ title: 'Q3 Agency Ecosystem Alignment', time: 'Aug 8, 2:00 PM', room: 'meet.companyos.io/bizdev' }],
    emailCenter: [{ subject: 'Partner Revenue Share Q3 Update', sentTo: '42 Partners', status: 'Delivered' }]
  },

  // 4. Projects
  projects: {
    projectsList: [
      { name: 'CompanyOS 2.0 Enterprise', manager: 'Maya Lin', progress: 92, status: 'On Track' },
      { name: 'AI Vector Search Engine', manager: 'Alex Chen', progress: 78, status: 'In Review' }
    ],
    products: [{ name: 'IPPA CRM Engine', version: 'v2.4.0', status: 'Stable' }],
    tasks: [{ title: 'Optimize Node.js Cluster API', assignee: 'Alex Chen', status: 'In Progress' }],
    milestones: [{ title: 'Beta Release 2.0', targetDate: 'Aug 15, 2026', status: '95% Done' }],
    sprintBoard: [{ sprint: 'Sprint 42 (Gen Z UI & AI Integration)', duration: 'Aug 1 - Aug 14', velocity: '48 Story Points' }],
    timeTracking: [{ developer: 'Sofia Tech', hoursLogged: '38.5 hrs', project: 'AI Center' }],
    files: [{ name: 'CompanyOS_System_Architecture.pdf', size: '4.2 MB' }],
    documentation: [{ title: 'API Integration Developer Handbook v2', pages: 28 }]
  },

  // 5. Development
  development: {
    github: { repo: 'ippa-technologies/company-os', status: 'Connected', webhook: 'Active' },
    repositories: [{ name: 'companyos-core-backend', branch: 'main', commits: 1240 }],
    branches: [{ name: 'main', lastCommit: 'v2.4.1 Release', author: 'Alex Chen' }, { name: 'feature/ai-center', author: 'Sofia Tech' }],
    pullRequests: [{ id: 'PR-104', title: 'Add 17 Category Master Sidebar', author: 'Alex Chen', status: 'Approved' }],
    deployments: [{ env: 'Production US-East', version: 'v2.4.0', status: 'Healthy', uptime: '99.99%' }],
    apiKeys: [{ keyName: 'OpenAI Enterprise Key', keyPrefix: 'sk-proj-...8492', status: 'Active' }],
    environments: [{ env: 'Staging', url: 'staging.companyos.io' }, { env: 'Production', url: 'app.companyos.io' }]
  },

  // 6. Testing (QA)
  testing: {
    bugTracker: [{ id: 'BUG-402', title: 'Mobile View Sidebar Drawer Snap', priority: 'Low', status: 'Fixed' }],
    testCases: [{ suite: 'API Authentication Suite', total: 48, passed: 48, failed: 0 }],
    testRuns: [{ runName: 'Automated CI/CD Regression Run #892', result: '100% Passed' }],
    regressionTesting: [{ coverage: '94.8% Code Coverage' }],
    securityScan: [{ scanner: 'OWASP ZAP & Snyk', vulnerabilities: '0 Critical, 0 High' }],
    performanceTesting: [{ latencyP99: '42ms', throughput: '12,500 req/sec' }],
    aiCodeAnalysis: [{ suggestion: 'Memory leak optimization in Express streaming route - Applied.' }]
  },

  // 7. Sales
  sales: {
    quotations: [{ quoteNo: 'Q-2026-089', client: 'Quantum AI', amount: '$120,000', status: 'Sent' }],
    contracts: [{ contractNo: 'CTR-2026-042', client: 'PaySwift Inc', value: '$180,000', status: 'Active' }],
    invoices: [{ invNo: 'INV-2026-104', client: 'CarePulse Corp', amount: '$24,000', status: 'Paid' }],
    payments: [{ id: 'PAY-892', date: '2026-08-04', method: 'Stripe ACH Wire', amount: '$24,000' }],
    revenue: { mrr: '$124,000', arr: '$1,488,000', growth: '+32% YoY' },
    refunds: [{ id: 'RFD-12', amount: '$0', status: 'Zero Refunds Logged' }]
  },

  // 8. Marketing
  marketing: {
    leads: [{ name: 'Inbound SaaS Campaign Lead #402', score: 88 }],
    campaigns: [{ title: 'Q3 Enterprise AI Automation Launch', channel: 'Multi-Channel', spend: '$12,500', leads: 340 }],
    commission: [{ teamMember: 'Jordan Sales', earned: '$4,200', target: '$5,000' }],
    travelReports: [{ report: 'San Francisco Tech Crunch Expo Trip', expense: '$1,850' }],
    dailyReports: [{ date: '2026-08-04', outboundCalls: 140, demosCompleted: 12 }],
    expenses: [{ category: 'Paid Advertising', amount: '$8,400' }]
  },

  // 9. Digital Marketing
  digitalMarketing: {
    clients: [{ client: 'TechFlow SaaS', retainer: '$8,500/mo' }],
    socialMedia: [{ platform: 'LinkedIn Enterprise', followers: '45.2k', engagement: '6.4%' }],
    contentCalendar: [{ date: 'Aug 6', post: 'Gen Z Dark & White Theme UI Launch', status: 'Scheduled' }],
    posts: [{ title: 'Top 5 AI Agent Workflows for Enterprise 2026', reach: '18,400 views' }],
    reels: [{ title: 'IPPA CompanyOS 2.0 UI Tour (15s)', views: '42,000 views' }],
    seo: [{ domainRating: 68, topKeywords: ['Company Operating System', 'AI CRM Platform'] }],
    googleAds: [{ campaign: 'Search - Enterprise CRM', cpc: '$4.20', conversions: 42 }],
    metaAds: [{ campaign: 'Instagram Video Ads', ctr: '3.8%', leads: 120 }],
    analytics: [{ monthlyVisitors: '84,500', bounceRate: '28%' }],
    leadReports: [{ channel: 'Organic SEO', percentage: '45%' }, { channel: 'Paid Search', percentage: '35%' }]
  },

  // 10. Finance
  finance: {
    income: [{ source: 'Client SaaS Subscriptions', amount: '$124,000/mo' }],
    expenses: [{ category: 'AWS & Cloud Hosting', amount: '$8,200/mo' }],
    companyProfit: { grossProfit: '$1,120,000', netMargin: '68%' },
    developerPayments: [{ team: 'Engineering Team Payroll', amount: '$85,000/mo' }],
    marketingCommission: [{ totalPaid: '$18,400' }],
    partnerCommission: [{ totalPaid: '$42,500' }],
    travelExpenses: [{ totalYTD: '$14,200' }],
    payroll: [{ cycle: 'July 2026 Payroll', status: 'Completed 100%' }],
    gst: [{ filingPeriod: 'Q2 2026 GST/VAT', status: 'Filed & Verified' }],
    bankAccounts: [{ bank: 'Silicon Valley Bank / HDFC Enterprise', balance: '$840,000' }]
  },

  // 11. HR
  hr: {
    employees: [{ name: 'Alex Chen', role: 'Engineering Lead', dept: 'Tech' }, { name: 'Maya Lin', role: 'Design Lead', dept: 'Product' }],
    recruitment: [{ openRole: 'Senior AI Research Engineer', applicants: 42, stage: 'Interviewing' }],
    attendance: [{ date: 'Today', presentPercentage: '98.5%' }],
    leave: [{ employee: 'Liam Dev', leaveType: 'Casual Leave', dates: 'Aug 10 - Aug 12', status: 'Approved' }],
    payroll: [{ status: 'Next Payroll Date: Aug 31, 2026' }],
    performance: [{ employee: 'Alex Chen', rating: '5.0 / 5.0 (Exceeds Expectations)' }],
    documents: [{ doc: 'Company_Employee_Handbook_2026.pdf' }],
    interns: [{ name: 'Sofia Dev Intern', mentor: 'Alex Chen', project: 'AI Center Widgets' }]
  },

  // 12. Partners
  partners: {
    partnersList: [{ name: 'Nexus Digital', tier: 'Gold', revenueShare: '20%' }],
    agenciesList: [{ agency: 'Apex Growth Labs' }],
    whiteLabelList: [{ brand: 'Global SaaS Resellers' }],
    commissionList: [{ paidYTD: '$177,900' }],
    agreements: [{ agreement: 'Master Reseller Agreement 2026 - Signed' }]
  },

  // 13. Customer Support
  support: {
    tickets: [{ id: 'TICK-802', subject: 'API Rate limit expansion request', priority: 'Medium', status: 'Resolved' }],
    liveChat: [{ activeChats: 3, avgResponseTime: '45 seconds' }],
    knowledgeBase: [{ articlesCount: 142, topArticle: 'Setting up AI Agent Webhooks' }],
    feedback: [{ csatScore: '98.4%', totalReviews: 412 }]
  },

  // 14. Communication
  communication: {
    email: [{ inbox: 14, unread: 2 }],
    whatsapp: [{ phone: '+1 800-IPPA-OS', activeChats: 8 }],
    sms: [{ status: 'SMS Gateway Active (Twilio / AWS SNS)' }],
    notifications: [{ count: 4, unreadUrgent: 1 }],
    meetings: [{ countToday: 4 }],
    calendar: [{ upcomingEvents: 12 }]
  },

  // 15. Reports
  reports: {
    salesReports: [{ title: 'Q3 Enterprise Sales Forecast & Win Rates' }],
    marketingReports: [{ title: 'Customer Acquisition Cost (CAC) by Channel' }],
    financeReports: [{ title: 'Q2 Profit & Loss (P&L) Audit Sheet' }],
    employeeReports: [{ title: 'Department Output Efficiency Metrics' }],
    projectReports: [{ title: 'Sprint Velocity & Burndown Charts' }],
    clientReports: [{ title: 'Client Net Retention Rate (114% NRR)' }],
    customReports: [{ title: 'Custom AI Agent ROI Breakdown' }]
  },

  // 16. AI Center
  aiCenter: {
    aiChat: { status: 'Active', model: 'IPPA Enterprise AI Engine v3.5' },
    aiLeadScore: [{ lead: 'Quantum AI Systems', score: 94, recommendation: 'Schedule Executive Demo' }],
    aiProposalGenerator: [{ template: 'Enterprise AI Suite Proposal', generatedDocs: 14 }],
    aiEmailWriter: [{ draftedEmails: 38, avgResponseRate: '42%' }],
    aiSalesPrediction: [{ Q3Forecast: '$480,000', confidence: '92%' }],
    aiCodeReview: [{ commitsReviewed: 140, bugsCaught: 12 }],
    aiMarketingContent: [{ adCopiesGenerated: 85, blogPostsWritten: 14 }],
    aiMeetingSummary: [{ meetingsSummarized: 28, actionItemsExtracted: 94 }]
  },

  // 17. Administration
  administration: {
    users: [{ totalUsers: 142, activeAdmins: 4 }],
    roles: ['Super Admin', 'Department Head', 'Team Lead', 'Senior Member', 'Partner Sandbox'],
    permissions: [{ role: 'Super Admin', permissions: 'Full Access (All 17 Categories)' }],
    departments: ['Engineering', 'Product & Design', 'Sales & Growth', 'Marketing', 'Finance', 'HR', 'Support'],
    designations: ['VP of Product', 'Engineering Lead', 'Senior Account Executive', 'AI Specialist'],
    branches: [{ city: 'San Francisco HQ' }, { city: 'Singapore Tech Hub' }, { city: 'Chennai Dev Center' }],
    teams: [{ team: 'AI Autonomous Systems Team', members: 8 }],
    products: [{ name: 'IPPA CompanyOS v2.4' }],
    companySettings: { company: 'IPPA Technologies Inc', domain: 'companyos.io' },
    emailSettings: { smtp: 'smtp.companyos.io', status: 'Connected' },
    whatsAppApi: { provider: 'Meta WhatsApp Business Cloud API', status: 'Active' },
    paymentGateway: { gateways: ['Stripe', 'PayPal Enterprise', 'Razorpay'] },
    integrations: ['GitHub', 'Slack', 'Jira', 'Figma', 'Google Workspace', 'Pinecone Vector DB'],
    auditLogs: [{ action: 'Admin privilege escalation audit pass', user: 'Alex Chen', time: '1 hour ago' }],
    activityLogs: [{ event: 'System Backup Auto-Triggered', time: '04:00 AM' }],
    backupRestore: { lastBackup: 'Today, 04:00 AM', backupSize: '1.2 GB', status: 'Encrypted & Stored' }
  }
};

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'IPPA Master Control Admin Panel' });
});

app.get('/api/master/:category', (req, res) => {
  const { category } = req.params;
  const data = masterStore[category] || masterStore.dashboard;
  res.json(data);
});

app.post('/api/ai-agents/trigger', (req, res) => {
  const { agentId, query } = req.body || {};
  res.json({
    agentName: 'OpsAgent (AI)',
    result: `⚡ Successfully processed operational task analysis for query: "${query || 'system diagnostic'}". All 17 department modules synchronized.`,
    avatar: '🤖'
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 IPPA Master Control Admin Panel Server running on http://localhost:${PORT}`);
  });
}

export default app;
