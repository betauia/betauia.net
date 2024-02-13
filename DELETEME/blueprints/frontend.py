from flask import Blueprint, render_template, send_from_directory
import os
import markdown
import logging

frontend_blueprint = Blueprint("frontend", __name__)
markdown_directory = os.path.join(os.path.dirname(__file__), "..", "content")
logger = logging.getLogger(__name__)

def convert_markdown_to_html(content):
    return markdown.markdown(content)

def get_md_path(file_name):
    if not file_name.endswith('.md'):
        file_name += '.md'
    return os.path.join(markdown_directory, file_name)

def read_markdown(file_name):
    file_path = get_md_path(file_name)
    with open(file_path, "r") as file:
        return convert_markdown_to_html(file.read())

#
# ROUTES
#

@frontend_blueprint.route("/")
def index():
    content = read_markdown("beta")
    logger.info("WE LOGGIN' BOI!!!")
    # return render_template('index2.html', content=content)
    return render_template("index.html")

@frontend_blueprint.route("/for-bedrifter")
def for_bedrifter():
    content = read_markdown("for-bedrifter")
    return render_template("for-bedrifter.html", content=content)

@frontend_blueprint.route("/arrangementer")
def arrangementer():
    content = read_markdown("arrangementer")
    return render_template("arrangementer.html", content=content)

@frontend_blueprint.route("/wiki")
def wiki():
    content = read_markdown("wiki")
    return render_template("wiki.html", content=content)



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
