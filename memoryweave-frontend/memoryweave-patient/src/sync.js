import api from './api';

const QUEUE_KEY = 'memoryweave_offline_events';

export const saveEventToQueue = (eventPayload) => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  queue.push({
    id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    payload: eventPayload
  });
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  
  // Try to sync immediately if online
  if (navigator.onLine) {
    flushQueue();
  }
};

export const flushQueue = async () => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  if (queue.length === 0) return;

  const patientId = "patient_001"; // Hardcoded for demo

  try {
    // Send batch to backend
    await api.post(`/sync/push`, {
      device_id: patientId,
      events: queue
    });
    
    // Clear queue on success
    localStorage.removeItem(QUEUE_KEY);
    console.log(`Successfully synced ${queue.length} events.`);
  } catch (error) {
    console.error("Failed to sync offline events:", error);
  }
};

// Listen for connection restoration
window.addEventListener('online', flushQueue);
