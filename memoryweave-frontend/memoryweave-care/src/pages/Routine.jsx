import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, AlertCircle, AlertTriangle, Coffee, Brain, Droplets, Sun, Pill } from 'lucide-react';
import './Routine.css';

export default function Routine() {
  const [showAdd, setShowAdd] = useState(false);
  
  const routineItems = [
    { time: '06:30 AM', title: 'Wake Up', icon: <Sun size={20} />, status: 'completed' },
    { time: '07:00 AM', title: 'Medicine', icon: <Pill size={20} />, status: 'completed' },
    { time: '08:00 AM', title: 'Breakfast', icon: <Coffee size={20} />, status: 'completed' },
    { time: '10:00 AM', title: 'Memory Journey', icon: <Brain size={20} />, status: 'missed' },
    { time: '12:30 PM', title: 'Lunch', icon: <Coffee size={20} />, status: 'pending' },
    { time: '02:00 PM', title: 'Hydration', icon: <Droplets size={20} />, status: 'pending' },
  ];

  return (
    <div className="routine-page page-content">
      <header className="page-header vault-header">
        <div>
          <h1>Routine & Reminders</h1>
          <p className="text-muted text-lg">Manage Asha's daily schedule and non-clinical reminders.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={20} /> Add Reminder
        </button>
      </header>

      <div className="routine-grid">
        <div className="routine-timeline-section">
          <div className="card">
            <h3 className="mb-4">Today's Routine</h3>
            
            <div className="timeline">
              {routineItems.map((item, idx) => (
                <div key={idx} className={`timeline-item ${item.status}`}>
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-marker">
                    {item.status === 'completed' && <CheckCircle2 size={24} className="text-secondary" />}
                    {item.status === 'pending' && <Circle size={24} className="text-muted" />}
                    {item.status === 'missed' && <AlertCircle size={24} className="text-danger" />}
                    <div className="timeline-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-icon">{item.icon}</div>
                    <span className="timeline-title font-medium">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="routine-side-section">
          {showAdd && (
            <div className="card add-reminder-card mb-4">
              <h3 className="mb-4">Add Reminder</h3>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-input" defaultValue="Morning Medicine" />
              </div>
              <div className="form-group grid-2-col mt-3">
                <div>
                  <label>Time</label>
                  <input type="time" className="form-input w-100" defaultValue="07:00" />
                </div>
                <div>
                  <label>Repeat</label>
                  <select className="form-input w-100"><option>Every day</option></select>
                </div>
              </div>
              <div className="form-group mt-3">
                <label>Category</label>
                <select className="form-input"><option>Medicine</option></select>
              </div>
              
              <div className="form-group mt-4">
                <label>Reminder Method</label>
                <div className="checkbox-group">
                  <label className="check-label"><input type="checkbox" defaultChecked /> Visual</label>
                  <label className="check-label"><input type="checkbox" defaultChecked /> Voice</label>
                  <label className="check-label"><input type="checkbox" /> Vibration</label>
                </div>
              </div>

              <div className="form-group mt-3">
                <label>Voice to use</label>
                <select className="form-input"><option>Anita's Voice (Daughter)</option></select>
              </div>

              <div className="form-actions mt-4 pt-4 border-top">
                <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setShowAdd(false)}>Save Reminder</button>
              </div>
            </div>
          )}

          <div className="card alert-card">
            <div className="alert-header">
              <AlertTriangle size={24} className="text-warning" />
              <h3>Smart Routine Insight</h3>
            </div>
            <div className="alert-content">
              <p className="mb-3 font-medium">Routine differs from usual today.</p>
              
              <div className="insight-box">
                <span className="text-sm text-muted">MemoryWeave learned:</span>
                <p className="font-medium mt-1">Usual Memory Journey is 10:00–10:20 AM.</p>
              </div>
              
              <div className="insight-box mt-2 error-box">
                <span className="text-sm text-muted">Today:</span>
                <p className="font-medium mt-1 text-danger">Not started by 11:00 AM.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
