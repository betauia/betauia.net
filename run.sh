#!/bin/sh

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
cd "$SCRIPT_DIR"/app

if [ ! -d "./.venv" ]; then
  python3 -m venv .venv
  . .venv/bin/activate
  pip install flask
  pip install markdown
else
  . .venv/bin/activate
fi

# flask --app . init-db
flask --app . run
