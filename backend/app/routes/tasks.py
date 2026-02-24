from app.models import Task
from app.extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, Blueprint, request

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    
    user_id = int(get_jwt_identity())
    tasks = Task.query.filter_by(user_id=user_id).all()

    tasks_list = []

    for task in tasks:
        tasks_list.append({
            "id": task.id,
            "title": task.title,
            "completed": task.completed
        })
    
    return jsonify(tasks_list), 200

@tasks_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():
    user_id = int(get_jwt_identity())

    data = request.get_json()
    if not data:
        return jsonify({"error": "json inválido"}), 400
    
    title = data.get("title")

    if not title:
        return jsonify({"error":"El título es obligatorio"}), 400
    
    new_task = Task(
        title=title,
        user_id=user_id
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        "id" : new_task.id,
        "title" : new_task.title,
        "completed" : new_task.completed
    }), 201

@tasks_bp.route("/<int:task_id>", methods=["PATCH"])
@jwt_required()
def toggle_task(task_id):
    user_id = int(get_jwt_identity())
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error:" "Tarea no encontrada"}), 404
    
    task.completed = not task.completed

    db.session.commit()

    return jsonify({
        "id":task.id,
        "title":task.title,
        "completed":task.completed
    }), 200

@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user_id = int(get_jwt_identity())

    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Tarea eliminada correctamente"}), 200