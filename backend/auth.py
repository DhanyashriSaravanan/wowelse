"""All /api/auth/* endpoints."""
import os
import re
import secrets
from urllib.parse import urlencode

import httpx
import jwt
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token
from pymongo.errors import DuplicateKeyError

import database
from models import new_user_doc, user_to_out
from schemas import LoginIn, RegisterIn, TokenOut, UserOut
from security import create_access_token, decode_access_token, hash_password, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])
bearer = HTTPBearer(auto_error=False)

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
FRONTEND_URL = lambda: os.getenv("FRONTEND_URL", "http://localhost:5173").rstrip("/").rstrip("/")


# ---------- current-user dependency (protects routes) ----------
def get_current_user(creds: HTTPAuthorizationCredentials | None = Depends(bearer)) -> dict:
    if creds is None:
        raise HTTPException(401, "Not authenticated")
    try:
        user_id = decode_access_token(creds.credentials)
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Session expired. Please log in again.")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")
    user = database.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(401, "User no longer exists")
    return user


# ---------- normal registration / login ----------
@router.post("/register", status_code=201)
def register(data: RegisterIn):
    doc = new_user_doc(
        username=data.username, email=data.email, full_name=data.username,
        auth_provider="local", password_hash=hash_password(data.password),
    )
    # Friendly messages first; the unique indexes below still catch race conditions.
    if database.users.find_one({"username_lower": doc["username_lower"]}):
        raise HTTPException(409, "That username is already taken")
    if database.users.find_one({"email": doc["email"]}):
        raise HTTPException(409, "An account with that email already exists")
    try:
        database.users.insert_one(doc)
    except DuplicateKeyError:
        raise HTTPException(409, "Username or email is already in use")
    return {"message": "Account created. Please log in."}


@router.post("/login", response_model=TokenOut)
def login(data: LoginIn):
    ident = data.identifier.strip().lower()
    user = database.users.find_one({"$or": [{"username_lower": ident}, {"email": ident}]})
    # One generic message for every failure, so attackers can't tell which part was wrong.
    if not user or not user.get("password_hash") or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(401, "Invalid username/email or password")
    return TokenOut(access_token=create_access_token(str(user["_id"])))


@router.get("/me", response_model=UserOut)
def me(user: dict = Depends(get_current_user)):
    return user_to_out(user)


# ---------- Google OAuth 2.0 (authorization-code flow) ----------
@router.get("/google/login")
def google_login():
    state = secrets.token_urlsafe(32)  # CSRF protection
    params = {
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "redirect_uri": os.getenv("GOOGLE_REDIRECT_URI"),
        "response_type": "code",
        "scope": "openid email profile",
        "state": state,
        "prompt": "select_account",
    }
    resp = RedirectResponse(f"{GOOGLE_AUTH_URL}?{urlencode(params)}")
    resp.set_cookie("oauth_state", state, max_age=600, httponly=True, samesite="lax")
    return resp


def _unique_username(base: str) -> str:
    base = re.sub(r"[^A-Za-z0-9_.]", "", base)[:24] or "user"
    candidate = base
    while database.users.find_one({"username_lower": candidate.lower()}):
        candidate = f"{base}{secrets.randbelow(10000)}"
    return candidate


@router.get("/google/callback")
def google_callback(request: Request, code: str | None = None, state: str | None = None, error: str | None = None):
    fail = lambda msg: RedirectResponse(f"{FRONTEND_URL()}/login?error={msg}")
    if error or not code:
        return fail("Google sign-in was cancelled")
    if not state or state != request.cookies.get("oauth_state"):
        return fail("Invalid sign-in request. Please try again")

    # 1) Backend exchanges the code for tokens. The client secret never leaves the server.
    try:
        token_resp = httpx.post(GOOGLE_TOKEN_URL, data={
            "code": code,
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "redirect_uri": os.getenv("GOOGLE_REDIRECT_URI"),
            "grant_type": "authorization_code",
        }, timeout=10)
        token_resp.raise_for_status()
        # 2) Backend verifies the ID token's signature, audience and expiry with Google's keys.
        info = google_id_token.verify_oauth2_token(
            token_resp.json()["id_token"], google_requests.Request(), os.getenv("GOOGLE_CLIENT_ID"))
    except Exception:
        return fail("Google sign-in failed. Please try again")

    if not info.get("email") or not info.get("email_verified"):
        return fail("Your Google email is not verified")

    google_id, email = info["sub"], info["email"].lower()
    user = database.users.find_one({"google_id": google_id})
    if not user:
        user = database.users.find_one({"email": email})
        if user:  # same email registered normally: link the Google account to it
            database.users.update_one({"_id": user["_id"]}, {"$set": {"google_id": google_id, "picture": info.get("picture")}})
        else:  # brand-new Google user: create account (no password needed)
            doc = new_user_doc(
                username=_unique_username(email.split("@")[0]), email=email,
                full_name=info.get("name", email.split("@")[0]), auth_provider="google",
                google_id=google_id, picture=info.get("picture"))
            try:
                doc["_id"] = database.users.insert_one(doc).inserted_id
            except DuplicateKeyError:
                return fail("Could not create account. Please try again")
            user = doc

    # 3) Hand our own JWT to the frontend in the URL fragment (#), which is never sent to servers.
    resp = RedirectResponse(f"{FRONTEND_URL()}/auth/google/callback#token={create_access_token(str(user['_id']))}")
    resp.delete_cookie("oauth_state")
    return resp
