import datetime
from sqlalchemy import Column, String, DateTime, Float, Boolean, ForeignKey, Integer, JSON
from app.database import Base

class GameTemplate(Base):
    __tablename__ = "game_templates"

    id = Column(String, primary_key=True, index=True) # e.g. GT_PHOTO_REC
    game_type = Column(String, nullable=False) # PHOTO_RECOGNITION, PERSON_MATCHING, OBJECT_RECOGNITION, SEQUENCE_RECALL, ROUTINE_RECALL, SOUND_RECOGNITION
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    min_difficulty = Column(Integer, default=1)
    max_difficulty = Column(Integer, default=5)
    instructions = Column(JSON, default=dict) # {"assamese": "...", "english": "..."}
    input_type = Column(String, default="multiple_choice") # 'multiple_choice', 'voice', 'matching'
    scoring_rules = Column(JSON, default=dict)
    is_active = Column(Boolean, default=True)

class GameSession(Base):
    __tablename__ = "game_sessions"

    id = Column(String, primary_key=True, index=True) # e.g. S1001
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    session_type = Column(String, default="memory_journey")
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    starting_difficulty = Column(Integer, default=2)
    current_difficulty = Column(Integer, default=2)
    completion_status = Column(String, default="in_progress") # 'in_progress', 'completed', 'abandoned'
    language = Column(String, default="assamese")
    voice_enabled = Column(Boolean, default=True)

class ActivityEvent(Base):
    __tablename__ = "activity_events"

    id = Column(String, primary_key=True, index=True) # e.g. AE101
    session_id = Column(String, ForeignKey("game_sessions.id"), nullable=False, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    game_type = Column(String, nullable=False)
    difficulty = Column(Integer, default=2)
    memory_id = Column(String, ForeignKey("memories.id"), nullable=True)
    prompt = Column(String, nullable=False)
    expected_answer = Column(String, nullable=False)
    user_answer = Column(String, nullable=True)
    is_correct = Column(Boolean, default=False)
    response_time_ms = Column(Integer, default=0)
    hint_used = Column(Boolean, default=False)
    event_type = Column(String, default="ANSWER_SUBMITTED") # ANSWER_SUBMITTED, HINT_REQUESTED, ACTIVITY_SKIPPED
    score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class PerformanceProfile(Base):
    __tablename__ = "performance_profiles"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, unique=True, index=True)
    memory_recall_score = Column(Float, default=0.75)
    recognition_score = Column(Float, default=0.80)
    attention_score = Column(Float, default=0.70)
    sequence_score = Column(Float, default=0.65)
    response_speed_score = Column(Float, default=0.70)
    engagement_score = Column(Float, default=0.85)
    current_difficulty_level = Column(Integer, default=2)
    total_sessions_completed = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
