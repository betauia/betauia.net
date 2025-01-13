import os
from app import create_app

app = create_app()

if __name__ == "__main__":

    if os.getenv("FLASK_ENV", "development") == "production":
        import subprocess
        subprocess.run([
            "gunicorn",
            "-w", "4",
            "-b", "0.0.0.0:8000",
            "server:app"
        ])
    else:
        app.run(host="0.0.0.0", port=8000, debug=True)
