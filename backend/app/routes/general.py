from flask import Blueprint

general_bp = Blueprint("general", __name__)

@general_bp.route("/ping", methods=["GET"])
def ping():
    return "pong!", 200

