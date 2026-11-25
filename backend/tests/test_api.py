import os, sys
os.environ["JWT_SECRET"] = "test-secret"
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..") + "")
import mongomock, database
database.users = mongomock.MongoClient().db.users
database.create_indexes()
from fastapi.testclient import TestClient
import security; security.JWT_SECRET = "test-secret"
from main import app
c = TestClient(app)
good = dict(username="alice", email="Alice@Example.com", password="secret123", confirm_password="secret123")

def test_flow():
    assert c.post("/api/auth/register", json=good).status_code == 201
    assert c.post("/api/auth/register", json=good).status_code == 409
    assert c.post("/api/auth/register", json={**good, "username": "ALICE", "email": "b@x.com"}).status_code == 409
    assert c.post("/api/auth/register", json={**good, "email": "nope"}).status_code == 422
    assert c.post("/api/auth/register", json={**good, "username": "bob", "email": "b@x.com", "confirm_password": "x"}).status_code == 422
    doc = database.users.find_one({"username": "alice"})
    assert doc["password_hash"].startswith("$2") and "secret123" not in str(doc)
    for ident in ("alice", "ALICE", "alice@example.com"):
        r = c.post("/api/auth/login", json={"identifier": ident, "password": "secret123"})
        assert r.status_code == 200
    assert c.post("/api/auth/login", json={"identifier": "alice", "password": "wrong"}).status_code == 401
    assert c.post("/api/auth/login", json={"identifier": "ghost", "password": "secret123"}).status_code == 401
    tok = r.json()["access_token"]
    me = c.get("/api/auth/me", headers={"Authorization": f"Bearer {tok}"})
    assert me.status_code == 200 and "password_hash" not in me.json()
    assert c.get("/api/auth/me").status_code == 401
    assert c.get("/api/auth/me", headers={"Authorization": "Bearer junk"}).status_code == 401
    # expired token
    import jwt, datetime
    old = jwt.encode({"sub": str(doc["_id"]), "exp": datetime.datetime(2020,1,1)}, "test-secret", algorithm="HS256")
    assert c.get("/api/auth/me", headers={"Authorization": f"Bearer {old}"}).status_code == 401

def test_google_redirect_and_state():
    os.environ["GOOGLE_CLIENT_ID"] = "id"; os.environ["GOOGLE_REDIRECT_URI"] = "http://localhost:8000/api/auth/google/callback"
    r = c.get("/api/auth/google/login", follow_redirects=False)
    assert r.status_code in (302, 307) and "accounts.google.com" in r.headers["location"]
    bad = TestClient(app).get("/api/auth/google/callback?code=x&state=forged", follow_redirects=False)
    assert "error=" in bad.headers["location"]
