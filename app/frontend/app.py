from flask import Flask, render_template, send_from_directory
import re
import os

app = Flask(__name__)

# Define the paths to the templates and game entries
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, 'pages')
GAME_JAM_ENTRIES_DIR = os.path.join(BASE_DIR, '..', 'game-jam-entries')

app = Flask(__name__, template_folder=TEMPLATE_DIR)

def split_name(s):
    month_map = {
        "jan": "January",
        "feb": "February",
        "mar": "March",
        "apr": "April",
        "mai": "May",
        "jun": "June",
        "jul": "July",
        "aug": "August",
        "sep": "September",
        "okt": "October",
        "nov": "November",
        "des": "December"
    }

    pattern = r"([a-z]{3})(\d{2})-(.*)"
    match = re.match(pattern, s)

    if match:
        month_abbr, year, name = match.groups()
        month = month_map.get(month_abbr, "Unknown")
        year = "20" + year  # Assuming the year is in the 2000s
        return {"month": month, "year": year, "name": name}
    else:
        return {"month": "Unknown", "year": "Unknown", "name": "Unknown"}

@app.route('/')
def index():
    entries = [split_name(name) for name in os.listdir(GAME_JAM_ENTRIES_DIR) if os.path.isdir(os.path.join(GAME_JAM_ENTRIES_DIR, name))]
    return render_template('index.html', entries=entries)

@app.route('/<dir_name>/')
def month(dir_name):
    games_path = os.path.join(GAME_JAM_ENTRIES_DIR, dir_name)
    games = [name for name in os.listdir(games_path) if os.path.isdir(os.path.join(games_path, name))]
    info = split_name(dir_name)
    return render_template('month.html', info=info, games=games)

@app.route('/<dir_name>/<game>/')
def game(dir_name, game):
    game_path = os.path.join(GAME_JAM_ENTRIES_DIR, dir_name, game, 'built')
    return send_from_directory(game_path, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
