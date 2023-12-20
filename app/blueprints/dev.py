from flask import Blueprint, render_template

dev_blueprint = Blueprint("dev", __name__, url_prefix="/auth")


@dev_blueprint.route("/")
def index():
    return render_template("dev.html")


@dev_blueprint.route("/howto")
def how_to():
    return render_template("howto.html")
