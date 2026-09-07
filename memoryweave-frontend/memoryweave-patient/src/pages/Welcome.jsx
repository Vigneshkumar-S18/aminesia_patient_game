import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Music, Mic, Volume2 } from 'lucide-react';
import './Welcome.css';

export default function Welcome() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const toggleListen = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="page-wrapper welcome-page">
      <h1 className="greeting mb-4">Good Morning, Asha ❤️</h1>
      <div className="sun-icon mb-4">🌅</div>
      
      <div className="voice-prompt mb-4">
        <button className="btn-sound"><Volume2 size={40} className="text-primary" /></button>
        <p className="prompt-text">"What would you like to do today?"</p>
      </div>

      <div className="action-buttons mb-4">
        <button className="btn-huge mb-2" onClick={() => navigate('/journey')}>
          <Brain size={40} className="text-primary btn-icon" />
          PLAY & REMEMBER
        </button>
        
        <button className="btn-huge">
          <Music size={40} className="text-secondary btn-icon" />
          LISTEN
        </button>
      </div>

      <div className="voice-interaction">
        <button 
          className={`voice-btn ${isListening ? 'recording' : ''}`}
          onClick={toggleListen}
        >
          <Mic size={48} />
        </button>
        <p className="text-muted text-lg">{isListening ? 'Listening...' : 'Speak'}</p>
      </div>
    </div>
  );
}
