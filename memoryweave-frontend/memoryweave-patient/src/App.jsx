import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import JourneyIntro from './pages/JourneyIntro';
import MemoryJourney from './pages/MemoryJourney';
import Reminder from './pages/Reminder';
import Settings from './pages/Settings';
import { Settings as SettingsIcon } from 'lucide-react';
import './App.css';

function SettingsButton() {
  const location = useLocation();
  // Don't show settings button on the journey or intro screens to avoid distraction
  if (location.pathname === '/journey' || location.pathname === '/intro') {
    return null;
  }
  
  return (
    <Link to="/settings" className="floating-settings-btn">
      <SettingsIcon size={32} />
    </Link>
  );
}

function App() {
  return (
    <Router>
      <div className="patient-app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<JourneyIntro />} />
          <Route path="/journey" element={<MemoryJourney />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <SettingsButton />
      </div>
    </Router>
  );
}

export default App;
