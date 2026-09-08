from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.user import PatientProfile, CaregiverProfile, CaregiverPatient
from app.schemas.patient import PatientResponse

router = APIRouter(prefix="/caregiver", tags=["Caregiver Dashboard"])

@router.get("/patients", response_model=List[PatientResponse])
def get_caregiver_assigned_patients(db: Session = Depends(get_db)):
    # Return all patient profiles for demo caregiver context
    return db.query(PatientProfile).all()
