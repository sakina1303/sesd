# Deployment Guide - RetrievAI to Render

This guide will help you deploy the RetrievAI application to Render with both backend and frontend hosted on the same server.

## Prerequisites

- GitHub account with your project repository
- Render.com account (free tier available)
- API keys ready:
  - Google Gemini API key (recommended) OR OpenAI API key
  - PostgreSQL database (Render provides free tier)

## Step 1: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub account

## Step 2: Prepare Your Repository

Make sure your project is pushed to GitHub:

```bash
git init
git add .
git commit -m "Initial commit - Ready for Render deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/RetrievAI.git
git push -u origin main
```

## Step 3: Deploy Using render.yaml

Render supports automatic deployment using a `render.yaml` file in your repository root.

### Option A: Deploy Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select "Deploy an existing project from a Git repository"
4. Connect your GitHub repo with RetrievAI
5. Render will automatically detect `render.yaml` and configure everything

### Option B: Manual Setup (if render.yaml doesn't work)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure settings:

**Service Details:**
- Name: `retrievai-api` (or your preferred name)
- Environment: `Python 3.11`
- Region: Choose closest to you
- Branch: `main`

**Build & Deploy:**
- Build Command:
  ```bash
  cd backend && pip install -r requirements.txt && cd ../frontend && npm install && npm run build && cd ..
  ```
- Start Command:
  ```bash
  cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT "app:create_app()"
  ```

**Environment Variables:**
Set the following in Render's environment variables:

```
FLASK_ENV=production
SECRET_KEY=<generate-a-random-string>
JWT_SECRET_KEY=<generate-another-random-string>
DATABASE_URL=<postgresql://... from PostgreSQL database>
AI_PROVIDER=gemini
GEMINI_API_KEY=<your-gemini-api-key>
```

## Step 4: Set Up PostgreSQL Database

1. In Render Dashboard, click "New +" → "PostgreSQL"
2. Configure:
   - Name: `retrievai-db`
   - Database: `retrievai`
   - User: `retrievai_user`
   - Region: Same as your web service
   - Plan: Free ($0/month)

3. **IMPORTANT:** Wait for the database to finish initializing (5-10 minutes)
4. Go to your PostgreSQL service page → click "Connections" tab
5. Copy the **Internal Database URL** (starts with `postgresql://`)
6. Go back to your **Web Service** → "Environment" settings
7. Add `DATABASE_URL` with the value you copied

## Step 5: Configure Environment Variables

In your Render Web Service settings, add these environment variables:

| Key | Value |
|-----|-------|
| `FLASK_ENV` | `production` |
| `SECRET_KEY` | Generate a random string (use `python -c "import secrets; print(secrets.token_urlsafe(50))"`) |
| `JWT_SECRET_KEY` | Generate another random string |
| `DATABASE_URL` | **Internal URL from PostgreSQL service** (very important!) |
| `AI_PROVIDER` | `gemini` |
| `GEMINI_API_KEY` | Your Gemini API key |

## Step 6: Fix PostgreSQL Connection Issues

If you get `connection refused` error:

1. **Verify DATABASE_URL is set:**
   - Go to Web Service → "Environment"
   - Check that `DATABASE_URL` exists and has the PostgreSQL internal URL
   - It should look like: `postgresql://user:password@hostname:5432/dbname`

2. **Redeploy the service:**
   - Go to Web Service → "Manual Deploy"
   - Click "Latest" to redeploy
   - This time it should connect to PostgreSQL

3. **Check database status:**
   - Ensure PostgreSQL service shows "Available" status
   - Wait a few minutes if it's still initializing
| `DATABASE_URL` | Internal database URL from PostgreSQL service |
## Step 6: Fix PostgreSQL Connection Issues

If you get `connection refused` error:

1. **Verify DATABASE_URL is set:**
   - Go to Web Service → "Environment"
   - Check that `DATABASE_URL` exists and has the PostgreSQL internal URL
   - It should look like: `postgresql://user:password@hostname:5432/dbname`

2. **Redeploy the service:**
   - Go to Web Service → "Manual Deploy"
   - Click "Latest" to redeploy
   - This time it should connect to PostgreSQL

