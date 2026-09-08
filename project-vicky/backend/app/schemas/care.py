from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any

class RoutineCreate(BaseModel):
    title: str
    category: str = "medication"
    scheduled_time: str # e.g. '08:00'
    recurrence: str = "daily"
    voice_prompt_url: Optional[str] = None

class RoutineResponse(BaseModel):
    id: str
    patient_id: str
    title: str
    category: str
    scheduled_time: str
    recurrence: str
    voice_prompt_url: Optional[str]
    is_active: bool

    model_config = ConfigDict(from_attributes=True)

class ReminderCreate(BaseModel):
    title: str
    description: Optional[str] = None
    reminder_type: str = "MEDICATION"
    scheduled_time: str
    voice_recording_url: Optional[str] = None

class ReminderResponse(BaseModel):
    id: str
    patient_id: str
    title: str
    description: Optional[str]
    reminder_type: str
    scheduled_time: str
    voice_recording_url: Optional[str]
    status: str

    model_config = ConfigDict(from_attributes=True)

class AlertResponse(BaseModel):
    id: str
    patient_id: str
    alert_type: str
    title: str
    message: str
    severity: str
    is_read: bool
    created_at: Any

    model_config = ConfigDict(from_attributes=True)

class CaregiverAnalyticsResponse(BaseModel):
    patient_id: str
    patient_name: str
    weekly_completion_rate: float
    avg_session_duration_minutes: float
    recent_difficulty_level: int
    performance_scores: Dict[str, float]
    recent_alerts_count: int
    routine_compliance_percent: float
    total_memories_count: int
