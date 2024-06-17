from flask import Blueprint, render_template, send_from_directory

from .utils import read_markdown

core_bp = Blueprint("main", __name__)

@core_bp.route("/")
def index():
    return render_template("index.html")

@core_bp.route("/wip")
def wip():
    return render_template("placeholder.html")

@core_bp.route("/om")
def about():
    content = read_markdown("beta")
    return render_template("blank.html", title="Om oss", content=content)

@core_bp.route("/for-bedrifter")
def for_bedrifter():
    content = read_markdown("for-bedrifter")
    return render_template("blank.html", title="For bedrifter", content=content)

@core_bp.route("/game-jam-entries")
def game_jam_entries():
    return render_template("game-jam-entries.html")

@core_bp.route("/game-jam-entries/okt23-maks-uflaks/peak-of-gim/<path:filename>")
def okt23_maks_uflaks_peak_of_gim(filename):
    return send_from_directory("./game-jam-entries/okt23-maks-uflaks/peak-of-gim/", filename)

@core_bp.route("/game-jam-entries/okt23-maks-uflaks/crime-download/<path:filename>")
def okt23_maks_uflaks_crime_download(filename):
    return send_from_directory("./game-jam-entries/okt23-maks-uflaks/crime-download/", filename)
