#!/bin/sh

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
cd "$SCRIPT_DIR"

if [ ! -d "./.venv" ]; then
  python3 -m venv .venv
  . .venv/bin/activate
  pip install flask
else
  . .venv/Scripts/activate
fi

flask --app flaskr run