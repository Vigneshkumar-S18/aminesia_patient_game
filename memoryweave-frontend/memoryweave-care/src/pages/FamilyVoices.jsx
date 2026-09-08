import React, { useState, useEffect } from 'react';
import { Mic, Play, Edit2, Trash2, Plus, Volume2, Target } from 'lucide-react';
import api from '../api';
import './FamilyVoices.css';

export default function FamilyVoices() {
  const [isRecording, setIsRecording] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const patientId = "patient_001"; // Hardcoded for demo

  const fetchMissions = async () => {
    try {
      const response = await api.get(`/patients/${patientId}/missions`);
      setMissions(response.data);
    } catch (error) {
      console.error("Failed to fetch missions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleAddMission = async () => {
    try {
      await api.post(`/patients/${patientId}/missions`, {
        title: "New Custom Mission",
        prompt_text: "Amma, can you tell us about the market you used to visit?",
        target_entity_type: "place"
      });
      fetchMissions();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to add mission:", error);
    }
  };

  return (
    <div className="family-voices page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Family Voices & Missions</h1>
          <p className="text-muted text-lg">Manage real human voices and complete memory missions to train the AI.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={20} /> Create Mission
        </button>
      </header>

      {showForm && (
        <div className="card record-form-card mb-4">
          <h3 className="mb-4">Create a New Mission</h3>
          
          <div className="form-group mt-3">
            <label>Prompt / Question for the family to ask the patient</label>
            <textarea className="form-input" rows="2" placeholder="Amma, can you tell us about the old house in Guwahati?"></textarea>
          </div>

          <div className="record-form-actions mt-4 pt-4 border-top">
            <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            <div className="flex-gap">
              <button className="btn btn-primary" onClick={handleAddMission}>Save Mission</button>
            </div>
          </div>
        </div>
      )}

      <h3 className="mb-3 mt-4">Active Missions</h3>
      <div className="voices-grid">
        {loading ? (
          <p>Loading missions...</p>
        ) : missions.length === 0 ? (
          <p className="text-muted">No active missions right now.</p>
        ) : (
          missions.map(mission => (
            <div key={mission.id} className="card voice-card">
              <div className="voice-card-header">
                <div className="voice-avatar" style={{backgroundColor: '#e0e7ff'}}>
                  <Target size={24} className="text-primary" />
                </div>
                <div className="voice-info">
                  <h4>{mission.title}</h4>
                  <span className="text-sm text-muted">Status: {mission.status}</span>
                </div>
              </div>
              
              <div className="voice-message mt-3">
                <p className="font-medium text-primary">Prompt: "{mission.prompt_text}"</p>
                <p className="text-sm mt-2 text-muted">Target: {mission.target_entity_type}</p>
              </div>

              <div className="voice-actions mt-4 pt-3 border-top" style={{display: 'flex', gap: '0.5rem'}}>
                <button 
                  className={`btn ${isRecording ? 'btn-danger' : 'btn-primary'}`} 
                  onClick={() => setIsRecording(!isRecording)}
                  style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                  <Mic size={16} className="mr-2" /> 
                  {isRecording ? 'Stop Recording' : 'Record Answer'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
