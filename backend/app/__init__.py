import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from slowapi.errors import RateLimitExceeded
from sqlalchemy.exc import InterfaceError, OperationalError, SQLAlchemyError

from app.config import Config
from app.db import db, seeders
from app.limiter import limiter
from app.routes.v1 import v1_router

BACKEND_DIR = Path(__file__).resolve().parents[1]
UPLOADS_DIR = BACKEND_DIR / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)


logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up...")
    await db.connect(Config)

    if Config.DEBUG:
        try:
            await db.seed(seeders)
        except (OSError, SQLAlchemyError) as e:
            logger.warning(
                f"Skipping seeding ({type(e).__name__}). If the database is not "
                "running or migrated, run `pnpm db`."
            )

    yield

    await db.close()
    logger.info("Shutdown complete")


def create_app(config_object=Config):
    app = FastAPI(
        lifespan=lifespan,
        docs_url="/docs" if config_object.DEBUG else None,
        redoc_url="/redoc" if config_object.DEBUG else None,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=config_object.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "DELETE"],
        allow_headers=["Content-Type", "Authorization"],
    )

    app.state.limiter = limiter

    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logger.error(f"Unhandled exception: {exc}", exc_info=True)

        return JSONResponse(status_code=500, content={"error": "Internal server error"})

    @app.exception_handler(RateLimitExceeded)
    async def ratelimit_handler(request: Request, exc: RateLimitExceeded):
        client_host = request.client.host if request.client else "unknown"
        logger.warning(f"Rate limit exceeded for {client_host}")

        return JSONResponse(status_code=429, content={"error": "Too many requests"})

    async def db_unavailable_handler(request: Request, exc: Exception):
        path = request.url.path

        if config_object.DEBUG:
            logger.warning(
                f"Database unavailable for {path}. Run `pnpm db` to start it."
            )
        else:
            logger.error(f"Database unavailable for {path}")

        return JSONResponse(status_code=503, content={"error": "Database unavailable"})

    for db_error in (ConnectionError, OperationalError, InterfaceError):
        app.add_exception_handler(db_error, db_unavailable_handler)

    # API Routes
    app.include_router(v1_router)

    app.mount("/media", StaticFiles(directory=str(UPLOADS_DIR)), name="media")

    @app.get("/")
    async def root():
        return {
            "message": "Welcome to the API of betauia.net",
            "versions": {
                "v1": {
                    "status": "stable",
                    "base_url": "/v1",
                    "docs": "/docs" if config_object.DEBUG else None,
                }
            },
        }

    return app
