from fastapi import APIRouter

from .auth import router as auth_router
from .calendar import router as calendar_router
from .health import router as health_router

v1_router = APIRouter(prefix="/v1", tags=["v1"])

v1_router.include_router(health_router, tags=["health"])
v1_router.include_router(auth_router, tags=["auth"])
v1_router.include_router(calendar_router, tags=["calendar"])
