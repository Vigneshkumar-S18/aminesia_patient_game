from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import uuid
from app.models.memory import MemoryItem, PersonEntity, PlaceEntity, EventEntity, ObjectEntity, MemoryRelationship
from app.services.ai_provider import ai_provider

class MemoryEngine:
    """
    Manages the Personal Memory Graph (Who + Where + When + What + Familiarity + Provenance).
    """

    def create_memory(
        self,
        db: Session,
        patient_id: str,
        title: str,
        description: str,
        media_url: Optional[str] = None,
        media_type: str = "photo",
        familiarity_score: float = 0.9,
        created_by: str = "caregiver"
    ) -> MemoryItem:
        memory_id = f"M{uuid.uuid4().hex[:8]}"
        memory = MemoryItem(
            id=memory_id,
            patient_id=patient_id,
            title=title,
            description=description,
            media_url=media_url,
            media_type=media_type,
            familiarity_score=familiarity_score,
            source="caregiver",
            confidence=1.0,
            verified=False,
            consent_status=True,
            created_by=created_by
        )
        db.add(memory)
        db.commit()

        # Ingest memory into entity memory graph using AI / Rule extractor
        extracted = ai_provider.extract_memory_entities(description or title, media_type)

        # Ingest people
        for person_name in extracted.get("people", []):
            person = PersonEntity(
                id=f"PER{uuid.uuid4().hex[:8]}",
                patient_id=patient_id,
                memory_id=memory_id,
                name=person_name,
                relationship="Family Member",
                familiarity_score=familiarity_score,
                confidence=1.0,
                source="extracted"
            )
            db.add(person)

        # Ingest places
        for place_name in extracted.get("places", []):
            place = PlaceEntity(
                id=f"PLC{uuid.uuid4().hex[:8]}",
                patient_id=patient_id,
                memory_id=memory_id,
                name=place_name,
                place_type="familiar_location",
                familiarity_score=familiarity_score,
                confidence=1.0,
                source="extracted"
            )
            db.add(place)

        # Ingest events
        for event_name in extracted.get("events", []):
            evt = EventEntity(
                id=f"EVT{uuid.uuid4().hex[:8]}",
                patient_id=patient_id,
                memory_id=memory_id,
                name=event_name,
                people_involved=extracted.get("people", []),
                places_involved=extracted.get("places", []),
                familiarity_score=familiarity_score,
                confidence=1.0,
                source="extracted"
            )
            db.add(evt)

        db.commit()
        db.refresh(memory)
        return memory

    def get_patient_memories(self, db: Session, patient_id: str) -> List[MemoryItem]:
        return db.query(MemoryItem).filter(MemoryItem.patient_id == patient_id).all()

    def get_high_familiarity_memories(self, db: Session, patient_id: str, threshold: float = 0.8) -> List[MemoryItem]:
        return db.query(MemoryItem).filter(
            MemoryItem.patient_id == patient_id,
            MemoryItem.familiarity_score >= threshold
        ).all()

memory_engine = MemoryEngine()
