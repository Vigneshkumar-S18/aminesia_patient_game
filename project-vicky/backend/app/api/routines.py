from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.database import get_db
from app.models.care import Routine
from app.schemas.care import RoutineCreate, RoutineResponse

router = APIRouter(prefix="/patients/{patient_id}/routines", tags=["Routines"])

@router.get("", response_model=List[RoutineResponse])
def get_patient_routines(patient_id: str, db: Session = Depends(get_db)):
    return db.query(Routine).filter(Routine.patient_id == patient_id).all()

@router.post("", response_model=RoutineResponse)
def create_routine(patient_id: str, req: RoutineCreate, db: Session = Depends(get_db)):
    routine = Routine(
        id=f"R{uuid.uuid4().hex[:8]}",
        patient_id=patient_id,
        title=req.title,
        category=req.category,
        scheduled_time=req.scheduled_time,
        recurrence=req.recurrence,
        voice_prompt_url=req.voice_prompt_url
    )
    db.add(routine)
    db.commit()
    db.refresh(routine)
    return routine
