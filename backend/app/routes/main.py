from fastapi import APIRouter, Depends, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import Config
from app.db import get_db_dependency

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
async def get_players(request: Request, conn=Depends(get_db_dependency)):
    """Get all players from the database"""
    async with conn.cursor() as cur:
        await cur.execute(
            """
            SELECT id, name, level, created_at
            FROM players
            ORDER BY level DESC, name ASC
            """
        )
        rows = await cur.fetchall()

    players = [
        {
            "id": row[0],
            "name": row[1],
            "level": row[2],
            "created_at": row[3].isoformat() if row[3] else None,
        }
        for row in rows
    ]

    return {"players": players, "count": len(players)}


if Config.DEBUG:

    @router.get("/db")
    @limiter.limit("10/minute")
    async def db_test(request: Request, conn=Depends(get_db_dependency)):
        async with conn.cursor() as cur:
            await cur.execute("SELECT 1;")
            result = await cur.fetchone()
        return {"db": result[0]}
