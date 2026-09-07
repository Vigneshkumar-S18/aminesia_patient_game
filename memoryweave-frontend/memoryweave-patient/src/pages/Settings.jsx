import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, Type, Globe, Home } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="patient-settings-page">
      <h1 className="settings-title">Settings</h1>
      
      <div className="settings-list-patient">
        <div className="setting-item">
          <Volume2 size={40} className="text-primary" />
          <span className="setting-label">Volume</span>
          <div className="setting-controls">
            <button className="btn-setting-adjust">-</button>
            <span className="setting-value">High</span>
            <button className="btn-setting-adjust">+</button>
          </div>
        </div>

        <div className="setting-item">
          <Type size={40} className="text-primary" />
          <span className="setting-label">Text Size</span>
          <div className="setting-controls">
            <button className="btn-setting-adjust">-</button>
            <span className="setting-value">Large</span>
            <button className="btn-setting-adjust">+</button>
          </div>
        </div>

        <div className="setting-item">
          <Globe size={40} className="text-primary" />
          <span className="setting-label">Language</span>
          <div className="setting-controls">
            <span className="setting-value mr-2">Assamese</span>
            <button className="btn-setting-adjust">Change</button>
          </div>
        </div>
      </div>

      <button className="btn-home-return mt-4" onClick={() => navigate('/')}>
        <Home size={32} />
        <span>Return Home</span>
      </button>
    </div>
  );
}
