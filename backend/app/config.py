import os

class Config:
    """
    Configuration class to store settings and variables.

    Retrieves environment variables using `os.environ.get()` passed down from docker compose.
    """

    # DB config settings
    DB_NAME = os.environ.get("DB_NAME")
    DB_USER = os.environ.get("DB_USER")
    DB_PASS = os.environ.get("DB_PASS")
    DB_HOST = os.environ.get("DB_HOST")
    DB_URI = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}"

    # Environment settings
    ENV = os.environ.get("ENV")
    DEBUG = ENV == "development"

    FRONTEND_URL = os.environ.get("FRONTEND_URL")

    DB_RESET = os.environ.get("DB_RESET") == "True"
