import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import MemoryJourney from './pages/MemoryJourney';
import Reminder from './pages/Reminder';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/journey" element={<MemoryJourney />} />
          <Route path="/reminder" element={<Reminder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
