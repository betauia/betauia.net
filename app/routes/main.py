from flask import Blueprint, render_template

from routes.utils import read_markdown

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def index():
    content = read_markdown("beta")
    # return render_template("index2.html", content=content)
    return render_template("index.html")

@main_bp.route("/for-bedrifter")
def for_bedrifter():
    content = read_markdown("for-bedrifter")
    return render_template("for-bedrifter.html", content=content)

@main_bp.route("/arrangementer")
def arrangementer():
    content = read_markdown("arrangementer")
    return render_template("arrangementer.html", content=content)

@main_bp.route("/wiki")
def wiki():
    content = read_markdown("wiki")
    return render_template("wiki.html", content=content)


