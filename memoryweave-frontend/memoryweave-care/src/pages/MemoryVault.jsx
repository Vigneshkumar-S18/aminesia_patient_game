import React from 'react';
import { Plus, Search, Image as ImageIcon, MapPin, Mic, FileText, User, Calendar, Music } from 'lucide-react';
import './MemoryVault.css';

export default function MemoryVault() {
  const stats = [
    { label: 'People', count: 12, icon: <User size={18} /> },
    { label: 'Places', count: 6, icon: <MapPin size={18} /> },
    { label: 'Events', count: 8, icon: <Calendar size={18} /> },
    { label: 'Stories', count: 14, icon: <FileText size={18} /> },
    { label: 'Voices', count: 5, icon: <Mic size={18} /> },
    { label: 'Objects', count: 9, icon: <ImageIcon size={18} /> },
  ];

  const recentMemories = [
    { id: 1, title: 'Family', type: 'Person', emoji: '👨', date: '7 Sep 2026', verified: true },
    { id: 2, title: 'Home', type: 'Place', emoji: '🏡', date: '6 Sep 2026', verified: true },
    { id: 3, title: 'Village', type: 'Place', emoji: '🌾', date: '5 Sep 2026', verified: true },
    { id: 4, title: 'Diwali 1998', type: 'Event', emoji: '🎆', date: '1 Sep 2026', verified: true },
  ];

  return (
    <div className="memory-vault page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Memory Vault</h1>
          <p className="text-muted text-lg">Manage Asha's personalized memory world.</p>
        </div>
        <button className="btn btn-primary btn-add-memory">
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
            <button className="btn btn-outline active">All</button>
            <button className="btn btn-outline">People</button>
            <button className="btn btn-outline">Places</button>
          </div>
        </div>

        <div className="memory-grid mt-4">
          {recentMemories.map(memory => (
            <div key={memory.id} className="memory-card">
              <div className="memory-emoji">{memory.emoji}</div>
              <div className="memory-details">
                <h4>{memory.title}</h4>
                <span className="text-sm text-muted">{memory.type}</span>
              </div>
              <div className="memory-provenance mt-3 pt-3 border-top">
                <div className="prov-row">
                  <span className="text-xs text-muted">Added:</span>
                  <span className="text-xs font-medium">{memory.date}</span>
                </div>
                <div className="prov-row">
                  <span className="text-xs text-muted">Status:</span>
                  <span className="text-xs text-secondary font-medium">✓ Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
