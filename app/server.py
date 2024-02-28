import os
from flask import Flask, jsonify

app = Flask(__name__)

app.debug = True
app.use_reloader = True

@app.get("/ping")
def ping():
    return "pong"

from routes import blueprints
for bp in blueprints:
    app.register_blueprint(bp)
