from fastapi import APIRouter

from .calendar import router as calendar_router
from .health import router as health_router
from .players import router as players_router

v1_router = APIRouter(prefix="/v1", tags=["v1"])

v1_router.include_router(health_router, tags=["health"])
v1_router.include_router(players_router, tags=["players"])
v1_router.include_router(calendar_router, tags=["calendar"])
