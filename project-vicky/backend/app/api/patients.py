from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.database import get_db
from app.models.user import PatientProfile, User
from app.schemas.patient import PatientCreate, PatientResponse

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.get("", response_model=List[PatientResponse])
def list_patients(db: Session = Depends(get_db)):
    return db.query(PatientProfile).all()

@router.post("", response_model=PatientResponse)
def create_patient(req: PatientCreate, db: Session = Depends(get_db)):
    user_id = f"U{uuid.uuid4().hex[:8]}"
    user = User(
        id=user_id,
        email=f"patient_{uuid.uuid4().hex[:4]}@memoryweave.app",
        hashed_password="demo_password_hash",
        full_name=req.name,
        role="patient"
    )
    db.add(user)
    db.commit()

    pat_id = f"P{uuid.uuid4().hex[:8]}"
    patient = PatientProfile(
        id=pat_id,
        user_id=user_id,
        name=req.name,
        preferred_language=req.preferred_language,
        date_of_birth=req.date_of_birth,
        timezone=req.timezone,
        region=req.region,
        profile_photo_url=req.profile_photo_url,
        accessibility_preferences=req.accessibility_preferences.dict() if req.accessibility_preferences else {
            "font_size": "large",
            "voice_enabled": True,
            "voice_speed": 1.0,
            "contrast_mode": "normal",
            "haptic_enabled": True,
            "preferred_input": "voice_and_touch"
        }
    )
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient

@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(patient_id: str, db: Session = Depends(get_db)):
    pat = db.query(PatientProfile).filter(PatientProfile.id == patient_id).first()
    if not pat:
        raise HTTPException(status_code=404, detail="Patient not found")
    return pat

from app.schemas.patient import PatientHomeResponse

@router.get("/{patient_id}/home", response_model=PatientHomeResponse)
def get_patient_home(patient_id: str, db: Session = Depends(get_db)):
    pat = db.query(PatientProfile).filter(PatientProfile.id == patient_id).first()
    if not pat:
        raise HTTPException(status_code=404, detail="Patient not found")
        
    from app.models.care import Reminder
    active_reminders_count = db.query(Reminder).filter(Reminder.patient_id == patient_id, Reminder.status == "scheduled").count()
    
    import datetime
    hour = datetime.datetime.now().hour
    greeting = "Good evening"
    if hour < 12: greeting = "Good morning"
    elif hour < 17: greeting = "Good afternoon"
        
    return PatientHomeResponse(
        greeting=f"{greeting}, {pat.name}",
        next_activity="Memory Journey",
        pending_reminders=active_reminders_count,
        family_updates=0,
        voice_enabled=pat.accessibility_preferences.get("voice_enabled", True),
        language=pat.preferred_language
    )
