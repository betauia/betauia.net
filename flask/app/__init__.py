from flask import Flask


def create_app():
    app = Flask(__name__)

    app.debug = True
    app.use_reloader = True

    from app.routes.core import core_bp
    app.register_blueprint(core_bp)

    from app.routes.betadev import betadev_bp
    app.register_blueprint(betadev_bp, url_prefix="/betadev")

    from app.routes.betadev.gamejam import gamejam_bp
    app.register_blueprint(gamejam_bp, url_prefix="/betadev/gamejam")

    from app.routes.comedycentral import cc_bp
    app.register_blueprint(cc_bp, url_prefix="/comedycentral")

    return app
