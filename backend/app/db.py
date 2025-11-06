import psycopg2
import psycopg2.pool
from flask import current_app, g


def init_db(app):
    app.extensions["db_pool"] = psycopg2.pool.SimpleConnectionPool(
        1,
        10,
        dbname=app.config["POSTGRES_DB"],
        user=app.config["POSTGRES_USER"],
        password=app.config["POSTGRES_PASSWORD"],
        host=app.config["POSTGRES_HOST"],
        port=app.config["POSTGRES_PORT"],
    )


def get_db():
    if "db_conn" not in g:
        pool = current_app.extensions["db_pool"]
        g.db_conn = pool.getconn()
    return g.db_conn


def close_db(e=None):
    conn = g.pop("db_conn", None)
    if conn is not None:
        pool = current_app.extensions["db_pool"]
        pool.putconn(conn)
