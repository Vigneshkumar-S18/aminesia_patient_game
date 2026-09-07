import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, Mic, CheckCircle } from 'lucide-react';
import './MemoryJourney.css';

export default function MemoryJourney() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAnswer = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setStep(1); // Proceed to next question logic
    }, 2000);
  };

  const finishJourney = () => {
    navigate('/');
  };

  if (step === 1) {
    return (
      <div className="page-wrapper journey-page">
        <h2 className="text-2xl mb-4 text-muted">Where was this photo taken?</h2>
        <div className="memory-photo-container mb-4">
          <div className="mock-photo place-photo">🏡</div>
        </div>
        <div className="options-grid">
          <button className="btn-huge opt-btn" onClick={finishJourney}>Home</button>
          <button className="btn-huge opt-btn" onClick={finishJourney}>Garden</button>
          <button className="btn-huge opt-btn" onClick={finishJourney}>Market</button>
        </div>
        <div className="voice-interaction mt-4">
          <button className="voice-btn"><Mic size={40} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper journey-page">
      <div className="flower-icon mb-4">🌸</div>
      
      <div className="voice-prompt mb-4">
        <button className="btn-sound"><Volume2 size={40} className="text-primary" /></button>
        <p className="prompt-text">"Do you know her?"</p>
      </div>

      <div className="memory-photo-container mb-4">
        <div className="mock-photo person-photo">👩</div>
        <div className="photo-label">LAKSHMI</div>
      </div>

      {showSuccess ? (
        <div className="success-overlay">
          <CheckCircle size={80} className="text-secondary mb-4" />
          <h2 className="text-3xl text-secondary">Great!</h2>
        </div>
      ) : (
        <div className="options-row mb-4">
          <button className="btn-huge opt-btn" onClick={handleAnswer}>Daughter</button>
          <button className="btn-huge opt-btn">Sister</button>
        </div>
      )}

      <div className="voice-interaction">
        <button 
          className={`voice-btn ${isListening ? 'recording' : ''}`}
          onClick={() => setIsListening(!isListening)}
        >
          <Mic size={48} />
        </button>
      </div>
    </div>
  );
}
