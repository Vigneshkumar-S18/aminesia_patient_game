from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.cognitive import GameTemplate

router = APIRouter(prefix="/games", tags=["Games"])

@router.get("")
def list_games(db: Session = Depends(get_db)):
    templates = db.query(GameTemplate).all()
    if not templates:
        return [
            {
                "id": "GT_PHOTO_REC",
                "game_type": "PHOTO_RECOGNITION",
                "name": "Family Photo Recognition",
                "min_difficulty": 1,
                "max_difficulty": 5,
                "instructions": {"assamese": "ছবিখনত থকা পৰিয়ালৰ মানুহজনক চিনাক্ত কৰক", "english": "Identify the family member in this photo"},
                "input_type": "multiple_choice"
            },
            {
                "id": "GT_PERSON_MATCH",
                "game_type": "PERSON_MATCHING",
                "name": "Person & Relationship Matching",
                "min_difficulty": 2,
                "max_difficulty": 5,
                "instructions": {"assamese": "সম্পৰ্কটো মিলাওক", "english": "Match the person with their relationship"},
                "input_type": "multiple_choice"
            },
            {
                "id": "GT_ROUTINE_RECALL",
                "game_type": "ROUTINE_RECALL",
                "name": "Daily Routine Memory Game",
                "min_difficulty": 1,
                "max_difficulty": 4,
                "instructions": {"assamese": "আপোনাৰ ৰাতিপুৱাৰ নিয়ম মনত পেলাওক", "english": "Recall your daily morning routine"},
                "input_type": "multiple_choice"
            }
        ]
    return templates
