import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Volume2 } from 'lucide-react';
import api from '../api';
import { saveEventToQueue } from '../sync';
import './MemoryJourney.css';

export default function MemoryJourney() {
  const navigate = useNavigate();
  
  const [sessionId, setSessionId] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  
  // UI states
  const [feedback, setFeedback] = useState(null); // 'success' | 'try_again'
  const [feedbackText, setFeedbackText] = useState("");
  const [isListening, setIsListening] = useState(false);
  
  const recognitionRef = useRef(null);

  const patientId = "patient_001"; // Hardcoded for demo

  useEffect(() => {
    // Setup Speech Recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Fallback to Assamese locally if supported

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleAnswer(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    // Start session on mount
    const startSession = async () => {
      try {
        const response = await api.post(`/patients/${patientId}/sessions/start`, {
          session_type: "memory_journey",
          preferred_language: "assamese",
          voice_enabled: true
        });
        setSessionId(response.data.session_id);
        setActivity(response.data.activity);
      } catch (error) {
        console.error("Failed to start session:", error);
      } finally {
        setLoading(false);
      }
    };
    startSession();
  }, []);

  const handleAnswer = async (answer) => {
    if (!sessionId || !activity) return;

    try {
      const response = await api.post(`/sessions/${sessionId}/events`, {
        event_type: "ANSWER_SUBMITTED",
        activity_id: activity.activity_id,
        answer: answer,
        expected_answer: activity.expected_answer,
        response_time_ms: 2000,
        hint_used: false
      });
      
      const { is_correct, feedback_message, next_activity } = response.data;
      
      setFeedback(is_correct ? 'success' : 'try_again');
      setFeedbackText(feedback_message);
      speakText(feedback_message);
      
      setTimeout(() => {
        setFeedback(null);
        if (next_activity) {
          setActivity(next_activity);
        } else {
          setIsComplete(true);
        }
      }, 3000);

    } catch (error) {
      console.warn("Failed to submit event online, queuing for offline sync.");
      saveEventToQueue({
        event_type: "ANSWER_SUBMITTED",
        activity_id: activity.activity_id,
        answer: answer,
        expected_answer: activity.expected_answer,
        response_time_ms: 2000,
        hint_used: false
      });
      // Fallback UI progression for offline
      setFeedback('success');
      setFeedbackText("Saved offline!");
      setTimeout(() => {
        setFeedback(null);
        setIsComplete(true);
      }, 2500);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Recognition already started");
      }
    } else {
      alert("Voice recognition is not supported on this browser.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSkip = () => {
    handleAnswer("skip");
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
          <button className="btn-cancel-listen" onClick={stopListening}>Cancel</button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="journey-page"><h2 className="question-text">Starting Memory Journey...</h2></div>;
  }

  if (isComplete) {
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

  if (!activity) {
    return <div className="journey-page"><h2>Failed to load activity.</h2></div>;
  }

  return (
    <div className="journey-page">
      {renderFeedbackOverlay()}
      {renderListeningOverlay()}
      
      <h2 className="question-text">{activity.prompt}</h2>
      
      <div className="activity-media">
        {activity.media_url ? (
           <img src={activity.media_url} alt="Memory" className="mock-photo" style={{objectFit: 'cover'}} />
        ) : (
           <div className="mock-photo person-photo">👩🏽</div>
        )}
      </div>

      <button className="btn-listen-question mb-4" onClick={() => speakText(activity.prompt)}>
        <Volume2 size={32} />
        <span>Play Prompt</span>
      </button>

      <div className={`options-${activity.options?.length > 2 ? 'grid-vertical' : 'grid'}`}>
        {activity.options?.map((opt, index) => (
          <button key={index} className="btn-huge opt-btn" onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>

      <div className="voice-interaction">
        <button className="voice-btn" onClick={startListening}>
          <Mic size={40} />
          <span>Speak</span>
        </button>
      </div>
      
      <button className="btn-skip" onClick={handleSkip}>I don't know</button>
    </div>
  );
}
