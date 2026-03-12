# FastAPI

FastAPI is a modern, fast, web framework for building APIs with Python based on standard Python type hints. It is fast to code, fast to debug, and robust in both production and development.

[You can read more about FastAPI here](https://fastapi.tiangolo.com/).

## Structure

```
/backend/
|
├── app/
|   ├── db/             # Setup of database
|   ├── models/         # Schemas for the tables
|   ├── routes/         # Routes for the API
|   ├── __init__.py     # Initialization of app
|   ├── config.py       # Environment variables
|   └── limiter.py      # Rate limiting
├── alembic/            # Migration
├── pyproject.toml      # Formatting configs
├── requirements.txt    # Dependencies
├── requirements.lock   # Lock of dependency versions
└── server.py           # Entrypoint for serving
```

There are also some `Dockerfile`s and other things, but the listed structure is the code that will be contributed to most often.

## Dependencies

To get the right versions of the different dependencies, we lock the requirements file into another file where all the versions are specified. This is done with `uv` and can be updated with new dependencies with:

```bash
uv pip compile requirements.txt -o requirements.lock
```

If you ever want to run the backend locally with a venv and `uv`, do this:

```bash
uv venv
uv pip sync requirements.lock
uv run server.py
```

## Types

To improve code reliability and maintainability, this project uses type annotations consistently. Typing helps us to catch bugs early, improves autocompletion, and makes future work safer and easier.

```py
def bad_function(data):
    pass

def good_function(data: dict[str, int]) -> None:
    pass
```

The error messages will provide hints about both naming and types, so autoformat often by saving and listen to those and everything will be perfect.

## Environment Variables

The environment variables that FastAPI is allowed to use is defined in the `config.py` file. To add a environment variable, enter a new variable in the `Config` class:

```py
class Config:
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
```

These variables can then be imported through:

```py
from app.config import Config

print(Config.FRONTEND_URL)
```

## Routes

The routes are given as seperate sorted files in `/app/routes/`. The names need to explain what kind of routes are in the file, and it is recommended to nest each route under a given prefix under a specific version:

```py
# /app/routes/v1/food.py

from fastapi import APIRouter, Depends, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.get("/pizza")
@limiter.limit("60/minute")
def ping(request: Request):
    """My favorite food"""
    return {"food": "pizza"}
```

Notice the rate limiting, which is good to have to stop all kinds of security issues. Check out the [rate limiting documention](ratelimit.md) if you wonder how it works.

The tripple quote comment is the documentation generated in `/docs` url in debug, so make clear messages of what the route does and use them well.

Those are then registered and imported within the specified versions `__init__.py` file:

```py
from fastapi import APIRouter

from .food import router as food_router
from .health import router as health_router
from .players import router as players_router

v1_router = APIRouter(prefix="/v1", tags=["v1"])

v1_router.include_router(food_router, tags=["food"])
```
