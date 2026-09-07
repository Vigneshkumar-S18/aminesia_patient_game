import React from 'react';
import { Settings, ExternalLink, Activity, Volume2, Maximize, WifiOff } from 'lucide-react';
import './Patient.css';

export default function Patient() {
  return (
    <div className="patient-page page-content">
      <header className="page-header">
        <h1>Patient Profile</h1>
      </header>

      <div className="patient-main-grid">
        <div className="patient-summary card">
          <div className="patient-hero">
            <div className="avatar-large">👵</div>
            <div className="patient-info-hero">
              <h2>Asha Devi</h2>
              <p className="text-muted text-lg">72 years • Assamese</p>
              <div className="status-badge"><span className="dot active"></span> Active</div>
            </div>
          </div>
          
          <div className="patient-actions mt-4">
            <button className="btn btn-outline">Edit Profile</button>
            <button className="btn btn-primary">Patient Mode <ExternalLink size={18} /></button>
          </div>
        </div>

        <div className="patient-details card">
          <h3>Personal Details</h3>
          <div className="details-grid mt-4">
            <div className="detail-item">
              <span className="text-muted text-sm">Name</span>
              <span className="font-medium">Asha Devi</span>
            </div>
            <div className="detail-item">
              <span className="text-muted text-sm">Age</span>
              <span className="font-medium">72</span>
            </div>
            <div className="detail-item">
              <span className="text-muted text-sm">Preferred Language</span>
              <span className="font-medium">Assamese</span>
            </div>
            <div className="detail-item">
              <span className="text-muted text-sm">Location</span>
              <span className="font-medium">Guwahati</span>
            </div>
            <div className="detail-item">
              <span className="text-muted text-sm">Caregiver</span>
              <span className="font-medium">Anita Devi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="patient-secondary-grid mt-4">
        <div className="card">
          <h3 className="mb-4">Support Preferences</h3>
          <div className="preferences-list">
            <div className="pref-item">
              <div className="pref-icon"><Volume2 size={20} className="text-primary"/></div>
              <div className="pref-content">
                <span className="font-medium">Voice assistance</span>
              </div>
              <span className="status-on">ON</span>
            </div>
            <div className="pref-item">
              <div className="pref-icon"><Activity size={20} className="text-secondary"/></div>
              <div className="pref-content">
                <span className="font-medium">Adaptive difficulty</span>
              </div>
              <span className="status-on">ON</span>
            </div>
            <div className="pref-item">
              <div className="pref-icon"><Maximize size={20} className="text-warning"/></div>
              <div className="pref-content">
                <span className="font-medium">Large-text mode</span>
              </div>
              <span className="status-on">ON</span>
            </div>
            <div className="pref-item">
              <div className="pref-icon"><WifiOff size={20} className="text-muted"/></div>
              <div className="pref-content">
                <span className="font-medium">Offline mode</span>
              </div>
              <span className="status-on">ON</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-4">Personalization Profile</h3>
          <div className="ai-profile">
            <div className="profile-section">
              <span className="text-sm text-muted">Memory anchors</span>
              <p className="font-medium">12 people • 6 places • 8 events • 9 objects</p>
            </div>
            <div className="profile-section">
              <span className="text-sm text-muted">Preferred interaction</span>
              <p className="font-medium">Voice + Images</p>
            </div>
            <div className="profile-section">
              <span className="text-sm text-muted">Current adaptation</span>
              <p className="font-medium">Moderate assistance</p>
            </div>
            <div className="profile-section">
              <span className="text-sm text-muted">Most engaging content</span>
              <p className="font-medium text-primary">Family photos • Music • Home memories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
