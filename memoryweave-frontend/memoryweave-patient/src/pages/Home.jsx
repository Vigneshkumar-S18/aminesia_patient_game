import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Bell, Mic, Music } from 'lucide-react';
import api from '../api';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const PATIENT_ID = "patient_001"; // Hardcoded for demo

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await api.get(`/patients/${PATIENT_ID}/home`);
        setHomeData(response.data);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) {
    return <div className="home-page-patient"><div className="greeting-text">Loading...</div></div>;
  }

  return (
    <div className="home-page-patient">
      <div className="greeting-section">
        <h1 className="greeting-text">{homeData?.greeting || 'Hello'} ❤️</h1>
        <p className="greeting-subtext">Ready for a little journey?</p>
      </div>

      <div className="main-action-section">
        <button 
          className="btn-hero-journey" 
          onClick={() => navigate('/intro')}
        >
          <Brain size={64} className="mb-4" />
          <span>{homeData?.next_activity?.toUpperCase() || 'MEMORY JOURNEY'}</span>
          <div className="btn-hero-arrow">Start →</div>
        </button>
      </div>

      <div className="secondary-actions-section">
        <button 
          className="btn-secondary-patient"
          onClick={() => navigate('/reminder')}
        >
          <Bell size={32} />
          <span>Reminders {homeData?.pending_reminders > 0 && `(${homeData.pending_reminders})`}</span>
        </button>

        <button className="btn-secondary-patient">
          <Music size={32} />
          <span>Listen</span>
        </button>
      </div>

      {homeData?.voice_enabled && (
        <div className="voice-action-section mt-4">
          <button className="btn-voice-main">
            <Mic size={40} />
            <span>Talk to me</span>
          </button>
        </div>
      )}
    </div>
  );
}
