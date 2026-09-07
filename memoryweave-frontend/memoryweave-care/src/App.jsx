import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MemoryVault from './pages/MemoryVault';
import Login from './pages/Login';
import Patient from './pages/Patient';
import FamilyVoices from './pages/FamilyVoices';
import Routine from './pages/Routine';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Family from './pages/Family';
import Settings from './pages/Settings';
import './App.css';

function AppLayout() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  if (isLogin) {
    return <Routes><Route path="/login" element={<Login />} /></Routes>;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/vault" element={<MemoryVault />} />
          <Route path="/voices" element={<FamilyVoices />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/family" element={<Family />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
