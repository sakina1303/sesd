# ⚡ Quick Deploy to Render - Step by Step

## 1️⃣ Push to GitHub

```bash
cd /Users/sakina/Downloads/RetrievAI
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## 2️⃣ Go to render.com

- Sign up/login with GitHub at [render.com](https://render.com)

## 3️⃣ Deploy Web Service

Click: **"New +" → "Web Service"**

Then:
1. Select your RetrievAI GitHub repository
2. Render will auto-detect `render.yaml` 
3. Click "Deploy"

## 4️⃣ Create PostgreSQL Database

Click: **"New +" → "PostgreSQL"**

Config:
- Name: `retrievai-db`
- Database: `retrievai`
- User: `retrievai_user`
- Plan: Free

⏳ **Wait 5-10 minutes for database to initialize**

## ⚠️ 5️⃣ CRITICAL: Add DATABASE_URL

1. Go to PostgreSQL service → "Connections"
2. Copy the **Internal Database URL**
3. Go to Web Service → "Environment"
4. Add new variable:
   - Key: `DATABASE_URL`
   - Value: Paste the URL you copied
5. Click "Save"

## 6️⃣ Redeploy

1. Go back to Web Service
2. Click "Manual Deploy" → "Latest"
3. Wait for the deployment to finish (watch logs)

## 7️⃣ Add More Environment Variables

Go to Web Service → "Environment" and add:

```
SECRET_KEY=<run: python -c "import secrets; print(secrets.token_urlsafe(50))">
JWT_SECRET_KEY=<run: python -c "import secrets; print(secrets.token_urlsafe(50))">
GEMINI_API_KEY=<from https://aistudio.google.com/app/apikey>
FLASK_ENV=production
AI_PROVIDER=gemini
```

Then redeploy again.

## ✅ Done!

Your app is now live at: `https://your-service-name.onrender.com` 🎉

**Login with:**
- Email: `admin@example.com`
- Password: `admin123`

---

**Having issues?** See [DEPLOYMENT.md](DEPLOYMENT.md) - Full Troubleshooting Guide

