import os


class Config:
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
