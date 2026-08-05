import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Shield, Mail, Lock as LockIcon, Check, ArrowRight, KeyRound, 
  CheckCircle2, RefreshCw, BarChart2, Users, Rocket, DollarSign, Megaphone, 
  Landmark, Cpu, Layers, Eye, EyeOff, Sun, Moon, Globe, BellRing, Megaphone as AnnouncementIcon 
} from 'lucide-react';
import GenZLogo from '../common/GenZLogo';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@companyos.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Founder'); // 'Founder', 'CEO', 'Developer', 'Marketing', 'Tester', 'HR', 'Partner', 'Intern'
  const [rememberMe, setRememberMe] = useState(true);
  
  // Theme & Language
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'ta'

  // Button animation state: 'idle', 'loading', 'success'
  const [btnState, setBtnState] = useState('idle');

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');

  // Floating background particles generator
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const dots = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5
    }));
    setParticles(dots);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setBtnState('loading');

    setTimeout(() => {
      setBtnState('success');

      setTimeout(() => {
        onLoginSuccess(role);
      }, 1000);
    }, 1200);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (forgotStep < 4) {
      setForgotStep(prev => prev + 1);
    } else {
      setShowForgotModal(false);
      setForgotStep(1);
      alert(language === 'ta' ? 'கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது!' : 'Password updated successfully! You can now log in.');
    }
  };

  // Translations dictionary
  const t = {
    welcome: language === 'ta' ? 'மீண்டும் வருக' : 'Welcome Back',
    subtitle: language === 'ta' ? 'உங்கள் நிறுவனத்தின் CRM போர்ட்டலில் நுழைய உள்நுழைக.' : 'Sign in to access your Company CRM.',
    email: language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address',
    password: language === 'ta' ? 'கடவுச்சொல்' : 'Password',
    roleLabel: language === 'ta' ? 'பயனர் பங்கு (Role)' : 'Select Access Role',
    rememberMe: language === 'ta' ? 'என்னை நினைவில் கொள்' : 'Remember Me',
    forgot: language === 'ta' ? 'கடவுச்சொல் மறந்துவிட்டதா?' : 'Forgot Password?',
    loginBtn: language === 'ta' ? 'உள்நுழைக' : 'Login',
    loggingIn: language === 'ta' ? 'உள்நுழைகிறது...' : 'Logging in...',
    redirecting: language === 'ta' ? 'வழிமாற்றப்படுகிறது...' : 'Redirecting...',
    announcement: language === 'ta' ? 'நிறுவன அறிவிப்பு' : 'Company Announcement',
    announcement1: language === 'ta' ? '• CRM பதிப்பு 2.1 வெளியிடப்பட்டது' : '• CRM Version 2.1 Released',
    announcement2: language === 'ta' ? '• புதிய AI அம்சங்கள் சேர்க்கப்பட்டுள்ளன' : '• New AI Features & Copilot Added',
    announcement3: language === 'ta' ? '• பராமரிப்பு: ஞாயிறு 2:00 AM - 3:00 AM' : '• Scheduled Maintenance: Sunday 2:00 AM - 3:00 AM',
    serverStatus: language === 'ta' ? 'சேவையகம் ஆன்லைனில் உள்ளது • v2.1.0' : 'Server Online • Version 2.1.0'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      background: isDarkMode ? '#0F172A' : '#F8FAFC', 
      color: isDarkMode ? '#F8FAFC' : '#111827',
      position: 'relative', 
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      transition: 'background 0.3s ease'
    }}>
      
      {/* Top Floating Controls Bar (Theme Toggle, Language Switcher, Server Status) */}
      <div style={{ 
        position: 'absolute', top: '1.25rem', right: '1.5rem', 
        display: 'flex', alignItems: 'center', gap: '0.85rem', zIndex: 100 
      }}>
        {/* System Status Pill */}
        <div style={{ 
          background: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#FFFFFF', 
          border: '1px solid var(--border-subtle)', 
          padding: '0.4rem 0.85rem', borderRadius: '20px', 
          fontSize: '0.78rem', fontWeight: 700, color: '#059669',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          {t.serverStatus}
        </div>

        {/* Language Switcher */}
        <button 
          onClick={() => setLanguage(l => l === 'en' ? 'ta' : 'en')}
          style={{ 
            background: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#FFFFFF', 
            border: '1px solid var(--border-subtle)', 
            padding: '0.4rem 0.85rem', borderRadius: '20px', 
            fontSize: '0.78rem', fontWeight: 800, color: '#7C3AED',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}
        >
          <Globe size={14} /> {language === 'en' ? 'தமிழ்' : 'English'}
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(d => !d)}
          style={{ 
            background: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#FFFFFF', 
            border: '1px solid var(--border-subtle)', 
            padding: '0.4rem 0.85rem', borderRadius: '20px', 
            fontSize: '0.78rem', fontWeight: 800, color: isDarkMode ? '#FBBF24' : '#0F172A',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}
        >
          {isDarkMode ? <Sun size={14} color="#FBBF24" /> : <Moon size={14} color="#0F172A" />}
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* LEFT SIDE (40% Width) - LOGIN FORM & ANNOUNCEMENTS */}
      {/* ========================================================================= */}
      <div style={{ 
        width: '40%', 
        minWidth: '420px', 
        background: isDarkMode ? '#1E293B' : '#FFFFFF', 
        padding: '2.5rem 3.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justify: 'space-between',
        borderRight: '1px solid var(--border-subtle)',
        boxShadow: '10px 0 30px rgba(0,0,0,0.04)',
        zIndex: 10,
        overflowY: 'auto'
      }}>
        {/* Official GENZ NEURAL-X Company Logo Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <GenZLogo height={64} />
        </div>

        {/* Welcome Back & Form Container */}
        <div style={{ margin: '1.5rem 0', maxWidth: '380px', width: '100%' }}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: isDarkMode ? '#F8FAFC' : '#111827', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {t.welcome}
            </h1>
            <p style={{ color: isDarkMode ? '#94A3B8' : '#64748B', fontSize: '0.88rem', marginTop: '0.3rem' }}>
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            
            {/* Email Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: isDarkMode ? '#CBD5E1' : '#334155' }}>
                {t.email}
              </label>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '0.65rem', 
                background: isDarkMode ? '#0F172A' : '#F8FAFC', border: '1px solid var(--border-subtle)', 
                borderRadius: 'var(--radius-sm)', padding: '0.7rem 0.85rem' 
              }}>
                <Mail size={18} color="var(--text-dim)" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  required
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: isDarkMode ? '#F8FAFC' : '#111827', fontSize: '0.88rem', fontWeight: 600 }}
                />
              </div>
            </div>

            {/* Password with Show/Hide Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: isDarkMode ? '#CBD5E1' : '#334155' }}>
                {t.password}
              </label>
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '0.65rem', 
                background: isDarkMode ? '#0F172A' : '#F8FAFC', border: '1px solid var(--border-subtle)', 
                borderRadius: 'var(--radius-sm)', padding: '0.7rem 0.85rem' 
              }}>
                <LockIcon size={18} color="var(--text-dim)" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  required
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: isDarkMode ? '#F8FAFC' : '#111827', fontSize: '0.88rem', fontWeight: 600 }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: isDarkMode ? '#CBD5E1' : '#334155', fontWeight: 600 }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#2563EB', width: '15px', height: '15px' }} 
                />
                {t.rememberMe}
              </label>

              <button 
                type="button"
                onClick={() => { setShowForgotModal(true); setForgotStep(1); }}
                style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer' }}
              >
                {t.forgot}
              </button>
            </div>

            {/* Multi-state Animated Login Button */}
            <button 
              type="submit" 
              disabled={btnState !== 'idle'}
              style={{ 
                width: '100%', 
                padding: '0.85rem', 
                borderRadius: 'var(--radius-sm)', 
                background: btnState === 'success' ? '#22C55E' : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: btnState === 'idle' ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                boxShadow: btnState === 'success' ? '0 4px 14px rgba(34, 197, 94, 0.4)' : '0 4px 14px rgba(37, 99, 235, 0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              {btnState === 'idle' && (
                <>{t.loginBtn} <ArrowRight size={18} /></>
              )}

              {btnState === 'loading' && (
                <>
                  <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  {t.loggingIn}
                </>
              )}

              {btnState === 'success' && (
                <>
                  <CheckCircle2 size={18} /> {t.redirecting}
                </>
              )}
            </button>

          </form>



        </div>

        {/* Footer Note */}
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
          Protected by Enterprise 256-bit Encryption • IPPA OS 2.1
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE (60% Width) - ANIMATED GLASSMORPHISM & ILLUSTRATION */}
      {/* ========================================================================= */}
      <div style={{ 
        width: '60%', 
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #2563EB 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        padding: '4rem',
        overflow: 'hidden'
      }}>
        
        {/* Animated Particles / Moving Dots */}
        {particles.map(p => (
          <div 
            key={p.id} 
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 0 10px rgba(255,255,255,0.6)',
              animation: `floatParticle ${p.duration}s infinite ease-in-out ${p.delay}s`
            }}
          />
        ))}

        {/* Glassmorphism Card Container (Blur Background, Rounded, Glow Shadow) */}
        <div style={{
          width: '100%',
          maxWidth: '620px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.35)',
          padding: '3rem',
          color: '#FFFFFF',
          position: 'relative',
          zIndex: 5
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="badge" style={{ background: 'rgba(37, 99, 235, 0.3)', color: '#60A5FA', border: '1px solid rgba(96, 165, 250, 0.3)', padding: '0.4rem 0.85rem', marginBottom: '0.75rem' }}>
              ⚡ Enterprise CRM Platform
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              All-in-One Company Operating System
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.92rem', marginTop: '0.4rem' }}>
              Empowering Gen Z enterprises with real-time analytics, automated lead scoring, and 103 sub-modules.
            </p>
          </div>

          {/* CRM Feature Showcase Grid Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'CRM Dashboard', icon: <BarChart2 size={18} color="#60A5FA" /> },
              { label: 'Analytics', icon: <Sparkles size={18} color="#38BDF8" /> },
              { label: 'Projects', icon: <Rocket size={18} color="#34D399" /> },
              { label: 'Developers', icon: <Users size={18} color="#F472B6" /> },
              { label: 'Marketing', icon: <Megaphone size={18} color="#FBBF24" /> },
              { label: 'Finance', icon: <Landmark size={18} color="#818CF8" /> }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                background: 'rgba(255, 255, 255, 0.06)', 
                border: '1px solid rgba(255, 255, 255, 0.12)', 
                borderRadius: '12px', 
                padding: '0.85rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.65rem',
                fontSize: '0.85rem',
                fontWeight: 700
              }}>
                {item.icon} {item.label}
              </div>
            ))}
          </div>

          {/* Checkmark Features List Below */}
          <div style={{ 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'center', 
            borderTop: '1px solid rgba(255, 255, 255, 0.12)', 
            paddingTop: '1.25rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.9)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={16} color="#34D399" /> Manage Projects</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={16} color="#34D399" /> Track Employees</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={16} color="#34D399" /> Sales CRM</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={16} color="#34D399" /> Finance</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={16} color="#34D399" /> AI Powered</div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* FORGOT PASSWORD MODAL WIZARD (4 Steps) */}
      {/* ========================================================================= */}
      {showForgotModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '460px', background: '#FFFFFF', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', borderRadius: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>🔑 Reset Password</h3>
              <span className="badge badge-violet">Step {forgotStep} of 4</span>
            </div>

            <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Step 1: Enter Email */}
              {forgotStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Step 1: Enter Registered Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    value={forgotEmail} 
                    onChange={(e) => setForgotEmail(e.target.value)} 
                    required 
                    style={{ padding: '0.75rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }} 
                  />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>We will send a 4-digit verification OTP to this email address.</p>
                </div>
              )}

              {/* Step 2: Send & Enter OTP */}
              {forgotStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Step 2: Enter 4-Digit Verification OTP</label>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '0.5rem 0' }}>
                    {[0, 1, 2, 3].map((idx) => (
                      <input 
                        key={idx}
                        type="text" 
                        maxLength={1} 
                        value={otpCode[idx]} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setOtpCode(prev => {
                            const n = [...prev];
                            n[idx] = val;
                            return n;
                          });
                        }} 
                        style={{ width: '48px', height: '48px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 800, background: '#F8FAFC', border: '2px solid #2563EB', borderRadius: 'var(--radius-sm)' }} 
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>Demo OTP Code: <strong>8 4 9 2</strong></p>
                </div>
              )}

              {/* Step 3: Verify OTP */}
              {forgotStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center', padding: '1rem 0' }}>
                  <CheckCircle2 size={48} color="#22C55E" style={{ margin: '0 auto' }} />
                  <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.1rem' }}>OTP Verified Successfully!</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click below to proceed to create your new secure password.</p>
                </div>
              )}

              {/* Step 4: Create New Password */}
              {forgotStep === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Step 4: Create New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    style={{ padding: '0.75rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }} 
                  />
                  <input 
                    type="password" 
                    placeholder="Confirm new password" 
                    required 
                    style={{ padding: '0.75rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }} 
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowForgotModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {forgotStep === 1 && 'Send OTP'}
                  {forgotStep === 2 && 'Verify OTP'}
                  {forgotStep === 3 && 'Continue'}
                  {forgotStep === 4 && 'Update Password'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.3); opacity: 0.8; }
        }
      `}</style>

    </div>
  );
}
