import os
from app import create_app
from app.config import Config
from app.utils.db import clean_all_data, insert_dummy_data

app = create_app()

if __name__ == "__main__":
    """
    Entrypoint for running the app.

    This resets database and seeds the DB with dummy data if environment variables are set, then either starts the app in dev or with Gunicorn for production.
    """

    if Config.DB_RESET:
        with create_app().app_context():
            clean_all_data()

    if Config.ENV == "development":
        with create_app().app_context():
            insert_dummy_data()

    if Config.ENV == "production":
        import subprocess
        subprocess.run([
            "gunicorn",
            "-w", "4",
            "-b", "0.0.0.0:8000",
            "server:app"
        ])
    else:
        app.run(host="0.0.0.0", port=8000, debug=Config.DEBUG)
