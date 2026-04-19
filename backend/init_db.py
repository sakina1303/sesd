#!/usr/bin/env python
"""
Database initialization script for Render deployment.
Run this once to set up the database and create admin user.
"""

import os
import sys
from app import create_app
from database import db
from models import User

def init_db():
    """Initialize the database and create tables."""
    app = create_app()
    
    with app.app_context():
        try:
            # Create all tables
            db.create_all()
            print("✓ Database tables created successfully")
            return True
        except Exception as e:
            print(f"✗ Error creating tables: {e}")
            return False

def create_admin():
    """Create default admin user."""
    app = create_app()
    
    with app.app_context():
        try:
            # Check if admin exists
            admin_user = User.query.filter_by(email='admin@example.com').first()
            if admin_user:
                print("✓ Admin user already exists")
                return True
            
            # Create admin user
            from repositories.user_repository import UserRepository
            admin = UserRepository.create('Admin', 'admin@example.com', 'admin123', 'admin')
            print(f"✓ Admin user created: {admin.email}")
            return True
        except Exception as e:
            print(f"✗ Error creating admin: {e}")
            return False

if __name__ == '__main__':
    print("🚀 Initializing RetrievAI Database...\n")
    
    if not init_db():
        sys.exit(1)
    
    if not create_admin():
        sys.exit(1)
    
    print("\n✅ Database initialization complete!")
