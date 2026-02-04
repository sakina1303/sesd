@echo off
REM RetrievAI Backend Run Script for Windows

echo Starting RetrievAI Backend...

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies if needed
if not exist "venv\installed" (
    echo Installing dependencies...
    pip install -r requirements.txt
    type nul > venv\installed
)

REM Check if .env exists
if not exist ".env" (
    echo Warning: .env file not found!
    echo Creating from .env.example...
    copy .env.example .env
    echo Please edit .env with your configuration before running!
    pause
    exit /b 1
)

REM Run the application
echo Starting Flask server on http://localhost:5000
python app.py
