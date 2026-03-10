@echo off
REM RetrievAI Frontend Run Script for Windows

echo Starting RetrievAI Frontend...

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env
)

REM Run the development server
echo Starting React dev server on http://localhost:3000
npm run dev
