from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class MemoryCreate(BaseModel):
    title: str
    description: Optional[str] = None
    media_url: Optional[str] = None
    media_type: str = "photo" # photo, voice, story, text
    familiarity_score: float = 0.9

class PersonCreate(BaseModel):
    name: str
    relationship: str
    nickname: Optional[str] = None
    photo_url: Optional[str] = None
    voice_recording_url: Optional[str] = None
    familiarity_score: float = 0.95

class MemoryResponse(BaseModel):
    id: str
    patient_id: str
    title: str
    description: Optional[str]
    media_url: Optional[str]
    media_type: str
    source: str
    confidence: float
    verified: bool
    consent_status: bool
    familiarity_score: float

    model_config = ConfigDict(from_attributes=True)

class PersonResponse(BaseModel):
    id: str
    patient_id: str
    name: str
    relationship: str
    nickname: Optional[str]
    photo_url: Optional[str]
    voice_recording_url: Optional[str]
    familiarity_score: float

    model_config = ConfigDict(from_attributes=True)
