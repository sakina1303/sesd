# AI-Powered Lost & Found Management System

An intelligent full-stack Lost & Found platform that helps users report lost and found items and uses AI-based similarity matching to suggest possible matches automatically.

This system improves the efficiency of recovering lost items and demonstrates strong backend architecture, OOP principles, and system design.

---

## Problem Statement

Losing personal belongings in public places like colleges, offices, airports, and malls is common. Traditional lost and found systems are manual and inefficient.

This system provides a centralized platform with AI-powered matching to help users recover items faster.

---

## Key Features

### User Features
- User Registration and Login (Authentication)
- Report Lost Items
- Report Found Items
- Upload item description, image, and location
- AI-powered matching suggestions
- Submit claim requests
- View claim status
- View claim history

### Admin Features
- View all users
- View lost and found items
- Approve or reject claims
- Manage system data

### AI Features
- Text similarity matching using AI embeddings
- Image similarity matching (future enhancement)
- Automatic match suggestions

---

## System Architecture

The backend follows clean architecture principles:

Controllers → handle HTTP requests  
Services → contain business logic  
Repositories → handle database operations  
Models → represent entities  
AI Service → handles matching logic  

This ensures scalability, modularity, and maintainability.

---

## Tech Stack

### Frontend
- React.js

### Backend
- Flask (Python)
- REST APIs
- JWT Authentication

### Database
- PostgreSQL / MySQL

### AI Integration
- Gemini API or OpenAI API

---

## Core Entities

- User
- LostItem
- FoundItem
- Claim
- AIMatchService

---

## Project Structure

```
ai-lost-and-found-system/

README.md
idea.md
useCaseDiagram.md
sequenceDiagram.md
classDiagram.md
ErDiagram.md

backend/
frontend/
```

---

## How Matching Works

1. User reports lost item
2. System stores item in database
3. AI compares lost item with found items
4. System returns possible matches
5. User submits claim request
6. Admin approves or rejects claim
7. Item status updated and moved to history

---

## Backend Design Principles Used

- Object-Oriented Programming (OOP)
- Encapsulation
- Abstraction
- Service Layer Architecture
- Separation of Concerns
- Clean Code Structure

---

## Future Enhancements

- Image-based matching using AI Vision models
- Email notifications
- Real-time alerts
- Mobile application support

---

## Author

Sakina  
Full Stack Developer | AI Enthusiast

---

## Status

Milestone-1 Completed  
Idea and system design ready  
Implementation in progress
