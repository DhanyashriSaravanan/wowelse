# Wowelse – User Registration & Authentication System

A full-stack authentication system built with **React + FastAPI + MongoDB**.

## 🗂 Project Structure

```
wowelse/
├── backend/              ← Python FastAPI server (port 8000)
│   ├── main.py           ← App entry, CORS, middleware
│   ├── auth.py           ← All /api/auth/* endpoints
│   ├── database.py       ← MongoDB connection + indexes
│   ├── models.py         ← User document shape
│   ├── schemas.py        ← Input validation (Pydantic)
│   ├── security.py       ← bcrypt hashing + JWT
│   ├── requirements.txt  ← Python dependencies
│   └── .env.example      ← Environment variable template
│
└── frontend/             ← React (Vite) app (port 5173)
    ├── src/
    │   ├── App.jsx           ← Routing + auth state
    │   ├── main.jsx          ← Entry point
    │   ├── style.css         ← All styling
    │   ├── pages/
    │   │   ├── Register.jsx      ← Registration form
    │   │   ├── Login.jsx         ← Login form
    │   │   ├── GoogleCallback.jsx ← Google OAuth handler
    │   │   └── Dashboard.jsx     ← Protected dashboard
    │   ├── components/
    │   │   ├── InputField.jsx    ← Reusable input with icon
    │   │   ├── GoogleButton.jsx  ← Google sign-in button
    │   │   ├── Notification.jsx  ← Success/error alerts
    │   │   └── Loader.jsx        ← Spinner
    │   └── services/
    │       └── api.js            ← All fetch() calls to backend
    └── .env.example
```

---

## ⚙️ Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Python | 3.10+ | https://python.org |
| Node.js | 18+ | https://nodejs.org |
| MongoDB | 7.0+ | https://www.mongodb.com/try/download/community |

---

## 🚀 Step-by-Step Setup

### Step 1 — Install & Start MongoDB

**Windows:**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install it (choose "Complete", check "Install MongoDB as a Service")
3. MongoDB will start automatically as a Windows service on port 27017

**Or use MongoDB Atlas (free cloud):**
1. Go to https://cloud.mongodb.com and create a free account
2. Create a free cluster → Get the connection string
3. Put the connection string in `backend/.env` as `MONGODB_URI`

### Step 2 — Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it  (Windows)
venv\Scripts\activate

# Install packages
pip install -r requirements.txt

# Copy the environment file
copy .env.example .env
```

Now **edit `backend/.env`** and fill in:
```
JWT_SECRET=any-long-random-string-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Step 3 — Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
```

---

## ▶️ Running the Application

### Terminal 1 — Backend

```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

API is live at: http://localhost:8000
API docs (Swagger): http://localhost:8000/docs

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

App is live at: http://localhost:5173

---

## 🔑 Google OAuth Setup (for Google Sign-in)

1. Go to https://console.cloud.google.com/
2. Create a new project → **APIs & Services → OAuth consent screen**
   - Choose "External" → Add your email as test user
3. **Credentials → Create credentials → OAuth 2.0 Client ID → Web application**
4. Under **Authorized redirect URIs** add: `http://localhost:8000/api/auth/google/callback`
5. Copy **Client ID** and **Client Secret** into `backend/.env`

> ⚠️ Never put Google credentials in the frontend or commit `.env` to Git.

---

## 🌐 API Endpoints

| Method | URL | What it does |
|--------|-----|-------------|
| POST | `/api/auth/register` | Create account with username, email, password |
| POST | `/api/auth/login` | Log in, receive JWT token |
| GET  | `/api/auth/google/login` | Redirect to Google login |
| GET  | `/api/auth/google/callback` | Exchange Google code, return JWT |
| GET  | `/api/auth/me` | Get current user profile (requires JWT) |
| GET  | `/api/health` | Server health check |

---

## 🗄️ MongoDB User Document

```json
{
  "_id": "ObjectId",
  "username": "alice",
  "username_lower": "alice",
  "email": "alice@example.com",
  "full_name": "Alice Smith",
  "auth_provider": "local",
  "password_hash": "$2b$12$...",
  "google_id": null,
  "picture": null,
  "created_at": "2026-01-01T00:00:00Z"
}

## 🔒 Security Summary

- Passwords are hashed with **bcrypt** — the original password is never stored
- **JWT tokens** expire after 60 minutes (configurable)
- Google tokens are verified on the **backend only** — the client secret never touches the frontend
- A CSRF **state token** (cookie + URL) protects the Google OAuth flow
- Database has **unique indexes** on username, email, google_id
- **CORS** only allows requests from `FRONTEND_URL`

---

## 📂 ZIP File Location

The complete project zip is at:
`C:\Users\sarve\.gemini\antigravity\scratch\wowelse\wowelse_project.zip`
