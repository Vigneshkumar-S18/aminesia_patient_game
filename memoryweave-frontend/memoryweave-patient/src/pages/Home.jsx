import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Bell, Mic, Music } from 'lucide-react';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page-patient">
      <div className="greeting-section">
        <h1 className="greeting-text">Good morning, Asha ❤️</h1>
        <p className="greeting-subtext">Ready for a little journey?</p>
      </div>

      <div className="main-action-section">
        <button 
          className="btn-hero-journey" 
          onClick={() => navigate('/intro')}
        >
          <Brain size={64} className="mb-4" />
          <span>MEMORY JOURNEY</span>
          <div className="btn-hero-arrow">Start →</div>
        </button>
      </div>

      <div className="secondary-actions-section">
        <button 
          className="btn-secondary-patient"
          onClick={() => navigate('/reminder')}
        >
          <Bell size={32} />
          <span>Reminders</span>
        </button>

        <button className="btn-secondary-patient">
          <Music size={32} />
          <span>Listen</span>
        </button>
      </div>

      <div className="voice-action-section mt-4">
        <button className="btn-voice-main">
          <Mic size={40} />
          <span>Talk to me</span>
        </button>
      </div>
    </div>
  );
}
