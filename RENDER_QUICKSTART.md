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

## 3️⃣ Deploy

Click: **"New +" → "Web Service"**

Then:
1. Select your RetrievAI GitHub repository
2. Render will auto-detect `render.yaml` 
3. Click "Deploy"

## 4️⃣ Add Database

Render will auto-create PostgreSQL if you have it in `render.yaml`. Copy the **DATABASE_URL**.

## 5️⃣ Set Environment Variables

In Render Web Service dashboard, add these to "Environment":

```
FLASK_ENV=production
SECRET_KEY=<run: python -c "import secrets; print(secrets.token_urlsafe(50))">
JWT_SECRET_KEY=<run: python -c "import secrets; print(secrets.token_urlsafe(50))">
DATABASE_URL=<copy from PostgreSQL service>
AI_PROVIDER=gemini
GEMINI_API_KEY=<from https://aistudio.google.com/app/apikey>
```

## 6️⃣ Wait for Deploy

- Watch the build logs
- Once green, your app is live at: `https://your-service-name.onrender.com`

## 7️⃣ Test It

1. Visit `https://your-service-name.onrender.com`
2. Create an account
3. Test AI matching

## ✅ Done!

Your app is now live and connected to a PostgreSQL database! 🎉

---

**Need help?** See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting.
