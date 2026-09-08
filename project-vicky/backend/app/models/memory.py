import datetime
from sqlalchemy import Column, String, DateTime, Float, Boolean, ForeignKey, JSON
from app.database import Base

class MemoryItem(Base):
    __tablename__ = "memories"

    id = Column(String, primary_key=True, index=True) # e.g. M101
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    media_url = Column(String, nullable=True) # Photo / Audio URL
    media_type = Column(String, default="photo") # 'photo', 'voice', 'text', 'story'
    
    # Provenance
    source = Column(String, default="caregiver") # 'caregiver', 'family_mission', 'patient_voice'
    confidence = Column(Float, default=1.0)
    verified = Column(Boolean, default=True)
    consent_status = Column(Boolean, default=True)
    familiarity_score = Column(Float, default=0.9) # 0.0 to 1.0

    created_by = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class PersonEntity(Base):
    __tablename__ = "memory_people"

    id = Column(String, primary_key=True, index=True) # e.g. PER101
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    memory_id = Column(String, ForeignKey("memories.id"), nullable=True)
    name = Column(String, nullable=False)
    relationship = Column(String, nullable=False) # e.g. 'Daughter', 'Grandson'
    nickname = Column(String, nullable=True)
    photo_url = Column(String, nullable=True)
    voice_recording_url = Column(String, nullable=True)
    familiarity_score = Column(Float, default=0.95)
    confidence = Column(Float, default=1.0)
    source = Column(String, default="caregiver")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class PlaceEntity(Base):
    __tablename__ = "memory_places"

    id = Column(String, primary_key=True, index=True) # e.g. PLC101
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    memory_id = Column(String, ForeignKey("memories.id"), nullable=True)
    name = Column(String, nullable=False) # e.g. 'Family Home', 'Guwahati Local Market'
    place_type = Column(String, default="home") # 'home', 'market', 'village', 'town'
    description = Column(String, nullable=True)
    location_details = Column(String, nullable=True)
    familiarity_score = Column(Float, default=0.90)
    confidence = Column(Float, default=1.0)
    source = Column(String, default="caregiver")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class EventEntity(Base):
    __tablename__ = "memory_events"

    id = Column(String, primary_key=True, index=True) # e.g. EVT101
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    memory_id = Column(String, ForeignKey("memories.id"), nullable=True)
    name = Column(String, nullable=False) # e.g. 'Bihu Festival 2023', 'Daughter's Wedding'
    event_date = Column(String, nullable=True)
    description = Column(String, nullable=True)
    people_involved = Column(JSON, default=list) # ['Ananya', 'Ravi']
    places_involved = Column(JSON, default=list) # ['Family Home']
    familiarity_score = Column(Float, default=0.85)
    confidence = Column(Float, default=1.0)
    source = Column(String, default="caregiver")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ObjectEntity(Base):
    __tablename__ = "memory_objects"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    memory_id = Column(String, ForeignKey("memories.id"), nullable=True)
    name = Column(String, nullable=False) # e.g. 'Brass Tea Set', 'Traditional Gamosa'
    category = Column(String, default="household") # 'household', 'clothing', 'keepsake'
    familiarity_score = Column(Float, default=0.88)
    media_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class MemoryRelationship(Base):
    __tablename__ = "memory_relationships"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False, index=True)
    source_type = Column(String, nullable=False) # 'person', 'place', 'event', 'object'
    source_id = Column(String, nullable=False)
    relationship_type = Column(String, nullable=False) # 'lives_in', 'associated_with', 'knows', 'owns'
    target_type = Column(String, nullable=False)
    target_id = Column(String, nullable=False)
    confidence = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
