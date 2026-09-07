import React, { useState } from 'react';
import { Plus, MessageCircle, Camera, CheckCircle, XCircle, Search } from 'lucide-react';
import './Family.css';

export default function Family() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="family-page page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Family Contributions</h1>
          <p className="text-muted text-lg">Turn family members into continuous contributors to the Personal Memory Graph.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={20} /> Add Contribution
        </button>
      </header>

      {showAdd && (
        <div className="card add-contribution-card mb-4">
          <h3 className="mb-4">Add a New Memory</h3>
          <div className="form-group">
            <label>What would you like to add?</label>
            <select className="form-input">
              <option>📷 Photo</option>
              <option>🎙 Conversation</option>
              <option>📝 Story</option>
              <option>🎵 Music</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label>Upload or Record</label>
            <div className="upload-box mt-2">
              <span className="text-muted">Click to browse or drag file here</span>
            </div>
          </div>
          <div className="form-actions mt-4 pt-4 border-top">
            <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setShowAdd(false)}>Upload</button>
          </div>
        </div>
      )}

      <div className="contributions-grid">
        <div className="active-missions">
          <div className="card mission-card mb-4">
            <div className="mission-header">
              <div className="mission-title">
                <MessageCircle size={24} className="text-primary" />
                <h3>Memory Mission</h3>
              </div>
              <span className="badge bg-warning text-white">● Pending</span>
            </div>
            
            <div className="mission-content mt-3">
              <span className="text-sm text-muted">Ask Asha about:</span>
              <p className="mission-prompt">"Her favorite place when she was young."</p>
              <div className="mission-assignment mt-3">
                <span className="text-sm text-muted">Assigned to:</span>
                <span className="font-medium ml-2">Anita</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top text-center">
              <button className="btn btn-outline w-100">Record Response</button>
            </div>
          </div>

          <div className="card new-contribution-card">
            <div className="mission-header">
              <div className="mission-title">
                <Camera size={24} className="text-secondary" />
                <h3>New Photos</h3>
              </div>
              <span className="text-sm text-muted">Just now</span>
            </div>
            
            <div className="mission-content mt-3">
              <p className="font-medium">Anita added 4 photos.</p>
              
              <div className="ai-extraction-box mt-3">
                <div className="extraction-header">
                  <Search size={16} className="text-primary" />
                  <span className="font-medium text-primary">AI Extracted:</span>
                </div>
                <div className="extraction-tags mt-2">
                  <span className="ext-tag">3 People</span>
                  <span className="ext-tag">1 Event</span>
                  <span className="ext-tag">2 Places</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top text-center">
              <button className="btn btn-primary w-100">Review Memories</button>
            </div>
          </div>
        </div>

        <div className="contribution-history">
          <div className="card ai-review-card mb-4">
            <div className="mission-header">
              <h3 className="text-primary">AI Summary Review</h3>
            </div>
            <p className="text-sm text-muted mt-1">From recorded conversation about childhood.</p>
            
            <div className="extracted-memories mt-3">
              <span className="font-medium">Possible memories found:</span>
              
              <div className="memory-find mt-2">
                <span className="text-sm text-muted">📍 Place</span>
                <p className="font-medium">Shillong</p>
              </div>
              <div className="memory-find">
                <span className="text-sm text-muted">👩 Person</span>
                <p className="font-medium">Younger sister</p>
              </div>
              <div className="memory-find">
                <span className="text-sm text-muted">🍵 Activity</span>
                <p className="font-medium">Tea preparation</p>
              </div>
              <div className="memory-find">
                <span className="text-sm text-muted">📅 Period</span>
                <p className="font-medium">Childhood</p>
              </div>
            </div>

            <div className="review-actions mt-4 pt-3 border-top">
              <button className="btn btn-primary">Add to Memory Graph</button>
              <button className="btn btn-outline">Edit</button>
              <button className="btn btn-outline text-danger ml-auto">Reject</button>
            </div>
          </div>

          <div className="card history-card">
            <h3 className="mb-4">Contribution History</h3>
            
            <div className="history-list">
              <div className="history-item">
                <div className="h-date">Sep 7</div>
                <div className="h-details">
                  <span className="font-medium">🎙 Childhood story</span>
                  <span className="text-sm text-muted">Added by Anita</span>
                  <span className="text-sm text-secondary flex-center mt-1"><CheckCircle size={14} className="mr-1"/> Approved</span>
                </div>
              </div>
              
              <div className="history-item">
                <div className="h-date">Sep 5</div>
                <div className="h-details">
                  <span className="font-medium">📷 Family photos</span>
                  <span className="text-sm text-muted">Added by Rahul</span>
                  <span className="text-sm text-secondary flex-center mt-1"><CheckCircle size={14} className="mr-1"/> Approved</span>
                </div>
              </div>
              
              <div className="history-item">
                <div className="h-date">Sep 3</div>
                <div className="h-details">
                  <span className="font-medium">🎵 Favorite song</span>
                  <span className="text-sm text-muted">Added by Anita</span>
                  <span className="text-sm text-secondary flex-center mt-1"><CheckCircle size={14} className="mr-1"/> Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
