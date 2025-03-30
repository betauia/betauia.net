#!/bin/sh

if [ ! -d "/src/migrations" ]; then
    echo "Initializing migrations..."
    flask db init
else
    echo "Migrations directory already exists. Skipping initialization."
fi

echo "Running migrations..."
flask db upgrade

echo "Starting the app..."
exec python3 server.py
