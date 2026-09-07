import React from 'react';
import { User, Globe, Brain, Shield, Bell, Cloud, Info } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  return (
    <div className="settings-page page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Settings</h1>
          <p className="text-muted text-lg">Manage MemoryWeave configurations and privacy.</p>
        </div>
      </header>

      <div className="settings-grid">
        <div className="settings-column">
          
          {/* Account */}
          <div className="card settings-section">
            <div className="settings-header">
              <User size={20} className="text-primary" />
              <h3>Account</h3>
            </div>
            <div className="settings-list">
              <button className="settings-item">Profile</button>
              <button className="settings-item">Caregiver account</button>
              <button className="settings-item">Family members</button>
            </div>
          </div>

          {/* Patient Experience / Language */}
          <div className="card settings-section">
            <div className="settings-header">
              <Globe size={20} className="text-primary" />
              <h3>Patient Experience & Language</h3>
            </div>
            <div className="settings-form mt-3">
              <div className="form-group">
                <label>Primary language</label>
                <select className="form-input"><option>Assamese</option><option>English</option></select>
              </div>
              <div className="form-group mt-3">
                <label>Voice type</label>
                <select className="form-input"><option>Female</option></select>
              </div>
              <div className="form-group mt-3">
                <label>Family voice preference</label>
                <select className="form-input"><option>Anita</option></select>
              </div>
              <div className="form-group mt-3">
                <label>Secondary language</label>
                <select className="form-input"><option>English</option></select>
              </div>
              <button className="btn btn-outline mt-3 text-sm">✓ Download language pack</button>
            </div>
          </div>

          {/* AI Personalization */}
          <div className="card settings-section">
            <div className="settings-header">
              <Brain size={20} className="text-primary" />
              <h3>AI Personalization</h3>
            </div>
            <div className="settings-list mt-2">
              <div className="toggle-item">
                <span>Adaptive difficulty</span>
                <span className="text-secondary font-medium">ON</span>
              </div>
              <div className="toggle-item">
                <span>Familiarity preference</span>
                <span className="text-secondary font-medium">ON</span>
              </div>
              <div className="toggle-item">
                <span>Voice assistance</span>
                <span className="text-secondary font-medium">ON</span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-column">
          
          {/* Privacy & Security */}
          <div className="card settings-section privacy-card">
            <div className="settings-header">
              <Shield size={20} className="text-primary" />
              <h3>Privacy & Consent</h3>
            </div>
            <div className="settings-list mt-2">
              <div className="toggle-item">
                <span>Memory Collection</span>
                <span className="text-secondary font-medium">● Enabled</span>
              </div>
              <div className="toggle-item">
                <span>Voice Recording</span>
                <span className="text-secondary font-medium">● Enabled</span>
              </div>
              <div className="toggle-item">
                <span>AI Personalization</span>
                <span className="text-secondary font-medium">● Enabled</span>
              </div>
              <div className="toggle-item">
                <span>Caregiver Analytics</span>
                <span className="text-secondary font-medium">● Enabled</span>
              </div>
              <div className="toggle-item">
                <span>Data Sharing</span>
                <span className="text-muted font-medium">○ Disabled</span>
              </div>
            </div>
            <button className="btn btn-outline mt-4 w-100">View Consent Details</button>
          </div>

          {/* Notifications */}
          <div className="card settings-section">
            <div className="settings-header">
              <Bell size={20} className="text-primary" />
              <h3>Notifications</h3>
            </div>
            <div className="settings-list">
              <button className="settings-item">Push notifications</button>
              <button className="settings-item">Reminder notifications</button>
              <button className="settings-item">Alert preferences</button>
            </div>
          </div>

          {/* Offline & Sync */}
          <div className="card settings-section">
            <div className="settings-header">
              <Cloud size={20} className="text-primary" />
              <h3>Offline & Sync</h3>
            </div>
            <div className="settings-list">
              <button className="settings-item">Offline mode <span className="text-sm text-muted">ON</span></button>
              <button className="settings-item">Last sync <span className="text-sm text-muted">10 mins ago</span></button>
              <button className="settings-item text-primary font-medium">Sync now</button>
            </div>
          </div>

          {/* About */}
          <div className="card settings-section">
            <div className="settings-header">
              <Info size={20} className="text-primary" />
              <h3>About</h3>
            </div>
            <div className="settings-list">
              <button className="settings-item">MemoryWeave version <span className="text-sm text-muted">v1.0.0</span></button>
              <button className="settings-item">Help</button>
              <button className="settings-item">Privacy policy</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
