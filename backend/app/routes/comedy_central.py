from flask import Blueprint, jsonify
from app.models import ArneFact

comedy_central_bp = Blueprint("comedy_central", __name__)

@comedy_central_bp.route("/facts", methods=["GET"])
def facts():

    rand_fact = ArneFact.get_random_fact()

    return jsonify({
        "success": True,
        "response": rand_fact.fact,
    });
