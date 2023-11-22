import sys
from werkzeug.security import generate_password_hash

# Assuming your Flask app package is named 'yourapp'
from app import create_app
from app.db import get_db


def add_user_to_db(username, password, app):
    with app.app_context():
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            try:
                db.execute(
                    'INSERT INTO user (username, password) VALUES (?, ?)',
                    (username, generate_password_hash(password))
                )
                db.commit()
            except db.IntegrityError:
                error = f"User {username} is already registered."

        if error:
            print(error)
        else:
            print("User added successfully.")


if len(sys.argv) != 3:
    print("Usage: python create_user.py <username> <password>")
    sys.exit(1)

username = sys.argv[1]
password = sys.argv[2]
app = create_app()
add_user_to_db(username, password, app)
