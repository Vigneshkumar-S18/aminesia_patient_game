from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.config import settings
from app.database import engine, Base

# Import model definitions so SQLAlchemy creates tables
import app.models

from app.api import auth, patients, memories, sessions, games, routines, reminders, caregivers, analytics, sync, missions

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Personalized Cognitive Support for Elderly in NER — MemoryWeave AI FastAPI Backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router)
app.include_router(patients.router)
app.include_router(memories.router)
app.include_router(sessions.router)
app.include_router(games.router)
app.include_router(routines.router)
app.include_router(reminders.router)
app.include_router(caregivers.router)
app.include_router(analytics.router)
app.include_router(sync.router)
app.include_router(missions.router)

@app.get("/", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "vision": "Personalized Cognitive Support for Elderly without Medical Diagnosis Claims"
    }
