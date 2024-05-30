from flask import Blueprint, render_template

from .utils import read_markdown

dev_bp = Blueprint("dev", __name__)

@dev_bp.route("/wiki")
def wiki():
    content = read_markdown("devwiki")
    return render_template("blank.html", title="Dev wiki", content=content)
