"""Shape of a user document in MongoDB, plus helpers to build / serialize it."""
from datetime import datetime, timezone


def new_user_doc(*, username, email, full_name, auth_provider,
                 password_hash=None, google_id=None, picture=None) -> dict:
    doc = {
        "username": username,
        "username_lower": username.lower(),
        "email": email.lower(),
        "full_name": full_name,
        "auth_provider": auth_provider,  # "local" or "google"
        "created_at": datetime.now(timezone.utc),
        "picture": picture,
    }
    if password_hash:
        doc["password_hash"] = password_hash  # only password accounts have this
    if google_id:
        doc["google_id"] = google_id  # Google "subject" id
    return doc


def user_to_out(doc: dict) -> dict:
    """Public view of a user. Never includes password_hash."""
    return {
        "id": str(doc["_id"]),
        "username": doc["username"],
        "email": doc["email"],
        "full_name": doc.get("full_name", ""),
        "auth_provider": doc["auth_provider"],
        "created_at": doc["created_at"].isoformat(),
        "picture": doc.get("picture"),
    }
