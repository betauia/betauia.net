from flask import Blueprint, render_template

cc_bp = Blueprint("comedycentral", __name__)

@cc_bp.route("/")
def meme():
    return render_template("comedycentral.html")
