import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Volume2, Droplets, Coffee, Brain } from 'lucide-react';
import api from '../api';
import './Reminder.css';

export default function Reminder() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  const patientId = "patient_001"; // Hardcoded for demo

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await api.get(`/patients/${patientId}/reminders`);
        const activeReminders = response.data.filter(r => r.status === "scheduled");
        setReminders(activeReminders);
      } catch (error) {
        console.error("Failed to fetch reminders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  const handleComplete = async (reminderId) => {
    try {
      await api.post(`/patients/${patientId}/reminders/${reminderId}/complete`);
      setReminders(reminders.filter(r => r.id !== reminderId));
      if (reminders.length <= 1) {
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to complete reminder:", error);
    }
  };

  const playReminderAudio = (reminder) => {
    if (reminder.voice_recording_url) {
      const audio = new Audio(reminder.voice_recording_url);
      audio.play();
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = `It's time for ${reminder.title}. ${reminder.description || ''}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-IN';
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  if (loading) {
    return <div className="reminder-page"><h1 className="reminder-title text-white">Loading...</h1></div>;
  }

  if (reminders.length === 0) {
    return (
      <div className="reminder-page">
        <div className="reminder-card">
          <h1 className="reminder-title text-dark">You have no active reminders!</h1>
          <button className="btn-huge bg-primary text-white mt-4" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const currentReminder = reminders[0];

  const renderIcon = (type) => {
    switch (type) {
      case 'MEDICATION': return <Pill size={100} className="reminder-icon text-primary mb-4" />;
      case 'HYDRATION': return <Droplets size={100} className="reminder-icon text-primary mb-4" />;
      case 'MEAL': return <Coffee size={100} className="reminder-icon text-primary mb-4" />;
      default: return <Brain size={100} className="reminder-icon text-primary mb-4" />;
    }
  };

  return (
    <div className="reminder-page">
      <div className="reminder-card">
        {renderIcon(currentReminder.reminder_type)}
        
        <h1 className="reminder-title">{currentReminder.title}</h1>
        {currentReminder.description && <p className="text-muted text-lg mt-2">{currentReminder.description}</p>}
        
        <button className="btn-listen-reminder mt-4 mb-4" onClick={() => playReminderAudio(currentReminder)}>
          <Volume2 size={40} className="text-secondary" />
          <span className="text-secondary">"Play Voice Note"</span>
        </button>

        <div className="reminder-actions mt-4">
          <button 
            className="btn-huge bg-primary text-white" 
            onClick={() => handleComplete(currentReminder.id)}
          >
            OK, Done
          </button>
          
          <button 
            className="btn-huge btn-outline-reminder"
            onClick={() => {
              if (reminders.length > 1) {
                setReminders([...reminders.slice(1), reminders[0]]);
              } else {
                navigate('/');
              }
            }}
          >
            Remind me later
          </button>
        </div>
      </div>
    </div>
  );
}
