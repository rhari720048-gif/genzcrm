import React, { useState } from 'react';
import { Megaphone, Pin, Heart, Plus, MessageCircle, Sparkles, Send } from 'lucide-react';

export default function AnnouncementsModule({ announcements = [], onAddAnnouncement, onLike }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Company Wide');
  const [author, setAuthor] = useState('Alex Chen (Tech Lead)');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onAddAnnouncement({
      title,
      content,
      category,
      author
    });
    setTitle('');
    setContent('');
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>📢 Company Broadcasts & News</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Official announcements, department updates, and townhall highlights</p>
        </div>

        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Post Announcement
        </button>
      </div>

      {/* Announcements Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '850px' }}>
        {announcements.map(item => (
          <div key={item.id} className="glass-card" style={{ 
            padding: '1.5rem', 
            borderLeft: item.pinned ? '4px solid #0891B2' : '1px solid var(--border-subtle)',
            background: item.pinned ? 'rgba(8, 145, 178, 0.05)' : '#FFFFFF'
          }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-cyan">{item.category}</span>
                {item.pinned && <span className="badge badge-amber"><Pin size={12} /> Pinned</span>}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.date}</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A', margin: '0.4rem 0' }}>{item.title}</h3>
            
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6', margin: '0.8rem 0' }}>
              {item.content}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                Posted by <strong style={{ color: '#0F172A' }}>{item.author}</strong>
              </span>

              <button 
                className="btn-secondary" 
                onClick={() => onLike(item.id)}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#E11D48', borderColor: 'rgba(225, 29, 72, 0.3)' }}
              >
                <Heart size={14} fill={item.likes > 0 ? '#E11D48' : 'none'} /> {item.likes} Reactions
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* New Announcement Modal */}
      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '500px', background: '#FFFFFF', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>📢 Post Announcement</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Headline / Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Q3 All-Hands Meeting & AI Agent Demo" 
                  required 
                  style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }}>
                  <option value="Company Wide">Company Wide</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="Sales & Growth">Sales & Growth</option>
                  <option value="People & HR">People & HR</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Content Body</label>
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="Write message for the team..." 
                  rows={4}
                  required
                  style={{ width: '100%', padding: '0.6rem', background: '#F8FAFC', border: '1px solid var(--border-subtle)', color: '#0F172A', borderRadius: 'var(--radius-sm)', marginTop: '0.3rem' }} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary"><Send size={16} /> Publish Post</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
