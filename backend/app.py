import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from database import db
from routes.auth_routes import auth_bp
from routes.item_routes import item_bp
from routes.claim_routes import claim_bp
from routes.admin_routes import admin_bp

def create_app():
    # Serve frontend from dist folder if it exists
    frontend_dist = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'frontend', 'dist')
    static_folder = frontend_dist if os.path.exists(frontend_dist) else None
    static_url_path = '/' if static_folder else None
    
    app = Flask(__name__, static_folder=static_folder, static_url_path=static_url_path)
    app.config.from_object(Config)
    
    # Initialize extensions
    CORS(app)
    db.init_app(app)
    JWTManager(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(item_bp, url_prefix='/api/items')
    app.register_blueprint(claim_bp, url_prefix='/api/claims')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    @app.route('/')
    def health_check():
        # Serve frontend index.html if it exists
        if static_folder and os.path.exists(os.path.join(static_folder, 'index.html')):
            return send_from_directory(static_folder, 'index.html')
        return {'status': 'OK', 'message': 'AI Lost & Found API is running'}

    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    
    # Catch-all route to serve React app for client-side routing
    @app.route('/<path:path>')
    def serve_frontend(path):
        if static_folder and os.path.exists(os.path.join(static_folder, path)):
            return send_from_directory(static_folder, path)
        # Serve index.html for all other routes (React Router handling)
        if static_folder and os.path.exists(os.path.join(static_folder, 'index.html')):
            return send_from_directory(static_folder, 'index.html')
        return {'error': 'Not found'}, 404
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)
