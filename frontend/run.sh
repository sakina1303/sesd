#!/bin/bash

# RetrievAI Frontend Run Script

echo "🚀 Starting RetrievAI Frontend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
fi

# Run the development server
echo "✅ Starting React dev server on http://localhost:3000"
npm run dev
