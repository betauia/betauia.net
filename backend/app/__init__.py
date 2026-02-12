import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

from app.config import Config
from app.db import db, seeders
from app.limiter import limiter
from app.models import models
from app.routes.v1 import v1_router

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up...")
    await db.connect(Config)
    await db.create_tables(models)

    if Config.DEBUG:
        await db.seed(seeders)

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
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["*"],
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

    # API Routes
    app.include_router(v1_router)

    # Root endpoint to show available API versions
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
