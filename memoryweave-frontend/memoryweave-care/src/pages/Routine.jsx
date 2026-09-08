import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, AlertCircle, AlertTriangle, Coffee, Brain, Droplets, Sun, Pill } from 'lucide-react';
import api from '../api';
import './Routine.css';

export default function Routine() {
  const [showAdd, setShowAdd] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newReminder, setNewReminder] = useState({
    title: "",
    scheduled_time: "08:00",
    reminder_type: "MEDICATION"
  });

  const patientId = "patient_001"; // Hardcoded for demo

  const fetchReminders = async () => {
    try {
      const response = await api.get(`/patients/${patientId}/reminders`);
      setReminders(response.data);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleAddReminder = async () => {
    try {
      await api.post(`/patients/${patientId}/reminders`, newReminder);
      setShowAdd(false);
      fetchReminders();
    } catch (error) {
      console.error("Failed to add reminder:", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'MEDICATION': return <Pill size={20} />;
      case 'HYDRATION': return <Droplets size={20} />;
      case 'MEAL': return <Coffee size={20} />;
      default: return <Brain size={20} />;
    }
  };

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
            <h3 className="mb-4">Today's Reminders</h3>
            
            {loading ? (
              <p>Loading...</p>
            ) : reminders.length === 0 ? (
              <p className="text-muted">No reminders scheduled for today.</p>
            ) : (
              <div className="timeline">
                {reminders.map((item, idx) => (
                  <div key={idx} className={`timeline-item ${item.status}`}>
                    <div className="timeline-time">{item.scheduled_time}</div>
                    <div className="timeline-marker">
                      {item.status === 'completed' && <CheckCircle2 size={24} className="text-secondary" />}
                      {item.status === 'scheduled' && <Circle size={24} className="text-muted" />}
                      {item.status === 'missed' && <AlertCircle size={24} className="text-danger" />}
                      <div className="timeline-line"></div>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-icon">{getIcon(item.reminder_type)}</div>
                      <span className="timeline-title font-medium">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="routine-side-section">
          {showAdd && (
            <div className="card add-reminder-card mb-4">
              <h3 className="mb-4">Add Reminder</h3>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                  placeholder="Morning Medicine" 
                />
              </div>
              <div className="form-group grid-2-col mt-3">
                <div>
                  <label>Time</label>
                  <input 
                    type="time" 
                    className="form-input w-100" 
                    value={newReminder.scheduled_time}
                    onChange={(e) => setNewReminder({...newReminder, scheduled_time: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <label>Category</label>
                <select 
                  className="form-input"
                  value={newReminder.reminder_type}
                  onChange={(e) => setNewReminder({...newReminder, reminder_type: e.target.value})}
                >
                  <option value="MEDICATION">Medicine</option>
                  <option value="MEAL">Meal</option>
                  <option value="HYDRATION">Hydration</option>
                  <option value="ACTIVITY">Activity</option>
                </select>
              </div>

              <div className="form-actions mt-4 pt-4 border-top">
                <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddReminder}>Save Reminder</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
