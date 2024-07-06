from flask import Blueprint, render_template, send_from_directory

from app.routes.utils import read_markdown

gamejam_bp = Blueprint("gamejam", __name__)

@gamejam_bp.route("/entries")
def gamejam_entries():
    return render_template("betadev/entries.html", title="Game Jam Entries")

@gamejam_bp.route("/okt23-maks-uflaks/peak-of-gim/<path:filename>")
def okt23_maks_uflaks_peak_of_gim(filename):
    return send_from_directory("./game-jam-entries/okt23-maks-uflaks/peak-of-gim/", filename)

@gamejam_bp.route("/okt23-maks-uflaks/crime-download/<path:filename>")
def okt23_maks_uflaks_crime_download(filename):
    return send_from_directory("./game-jam-entries/okt23-maks-uflaks/crime-download/", filename)