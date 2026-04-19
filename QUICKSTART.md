# Quick Start Guide

## 1. Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup database
createdb lost_and_found_db

# Configure environment
cp .env.example .env
# Edit .env with your database URL and API keys

# Run server
python app.py
```

Backend runs on: http://localhost:5001

## 2. Frontend Setup (3 minutes)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on: http://localhost:3000

## 3. Create Admin User

```bash
# In Python shell
python
>>> from app import create_app
>>> from database import db
>>> from repositories.user_repository import UserRepository
>>> app = create_app()
>>> with app.app_context():
...     UserRepository.create('Admin', 'admin@example.com', 'admin123', 'admin')
...     print('Admin user created!')
```

## 4. Login Credentials

**Admin:**
- Email: admin@example.com
- Password: admin123

**Test User:**
- Register a new account at /register

## 5. Testing the AI Matching

1. Login as a user
2. Report a lost item (e.g., "Blue iPhone 13 Pro")
3. Report a found item with similar description
4. Click "Find Matches" on the lost item
5. View AI-generated match suggestions!

## Troubleshooting

**Database Connection Error:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env

**AI API Error:**
- Verify GEMINI_API_KEY or OPENAI_API_KEY in .env
- System falls back to basic matching if API fails

**Port Already in Use:**
- Change backend port in app.py
- Change frontend port in vite.config.js

## Next Steps

- Explore the dashboard
- Test AI matching with different descriptions
- Try the admin panel
- Review API documentation in SETUP_GUIDE.md
