from flask import Blueprint, render_template, jsonify

main = Blueprint("main", __name__)

@main.route("/ping")
def ping():
  return jsonify({"message": "pong"})
