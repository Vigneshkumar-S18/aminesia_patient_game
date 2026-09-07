import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, Heart, Check, Clock } from 'lucide-react';
import './Reminder.css';

export default function Reminder() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper reminder-page">
      <div className="heart-icon mb-4">
        <Heart size={80} className="text-danger" fill="currentColor" />
      </div>
      
      <h1 className="reminder-title mb-4">
        Amma, it's time<br/>for your medicine.
      </h1>

      <div className="voice-prompt reminder-voice mb-4">
        <button className="btn-sound"><Volume2 size={40} className="text-primary" /></button>
        <p className="prompt-text">"Take your medicine, Amma."</p>
      </div>

      <div className="reminder-actions mt-4">
        <button className="btn-huge btn-primary mb-2" onClick={() => navigate('/')}>
          <Check size={36} className="btn-icon" />
          Okay
        </button>
        
        <button className="btn-huge" onClick={() => navigate('/')}>
          <Clock size={36} className="btn-icon text-muted" />
          Remind me later
        </button>
      </div>
    </div>
  );
}
