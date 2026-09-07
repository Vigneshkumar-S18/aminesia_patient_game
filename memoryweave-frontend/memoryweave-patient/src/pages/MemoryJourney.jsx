import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Volume2 } from 'lucide-react';
import './MemoryJourney.css';

export default function MemoryJourney() {
  const navigate = useNavigate();
  
  // 0: Family Recognition, 1: Adaptive Help, 2: Place, 3: Completed
  const [step, setStep] = useState(0); 
  
  // UI states
  const [feedback, setFeedback] = useState(null); // 'success' | 'try_again'
  const [feedbackText, setFeedbackText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleCorrect = () => {
    setFeedback('success');
    setFeedbackText("That's right! ❤️");
    setTimeout(() => {
      setFeedback(null);
      setStep(prev => prev + 1);
    }, 2500);
  };

  const handleIncorrect = () => {
    setFeedback('try_again');
    setFeedbackText("That's okay. Let's try together.");
    setTimeout(() => {
      setFeedback(null);
      // Move to adaptive help if on step 0
      if (step === 0) setStep(1); 
    }, 3000);
  };

  const handleSkip = () => {
    setFeedback('success');
    setFeedbackText("No problem. Let's move on.");
    setTimeout(() => {
      setFeedback(null);
      setStep(prev => prev + 1);
    }, 2000);
  };

  const finishJourney = () => {
    navigate('/');
  };

  const renderFeedbackOverlay = () => {
    if (!feedback) return null;
    return (
      <div className="feedback-overlay">
        <div className={`feedback-card ${feedback}`}>
          <h2>{feedbackText}</h2>
        </div>
      </div>
    );
  };

  const renderListeningOverlay = () => {
    if (!isListening) return null;
    return (
      <div className="listening-overlay">
        <div className="listening-card">
          <div className="listening-pulse"></div>
          <h2>Listening...</h2>
          <button className="btn-cancel-listen" onClick={() => setIsListening(false)}>Cancel</button>
        </div>
      </div>
    );
  };

  // --- Step 0: Family Recognition ---
  if (step === 0) {
    return (
      <div className="journey-page">
        {renderFeedbackOverlay()}
        {renderListeningOverlay()}
        
        <h2 className="question-text">Who is this?</h2>
        
        <div className="activity-media">
          <div className="mock-photo person-photo">👩🏽</div>
        </div>

        <button className="btn-listen-question mb-4">
          <Volume2 size={32} />
          <span>"Who is this?"</span>
        </button>

        <div className="options-grid">
          <button className="btn-huge opt-btn" onClick={handleIncorrect}>Lakshmi</button>
          <button className="btn-huge opt-btn" onClick={handleCorrect}>Anita</button>
        </div>

        <div className="voice-interaction">
          <button className="voice-btn" onClick={() => setIsListening(true)}>
            <Mic size={40} />
            <span>Speak</span>
          </button>
        </div>
        
        <button className="btn-skip" onClick={handleSkip}>I don't know</button>
      </div>
    );
  }

  // --- Step 1: Adaptive Help (Family Recognition Level 3) ---
  if (step === 1) {
    return (
      <div className="journey-page">
        {renderFeedbackOverlay()}
        {renderListeningOverlay()}
        
        <h2 className="question-text">This is Anita. Is this Anita?</h2>
        
        <div className="activity-media highlight-border">
          <div className="mock-photo person-photo">👩🏽</div>
        </div>

        <button className="btn-listen-question mb-4">
          <Volume2 size={32} className="text-secondary" />
          <span className="text-secondary">"This is Anita. Is this Anita?"</span>
        </button>

        <div className="options-grid">
          <button className="btn-huge opt-btn bg-success" onClick={handleCorrect}>YES</button>
          <button className="btn-huge opt-btn" onClick={handleSkip}>NO</button>
        </div>

        <div className="voice-interaction">
          <button className="voice-btn" onClick={() => setIsListening(true)}>
            <Mic size={40} />
            <span>Speak</span>
          </button>
        </div>
      </div>
    );
  }

  // --- Step 2: Place Recognition ---
  if (step === 2) {
    return (
      <div className="journey-page">
        {renderFeedbackOverlay()}
        {renderListeningOverlay()}
        
        <h2 className="question-text">Where is this?</h2>
        
        <div className="activity-media">
          <div className="mock-photo place-photo">🏡</div>
        </div>

        <div className="options-grid-vertical">
          <button className="btn-huge opt-btn" onClick={handleCorrect}>Home</button>
          <button className="btn-huge opt-btn" onClick={handleIncorrect}>Garden</button>
          <button className="btn-huge opt-btn" onClick={handleIncorrect}>Market</button>
        </div>

        <div className="voice-interaction">
          <button className="voice-btn" onClick={() => setIsListening(true)}>
            <Mic size={40} />
            <span>Speak</span>
          </button>
        </div>

        <button className="btn-skip" onClick={handleSkip}>I don't know</button>
      </div>
    );
  }

  // --- Step 3: Journey Complete ---
  return (
    <div className="journey-complete-page">
      <div className="complete-card">
        <h1 className="complete-title">❤️</h1>
        <h1 className="complete-title">Wonderful, Asha!</h1>
        
        <p className="complete-subtitle">
          You spent some time remembering today.
        </p>

        <div className="flower-icon mb-4">🌸</div>

        <button className="btn-huge bg-primary text-white mt-4" onClick={finishJourney}>
          Go Home
        </button>
      </div>
    </div>
  );
}
