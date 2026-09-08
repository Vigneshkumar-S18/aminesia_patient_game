import React, { useEffect, useState } from 'react';
import { Activity, Brain, Bell, AlertTriangle } from 'lucide-react';
import api from '../api';
import './Dashboard.css';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const patientId = "patient_001"; // Hardcoded for demo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, alertsRes] = await Promise.all([
          api.get(`/patients/${patientId}/analytics`),
          api.get(`/patients/${patientId}/alerts`)
        ]);
        setAnalytics(analyticsRes.data);
        setAlerts(alertsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="dashboard page-content">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard page-content">
      <header className="page-header">
        <h1>Good morning, Caregiver</h1>
        <p className="text-muted text-lg">Here's how {analytics?.patient_name || 'your loved one'} is doing today.</p>
      </header>

      <div className="summary-cards">
        <div className="card summary-card">
          <div className="summary-icon"><Brain className="text-primary" size={24} /></div>
          <div className="summary-details">
            <span className="summary-label">Completion Rate</span>
            <span className="summary-value">{Math.round((analytics?.weekly_completion_rate || 0) * 100)}%</span>
          </div>
        </div>
        <div className="card summary-card">
          <div className="summary-icon"><Activity className="text-secondary" size={24} /></div>
          <div className="summary-details">
            <span className="summary-label">Avg Session</span>
            <span className="summary-value">{analytics?.avg_session_duration_minutes || 0} min</span>
          </div>
        </div>
        <div className="card summary-card">
          <div className="summary-icon"><Bell className="text-warning" size={24} /></div>
          <div className="summary-details">
            <span className="summary-label">Active Alerts</span>
            <span className="summary-value">{analytics?.recent_alerts_count || 0}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card">
          <h3>Engagement & Task Performance</h3>
          <p className="text-muted text-sm mb-4">Routine compliance and memory stats</p>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span className="text-muted">Routine Compliance</span>
              <span className="font-medium">{Math.round((analytics?.routine_compliance_percent || 0) * 100)}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span className="text-muted">Total Memories Saved</span>
              <span className="font-medium">{analytics?.total_memories_count || 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <span className="text-muted">Recent Difficulty Level</span>
              <span className="font-medium">Level {analytics?.recent_difficulty_level || 1}</span>
            </div>
          </div>
        </div>

        <div className="card alert-card">
          <div className="alert-header">
            <AlertTriangle className="text-warning" size={24} />
            <h3>Routine & Alerts</h3>
          </div>
          <div className="alert-content">
            {alerts.length === 0 ? (
              <p className="text-muted mt-2">No active alerts at this time. All routines are on track.</p>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="mt-3 mb-3 pb-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <p className="text-danger font-medium mb-1">{alert.title}</p>
                  <p className="text-sm text-muted">{alert.message}</p>
                  <span className="text-xs text-muted mt-1 block">
                    Severity: {alert.severity}
                  </span>
                </div>
              ))
            )}
            <button className="btn btn-outline mt-4 w-full">View All Alerts</button>
          </div>
        </div>
      </div>
    </div>
  );
}
