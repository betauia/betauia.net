from flask import Flask


def create_app():
    app = Flask(__name__)

    app.debug = True
    app.use_reloader = True

    @app.route("/ping", methods=["GET"])
    def ping():
        return "pong!", 200

    return app
