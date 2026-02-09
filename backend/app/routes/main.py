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
def health():
    return {"status": "healthy"}


if Config.DEBUG:

    @router.get("/db")
    @limiter.limit("10/minute")
    def db_test(request: Request, conn=Depends(get_db_dependency)):
        with conn.cursor() as cur:
            cur.execute("SELECT 1;")
            result = cur.fetchone()[0]
        return {"db": result}
