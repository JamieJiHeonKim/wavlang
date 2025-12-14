# Railway Deployment Guide

## Overview
This project has both backend and frontend in the same repository. You need to deploy them as **separate Railway services**.

---

## 🚂 Method 1: Using ROOT_DIRECTORY (Recommended)

### Deploy Backend

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `wavlang` repository
4. Go to **Settings** → **Variables**
5. Add these **Environment Variables**:
   ```
   ROOT_DIRECTORY=backend
   MONGO_URI=your_mongodb_connection_string
   PORT=8080
   JWT_SECRET=anythingoverhere8
   REACT_APP_API_KEY=your_openai_api_key
   REACT_APP_ASSEMBLY_API_KEY=your_assemblyai_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   MAILTRAP_USERNAME=your_mailtrap_username
   MAILTRAP_PASSWORD=your_mailtrap_password
   CLIENT_URL=https://your-frontend-url.railway.app
   ```
6. Go to **Settings** → **Build**
7. Set **Install Command**: `npm install`
8. Set **Build Command**: (leave empty)
9. Set **Start Command**: `node server.js`
10. **Redeploy** - it should work now!

### Deploy Frontend

1. In Railway, click **"New"** → **"Empty Service"**
2. Connect the same GitHub repository
3. Go to **Settings**
4. Add these **Environment Variables**:
   ```
   ROOT_DIRECTORY=frontend
   REACT_APP_API_KEY=your_openai_api_key
   REACT_APP_ASSEMBLY_API_KEY=your_assemblyai_key
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```
5. Also add the backend URL:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
   ```
6. **Deploy**

---

## 🚂 Method 2: Manual Configuration (Alternative)

### For Backend Service:

In Railway Dashboard → Settings:

1. **Variables** tab:
   - Add `ROOT_DIRECTORY=backend`
   - Add all other backend environment variables

2. **Settings** → **Deploy** tab:
   - **Install Command**: `npm install`
   - **Build Command**: (leave empty)
   - **Start Command**: `node server.js`
   - **Watch Paths**: `/backend/**`

### For Frontend Service:

In Railway Dashboard → Settings:

1. **Variables** tab:
   - Add `ROOT_DIRECTORY=frontend`
   - Add all other frontend environment variables

2. **Settings** → **Deploy** tab:
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Watch Paths**: `/frontend/**`

---

## 🗄️ Database Setup

You have two options for MongoDB:

### Option A: Railway MongoDB Plugin (Easy)
1. In your backend service, click **"New"** → **"Database"** → **"Add MongoDB"**
2. Railway will automatically add `MONGO_URI` to your backend environment variables
3. Done!

### Option B: MongoDB Atlas (Free Tier)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it as `MONGO_URI` environment variable in Railway

---

## 🔗 Connecting Frontend to Backend

After deploying both:

1. Get your **backend URL** from Railway (e.g., `https://wavlang-backend.up.railway.app`)
2. Go to your **frontend service** settings
3. Add environment variable:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
   ```
4. Update `frontend/src/api/index.js` to use this URL
5. Redeploy frontend

---

## 📝 Required Environment Variables

### Backend (Required)
- ✅ `ROOT_DIRECTORY=backend`
- ✅ `MONGO_URI` - MongoDB connection string
- ✅ `PORT=8080`
- ✅ `JWT_SECRET` - Any random string
- ✅ `CLIENT_URL` - Your frontend URL

### Backend (Optional)
- `REACT_APP_API_KEY` - OpenAI API key
- `REACT_APP_ASSEMBLY_API_KEY` - AssemblyAI key
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth
- `STRIPE_SECRET_KEY` - Stripe payments
- `MAILTRAP_USERNAME` - Email service
- `MAILTRAP_PASSWORD` - Email service

### Frontend (Required)
- ✅ `ROOT_DIRECTORY=frontend`
- ✅ `REACT_APP_BACKEND_URL` - Your backend Railway URL

### Frontend (Optional)
- `REACT_APP_API_KEY` - OpenAI API key
- `REACT_APP_ASSEMBLY_API_KEY` - AssemblyAI key
- `REACT_APP_STRIPE_PUBLISHABLE_KEY` - Stripe
- `REACT_APP_GOOGLE_CLIENT_ID` - Google OAuth

---

## 🔧 Troubleshooting

### "No start command found"
- Make sure you set `ROOT_DIRECTORY` environment variable
- Or set custom start command in Railway settings

### Backend crashes on startup
- Check you have `MONGO_URI` set
- Check MongoDB connection string is correct
- Check all required environment variables are set

### Frontend can't connect to backend
- Make sure `REACT_APP_BACKEND_URL` is set correctly
- Update your API calls to use the Railway backend URL
- Check CORS settings in backend allow your frontend domain

### Build fails
- Check Node.js version compatibility (recommend v18 or v20)
- Clear build cache in Railway settings and redeploy
- Check build logs for specific errors

---

## 🎉 Success!

Once both services are deployed:
- Backend: `https://wavlang-backend-xxx.up.railway.app`
- Frontend: `https://wavlang-frontend-xxx.up.railway.app`

Your app should be live! 🚀

