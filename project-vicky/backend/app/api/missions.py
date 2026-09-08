from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import uuid
import datetime

from app.database import get_db
from app.models.care import FamilyMission

class MissionCreate(BaseModel):
    title: str
    prompt_text: str
    target_entity_type: str = "place"

class MissionResponse(BaseModel):
    id: str
    patient_id: str
    title: str
    prompt_text: str
    target_entity_type: str
    status: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

router = APIRouter(prefix="/patients/{patient_id}/missions", tags=["Missions"])

@router.get("", response_model=List[MissionResponse])
def get_missions(patient_id: str, db: Session = Depends(get_db)):
    return db.query(FamilyMission).filter(FamilyMission.patient_id == patient_id).all()

@router.post("", response_model=MissionResponse)
def create_mission(patient_id: str, req: MissionCreate, db: Session = Depends(get_db)):
    mission = FamilyMission(
        id=f"FM{uuid.uuid4().hex[:8]}",
        patient_id=patient_id,
        title=req.title,
        prompt_text=req.prompt_text,
        target_entity_type=req.target_entity_type
    )
    db.add(mission)
    db.commit()
    db.refresh(mission)
    return mission
