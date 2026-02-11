from fastapi import APIRouter, Depends, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy import literal, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import Config
from app.db import get_session
from app.models.player import Player

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.get("/ping")
@limiter.limit("60/minute")
def ping(request: Request):
    return {"message": "pong"}


@router.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}


@router.get("/players")
@limiter.limit("60/minute")
async def get_players(request: Request, session: AsyncSession = Depends(get_session)):
    """Get all players"""
    result = await session.execute(
        select(Player).order_by(Player.level.desc(), Player.name.asc())
    )
    players = result.scalars().all()

    return {"players": [player.to_dict() for player in players], "count": len(players)}


if Config.DEBUG:

    @router.get("/db")
    @limiter.limit("10/minute")
    async def db_test(request: Request, session: AsyncSession = Depends(get_session)):
        """Test database connection"""
        result = await session.execute(select(literal(1)))
        value = result.scalar_one()
        return {"db": "connected", "value": value}
