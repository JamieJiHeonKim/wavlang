# 🚨 QUICK FIX for Railway "Cannot find module 'express'" Error

## The Problem
Railway was installing dependencies at the **root level** instead of in the **backend folder**.

## ✅ The Solution

I've added `nixpacks.toml` configuration files that Railway will automatically use when `ROOT_DIRECTORY` is set.

---

## 🚀 Deploy Backend (Correct Steps)

### Step 1: Set Environment Variable
In Railway Dashboard → **Settings** → **Variables**, add:

```
ROOT_DIRECTORY=backend
```

### Step 2: Add Required Environment Variables
```
MONGO_URI=your_mongodb_connection_string
PORT=8080
JWT_SECRET=anythingoverhere8
REACT_APP_API_KEY=your_openai_api_key
CLIENT_URL=https://your-frontend-url.railway.app
```

### Step 3: Configure Build Settings (If Needed)

Go to **Settings** → **Deploy**:

- **Install Command**: `npm install`
- **Build Command**: (leave empty)
- **Start Command**: `node server.js`

### Step 4: Redeploy

Click **Deploy** → **Redeploy**

---

## 🎨 Deploy Frontend (Correct Steps)

### Step 1: Create New Service
In Railway, click **"New"** → **"Empty Service"** → Connect same GitHub repo

### Step 2: Set Environment Variables
```
ROOT_DIRECTORY=frontend
REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
REACT_APP_API_KEY=your_openai_api_key
```

### Step 3: Configure Build Settings (If Needed)

Go to **Settings** → **Deploy**:

- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Step 4: Deploy

Click **Deploy**

---

## 🔧 What Changed

### New Files Created:
1. **`backend/nixpacks.toml`** - Tells Railway how to build the backend
2. **`frontend/nixpacks.toml`** - Tells Railway how to build the frontend

These files ensure Railway runs `npm install` in the correct directory when `ROOT_DIRECTORY` is set.

---

## ✅ Expected Result

After redeploying with these changes:

```
✅ Installing dependencies in /app/backend
✅ npm install (in backend directory)
✅ Starting with: node server.js
✅ Server is running on port 8080
```

No more "Cannot find module 'express'" error!

---

## 🚨 If It Still Fails

Check Railway build logs and verify:
1. ✅ `ROOT_DIRECTORY=backend` is set in Variables
2. ✅ Railway finds `backend/nixpacks.toml`
3. ✅ `npm install` runs in `/app/backend` directory
4. ✅ All environment variables are set correctly

---

## 📝 Next Steps

1. **Commit and push** the new `nixpacks.toml` files
2. Go to Railway and **Redeploy** backend service
3. Check build logs - should see "Installing dependencies" in correct folder
4. Deploy frontend service with same approach

Your backend should now start successfully! 🎉

