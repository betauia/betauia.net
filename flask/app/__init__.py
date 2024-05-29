from flask import Flask
import os


def create_app():
    app = Flask(__name__)

    app.debug = True
    app.use_reloader = True

    @app.get("/ping")
    def ping():
        return "pong"

    # from app.routes import blueprints
    # for bp in blueprints:
    #     app.register_blueprint(bp)

    from app.routes.core import core_bp
    app.register_blueprint(core_bp)

    return app
