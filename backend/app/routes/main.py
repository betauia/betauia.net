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


@main_bp.route("/db/init-test")
def db_init_test():
    conn = get_db()
    cur = conn.cursor()
    try:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS backup_test (
                id SERIAL PRIMARY KEY,
                value TEXT
            );
        """)
        cur.execute("INSERT INTO backup_test (value) VALUES ('hello world');")
        conn.commit()
        return {"status": "ok", "message": "Table created and test row inserted"}, 200
    finally:
        cur.close()


@main_bp.route("/db/show-test")
def db_show_test():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id, value FROM backup_test;")
    rows = cur.fetchall()
    cur.close()
    return {"rows": rows}, 200

