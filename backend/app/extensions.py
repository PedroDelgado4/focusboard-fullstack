from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()
cors = CORS()
