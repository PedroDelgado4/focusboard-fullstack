from flask import Blueprint
from app.models import User
from flask import request
from flask import jsonify
from flask_jwt_extended import create_access_token
from app.extensions import db


auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/test")
def test_auth():
    return {"message": "Auth route working"}

@auth_bp.route("/register", methods=["POST"])
def register():
    # Lectura JSON
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON perdido o inválido."}), 400
    
    # Extracción de campos
    user_email = data.get("email")
    user_psw = data.get("password")

    # Validación de mail y psw
    if not user_email or not user_psw:
        return jsonify({"error": "Se requiere de un EMAIL y PASSWORD."}), 400
    
    # Comprobación de duplicados
    existing_user = User.query.filter_by(email=user_email).first()

    if existing_user:
        return jsonify({"error": "El email introducido ya existe."}), 409
    
    # Creación de usuario
    user = User(email=user_email)
    user.set_password(user_psw)
    db.session.add(user)

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"error": "El registro ha fallado."}), 500

    # Generación de JWT (hay que pasarlo a string para que no de error 422)
    access_token = create_access_token(identity=str(user.id), additional_claims={"email": user.email})

    return jsonify({
        "message": "Usuario registrado correctamente.",
        "token": access_token
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON perdido o inválido."}), 400
    
    # Extracción de campos
    user_email = data.get("email")
    user_psw = data.get("password")

    # Validación de mail y psw
    if not user_email or not user_psw:
        return jsonify({"error": "Se requiere de un EMAIL y PASSWORD."}), 400
    
    # Comprobación de si existe usuario
    existing_user = User.query.filter_by(email=user_email).first()
    if not existing_user:
        return jsonify({"error": "Credenciales inválidas."}), 401
    
    # Verificion de contraseña
    if not existing_user.check_password(user_psw):
        return jsonify({"error": "Credenciales inválidas."}), 401
    
    # Generación de token
    access_token = create_access_token(identity=str(existing_user.id), additional_claims={"email": existing_user.email})

    return jsonify({
        "message": "Sesión iniciada correctamente.",
        "token": access_token
    }), 200
        
