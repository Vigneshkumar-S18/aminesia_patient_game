from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.database import get_db
from app.models.care import Reminder
from app.schemas.care import ReminderCreate, ReminderResponse

router = APIRouter(prefix="/patients/{patient_id}/reminders", tags=["Reminders"])

@router.get("", response_model=List[ReminderResponse])
def get_patient_reminders(patient_id: str, db: Session = Depends(get_db)):
    return db.query(Reminder).filter(Reminder.patient_id == patient_id).all()

@router.post("", response_model=ReminderResponse)
def create_reminder(patient_id: str, req: ReminderCreate, db: Session = Depends(get_db)):
    reminder = Reminder(
        id=f"REM{uuid.uuid4().hex[:8]}",
        patient_id=patient_id,
        title=req.title,
        description=req.description,
        reminder_type=req.reminder_type,
        scheduled_time=req.scheduled_time,
        voice_recording_url=req.voice_recording_url,
        status="scheduled"
    )
    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return reminder

@router.post("/{reminder_id}/complete", response_model=ReminderResponse)
def complete_reminder(patient_id: str, reminder_id: str, db: Session = Depends(get_db)):
    rem = db.query(Reminder).filter(Reminder.id == reminder_id, Reminder.patient_id == patient_id).first()
    if rem:
        rem.status = "completed"
        db.commit()
        db.refresh(rem)
    return rem
