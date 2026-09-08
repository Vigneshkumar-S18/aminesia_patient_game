import React, { useState, useEffect } from 'react';
import { Plus, Search, Image as ImageIcon, MapPin, Mic, FileText, User, Calendar, Check, X } from 'lucide-react';
import api from '../api';
import './MemoryVault.css';

export default function MemoryVault() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemory, setNewMemory] = useState({ title: '', description: '', media_url: '', media_type: 'photo' });
  const [filter, setFilter] = useState('All');

  // Hardcoded patient for MVP
  const PATIENT_ID = "patient_001";

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await api.get(`/patients/${PATIENT_ID}/memories`);
      setMemories(response.data);
    } catch (error) {
      console.error("Failed to fetch memories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemory = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/patients/${PATIENT_ID}/memories`, newMemory);
      setShowAddModal(false);
      setNewMemory({ title: '', description: '', media_url: '', media_type: 'photo' });
      fetchMemories();
    } catch (error) {
      console.error("Failed to add memory:", error);
    }
  };

  const handleVerify = async (memoryId) => {
    try {
      await api.patch(`/patients/${PATIENT_ID}/memories/${memoryId}/verify`);
      fetchMemories(); // Refresh to get updated status
    } catch (error) {
      console.error("Failed to verify memory:", error);
    }
  };

  const stats = [
    { label: 'Total Memories', count: memories.length, icon: <FileText size={18} /> },
    { label: 'Verified', count: memories.filter(m => m.verified).length, icon: <Check size={18} /> },
    { label: 'Needs Verification', count: memories.filter(m => !m.verified).length, icon: <Search size={18} /> },
  ];

  const filteredMemories = filter === 'All' 
    ? memories 
    : filter === 'Needs Verification' 
      ? memories.filter(m => !m.verified)
      : memories.filter(m => m.verified);

  if (loading) {
    return <div className="p-8">Loading Memory Vault...</div>;
  }

  return (
    <div className="memory-vault page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Memory Vault</h1>
          <p className="text-muted text-lg">Manage personalized memories and verify AI-extracted entities.</p>
        </div>
        <button className="btn btn-primary btn-add-memory" onClick={() => setShowAddModal(true)}>
          <Plus size={20} /> Add Memory
        </button>
      </header>

      <div className="vault-stats-grid mb-4">
        {stats.map(stat => (
          <div key={stat.label} className="card stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-count">{stat.count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="vault-toolbar">
          <div className="search-bar">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search memories..." className="search-input" />
          </div>
          <div className="filters">
            <button className={`btn btn-outline ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
            <button className={`btn btn-outline ${filter === 'Verified' ? 'active' : ''}`} onClick={() => setFilter('Verified')}>Verified</button>
            <button className={`btn btn-outline ${filter === 'Needs Verification' ? 'active' : ''}`} onClick={() => setFilter('Needs Verification')}>Needs Verification</button>
          </div>
        </div>

        {filteredMemories.length === 0 ? (
          <div className="text-center p-8 text-muted">No memories found. Click "Add Memory" to ingest data.</div>
        ) : (
          <div className="memory-grid mt-4">
            {filteredMemories.map(memory => (
              <div key={memory.id} className={`memory-card ${!memory.verified ? 'unverified-card' : ''}`}>
                {memory.media_url ? (
                  <div className="memory-image" style={{ backgroundImage: `url(${memory.media_url})`, height: '120px', backgroundSize: 'cover', borderRadius: '8px' }}></div>
                ) : (
                  <div className="memory-emoji" style={{ fontSize: '3rem', textAlign: 'center', margin: '20px 0' }}>📝</div>
                )}
                <div className="memory-details">
                  <h4>{memory.title}</h4>
                  <p className="text-sm text-muted mt-1">{memory.description}</p>
                </div>
                <div className="memory-provenance mt-3 pt-3 border-top">
                  <div className="prov-row">
                    <span className="text-xs text-muted">Added:</span>
                    <span className="text-xs font-medium">{new Date(memory.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="prov-row mt-2">
                    <span className="text-xs text-muted">Status:</span>
                    {memory.verified ? (
                      <span className="text-xs text-secondary font-medium">✓ Verified</span>
                    ) : (
                      <button className="btn btn-sm btn-primary" onClick={() => handleVerify(memory.id)}>Approve AI Extraction</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal card" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="modal-header d-flex justify-content-between">
              <h3>Ingest New Memory</h3>
              <button className="btn-icon" onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddMemory} className="modal-body p-4">
              <div className="form-group mb-3">
                <label>Memory Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                  required 
                  placeholder="e.g., Daughter's Wedding"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
              <div className="form-group mb-3">
                <label>Story/Description (Used by AI to extract entities)</label>
                <textarea 
                  className="form-control" 
                  value={newMemory.description}
                  onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
                  required 
                  rows="3"
                  placeholder="Tell the story... e.g., Asha attended Priya's wedding at the village home."
                  style={{ width: '100%', padding: '8px' }}
                ></textarea>
              </div>
              <div className="form-group mb-4">
                <label>Media URL (Photo/Audio)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  value={newMemory.media_url}
                  onChange={(e) => setNewMemory({...newMemory, media_url: e.target.value})}
                  placeholder="https://example.com/photo.jpg"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
              <div className="form-actions text-right mt-4" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save & Extract</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
