from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from app.limiter import limiter

router = APIRouter()

TEAPOT = r"""
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣘⣿⣿⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣀⣀⡀⠀⠀⠀⢀⣀⠘⠛⠛⠛⠛⠛⠛⠁⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢠⡿⠋⠉⠛⠃⣠⣤⣈⣉⡛⠛⠛⠛⠛⠛⠛⢛⣉⣁⣤⣄⠀⠀⣾⣿⡿⠗⠀
⠀⢸⡇⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⣿⣿⠀⠀⠀
⠀⢸⣇⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢉⣉⣠⣿⣿⡀⠀⠀
⠀⠀⠙⠷⡆⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⢰⣿⣿⣿⣿⣿⡇⠀⠀
⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠸⣿⣿⣿⣿⠟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠄⠈⠉⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢄⣉⠉⠛⠛⠛⠛⠛⠋⢉⣉⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠿⠿⠿⠿⠿⠿⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
"""


@router.get("/coffee")
@limiter.limit("30/minute")
def coffee(request: Request):
    """Brew coffee"""
    return JSONResponse(
        status_code=418,
        content={
            "error": "I'm a teapot",
            "message": "Kaffe finner du på MatRIC. Her brygger vi bare te.",
            "teapot": TEAPOT,
        },
    )
