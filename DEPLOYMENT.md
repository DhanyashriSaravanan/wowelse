# How to Host Wowelse Publicly (Free)

Your database (**MongoDB Atlas**) is already in the cloud. To get a public link you can share for your assessment, you just host:
- **Backend (FastAPI)** on **Render** (free tier)
- **Frontend (React)** on **Vercel** (free tier)

---

## Step 1 — Allow Render to Connect to MongoDB Atlas
1. Go to https://cloud.mongodb.com → **Security** → **Database & Network Access**.
2. Click **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) → **Confirm**.

---

## Step 2 — Put Your Code on GitHub
1. Create a free account at https://github.com and create a **New Repository** named `wowelse`.
2. Upload your `wowelse` folder (make sure `backend/.env`, `backend/venv/`, and `frontend/node_modules/` are **NOT** uploaded — `.gitignore` already excludes them).

---

## Step 3 — Deploy Backend on Render (Free)
1. Go to https://render.com and sign in with GitHub.
2. Click **New +** → **Web Service** → select your `wowelse` repository.
3. Configure:
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add these **Environment Variables** in Render:
   - `MONGODB_URI` → your MongoDB Atlas connection string
   - `MONGODB_DB` → `wowelse`
   - `JWT_SECRET` → any long random secret string
   - `JWT_EXPIRE_MINUTES` → `60`
   - `GOOGLE_CLIENT_ID` → your Google Client ID
   - `GOOGLE_CLIENT_SECRET` → your Google Client Secret
   - `FRONTEND_URL` → *(leave blank for 1 minute until Step 4 gives you the Vercel URL)*
   - `GOOGLE_REDIRECT_URI` → `https://YOUR-RENDER-APP.onrender.com/api/auth/google/callback`
5. Click **Create Web Service**. Copy your new backend URL (e.g. `https://wowelse-backend.onrender.com`).

---

## Step 4 — Deploy Frontend on Vercel (Free)
1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New…** → **Project** → import your `wowelse` repository.
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
4. Add **Environment Variable**:
   - `VITE_API_URL` → `https://YOUR-RENDER-APP.onrender.com` *(no trailing slash)*
5. Click **Deploy**. You will get your public link, e.g. `https://wowelse.vercel.app`!

---

## Step 5 — Connect Everything Together
1. Go back to **Render → Environment**:
   - Set `FRONTEND_URL` = `https://wowelse.vercel.app` *(your exact Vercel URL, no trailing slash)*
   - Set `GOOGLE_REDIRECT_URI` = `https://YOUR-RENDER-APP.onrender.com/api/auth/google/callback`
   - Save (Render will auto-redeploy).
2. Go to **Google Cloud Console → Clients → Wowelse Authentication**:
   - Under **Authorized JavaScript origins**, add: `https://wowelse.vercel.app`
   - Under **Authorized redirect URIs**, add: `https://YOUR-RENDER-APP.onrender.com/api/auth/google/callback`
   - Click **Save**.

Your public link (`https://wowelse.vercel.app`) is now live and ready to share!
