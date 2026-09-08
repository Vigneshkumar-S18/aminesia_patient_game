import datetime
from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, Integer, JSON
from sqlalchemy.orm import relationship as rel
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True) # e.g. U101
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False) # 'patient', 'caregiver', 'healthcare', 'admin'
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    patient_profile = rel("PatientProfile", back_populates="user", uselist=False)
    caregiver_profile = rel("CaregiverProfile", back_populates="user", uselist=False)

class PatientProfile(Base):
    __tablename__ = "patient_profiles"

    id = Column(String, primary_key=True, index=True) # e.g. P101
    user_id = Column(String, ForeignKey("users.id"), nullable=False, unique=True)
    name = Column(String, nullable=False)
    preferred_language = Column(String, default="assamese") # e.g., assamese, english, hindi
    date_of_birth = Column(String, nullable=True)
    timezone = Column(String, default="Asia/Kolkata")
    region = Column(String, default="North-East India (NER)")
    profile_photo_url = Column(String, nullable=True)
    accessibility_preferences = Column(JSON, default=lambda: {
        "font_size": "large",
        "voice_enabled": True,
        "voice_speed": 1.0,
        "contrast_mode": "normal",
        "haptic_enabled": True,
        "preferred_input": "voice_and_touch"
    })
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = rel("User", back_populates="patient_profile")
    caregiver_links = rel("CaregiverPatient", back_populates="patient")

class CaregiverProfile(Base):
    __tablename__ = "caregiver_profiles"

    id = Column(String, primary_key=True, index=True) # e.g. C101
    user_id = Column(String, ForeignKey("users.id"), nullable=False, unique=True)
    phone_number = Column(String, nullable=True)
    relationship_type = Column(String, default="family") # e.g. daughter, son, spouse, nurse
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = rel("User", back_populates="caregiver_profile")
    patient_links = rel("CaregiverPatient", back_populates="caregiver")

class CaregiverPatient(Base):
    __tablename__ = "caregiver_patients"

    id = Column(String, primary_key=True, index=True)
    caregiver_id = Column(String, ForeignKey("caregiver_profiles.id"), nullable=False)
    patient_id = Column(String, ForeignKey("patient_profiles.id"), nullable=False)
    relationship = Column(String, nullable=False) # e.g. 'Daughter', 'Primary Nurse'
    permission_level = Column(String, default="full") # 'full', 'read_only'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    caregiver = rel("CaregiverProfile", back_populates="patient_links")
    patient = rel("PatientProfile", back_populates="caregiver_links")

