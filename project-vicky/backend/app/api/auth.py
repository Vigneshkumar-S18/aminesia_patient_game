from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid
import datetime
from jose import jwt
from passlib.context import CryptContext

from app.database import get_db
from app.config import settings
from app.models.user import User, PatientProfile, CaregiverProfile
from app.schemas.auth import UserRegister, UserLogin, TokenResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

@router.post("/register", response_model=TokenResponse)
def register_user(req: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = f"U{uuid.uuid4().hex[:8]}"
    hashed_pwd = pwd_context.hash(req.password[:72])
    user = User(
        id=user_id,
        email=req.email,
        hashed_password=hashed_pwd,
        full_name=req.full_name,
        role=req.role
    )
    db.add(user)
    db.commit()

    patient_id = None
    caregiver_id = None

    if req.role == "patient":
        patient_id = f"P{uuid.uuid4().hex[:8]}"
        pat = PatientProfile(id=patient_id, user_id=user_id, name=req.full_name)
        db.add(pat)
        db.commit()
    elif req.role in ["caregiver", "family"]:
        caregiver_id = f"C{uuid.uuid4().hex[:8]}"
        cg = CaregiverProfile(id=caregiver_id, user_id=user_id)
        db.add(cg)
        db.commit()

    token = create_access_token({"sub": user_id, "role": req.role})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=user_id,
        role=req.role,
        patient_id=patient_id,
        caregiver_id=caregiver_id
    )

@router.post("/login", response_model=TokenResponse)
def login_user(req: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not pwd_context.verify(req.password[:72], user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    patient_id = user.patient_profile.id if user.patient_profile else None
    caregiver_id = user.caregiver_profile.id if user.caregiver_profile else None

    token = create_access_token({"sub": user.id, "role": user.role})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=user.id,
        role=user.role,
        patient_id=patient_id,
        caregiver_id=caregiver_id
    )