3. **Check database status:**
   - Ensure PostgreSQL service shows "Available" status
   - Wait a few minutes if it's still initializing

## Step 7: Monitor Deployment

1. Go to your Render service
2. Click "Logs" to watch the deployment progress
3. Once deployed successfully, you'll see a URL like `https://retrievai-api.onrender.com`
4. Test it by visiting the URL in your browser

## Step 8: Update Frontend API URL (Optional)

If you want to change the API URL for development, update `frontend/.env`:

```
VITE_API_BASE_URL=https://your-render-url.onrender.com/api
```

## Step 9: Create Admin User in Production

1. Go to your Render service → "Shell"
2. Run these commands:

```bash
cd backend
python init_db.py
```

This will automatically create tables and an admin user.

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

Or manually create a user:

```bash
cd backend
python
```

```python
from app import create_app
from database import db
from repositories.user_repository import UserRepository

app = create_app()
with app.app_context():
    # Create admin user
    admin = UserRepository.create('Admin', 'admin@example.com', 'admin123', 'admin')
    print(f'Admin user created: {admin.email}')
```

## Troubleshooting

### "Connection refused" or "Failed to connect to localhost:5432"

**This is the most common error.** Solution:

1. **Set DATABASE_URL environment variable:**
   - In Render Dashboard, go to Web Service → "Environment"
   - Check if `DATABASE_URL` exists
   - If missing, add it with the PostgreSQL internal URL
   - Restart/redeploy the service

2. **Find your PostgreSQL Internal URL:**
   - Go to PostgreSQL service page → "Connections"
   - Copy the "Internal Database URL"
   - Paste it as `DATABASE_URL` in your Web Service environment

3. **Redeploy:**
   - Web Service → "Manual Deploy" → "Latest"
   - Watch the logs to confirm it connects

### Build Fails

Check the build logs:
1. Go to Service → "Logs"
2. Look for error messages
3. Common issues:
   - Missing dependencies: Add to `requirements.txt`
   - Node version: Render uses Node 18+ by default
   - Build command syntax: Ensure all commands are correct

### Database Migration Issues

If you get migration errors:
1. Try using the `init_db.py` script: `python init_db.py`
2. If that fails, check PostgreSQL service is "Available"
3. Wait 5-10 minutes for database to initialize completely

### Frontend Not Showing

- Verify frontend builds correctly locally: `cd frontend && npm run build`
- Check that `frontend/dist` is being built
- Verify Flask app serves static files correctly

### AI API Errors

- Verify API keys are correct and have correct permissions
- For Gemini: Check quota at [Google AI Studio](https://aistudio.google.com)
- For OpenAI: Check account balance and API key permissions

### Port or Address Already in Use

Render automatically handles port assignment via `$PORT` environment variable.

## Scaling and Performance

### Recommended for Production

1. **Use PostgreSQL** - Not SQLite
2. **Enable Production Logging** - Monitor errors
3. **Set up Error Tracking** - Use Sentry or similar
4. **Use Gunicorn workers** - 4+ workers for better concurrency
5. **Enable HTTPS** - Render provides free SSL

### Upgrade Plan

For better performance and reliability:
- Free tier: Auto-sleeps after 15 mins of inactivity
- Starter tier ($7/month): Always active, better CPU, more RAM

## SSL/HTTPS

Render automatically provides SSL certificates for all deployed services. Your API will be accessible at:
```
https://your-service-name.onrender.com
```

## Next Steps

After deployment:

1. ✅ Test all features with your PostgreSQL database
2. ✅ Verify AI matching works
3. ✅ Test user authentication and claims
4. ✅ Check admin dashboard
5. ✅ Set up automated backups for database
6. ✅ Monitor logs regularly
7. ✅ Get feedback from users

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Flask Deployment Guide](https://flask.palletsprojects.com/deployment/)
- [React Vite Deployment](https://vitejs.dev/guide/ssr.html)
- [PostgreSQL on Render](https://render.com/docs/databases)

## Support

For issues or questions:
1. Check Render logs: Service → Logs
2. Check Flask app logs: `FLASK_ENV=debug` (for development only)
3. Test locally: Use `python app.py` from backend folder
4. Verify environment variables are set correctly

---

**Happy Deploying! 🚀**
