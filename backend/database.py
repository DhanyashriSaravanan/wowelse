"""MongoDB connection. The unique indexes here are what really prevent duplicate users."""
import os
from dotenv import load_dotenv
from pymongo import MongoClient, ASCENDING

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"), serverSelectionTimeoutMS=5000)
db = client[os.getenv("MONGODB_DB", "wowelse")]
users = db["users"]


def create_indexes():
    users.create_index([("username_lower", ASCENDING)], unique=True)
    users.create_index([("email", ASCENDING)], unique=True)
    # sparse: local users have no google_id, so they must not clash with each other
    users.create_index([("google_id", ASCENDING)], unique=True, sparse=True)
