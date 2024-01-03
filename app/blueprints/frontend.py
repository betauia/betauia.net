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

@frontend_blueprint.route("/game-jam-entries/okt23-maks-uflaks/peak-of-gim/<path:filename>")
def okt23_maks_uflaks_peak_of_gim(filename):
    return send_from_directory("./game-jam-entries/okt23-maks-uflaks/peak-of-gim/", filename)

@frontend_blueprint.route("/game-jam-entries/okt23-maks-uflaks/crime-download/<path:filename>")
def okt23_maks_uflaks_crime_download(filename):
    return send_from_directory("./game-jam-entries/okt23-maks-uflaks/crime-download/", filename)
