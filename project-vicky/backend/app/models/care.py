import datetime
from sqlalchemy import Column, String, DateTime, Float, Boolean, ForeignKey, Integer, JSON
from app.database import Base

class Routine(Base):
    __tablename__ = "routines"

    id = Column(String, primary_key=True, index=True) # e.g. R101
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    title = Column(String, nullable=False) # e.g. 'Morning Tea & Medicine'
    category = Column(String, default="medication") # 'medication', 'meal', 'walk', 'hydration', 'rest'
    scheduled_time = Column(String, nullable=False) # '08:00'
    recurrence = Column(String, default="daily")
    voice_prompt_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class RoutineEvent(Base):
    __tablename__ = "routine_events"

    id = Column(String, primary_key=True, index=True)
    routine_id = Column(String, ForeignKey("routines.id"), nullable=False, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    scheduled_date = Column(String, nullable=False) # 'YYYY-MM-DD'
    scheduled_time = Column(String, nullable=False) # '08:00'
    completed_at = Column(DateTime, nullable=True)
    status = Column(String, default="pending") # 'pending', 'completed', 'missed', 'deviated'
    deviation_minutes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(String, primary_key=True, index=True) # e.g. REM101
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    reminder_type = Column(String, default="MEDICATION") # MEDICATION, HYDRATION, MEAL, ACTIVITY, APPOINTMENT, FAMILY_CALL
    scheduled_time = Column(String, nullable=False)
    voice_recording_url = Column(String, nullable=True)
    created_by = Column(String, nullable=True)
    status = Column(String, default="scheduled") # 'scheduled', 'completed', 'skipped', 'missed'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ReminderEvent(Base):
    __tablename__ = "reminder_events"

    id = Column(String, primary_key=True, index=True)
    reminder_id = Column(String, ForeignKey("reminders.id"), nullable=False, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    action = Column(String, nullable=False) # 'OPENED', 'COMPLETED', 'SKIPPED'
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class FamilyMission(Base):
    __tablename__ = "family_missions"

    id = Column(String, primary_key=True, index=True) # e.g. FM101
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    title = Column(String, nullable=False) # e.g. "Record story about her favorite market in Assam"
    prompt_text = Column(String, nullable=False)
    target_entity_type = Column(String, default="place") # 'person', 'place', 'event', 'story'
    status = Column(String, default="pending") # 'pending', 'recorded', 'verified'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class MissionResponse(Base):
    __tablename__ = "mission_responses"

    id = Column(String, primary_key=True, index=True)
    mission_id = Column(String, ForeignKey("family_missions.id"), nullable=False, index=True)
    caregiver_id = Column(String, ForeignKey("caregiver_profiles.id"), nullable=False)
    audio_url = Column(String, nullable=True)
    transcription = Column(String, nullable=True)
    extracted_entities = Column(JSON, default=dict)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True) # e.g. ALT101
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    alert_type = Column(String, nullable=False) # ROUTINE_DEVIATION, MISSED_REMINDER, LOW_ENGAGEMENT, SYNC_FAILURE
    title = Column(String, nullable=False)
    message = Column(String, nullable=False) # Grounded non-diagnostic message!
    severity = Column(String, default="info") # 'info', 'warning', 'critical'
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SyncEvent(Base):
    __tablename__ = "sync_events"

    id = Column(String, primary_key=True, index=True) # e.g. SE101
    event_id = Column(String, unique=True, index=True, nullable=False)
    device_id = Column(String, nullable=False)
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    event_type = Column(String, nullable=False) # ANSWER_SUBMITTED, REMINDER_COMPLETED, etc.
    payload = Column(JSON, default=dict)
    sequence_number = Column(Integer, default=1)
    status = Column(String, default="processed")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
