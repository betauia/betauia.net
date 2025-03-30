from flask import Flask

from app.routes import register_routes
from app.config import Config
from app.utils.extensions import db, migrate


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = Config.DB_URI

    db.init_app(app)
    migrate.init_app(app, db)

    app = register_routes(app)

    return app
