from flask import Blueprint, render_template

from .utils import read_markdown

core_bp = Blueprint("main", __name__)

@core_bp.route("/")
def index():
    return render_template("proto.html")

@core_bp.route("/wip")
def wip():
    return render_template("placeholder.html")

@core_bp.route("/about")
def for_bedrifter():
    content = read_markdown("beta")
    return render_template("blank.html", title="Om oss", content=content)


