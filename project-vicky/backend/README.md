# MemoryWeave AI Backend

**Personalized Cognitive Support for Elderly in NER — FastAPI Backend**

MemoryWeave AI's backend is a modular monolith providing a Personal Memory Graph context layer, AI Cognitive Engine for adaptive memory journeys, Caregiver Intelligence & Routine Engine, and Offline-First synchronization APIs.

---

## Architecture Overview

```text
                  ┌─────────────────────────┐
                  │      Flutter / React    │
                  │ Elderly │ Family/Care   │
                  └───────────┬─────────────┘
                              │ REST / Sync
                              ▼
                  ┌─────────────────────────┐
                  │      FastAPI Backend    │
                  │ Auth / API / Validation │
                  └───────────┬─────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
 ┌────────────────┐  ┌─────────────────┐  ┌─────────────────┐
 │ Memory Engine  │  │ Cognitive Engine│  │ Care Engine     │
 │ Graph Builders │  │ Difficulty Math │  │ Routine Alerts  │
 │ Provenance     │  │ Grounded Qs     │  │ Care Analytics  │
 └────────┬───────┘  └────────┬────────┘  └────────┬────────┘
          │                   │                    │
          └───────────────────┼────────────────────┘
                              ▼
                    ┌────────────────────┐
                    │ Personal Memory    │
                    │ Graph (SQLAlchemy) │
                    └────────────────────┘
```

---

## Features Implemented

1. **Auth & Role Access**: JWT auth for `patient`, `caregiver`, and `healthcare` roles.
2. **Personal Memory Graph**: Entities for People, Places, Events, Objects, and Preferences with strict provenance (`source`, `confidence`, `verified`, `familiarity_score`).
3. **Adaptive Cognitive Engine**:
   - Interaction scoring algorithm:
     $$\text{score} = (\text{accuracy} \times 0.5) + (\text{speed} \times 0.2) + (\text{independence} \times 0.2) + (\text{completion} \times 0.1)$$
   - Adaptive difficulty transition (`score > 0.80` increases difficulty, `< 0.50` decreases difficulty).
4. **Caregiver Dashboard & Alerts**:
   - Routine deviation checking & non-diagnostic alerts.
   - Aggregate engagement & memory recall analytics.
5. **Offline Synchronization**: Idempotent `/sync/push` endpoint handling duplicate detection and offline device event resolution.
6. **Safety & Grounding Layer**: All generated memory questions are strictly grounded in verified memory data.

---

## Quickstart Guide

### 1. Setup Virtual Environment
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 2. Seed Synthetic Demo Data
Populate the database with realistic synthetic data (Elderly patient, Assamese language preference, Guwahati family memories, routines):
```bash
python -m app.seed
```

### 3. Run FastAPI Dev Server
```bash
uvicorn app.main:app --reload --port 8000
```
- Interactive API Docs (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)
- Alternative Docs (ReDoc): [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 4. Run Test Suite
```bash
pytest
```

---

## Key API Endpoints

- `POST /auth/login` - User authentication (returns JWT & role context)
- `GET /patients` - List patient profiles
- `GET /patients/{id}/memories` - Get patient's personal memory graph
- `POST /patients/{id}/sessions/start` - Start personalized adaptive memory session
- `POST /sessions/{session_id}/events` - Submit activity answer & receive live adaptive difficulty update
- `GET /patients/{id}/analytics` - Caregiver engagement & recall trends
- `GET /patients/{id}/alerts` - Caregiver alerts & routine deviations
- `POST /sync/push` - Offline mobile event synchronization
