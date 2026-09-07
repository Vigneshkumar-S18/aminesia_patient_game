import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Volume2, Play } from 'lucide-react';
import './JourneyIntro.css';

export default function JourneyIntro() {
  const navigate = useNavigate();

  return (
    <div className="journey-intro-page">
      <div className="intro-content">
        <Brain size={80} className="text-primary mb-4 intro-icon" />
        
        <h1 className="intro-title">YOUR MEMORY JOURNEY</h1>
        <p className="intro-subtitle">A few moments together</p>
        
        <div className="intro-duration">
          <span>~ 8 minutes</span>
        </div>

        <button 
          className="btn-start-journey mt-4"
          onClick={() => navigate('/journey')}
        >
          START JOURNEY
        </button>

        <button className="btn-listen-intro mt-4">
          <Volume2 size={32} />
          <span>Listen</span>
        </button>
      </div>
    </div>
  );
}
