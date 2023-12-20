#!/bin/sh

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
cd "$SCRIPT_DIR"

if [ ! -d "./.venv" ]; then
  python3 -m venv .venv
  . .venv/bin/activate
  pip install flask
else
  . .venv/bin/activate
fi

# flask --app app init-db
flask --app app run
