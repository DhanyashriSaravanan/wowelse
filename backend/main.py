import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import database
from auth import router as auth_router

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        database.create_indexes()
        print("✅ Connected to MongoDB and indexes are ready.")
    except Exception as e:
        print(f"⚠️  MongoDB not available: {e}")
        print("   The app will still start. Register/Login will fail until MongoDB is running.")
    yield


app = FastAPI(title="Wowelse Auth API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173").rstrip("/")],  # only our frontend
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.exception_handler(RequestValidationError)
async def validation_handler(request, exc):
    """Turn Pydantic errors into one readable message the frontend can display."""
    msg = "; ".join(e["msg"].removeprefix("Value error, ") for e in exc.errors())
    return JSONResponse(status_code=422, content={"detail": msg})


app.include_router(auth_router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
