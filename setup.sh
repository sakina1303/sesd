#!/bin/bash

# Full Project Setup Script

echo "========================================="
echo "  RetrievAI Full Project Setup"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Python 3 found${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js found${NC}"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL not found in PATH${NC}"
    echo "Please ensure PostgreSQL is installed"
fi

echo ""
echo "========================================="
echo "  Setting up Backend"
echo "========================================="
cd backend

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your configuration${NC}"
fi

echo -e "${GREEN}✅ Backend setup complete${NC}"

# Return to root
cd ..

echo ""
echo "========================================="
echo "  Setting up Frontend"
echo "========================================="
cd frontend

# Install dependencies
echo "📥 Installing Node.js dependencies..."
npm install

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
fi

echo -e "${GREEN}✅ Frontend setup complete${NC}"

# Return to root
cd ..

echo ""
echo "========================================="
echo "  Setup Complete! 🎉"
echo "========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Configure your database:"
echo "   createdb lost_and_found_db"
echo ""
echo "2. Edit backend/.env with:"
echo "   - Database URL"
echo "   - Secret keys"
echo "   - AI API key (Gemini or OpenAI)"
echo ""
echo "3. Start the backend:"
echo "   cd backend && ./run.sh"
echo ""
echo "4. Start the frontend (in another terminal):"
echo "   cd frontend && ./run.sh"
echo ""
echo "5. Open http://localhost:3000 in your browser"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
