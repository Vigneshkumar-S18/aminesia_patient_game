from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.memory import MemoryItem, PersonEntity
from app.schemas.memory import MemoryCreate, MemoryResponse, PersonCreate, PersonResponse
from app.services.memory_engine import memory_engine

router = APIRouter(prefix="/patients/{patient_id}/memories", tags=["Memories"])

@router.get("", response_model=List[MemoryResponse])
def get_patient_memories(patient_id: str, db: Session = Depends(get_db)):
    return memory_engine.get_patient_memories(db, patient_id)

@router.post("", response_model=MemoryResponse)
def create_memory(patient_id: str, req: MemoryCreate, db: Session = Depends(get_db)):
    return memory_engine.create_memory(
        db=db,
        patient_id=patient_id,
        title=req.title,
        description=req.description or req.title,
        media_url=req.media_url,
        media_type=req.media_type,
        familiarity_score=req.familiarity_score
    )

@router.patch("/{memory_id}/verify", response_model=MemoryResponse)
def verify_memory(patient_id: str, memory_id: str, db: Session = Depends(get_db)):
    mem = db.query(MemoryItem).filter(MemoryItem.id == memory_id, MemoryItem.patient_id == patient_id).first()
    if not mem:
        raise HTTPException(status_code=404, detail="Memory not found")
    mem.verified = True
    db.commit()
    db.refresh(mem)
    return mem

@router.get("/people", response_model=List[PersonResponse])
def get_patient_people(patient_id: str, db: Session = Depends(get_db)):
    return db.query(PersonEntity).filter(PersonEntity.patient_id == patient_id).all()
