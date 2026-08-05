import React, { useState } from 'react';
import { FileText, Folder, Upload, Download, Sparkles, Eye, Search, Filter, Bot } from 'lucide-react';

export default function FilesModule({ files = [], onTriggerAI }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const filtered = files.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSummarize = (file) => {
    setIsSummarizing(true);
    setSelectedFile(file);
    setTimeout(() => {
      setAiSummary(`⚡ Doc Synthesizer AI Analysis for "${file.name}":\n\nExecutive Overview:\n- Author: ${file.author} | Dept: ${file.department}\n- Core Summary: ${file.summary}\n- Key Insights: Full compliance with IPPA CompanyOS 2.0 standards and AI Agent privacy protocols.`);
      setIsSummarizing(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>📂 Files & Knowledge Documents</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Central document workspace with AI file summarization and instant preview</p>
        </div>

        <button className="btn-primary">
          <Upload size={18} /> Upload Document
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#FFFFFF' }}>
        <Search size={18} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search documents by file name, author or department..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#0F172A', fontSize: '0.9rem' }}
        />
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* File Table */}
        <div className="glass-card" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Company Documents</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>FILE NAME</th>
                  <th style={{ padding: '0.75rem' }}>DEPARTMENT</th>
                  <th style={{ padding: '0.75rem' }}>SIZE</th>
                  <th style={{ padding: '0.75rem' }}>UPDATED</th>
                  <th style={{ padding: '0.75rem' }}>AI ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={18} color="#0891B2" /> {f.name}
                    </td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-violet">{f.department}</span></td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{f.size}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-dim)' }}>{f.updated}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: '#7C3AED', borderColor: 'rgba(124, 58, 237, 0.3)' }}
                        onClick={() => handleSummarize(f)}
                      >
                        <Sparkles size={12} /> Summarize
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI File Summarizer Preview Drawer */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={20} color="#7C3AED" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>AI Document Synthesizer</h3>
          </div>

          {selectedFile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{selectedFile.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Author: {selectedFile.author} • {selectedFile.size}
                </div>
              </div>

              <div style={{ background: 'rgba(124, 58, 237, 0.05)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(124, 58, 237, 0.25)', minHeight: '180px' }}>
                {isSummarizing ? (
                  <p style={{ color: '#7C3AED', fontSize: '0.85rem' }}>⚡ AI is reading file contents and summarizing...</p>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#0F172A', whiteSpace: 'pre-wrap' }}>
                    {aiSummary}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '2px dashed var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
              Select any file on the left and click "Summarize" to view AI key insights instantly.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
