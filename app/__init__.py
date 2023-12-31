import os

from flask import Flask


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'app.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.debug = True

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'


    # DB stuff

    from . import db
    db.init_app(app)

    from .blueprints.frontend import frontend_blueprint
    app.register_blueprint(frontend_blueprint)

    from .blueprints.dev import dev_blueprint
    app.register_blueprint(dev_blueprint)

    from . import auth
    app.register_blueprint(auth.bp)

    from . import post
    app.register_blueprint(post.bp)

    return app
