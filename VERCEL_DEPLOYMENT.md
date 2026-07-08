# Vercel Deployment Guide

## Frontend Deployment (Next.js) - Vercel

### Step 1: Push to GitHub
First, make sure your code is pushed to GitHub:

```powershell
cd valorant-assignment
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**
```powershell
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel
```

Follow the prompts:
- Link to GitHub account
- Select GitHub repo
- Choose project name
- Set root directory to `frontend`
- Click Deploy

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Set root directory to `frontend`
6. Click "Deploy"

### Step 3: Set Environment Variables in Vercel

In Vercel Dashboard:
1. Go to your project settings
2. Click "Environment Variables"
3. Add the following:

**Key:** `NEXT_PUBLIC_API_URL`
**Value:** `https://your-backend-url.com/api` (update with your actual backend URL)

### Backend Deployment (Express.js) - Separate Platform

You need to deploy the backend separately. Options:

#### Option 1: Railway (Recommended)
```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to backend
cd backend

# Initialize and deploy
railway init
railway up
```

#### Option 2: Render
1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add all FIREBASE_* variables from `.env`

#### Option 3: Fly.io
```powershell
npm install -g @superfly/cli
flyctl auth login
cd backend
flyctl launch
flyctl deploy
```

### Step 4: Update Frontend API URL

Once backend is deployed, update the `NEXT_PUBLIC_API_URL` in Vercel:

1. Go to Vercel Project Settings
2. Environment Variables
3. Update `NEXT_PUBLIC_API_URL` with your deployed backend URL
4. Redeploy with `vercel --prod`

### Firebase Credentials for Backend

When setting environment variables on your backend platform, add:

```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=valorant-assignment
FIREBASE_PRIVATE_KEY_ID=ee92af9a377ae733cf145d879f3205e3c584f9b4
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...(keep the full key)...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@valorant-assignment.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=113927360020549828715
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40valorant-assignment.iam.gserviceaccount.com
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
PORT=3001
NODE_ENV=production
```

### Verify Deployment

After deployment:
- Frontend: Visit your Vercel URL (e.g., https://your-project.vercel.app)
- Backend: Test API endpoints (e.g., https://your-backend.railway.app/api/health)

### Troubleshooting

If frontend can't connect to backend:
1. Check backend is running and accessible
2. Verify `NEXT_PUBLIC_API_URL` matches backend URL
3. Check CORS is enabled in Express backend
4. Look at browser console for errors
