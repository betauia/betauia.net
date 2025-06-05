from flask import Flask

def create_app():
    app = Flask(__name__)

    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from app.routes import calendarBlueprint
    app.register_blueprint(calendarBlueprint)
    return app
