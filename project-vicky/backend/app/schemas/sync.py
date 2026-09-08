from pydantic import BaseModel
from typing import List, Dict, Any

class SyncPushEvent(BaseModel):
    event_id: str
    device_id: str
    patient_id: str
    event_type: str
    payload: Dict[str, Any]
    sequence_number: int = 1

class SyncPushRequest(BaseModel):
    device_id: str
    events: List[SyncPushEvent]

class SyncPushResponse(BaseModel):
    status: str = "success"
    processed_count: int
    ignored_duplicates: int
