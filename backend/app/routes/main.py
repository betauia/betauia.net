from flask import Blueprint, jsonify

from app.db import get_db

main_bp = Blueprint("main", __name__)


@main_bp.route("/ping")
def ping():
    return jsonify({"message": "pong"})


@main_bp.route("/db")
def db_test():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT 1;")
    result = cur.fetchone()[0]
    cur.close()
    return {"db": result}, 200
