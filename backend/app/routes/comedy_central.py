from flask import Blueprint, jsonify
from app.models import ArneFact

comedy_central_bp = Blueprint("comedy_central", __name__)

@comedy_central_bp.route("/facts", methods=["GET"])
def facts():
    """
    Retrieves a random fact from 'arne_facts' table.

    Returns:
        JSON: Containing success flag and response with random fact.
    """

    rand_fact = ArneFact.get_random_fact()

    return jsonify({
        "success": True,
        "response": rand_fact.fact,
    });
