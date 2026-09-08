from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict, Any

class AccessibilityPreferences(BaseModel):
    font_size: str = "large"
    voice_enabled: bool = True
    voice_speed: float = 1.0
    contrast_mode: str = "normal"
    haptic_enabled: bool = True
    preferred_input: str = "voice_and_touch"

class PatientCreate(BaseModel):
    name: str
    preferred_language: str = "assamese"
    date_of_birth: Optional[str] = None
    timezone: str = "Asia/Kolkata"
    region: str = "North-East India (NER)"
    profile_photo_url: Optional[str] = None
    accessibility_preferences: Optional[AccessibilityPreferences] = None

class PatientResponse(BaseModel):
    id: str
    user_id: str
    name: str
    preferred_language: str
    date_of_birth: Optional[str]
    timezone: str
    region: str
    profile_photo_url: Optional[str]
    accessibility_preferences: Dict[str, Any]

    model_config = ConfigDict(from_attributes=True)

class PatientHomeResponse(BaseModel):
    greeting: str
    next_activity: str
    pending_reminders: int
    family_updates: int
    voice_enabled: bool
    language: str
