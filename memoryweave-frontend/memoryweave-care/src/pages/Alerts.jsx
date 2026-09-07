import React from 'react';
import { AlertTriangle, BellRing, Info } from 'lucide-react';
import './Alerts.css';

export default function Alerts() {
  return (
    <div className="alerts-page page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Alerts</h1>
          <p className="text-muted text-lg">Actionable events requiring caregiver attention.</p>
        </div>
      </header>

      <div className="vault-toolbar mb-4">
        <div className="filters">
          <button className="btn btn-outline active">All</button>
          <button className="btn btn-outline">Important</button>
          <button className="btn btn-outline">Routine</button>
          <button className="btn btn-outline">Reminders</button>
        </div>
      </div>

      <div className="alerts-list">
        {/* Important Alert */}
        <div className="card alert-item important-alert">
          <div className="alert-icon-wrapper">
            <AlertTriangle size={24} className="text-warning" />
          </div>
          <div className="alert-main">
            <div className="alert-header-row">
              <h4>Routine deviation</h4>
              <span className="text-sm text-muted">Today • 10:45 AM</span>
            </div>
            <p className="font-medium mt-1">Asha hasn't started her usual morning Memory Journey.</p>
            
            <div className="alert-detail-box mt-3">
              <div className="detail-grid">
                <div>
                  <span className="text-sm text-muted">Asha's usual pattern:</span>
                  <p className="font-medium">Memory Journey → 10:00 AM</p>
                </div>
                <div>
                  <span className="text-sm text-muted">Today's status:</span>
                  <p className="font-medium text-danger">Not started by 11:00 AM</p>
                </div>
              </div>
            </div>

            <div className="alert-actions mt-3">
              <button className="btn btn-primary">Call Asha</button>
              <button className="btn btn-outline">Send Reminder</button>
              <button className="btn btn-outline text-muted ml-auto">Dismiss</button>
            </div>
          </div>
        </div>

        {/* Attention Alert */}
        <div className="card alert-item attention-alert">
          <div className="alert-icon-wrapper">
            <BellRing size={24} className="text-danger" />
          </div>
          <div className="alert-main">
            <div className="alert-header-row">
              <h4>Reminder missed</h4>
              <span className="text-sm text-muted">Today • 8:15 AM</span>
            </div>
            <p className="mt-1">Morning hydration reminder was not acknowledged.</p>
            <div className="alert-actions mt-3">
              <button className="btn btn-outline">View Details</button>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="card alert-item info-alert">
          <div className="alert-icon-wrapper">
            <Info size={24} className="text-primary" />
          </div>
          <div className="alert-main">
            <div className="alert-header-row">
              <h4>New memory contribution</h4>
              <span className="text-sm text-muted">Yesterday</span>
            </div>
            <p className="mt-1">Anita added a new family story.</p>
            <div className="alert-actions mt-3">
              <button className="btn btn-outline">Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
