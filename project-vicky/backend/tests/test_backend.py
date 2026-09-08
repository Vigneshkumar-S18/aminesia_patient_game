import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "MemoryWeave" in data["service"]

def test_auth_login():
    response = client.post("/auth/login", json={
        "email": "caregiver@memoryweave.app",
        "password": "caregiver123"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["role"] == "caregiver"
    assert data["caregiver_id"] == "C101"

def test_get_patients():
    response = client.get("/patients")
    assert response.status_code == 200
    patients = response.json()
    assert len(patients) >= 1
    assert patients[0]["id"] == "P101"
    assert patients[0]["name"] == "Bimala Sharma (Amma)"

def test_memories_retrieval():
    response = client.get("/patients/P101/memories")
    assert response.status_code == 200
    memories = response.json()
    assert len(memories) >= 1
    assert memories[0]["patient_id"] == "P101"

def test_cognitive_session_flow():
    # 1. Start adaptive session
    start_resp = client.post("/patients/P101/sessions/start", json={
        "session_type": "memory_journey",
        "preferred_language": "assamese",
        "voice_enabled": True
    })
    assert start_resp.status_code == 200
    session_data = start_resp.json()
    session_id = session_data["session_id"]
    activity_id = session_data["activity"]["activity_id"]
    assert session_id.startswith("S")

    # 2. Submit correct answer event
    event_resp = client.post(f"/sessions/{session_id}/events", json={
        "event_type": "ANSWER_SUBMITTED",
        "activity_id": activity_id,
        "answer": "Ananya",
        "response_time_ms": 3200,
        "hint_used": False
    })
    assert event_resp.status_code == 200
    event_data = event_resp.json()
    assert event_data["is_correct"] == True
    assert event_data["score"] > 0.8
    assert "next_activity" in event_data

def test_caregiver_analytics_and_alerts():
    analytics_resp = client.get("/patients/P101/analytics")
    assert analytics_resp.status_code == 200
    data = analytics_resp.json()
    assert data["patient_id"] == "P101"
    assert data["routine_compliance_percent"] > 0

    alerts_resp = client.get("/patients/P101/alerts")
    assert alerts_resp.status_code == 200
    alerts = alerts_resp.json()
    assert len(alerts) >= 1
    assert alerts[0]["alert_type"] == "ROUTINE_DEVIATION"

def test_offline_sync_push():
    import uuid
    unique_id = f"OFFLINE_EVT_{uuid.uuid4().hex[:6]}"
    sync_resp = client.post("/sync/push", json={
        "device_id": "MOBILE_DEV_001",
        "events": [
            {
                "event_id": unique_id,
                "device_id": "MOBILE_DEV_001",
                "patient_id": "P101",
                "event_type": "REMINDER_COMPLETED",
                "payload": {"reminder_id": "REM101"},
                "sequence_number": 1
            }
        ]
    })
    assert sync_resp.status_code == 200
    sync_data = sync_resp.json()
    assert sync_data["status"] == "success"
    assert sync_data["processed_count"] == 1

    # Idempotency test (re-sending same event)
    dup_resp = client.post("/sync/push", json={
        "device_id": "MOBILE_DEV_001",
        "events": [
            {
                "event_id": unique_id,
                "device_id": "MOBILE_DEV_001",
                "patient_id": "P101",
                "event_type": "REMINDER_COMPLETED",
                "payload": {"reminder_id": "REM101"},
                "sequence_number": 1
            }
        ]
    })
    assert dup_resp.status_code == 200
    dup_data = dup_resp.json()
    assert dup_data["ignored_duplicates"] == 1
