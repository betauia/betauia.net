from app import create_app
from app.config import Config

app = create_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=Config.DEBUG)
