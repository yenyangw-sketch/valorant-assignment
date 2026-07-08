# Deploy Backend to Vercel

## Quick Deploy Steps

### 1. Push Code to GitHub

```powershell
cd c:\Users\yenya\OneDrive\Documents\GitHub\valorant-assignment
git add .
git commit -m "Prepare backend for Vercel deployment"
git push origin main
```

### 2. Deploy Backend on Vercel

**Using Vercel CLI:**
```powershell
npm install -g vercel
cd backend
vercel
```

**Or using Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select `backend` as root directory
5. Click "Deploy"

### 3. Configure Environment Variables in Vercel

After initial deployment:

1. Go to Vercel Dashboard → Your Backend Project
2. Click "Settings" → "Environment Variables"
3. Add all Firebase credentials:

```
FIREBASE_TYPE = service_account
FIREBASE_PROJECT_ID = valorant-assignment
FIREBASE_PRIVATE_KEY_ID = ee92af9a377ae733cf145d879f3205e3c584f9b4
FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCroK+KgQI/bMEX\n....(full key)....\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-fbsvc@valorant-assignment.iam.gserviceaccount.com
FIREBASE_CLIENT_ID = 113927360020549828715
FIREBASE_AUTH_URI = https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI = https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL = https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL = https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40valorant-assignment.iam.gserviceaccount.com
FIREBASE_UNIVERSE_DOMAIN = googleapis.com
NODE_ENV = production
```

### 4. Redeploy After Adding Environment Variables

```powershell
cd backend
vercel --prod
```

### 5. Update Frontend API URL

Once backend is deployed and you have the Vercel URL (e.g., `https://valorant-backend.vercel.app`):

1. Go to Vercel Dashboard → Frontend Project
2. Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` to: `https://valorant-backend.vercel.app/api`
4. Redeploy frontend: `vercel --prod`

## Test Your API

Once deployed, test the endpoints:

```powershell
# Health check
Invoke-RestMethod -Uri "https://your-backend.vercel.app/api/health"

# Get all users
Invoke-RestMethod -Uri "https://your-backend.vercel.app/api/users"

# Create user
$body = @{
    email = "test@example.com"
    username = "testuser"
    displayName = "Test User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://your-backend.vercel.app/api/users" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

## Full API URLs After Deployment

- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`
- Health: `https://your-backend.vercel.app/api/health`
- Users: `https://your-backend.vercel.app/api/users`
- Agents: `https://your-backend.vercel.app/api/agents`

## Troubleshooting

### "Cannot find module" error
- Make sure all dependencies are in `package.json`
- Run `npm install` locally first to test

### Firebase errors
- Verify all FIREBASE_* env variables are set
- Check private key includes newlines: `\n`
- Private key should start with `-----BEGIN PRIVATE KEY-----`

### CORS errors from frontend
- The backend already has CORS enabled for all origins
- Check frontend API URL matches exactly

### Slow initial request
- Vercel cold starts are normal (takes 1-2 seconds first time)
- Subsequent requests are faster

## Local Development

Continue using local development:
```powershell
cd backend
npm run dev
```

This will run on `http://localhost:3001` and still use the `.env` file.
