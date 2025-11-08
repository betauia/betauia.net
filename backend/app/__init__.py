from flask import Flask, jsonify
from flask_limiter.errors import RateLimitExceeded

from app.config import Config
from app.db import close_db, init_db
from app.limiter import limiter
from app.routes.calendar import calendar_bp
from app.routes.main import main_bp


def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)

    limiter.init_app(app)

    @app.errorhandler(RateLimitExceeded)
    def ratelimit_handler(e):
        return jsonify({"error": "Too many requests"}), 429

    init_db(app)
    app.teardown_appcontext(close_db)

    app.register_blueprint(main_bp)
    app.register_blueprint(calendar_bp)

    return app
