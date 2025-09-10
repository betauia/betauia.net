from flask import Flask

from app.routes.calendar import calendar_bp
from app.routes.main import main_bp


def create_app():
    app = Flask(__name__)

    app.register_blueprint(main_bp)
    app.register_blueprint(calendar_bp)

    return app
