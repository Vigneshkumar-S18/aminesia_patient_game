from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.sync import SyncPushRequest, SyncPushResponse
from app.services.sync_engine import sync_engine

router = APIRouter(prefix="/sync", tags=["Offline Synchronization"])

@router.post("/push", response_model=SyncPushResponse)
def sync_push_events(req: SyncPushRequest, db: Session = Depends(get_db)):
    events_data = [e.model_dump() for e in req.events]
    result = sync_engine.process_push_events(db, req.device_id, events_data)
    return SyncPushResponse(
        status="success",
        processed_count=result["processed_count"],
        ignored_duplicates=result["ignored_duplicates"]
    )
