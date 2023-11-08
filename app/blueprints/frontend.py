from flask import Blueprint, render_template

frontend_blueprint = Blueprint("frontend", __name__)


@frontend_blueprint.route("/")
def index():
    return render_template("index.html")


@frontend_blueprint.route("/admin")
def admin():
    return render_template("for-admins.html")


