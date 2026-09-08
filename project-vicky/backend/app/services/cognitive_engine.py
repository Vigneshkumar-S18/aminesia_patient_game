from sqlalchemy.orm import Session
import uuid
import datetime
from typing import Dict, Any, Optional
from app.models.cognitive import GameSession, ActivityEvent, PerformanceProfile
from app.models.memory import MemoryItem, PersonEntity, PlaceEntity, EventEntity
from app.services.ai_provider import ai_provider

class CognitiveEngine:
    """
    AI Cognitive Engine:
    - Generates personalized adaptive sessions (Recognition -> Identification -> Association -> Recall -> Sequence)
    - Computes adaptive difficulty transitions based on transparent scoring algorithm:
      score = accuracy * 0.5 + speed * 0.2 + independence * 0.2 + completion * 0.1
    """

    def calculate_interaction_score(
        self,
        is_correct: bool,
        response_time_ms: int,
        hint_used: bool,
        completed: bool = True
    ) -> float:
        # Accuracy: 1.0 or 0.0
        accuracy_score = 1.0 if is_correct else 0.0

        # Speed score (optimal range 2000ms to 8000ms)
        if response_time_ms <= 0:
            speed_score = 0.5
        elif response_time_ms <= 5000:
            speed_score = 1.0
        elif response_time_ms <= 12000:
            speed_score = 0.7
        else:
            speed_score = 0.4

        # Independence score (no hint used = 1.0)
        independence_score = 0.5 if hint_used else 1.0

        # Completion score
        completion_score = 1.0 if completed else 0.0

        # PRD Formula: accuracy * 0.5 + speed * 0.2 + independence * 0.2 + completion * 0.1
        score = (accuracy_score * 0.5) + (speed_score * 0.2) + (independence_score * 0.2) + (completion_score * 0.1)
        return round(score, 2)

    def determine_next_difficulty(self, current_difficulty: int, score: float) -> tuple[int, str]:
        """
        score > 0.80 -> increase difficulty
        0.50 <= score <= 0.80 -> maintain difficulty
        score < 0.50 -> decrease difficulty
        """
        if score > 0.80:
            new_diff = min(current_difficulty + 1, 5)
            change = "increased" if new_diff > current_difficulty else "maintained"
        elif score >= 0.50:
            new_diff = current_difficulty
            change = "maintained"
        else:
            new_diff = max(current_difficulty - 1, 1)
            change = "decreased" if new_diff < current_difficulty else "maintained"

        return new_diff, change

    def start_session(
        self,
        db: Session,
        patient_id: str,
        session_type: str = "memory_journey",
        preferred_language: str = "assamese",
        voice_enabled: bool = True
    ) -> Dict[str, Any]:
        # Fetch or create patient performance profile
        perf = db.query(PerformanceProfile).filter(PerformanceProfile.patient_id == patient_id).first()
        if not perf:
            perf = PerformanceProfile(
                id=f"PERF{uuid.uuid4().hex[:8]}",
                patient_id=patient_id,
                current_difficulty_level=2
            )
            db.add(perf)
            db.commit()

        session_id = f"S{uuid.uuid4().hex[:8]}"
        session = GameSession(
            id=session_id,
            patient_id=patient_id,
            session_type=session_type,
            starting_difficulty=perf.current_difficulty_level,
            current_difficulty=perf.current_difficulty_level,
            language=preferred_language,
            voice_enabled=voice_enabled
        )
        db.add(session)
        db.commit()

        # Generate first activity
        activity = self.generate_activity_for_session(db, patient_id, session_id, perf.current_difficulty_level)
        
        return {
            "session_id": session_id,
            "duration_target_minutes": 5,
            "language": preferred_language,
            "voice_enabled": voice_enabled,
            "current_difficulty": perf.current_difficulty_level,
            "activity": activity
        }

    def generate_activity_for_session(
        self,
        db: Session,
        patient_id: str,
        session_id: str,
        difficulty: int
    ) -> Dict[str, Any]:
        import random
        # Retrieve familiar VERIFIED memories
        memories = db.query(MemoryItem).filter(MemoryItem.patient_id == patient_id, MemoryItem.verified == True).all()
        
        memory_title = "Family Memory"
        media_url = None
        entity_name = "Family Member"
        entity_type = "person"
        memory_id = None

        if memories:
            # Randomly select a verified memory
            mem = random.choice(memories)
            memory_title = mem.title
            media_url = mem.media_url
            memory_id = mem.id

            # Determine an entity type based on what entities exist for this memory
            # For MVP, we will do a simple random selection of entities tied to this memory
            person = db.query(PersonEntity).filter(PersonEntity.memory_id == mem.id).first()
            place = db.query(PlaceEntity).filter(PlaceEntity.memory_id == mem.id).first()
            event = db.query(EventEntity).filter(EventEntity.memory_id == mem.id).first()
            
            entities = []
            if person: entities.append((person.name, "person"))
            if place: entities.append((place.name, "place"))
            if event: entities.append((event.name, "event"))
            
            if entities:
                selected_entity = random.choice(entities)
                entity_name = selected_entity[0]
                entity_type = selected_entity[1]

        q_data = ai_provider.generate_grounded_question(
            memory_title=memory_title,
            entity_name=entity_name,
            entity_type=entity_type,
            difficulty=difficulty
        )

        activity_id = f"ACT{uuid.uuid4().hex[:8]}"
        
        # Decide game type logically based on entity type
        game_type_map = {
            "person": "photo_recognition",
            "place": "object_recognition",
            "event": "sequence_recall"
        }
        game_type = game_type_map.get(entity_type, "photo_recognition")

        return {
            "activity_id": activity_id,
            "type": game_type,
            "difficulty": difficulty,
            "memory_id": memory_id,
            "prompt": q_data["prompt"],
            "options": q_data["options"],
            "media_url": media_url or "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
            "voice_url": None,
            "hint": q_data["hint"],
            "expected_answer": q_data["correct_answer"]
        }

    def process_event(
        self,
        db: Session,
        session_id: str,
        activity_id: str,
        answer: str,
        response_time_ms: int,
        hint_used: bool,
        event_type: str = "ANSWER_SUBMITTED",
        expected_answer: Optional[str] = None
    ) -> Dict[str, Any]:
        session = db.query(GameSession).filter(GameSession.id == session_id).first()
        if not session:
            raise ValueError("Session not found")

        # Use the explicitly passed expected_answer to check correctness
        if expected_answer:
            is_correct = bool(answer and expected_answer and answer.strip().lower() == expected_answer.strip().lower())
        else:
            is_correct = False
            
        score = self.calculate_interaction_score(is_correct, response_time_ms, hint_used)

        # Log event
        act_event = ActivityEvent(
            id=f"AE{uuid.uuid4().hex[:8]}",
            session_id=session_id,
            patient_id=session.patient_id,
            game_type="photo_recognition",
            difficulty=session.current_difficulty,
            prompt="Generated Prompt",
            expected_answer=expected_answer or "",
            user_answer=answer,
            is_correct=is_correct,
            response_time_ms=response_time_ms,
            hint_used=hint_used,
            event_type=event_type,
            score=score
        )
        db.add(act_event)

        # Calculate next difficulty
        new_diff, diff_change = self.determine_next_difficulty(session.current_difficulty, score)
        session.current_difficulty = new_diff

        # Update performance profile
        perf = db.query(PerformanceProfile).filter(PerformanceProfile.patient_id == session.patient_id).first()
        if perf:
            perf.current_difficulty_level = new_diff
            if is_correct:
                perf.recognition_score = min(1.0, perf.recognition_score + 0.02)
            else:
                perf.recognition_score = max(0.2, perf.recognition_score - 0.02)
            perf.updated_at = datetime.datetime.utcnow()

        db.commit()

        # Generate next activity
        next_act = self.generate_activity_for_session(db, session.patient_id, session_id, new_diff)

        return {
            "is_correct": is_correct,
            "score": score,
            "feedback_message": "Wonderful memory recall!" if is_correct else "Good try! Let's review together.",
            "difficulty_change": diff_change,
            "next_activity": next_act
        }

cognitive_engine = CognitiveEngine()
