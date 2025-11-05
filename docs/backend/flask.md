# Flask

Welcome to Flask’s documentation. Flask is a lightweight WSGI web application framework. It is designed to make getting started quick and easy, with the ability to scale up to complex applications.

[You can read more about Flask here](https://flask.palletsprojects.com/en/stable/).

## Structure

```
/backend/
|
├── app/
|   ├── routes/         # Routes for the API
|   ├── __init__.py     # Initialization of app
|   └── config.py       # Environment variables
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

The environment variables that Flask is allowed to use is defined in the `config.py` file. To add a environment variable, enter a new variable in the `Config` class:

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

The routes are given as seperate sorted files in `/app/routes/`. The names need to explain what kind of routes are in the file, and it is recommended to nest each route under a given prefix:

```py
# /app/routes/food.py
from flask import Blueprint, jsonify

food_bp = Blueprint("food", __name__, url_prefix="/food")


@food_bp.route("/pizza")
def pizza_lovers():
    return jsonify({"message": "We love pizza!"})
```

Those are then registered and imported with:

```py
from app.routes.food import food_bp
app.register_blueprint(food_bp)
```
