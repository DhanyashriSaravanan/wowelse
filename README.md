# Wowelse | User Registration & Authentication System

A full-stack web application developed using **React.js, Python FastAPI, and MongoDB** to provide secure user registration, authentication, and Google Sign-In functionality.

---

## Project Overview

The Wowelse User Registration & Authentication System is designed to provide a simple and secure authentication experience. Users can register using their personal credentials, log in to their accounts, and access a protected dashboard.

The application also integrates Google OAuth 2.0 to support authentication through Google accounts.

## Key Features

- **User Registration** – Register using username, email, and password.
- **Input Validation** – Validate user details and password confirmation.
- **Duplicate Prevention** – Prevent duplicate usernames and email addresses.
- **Password Security** – Hash passwords using bcrypt before database storage.
- **User Login** – Authenticate using username or email and password.
- **Google OAuth 2.0** – Support Google Sign-In.
- **JWT Authentication** – Generate and validate authentication tokens.
- **Protected Dashboard** – Restrict dashboard access to authenticated users.
- **Logout** – Allow users to securely end their sessions.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js, HTML, CSS, JavaScript |
| Frontend Tooling | Vite |
| Backend | Python, FastAPI |
| Database | MongoDB |
| Database Hosting | MongoDB Atlas / MongoDB Community Server |
| Authentication | JWT, Google OAuth 2.0 |
| Password Hashing | bcrypt |
| Data Validation | Pydantic |
| API Communication | Fetch API |

## Project Structure

```text
wowelse/
│
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── security.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── style.css
    │   │
    │   ├── pages/
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── GoogleCallback.jsx
    │   │   └── Dashboard.jsx
    │   │
    │   ├── components/
    │   │   ├── InputField.jsx
    │   │   ├── GoogleButton.jsx
    │   │   ├── Notification.jsx
    │   │   └── Loader.jsx
    │   │
    │   └── services/
    │       └── api.js
    │
    └── .env.example
```

## Prerequisites

Install the following tools before running the application.

| Tool | Required Version | Download |
|---|---|---|
| Python | 3.10 or later | [Python](https://www.python.org/downloads/) |
| Node.js | 18 or later | [Node.js](https://nodejs.org/) |
| MongoDB | 7.0 or later (if using local installation) | [MongoDB](https://www.mongodb.com/try/download/community) |

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd wowelse
```

### 2. Configure MongoDB

The application supports both local MongoDB and MongoDB Atlas.

**Option A: MongoDB Atlas**

1. Visit [MongoDB Atlas](https://cloud.mongodb.com/).
2. Create an account and a free database cluster.
3. Configure database access and network access.
4. Copy the MongoDB connection string.
5. Add it to `backend/.env` as `MONGODB_URI`.

**Option B: Local MongoDB**

Install MongoDB Community Server and ensure the MongoDB service is running locally.

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create the environment configuration file:

```bash
copy .env.example .env
```

Configure the required environment variables in `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Create the environment configuration file:

```bash
copy .env.example .env
```

Configure the frontend API URL according to the variable name defined in your `.env.example` file.

## Running the Application

Start the backend and frontend separately.

**Terminal 1 – Backend Server**

```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

Backend URL: http://localhost:8000

API Documentation: http://localhost:8000/docs

**Terminal 2 – Frontend Application**

```bash
cd frontend
npm run dev
```

Frontend URL: http://localhost:5173

## Google OAuth Configuration

To enable Google Sign-In:

1. Visit [Google Cloud Console](https://console.cloud.google.com/).
2. Create a Google Cloud project.
3. Configure the OAuth consent screen.
4. Create an OAuth 2.0 Client ID.
5. Select Web Application as the application type.
6. Add the following authorized redirect URI:

```text
http://localhost:8000/api/auth/google/callback
```

7. Copy the Client ID and Client Secret into `backend/.env`.

**Security Note:** Never expose Google OAuth credentials or other sensitive environment variables in frontend code or public repositories.

## API Endpoints

The backend exposes the following authentication endpoints:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate an existing user |
| GET | `/api/auth/google/login` | Initiate Google authentication |
| GET | `/api/auth/google/callback` | Handle Google OAuth callback |
| GET | `/api/auth/me` | Retrieve authenticated user details |
| GET | `/api/health` | Check backend health status |

## Database Structure

**MongoDB – Users Collection**

Example user document:

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
```

The users collection stores account information, authentication provider details, and account creation timestamps.

For security, passwords are stored as hashes rather than plain text.

## Security Implementation

- Password hashing using bcrypt.
- JWT-based authentication.
- Input validation using Pydantic.
- Unique username and email constraints.
- Environment-based configuration.
- Protected authentication routes.
- Secure handling of OAuth credentials.

## Future Enhancements

- Email verification.
- Forgot password and reset password functionality.
- User profile management.
- Role-based access control.
- Production deployment.

## Project Information

| Field | Details |
|---|---|
| Project Name | Wowelse User Registration & Authentication System |
| Organization | Wowelse Brand Studio |
| Project Type | Full-Stack Web Development |
| Backend | Python FastAPI |
| Frontend | React.js |
| Database | MongoDB |

## Author

Developed as part of the **Wowelse Technical Assessment**.

---

*This project demonstrates practical implementation of full-stack development, REST API integration, database management, and authentication mechanisms.*
