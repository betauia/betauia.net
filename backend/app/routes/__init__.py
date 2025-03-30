from .general import general_bp 
from .comedy_central import comedy_central_bp 

def register_routes(app):
    app.register_blueprint(general_bp)
    app.register_blueprint(comedy_central_bp, url_prefix="/comedycentral")

    return app
