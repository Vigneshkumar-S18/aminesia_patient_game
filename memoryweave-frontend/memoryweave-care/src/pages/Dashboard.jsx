import React from 'react';
import { Activity, Brain, Bell, AlertTriangle } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard page-content">
      <header className="page-header">
        <h1>Good morning, Anita</h1>
        <p className="text-muted text-lg">Here's how Asha is doing today.</p>
      </header>

      <div className="summary-cards">
        <div className="card summary-card">
          <div className="summary-icon"><Brain className="text-primary" size={24} /></div>
          <div className="summary-details">
            <span className="summary-label">Memory</span>
            <span className="summary-value">Stable</span>
          </div>
        </div>
        <div className="card summary-card">
          <div className="summary-icon"><Activity className="text-secondary" size={24} /></div>
          <div className="summary-details">
            <span className="summary-label">Engagement</span>
            <span className="summary-value">18 min</span>
          </div>
        </div>
        <div className="card summary-card">
          <div className="summary-icon"><Bell className="text-warning" size={24} /></div>
          <div className="summary-details">
            <span className="summary-label">Reminders</span>
            <span className="summary-value">2 / 3</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card">
          <h3>Engagement & Task Performance</h3>
          <p className="text-muted text-sm mb-4">Daily cognitive engagement minutes</p>
          <div className="mock-chart">
            {/* Simple mock chart visualization */}
            <div className="chart-bars">
              <div className="bar-wrapper"><div className="bar" style={{ height: '40%' }}></div><span>Mon</span></div>
              <div className="bar-wrapper"><div className="bar" style={{ height: '60%' }}></div><span>Tue</span></div>
              <div className="bar-wrapper"><div className="bar" style={{ height: '80%' }}></div><span>Wed</span></div>
              <div className="bar-wrapper"><div className="bar" style={{ height: '85%' }}></div><span>Thu</span></div>
              <div className="bar-wrapper"><div className="bar" style={{ height: '70%' }}></div><span>Fri</span></div>
              <div className="bar-wrapper"><div className="bar" style={{ height: '90%', background: 'var(--primary)' }}></div><span>Sat</span></div>
            </div>
          </div>
        </div>

        <div className="card alert-card">
          <div className="alert-header">
            <AlertTriangle className="text-warning" size={24} />
            <h3>Routine Insight</h3>
          </div>
          <div className="alert-content">
            <p className="text-danger font-medium mb-2">Today's interaction pattern differs from the usual pattern.</p>
            <div className="routine-comparison">
              <div className="routine-normal">
                <span className="text-sm text-muted">Normally:</span>
                <p>Morning Memory Journey<br/>✓ Completed by 10:30 AM</p>
              </div>
              <div className="routine-today mt-3">
                <span className="text-sm text-muted">Today:</span>
                <p>Not completed</p>
              </div>
            </div>
            <button className="btn btn-outline mt-4">Check In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
