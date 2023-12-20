from flask import Blueprint, render_template, send_from_directory

frontend_blueprint = Blueprint("frontend", __name__)


@frontend_blueprint.route("/")
def index():
    return render_template("index.html")


@frontend_blueprint.route("/admin")
def admin():
    return render_template("for-admins.html")

@frontend_blueprint.route("/comedycentral")
def comedy():
    return render_template("comedycentral.html")

@frontend_blueprint.route("/game-jam-entries")
def game_jam_entries():
    return render_template("game-jam-entries.html")

@frontend_blueprint.route("/game-jam-entries/peak-of-gim")
def okt23_maks_uflaks_peak_of_gim():
    return send_from_directory("game-jam-entries/okt23-maks-uflaks/peak-of-gim", "index.html")
