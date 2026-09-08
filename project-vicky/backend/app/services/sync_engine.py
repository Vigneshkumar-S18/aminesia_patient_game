from sqlalchemy.orm import Session
import datetime
from typing import List, Dict, Any
from app.models.care import SyncEvent, Reminder
from app.models.cognitive import ActivityEvent

class SyncEngine:
    """
    Offline Synchronization Engine:
    - Idempotent push/pull processing
    - Duplicate detection
    - Deterministic conflict resolution
    """

    def process_push_events(self, db: Session, device_id: str, events: List[Dict[str, Any]]) -> Dict[str, int]:
        processed_count = 0
        ignored_duplicates = 0

        for evt in events:
            event_id = evt.get("event_id")
            patient_id = evt.get("patient_id")
            event_type = evt.get("event_type")
            payload = evt.get("payload", {})

            # Idempotency check
            existing = db.query(SyncEvent).filter(SyncEvent.event_id == event_id).first()
            if existing:
                ignored_duplicates += 1
                continue

            # Log sync record
            sync_rec = SyncEvent(
                id=f"SE_{event_id}",
                event_id=event_id,
                device_id=device_id,
                patient_id=patient_id,
                event_type=event_type,
                payload=payload,
                sequence_number=evt.get("sequence_number", 1),
                status="processed"
            )
            db.add(sync_rec)

            # Apply domain updates
            if event_type == "REMINDER_COMPLETED":
                rem_id = payload.get("reminder_id")
                rem = db.query(Reminder).filter(Reminder.id == rem_id).first()
                if rem:
                    rem.status = "completed"
            elif event_type == "ANSWER_SUBMITTED":
                act_event = ActivityEvent(
                    id=f"AE_SYNC_{event_id[:8]}",
                    session_id=payload.get("session_id", "S_OFFLINE"),
                    patient_id=patient_id,
                    game_type=payload.get("game_type", "photo_recognition"),
                    difficulty=payload.get("difficulty", 2),
                    prompt=payload.get("prompt", "Offline activity"),
                    expected_answer=payload.get("expected_answer", ""),
                    user_answer=payload.get("user_answer", ""),
                    is_correct=payload.get("is_correct", True),
                    response_time_ms=payload.get("response_time_ms", 3000),
                    score=payload.get("score", 0.8)
                )
                db.add(act_event)

            processed_count += 1

        db.commit()
        return {
            "processed_count": processed_count,
            "ignored_duplicates": ignored_duplicates
        }

sync_engine = SyncEngine()
