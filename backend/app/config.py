import os


class Config:
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    POSTGRES_DB = os.environ.get("POSTGRES_DB")
    POSTGRES_USER = os.environ.get("POSTGRES_USER")
    POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
    POSTGRES_HOST = os.environ.get("POSTGRES_HOST", "db")
    POSTGRES_PORT = os.environ.get("POSTGRES_PORT", "5432")
