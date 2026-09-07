import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Brain, Mic, Calendar, BarChart2, Bell, Users, Settings } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const navItems = [
    { name: 'Overview', icon: <Home size={20} />, path: '/' },
    { name: 'Patient', icon: <User size={20} />, path: '/patient' },
    { name: 'Memory Vault', icon: <Brain size={20} />, path: '/vault' },
    { name: 'Family Voices', icon: <Mic size={20} />, path: '/voices' },
    { name: 'Routine & Reminders', icon: <Calendar size={20} />, path: '/routine' },
    { name: 'Cognitive Journey', icon: <BarChart2 size={20} />, path: '/analytics' },
    { name: 'Alerts', icon: <Bell size={20} />, path: '/alerts' },
    { name: 'Family Contributions', icon: <Users size={20} />, path: '/family' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>MEMORYWEAVE</h2>
        <span className="badge">CARE</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="patient-selector">
          <div className="avatar">👵</div>
          <div className="patient-info">
            <span className="patient-name">Asha Devi</span>
            <span className="patient-status text-sm text-muted">Active now</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
