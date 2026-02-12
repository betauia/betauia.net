from fastapi import APIRouter, Depends, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models.player import Player

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.get("/players")
@limiter.limit("60/minute")
async def get_players(request: Request, session: AsyncSession = Depends(get_session)):
    """Get all players ordered by level"""
    result = await session.execute(
        select(Player).order_by(Player.level.desc(), Player.name.asc())
    )
    players = result.scalars().all()

    return {"players": [player.to_dict() for player in players], "count": len(players)}
