from flask import Blueprint, request, make_response
from app.models import Organizers
from werkzeug.security import check_password_hash
import jwt
from datetime import datetime, timedelta
import os

events_bp = Blueprint("events", __name__)


@events_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    name = data.get("name")
    password = data.get("password")

    if not (name and password):
        return make_response("Please enter name and password", 406)

    organizer = Organizers.query.filter_by(name=name).first()
    print("KIDUHFIUSDHFGIUSDHGIUSHDGIUSHDGUIHASDGIHSDIUGUHSS")
    if not organizer:
        return make_response("Please check your name", 401)

    if not check_password_hash(organizer.password, password):
        return make_response("Please check your password", 401)

    token = jwt.decode({
        "id": organizer.id,
        "exp": datetime.utcnow() + timedelta(minutes=30)
        },
        os.environ["SECRET_TOKEN"],
        "HS256"
    )
    return make_response({"token": token}, 200)
