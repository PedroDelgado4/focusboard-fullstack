from flask import Flask
from .config import Config
from .extensions import db, jwt, cors
from app.routes.tasks import tasks_bp
import os


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, origins=os.getenv("FRONTEND_URL", "https://focusboard-fullstack.vercel.app"))

    from . import models
    from .routes.auth import auth_bp
    from .routes.tasks import tasks_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(tasks_bp, url_prefix="/api/tasks")

    # Crear tablas automaticamente
    with app.app_context():
        db.create_all()

    return app