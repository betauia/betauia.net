from flask import Blueprint, render_template

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