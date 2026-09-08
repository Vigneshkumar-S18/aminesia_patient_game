import datetime
import uuid
from passlib.context import CryptContext
from app.database import SessionLocal, engine, Base
from app.models.user import User, PatientProfile, CaregiverProfile, CaregiverPatient
from app.models.memory import MemoryItem, PersonEntity, PlaceEntity, EventEntity, ObjectEntity
from app.models.cognitive import PerformanceProfile, GameSession, ActivityEvent
from app.models.care import Routine, Reminder, Alert

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(User).filter(User.email == "caregiver@memoryweave.app").first():
            print("Database already seeded!")
            return

        print("Seeding MemoryWeave AI database with realistic synthetic data...")

        # 1. Caregiver User & Profile
        cg_user = User(
            id="U_CG101",
            email="caregiver@memoryweave.app",
            hashed_password=pwd_context.hash("caregiver123"[:72]),
            full_name="Ananya Sharma",
            role="caregiver"
        )
        db.add(cg_user)

        cg_profile = CaregiverProfile(
            id="C101",
            user_id="U_CG101",
            phone_number="+91-9876543210",
            relationship_type="Daughter"
        )
        db.add(cg_profile)

        # 2. Patient User & Profile (72 yo elderly in NER, Assamese)
        pat_user = User(
            id="U_PAT101",
            email="patient@memoryweave.app",
            hashed_password=pwd_context.hash("patient123"[:72]),
            full_name="Bimala Sharma",
            role="patient"
        )
        db.add(pat_user)

        pat_profile = PatientProfile(
            id="P101",
            user_id="U_PAT101",
            name="Bimala Sharma (Amma)",
            preferred_language="assamese",
            date_of_birth="1954-04-12",
            timezone="Asia/Kolkata",
            region="Guwahati, Assam (NER)",
            profile_photo_url="https://images.unsplash.com/photo-1544717305-2782549b5136?w=400",
            accessibility_preferences={
                "font_size": "large",
                "voice_enabled": True,
                "voice_speed": 0.9,
                "contrast_mode": "high_contrast",
                "haptic_enabled": True,
                "preferred_input": "voice_and_touch"
            }
        )
        db.add(pat_profile)

        # 3. Caregiver-Patient Link
        cg_pat_link = CaregiverPatient(
            id="CP101",
            caregiver_id="C101",
            patient_id="P101",
            relationship="Daughter",
            permission_level="full"
        )
        db.add(cg_pat_link)

        # 4. Personal Memory Graph Ingestion
        # Memory 1: Family Festival Photo
        mem1 = MemoryItem(
            id="M101",
            patient_id="P101",
            title="Bihu Festival Celebration 2023",
            description="Bimala celebrating Rongali Bihu festival at family home in Guwahati with daughter Ananya and son Ravi.",
            media_url="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
            media_type="photo",
            familiarity_score=0.98,
            source="caregiver",
            confidence=1.0,
            verified=True,
            consent_status=True,
            created_by="Ananya Sharma"
        )
        db.add(mem1)

        p1 = PersonEntity(
            id="PER101",
            patient_id="P101",
            memory_id="M101",
            name="Ananya",
            relationship="Daughter",
            nickname="Anu",
            familiarity_score=0.98,
            photo_url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
        )
        p2 = PersonEntity(
            id="PER102",
            patient_id="P101",
            memory_id="M101",
            name="Ravi",
            relationship="Son",
            familiarity_score=0.92
        )
        db.add_all([p1, p2])

        plc1 = PlaceEntity(
            id="PLC101",
            patient_id="P101",
            memory_id="M101",
            name="Guwahati Family Home",
            place_type="home",
            familiarity_score=0.95
        )
        db.add(plc1)

        evt1 = EventEntity(
            id="EVT101",
            patient_id="P101",
            memory_id="M101",
            name="Rongali Bihu Festival",
            people_involved=["Ananya", "Ravi"],
            places_involved=["Guwahati Family Home"],
            familiarity_score=0.96
        )
        db.add(evt1)

        # Memory 2: Traditional Kept Item
        mem2 = MemoryItem(
            id="M102",
            patient_id="P101",
            title="Traditional Assamese Brass Tea Set",
            description="Favorite brass tea cup used every afternoon for Assam CTC tea.",
            media_url="https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800",
            media_type="photo",
            familiarity_score=0.91
        )
        db.add(mem2)

        obj1 = ObjectEntity(
            id="OBJ101",
            patient_id="P101",
            memory_id="M102",
            name="Brass Tea Cup",
            category="household",
            familiarity_score=0.91
        )
        db.add(obj1)

        # 5. Patient Performance Profile
        perf = PerformanceProfile(
            id="PERF101",
            patient_id="P101",
            memory_recall_score=0.74,
            recognition_score=0.86,
            attention_score=0.70,
            sequence_score=0.62,
            response_speed_score=0.72,
            engagement_score=0.88,
            current_difficulty_level=2,
            total_sessions_completed=12
        )
        db.add(perf)

        # 6. Routines & Voice Reminders
        r1 = Routine(
            id="R101",
            patient_id="P101",
            title="Morning Tea & Medication",
            category="medication",
            scheduled_time="08:00",
            recurrence="daily"
        )
        r2 = Routine(
            id="R102",
            patient_id="P101",
            title="Afternoon Memory Journey Game",
            category="activity",
            scheduled_time="16:00",
            recurrence="daily"
        )
        db.add_all([r1, r2])

        rem1 = Reminder(
            id="REM101",
            patient_id="P101",
            title="Morning BP Tablet & Tea",
            description="Amma, please take your morning tablet after your tea.",
            reminder_type="MEDICATION",
            scheduled_time="08:00",
            voice_recording_url="https://storage.googleapis.com/memoryweave/voice_reminders/ananya_morning.mp3",
            created_by="Ananya Sharma",
            status="scheduled"
        )
        db.add(rem1)

        # 7. Grounded Caregiver Alert
        alt1 = Alert(
            id="ALT101",
            patient_id="P101",
            alert_type="ROUTINE_DEVIATION",
            title="Morning Medication Status",
            message="Morning medication reminder scheduled for 08:00 has not been marked completed yet today.",
            severity="warning"
        )
        db.add(alt1)

        db.commit()
        print("Database seeding completed successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
