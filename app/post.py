import functools
from flask import (
    Blueprint,
    flash,
    g,
    jsonify,
    redirect,
    render_template,
    request,
    session,
    url_for,
)
# from werkzeug.security import check_password_hash, generate_password_hash

from app.db import get_db

bp = Blueprint("post", __name__, url_prefix="/post")


@bp.route("/all", methods=['GET'], strict_slashes=False)
def list_all_posts():
    return jsonify([
                   {"id": 1, "date": "12-09-2023", "time": "18:15", "title": "GameJam 1", "branch": "betadev"},
                   {"id": 2, "date": "20-10-2023", "time": "18:15", "title": "GameJam 2", "branch": "betadev"},
                   {"id": 3, "date": "02-11-2023", "time": "18:15", "title": "CTF", "branch": "betasec"},
                   ])


@bp.route("/weekly", methods=['GET'], strict_slashes=False)
def list_weekly_posts():
    return jsonify([
                   {"id": 2, "date": "20-10-2023", "time": "18:15", "title": "GameJam 2", "branch": "betadev"},
                   ])


@bp.route("/<int:id>", methods=["GET"], strict_slashes=False)
def get_post_by_id(id):
    return jsonify({
                   "id": id,
                   "date": "20-10-2023",
                   "time": "18:15",
                   "title": "GameJam 2",
                   "body": "... Her kommer innholdet ...",
                   "branch": "betadev",
                   })


@bp.route("/save", methods=["POST"], strict_slashes=False)
def save_post():
    # title = request.form["title"]
    # time = request.form["time"]
    # date = request.form["date"]
    # body = request.form["body"]
    # branch = request.form["branch"]

    # do stuff with the POST-request

    # db = get_db()
    # error = None

    # TODO: check if logged in

    # if not title:
    #     error = "Title is required."
    # elif not time:
    #     error = "Time is required."
    # # ...

    # if error is None:
        # try:
        #     db.execute(
        #         "INSERT INTO post (title, time, date, body, branch) VALUES(?, ?, ?, ?, ?)",
        #         (title, time, date, body, branch),
        #     )
        #     db.commit()
        # except db.IntegrityError:
        #     error = "Something fishy fishy happend, YOOOHOOO!"
        # else:
        # return redirect(url_for("auth.login"))
    # flash(error)
    print("yessss!")
    return redirect(url_for("auth.login"))


# @bp.route('/register', methods=('GET', 'POST'))
# def register():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         db = get_db()
#         error = None

#         if not username:
#             error = 'Username is required.'
#         elif not password:
#             error = 'Password is required.'

#         if error is None:
#             try:
#                 db.execute(
#                     "INSERT INTO user (username, password) VALUES (?, ?)",
#                     (username, generate_password_hash(password)),
#                 )
#                 db.commit()
#             except db.IntegrityError:
#                 error = f"User {username} is already registered."
#             else:
#                 return redirect(url_for("auth.login"))

#         flash(error)

#     return render_template('auth/register.html')


# @bp.route('/login', methods=('GET', 'POST'))
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         db = get_db()
#         error = None
#         user = db.execute(
#             'SELECT * FROM user WHERE username = ?', (username,)
#         ).fetchone()

#         if user is None:
#             error = 'Incorrect username.'
#         elif not check_password_hash(user['password'], password):
#             error = 'Incorrect password.'

#         if error is None:
#             session.clear()
#             session['user_id'] = user['id']
#             return redirect(url_for('index'))

#         flash(error)

#     return render_template('auth/login.html')


# @bp.before_app_request
# def load_logged_in_user():
#     user_id = session.get('user_id')

#     if user_id is None:
#         g.user = None
#     else:
#         g.user = get_db().execute(
#             'SELECT * FROM user WHERE id = ?', (user_id,)
#         ).fetchone()


# @bp.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('index'))


# def login_required(view):
#     @functools.wraps(view)
#     def wrapped_view(**kwargs):
#         if g.user is None:
#             return redirect(url_for('auth.login'))

#         return view(**kwargs)

#     return wrapped_view

