from flask import Blueprint

general_bp = Blueprint("general", __name__)

@general_bp.route("/ping", methods=["GET"])
def ping():
    """
    Checks if server is running.

    Returns:
        tuple: With message 'pong!' and HTTP status code 200.
    """
    return "pong!", 200

