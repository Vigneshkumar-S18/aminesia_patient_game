import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Volume2 } from 'lucide-react';
import './Reminder.css';

export default function Reminder() {
  const navigate = useNavigate();

  return (
    <div className="reminder-page">
      <div className="reminder-card">
        <Pill size={100} className="reminder-icon text-primary mb-4" />
        
        <h1 className="reminder-title">It's medicine time.</h1>
        
        <button className="btn-listen-reminder mt-4 mb-4">
          <Volume2 size={40} className="text-secondary" />
          <span className="text-secondary">"Amma, take your medicine."</span>
        </button>

        <div className="reminder-actions mt-4">
          <button 
            className="btn-huge bg-primary text-white" 
            onClick={() => navigate('/')}
          >
            OK
          </button>
          
          <button 
            className="btn-huge btn-outline-reminder"
            onClick={() => navigate('/')}
          >
            Remind me later
          </button>
        </div>
      </div>
    </div>
  );
}
