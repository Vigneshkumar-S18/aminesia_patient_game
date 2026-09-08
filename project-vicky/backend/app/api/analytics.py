from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.care import Alert
from app.schemas.care import CaregiverAnalyticsResponse, AlertResponse
from app.services.care_engine import care_engine

router = APIRouter(prefix="/patients/{patient_id}", tags=["Analytics & Alerts"])

@router.get("/analytics", response_model=CaregiverAnalyticsResponse)
def get_patient_analytics(patient_id: str, db: Session = Depends(get_db)):
    return care_engine.get_caregiver_analytics(db, patient_id)

@router.get("/alerts", response_model=List[AlertResponse])
def get_patient_alerts(patient_id: str, db: Session = Depends(get_db)):
    # Run routine deviation check on query
    care_engine.check_routine_deviations(db, patient_id)
    return db.query(Alert).filter(Alert.patient_id == patient_id).all()
