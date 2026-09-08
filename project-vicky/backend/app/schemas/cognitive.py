from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class SessionStartRequest(BaseModel):
    session_type: str = "memory_journey"
    preferred_language: Optional[str] = "assamese"
    voice_enabled: bool = True

class ActivityPayload(BaseModel):
    activity_id: str
    type: str # photo_recognition, person_matching, object_recognition, sequence_recall, routine_recall
    difficulty: int
    memory_id: Optional[str] = None
    prompt: str
    options: List[str] = []
    media_url: Optional[str] = None
    voice_url: Optional[str] = None
    hint: Optional[str] = None
    expected_answer: Optional[str] = None

class SessionStartResponse(BaseModel):
    session_id: str
    duration_target_minutes: int = 5
    language: str
    voice_enabled: bool
    current_difficulty: int
    activity: ActivityPayload

class EventSubmitRequest(BaseModel):
    event_type: str = "ANSWER_SUBMITTED" # ANSWER_SUBMITTED, HINT_REQUESTED, ACTIVITY_SKIPPED
    activity_id: str
    answer: Optional[str] = None
    expected_answer: Optional[str] = None
    response_time_ms: int = 0
    hint_used: bool = False

class EventSubmitResponse(BaseModel):
    is_correct: bool
    score: float
    feedback_message: str
    difficulty_change: str # 'increased', 'maintained', 'decreased'
    next_activity: Optional[ActivityPayload] = None
