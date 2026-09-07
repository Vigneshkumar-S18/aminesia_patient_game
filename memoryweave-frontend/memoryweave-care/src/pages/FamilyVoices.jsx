import React, { useState } from 'react';
import { Mic, Play, Edit2, Trash2, Plus, Volume2 } from 'lucide-react';
import './FamilyVoices.css';

export default function FamilyVoices() {
  const [isRecording, setIsRecording] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const voices = [
    { id: 1, name: 'Anita Devi', relation: 'Daughter', message: '"Amma, it\'s time for your medicine"', purpose: 'Medicine Reminder' },
    { id: 2, name: 'Rahul', relation: 'Son', message: '"Good morning Amma!"', purpose: 'Greeting' },
  ];

  return (
    <div className="family-voices page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Family Voices</h1>
          <p className="text-muted text-lg">Manage real human voices for the patient experience.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> Record Voice
        </button>
      </header>

      {showForm && (
        <div className="card record-form-card mb-4">
          <h3 className="mb-4">Record Family Voice</h3>
          
          <div className="form-group">
            <label>Purpose</label>
            <select className="form-input">
              <option>Medicine Reminder</option>
              <option>Greeting</option>
              <option>Encouragement</option>
              <option>Game Prompt</option>
            </select>
          </div>
          
          <div className="form-group mt-3">
            <label>Message text (optional script)</label>
            <textarea className="form-input" rows="2" placeholder="Amma, it's time to take your medicine."></textarea>
          </div>

          <div className="record-action-area mt-4">
            <button 
              className={`record-btn ${isRecording ? 'recording' : ''}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic size={32} />
            </button>
            <span className={isRecording ? 'text-danger font-medium' : 'text-muted'}>
              {isRecording ? 'Recording... click to stop' : 'Click to record'}
            </span>
          </div>

          <div className="record-form-actions mt-4 pt-4 border-top">
            <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            <div className="flex-gap">
              <button className="btn btn-outline"><Play size={16} className="mr-2"/> Preview</button>
              <button className="btn btn-primary" onClick={() => setShowForm(false)}>Save Voice</button>
            </div>
          </div>
        </div>
      )}

      <div className="voices-grid">
        {voices.map(voice => (
          <div key={voice.id} className="card voice-card">
            <div className="voice-card-header">
              <div className="voice-avatar">
                <Volume2 size={24} className="text-primary" />
              </div>
              <div className="voice-info">
                <h4>{voice.name}</h4>
                <span className="text-sm text-muted">{voice.relation} • {voice.purpose}</span>
              </div>
            </div>
            
            <div className="voice-message mt-3">
              <p className="font-medium">{voice.message}</p>
            </div>

            <div className="voice-actions mt-4 pt-3 border-top">
              <button className="btn-icontext"><Play size={16} /> Play</button>
              <button className="btn-icontext"><Edit2 size={16} /> Edit</button>
              <button className="btn-icontext text-danger ml-auto"><Trash2 size={16} /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
