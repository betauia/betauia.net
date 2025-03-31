from .general import general_bp 
from .comedy_central import comedy_central_bp 

def register_routes(app):
    """
    Registers app routes with the Flask app.

    Args:
        app (Flask): The instance to register the blueprints to.

    Returns:
        Flask: The instance with routes registered.
    """
    app.register_blueprint(general_bp)
    app.register_blueprint(comedy_central_bp, url_prefix="/comedycentral")

    return app
