# ElevateCV - Vercel & Render Deployment Guide

Follow these exact steps to launch **ElevateCV** effortlessly across your free cloud tiers. You must deploy the Backend (Render) first, because Vercel (Frontend) requires the resulting Render URL.

---

## 🚀 Step 1: Push Code to GitHub
1. Open your terminal in this repository.
2. Run `git add .`
3. Run `git commit -m "Deploy Prep"`
4. Run `git push origin main`

---

## ⚡ Step 2: Deploy Backend to Render
1. Go to [Render](https://dashboard.render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Configure settings exactly as follows:
   - **Name**: `elevatecv-backend`
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Expand **Environment Variables** and add the following keys from your local `.env`:
   - `MONGO_URI`: (Your active MongoDB URL)
   - `JWT_SECRET`: (Your secret token generator key)
   - `CLOUDINARY_CLOUD_NAME`: (Your credentials)
   - `CLOUDINARY_API_KEY`: (Your credentials)
   - `CLOUDINARY_API_SECRET`: (Your credentials)
   - `GOOGLE_CLIENT_ID`: (Your OAuth credentials text)
5. Click **Create Web Service**. 
6. Wait 3 minutes for the build to pass. Once green, copy your new backend URL from the top left corner (e.g., `https://elevatecv-backend.onrender.com`).

---

## 🌎 Step 3: Deploy Frontend to Vercel
1. Go to [Vercel](https://vercel.com/dashboard) and click **Add New** > **Project**.
2. Import the identical GitHub repository.
3. Vercel will auto-detect "Vite". Keep the Framework Preset as **Vite**.
4. Configure the Build & Development Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand **Environment Variables** and add the following exactly:
   - **Name**: `VITE_API_URL`
   - **Value**: *(Paste the Render URL you copied in Step 2)*. **IMPORTANT: DO NOT add a trailing slash like `/api`. Just paste the domain (e.g., `https://elevatecv-backend.onrender.com/api`). Wait, `API_BASE` appends `/api`, so just paste the root domain without `/api`. Wait, actually paste `https://elevatecv-backend.onrender.com/api` and we will ensure the code resolves correctly. Wait, the code says `import.meta.env.VITE_API_URL || '/api'`. Since it replaces the '/api' string fully, your VITE_API_URL must be `https://elevatecv-backend.onrender.com/api` !!**
6. Click **Deploy**.
7. Wait 1 minute. Vercel will deploy your React package statically and route it to your live Render backend!

---

## 🔐 Step 4: Add Google Authentication Allowed Origins
1. Go to your [Google Cloud Console](https://console.cloud.google.com/) Credentials Page.
2. Edit your **OAuth 2.0 Client ID**.
3. Under **Authorized JavaScript origins**, click *ADD URI*.
4. Paste your exact Vercel Frontend domain (e.g., `https://elevatecv-yourusername.vercel.app`).
5. Click **Save** at the bottom.

## 🏆 You are live!
Both frontend and backend are now permanently split and synchronized in the cloud! Vercel manages global CDN delivery while Render processes the heavy Express MongoDB routing.
