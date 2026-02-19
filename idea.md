# AI-Powered Lost & Found Management System

## Problem Statement
Losing personal belongings in public places like colleges, offices, airports, or malls is very common. Existing lost and found systems are manual, inefficient, and do not use intelligent matching. Users must manually search or rely on announcements, which is time-consuming and unreliable.

## Proposed Solution
This project is a Full Stack AI-powered Lost & Found Management System that allows users to report lost and found items. The system uses AI-based text and image similarity matching to automatically suggest potential matches between lost and found items.

The system will help users recover lost items faster and reduce manual effort.

## Key Features

### User Features
- User registration and login (authentication)
- Report a lost item with description, image, and location
- Report a found item with description, image, and location
- View AI-suggested matches for lost items
- Submit claim requests for found items
- Track claim status
- View claim history

### Admin Features
- View all users
- View all lost and found items
- Approve or reject claim requests
- Manage system records

### AI Features
- AI-based text similarity matching between lost and found items
- AI-based image similarity matching (optional advanced feature)
- Automatic match suggestions

## System Scope

This is a full stack application consisting of:

Frontend:
- React.js (User Interface)

Backend:
- Flask (Python)
- REST APIs
- JWT Authentication
- Service layer architecture
- OOP principles

Database:
- PostgreSQL / MySQL

AI Integration:
- Gemini API or OpenAI API for similarity matching

## Backend Architecture (Important for System Design)

The backend follows clean architecture principles:

- Controllers (handle requests)
- Services (business logic)
- Repositories (database operations)
- Models (class representations)

This ensures maintainability, scalability, and modularity.

## Expected Outcome

The system will:

- Improve lost item recovery efficiency
- Provide intelligent matching using AI
- Demonstrate strong backend system design
- Apply OOP principles and clean architecture
