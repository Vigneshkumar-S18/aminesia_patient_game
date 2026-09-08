from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.cognitive import SessionStartRequest, SessionStartResponse, EventSubmitRequest, EventSubmitResponse
from app.services.cognitive_engine import cognitive_engine

router = APIRouter(tags=["Sessions"])

@router.post("/patients/{patient_id}/sessions/start", response_model=SessionStartResponse)
def start_patient_session(patient_id: str, req: SessionStartRequest, db: Session = Depends(get_db)):
    return cognitive_engine.start_session(
        db=db,
        patient_id=patient_id,
        session_type=req.session_type,
        preferred_language=req.preferred_language or "assamese",
        voice_enabled=req.voice_enabled
    )

@router.post("/sessions/{session_id}/events", response_model=EventSubmitResponse)
def submit_activity_event(session_id: str, req: EventSubmitRequest, db: Session = Depends(get_db)):
    try:
        return cognitive_engine.process_event(
            db=db,
            session_id=session_id,
            activity_id=req.activity_id,
            answer=req.answer or "",
            response_time_ms=req.response_time_ms,
            hint_used=req.hint_used,
            event_type=req.event_type
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
