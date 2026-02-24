from .extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__="users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    # Relación: un usuario tiene muchas tareas
    tasks = db.relationship("Task", backref="owner", lazy=True)

    # Metodo para guardar contraseña hasheada
    def set_password(self, password):
        self.password = generate_password_hash(password)

    # Método para verificar contraseña
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    # Foreign key
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)