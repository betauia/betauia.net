from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Define the paths to the templates and game entries
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, 'pages')
GAME_JAM_ENTRIES_DIR = os.path.join(BASE_DIR, '..', 'game-jam-entries')

app = Flask(__name__, template_folder=TEMPLATE_DIR)

# Helper function to split the directory name into month, theme, and year
def split_name(directory_name):
    parts = directory_name.split('-')
    if len(parts) < 3:
        raise ValueError(f"Directory name '{directory_name}' does not match expected 'month-theme-year' format")
    return {
        'month': parts[0],
        'theme': '-'.join(parts[1:-1]),  # Join all parts except the first and last as theme
        'year': parts[-1],
        'dir_name': directory_name
    }

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
