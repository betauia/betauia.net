# Creating content

## How to create content for a new route

A routes is the specific path to a page on the website. We want to mostly use markdown for our content, so the flask app needs to know what markdown file to put into the HTML-template, and what route the user needs to access it.

To read more about the markdown syntax, read this: https://www.markdownguide.org/basic-syntax/

### Creating the markdown file

The markdown file should be placed in the `/flask/app/templates/markdown/` folder. You can put the markdown in folders inside of here, but you should be using the structure like you want in the route url.

### Creating the route
The functions for the routes are written in the `/flask/app/routes/` folder. The `utils.py` contains the `read_markdown(filename)` function witch takes the path to the markdown file, starting from `/flask/app/templates/markdown/` folder without the `.md` file extension. The route will convert markdown and return the HTML of it.

> Ex: the markdown file `/flask/app/templates/markdown/betadev/wiki.md` will be written as `read_markdown("betadev/wiki")`

The `core.py` file contains the unique routes that is not nested further, like the `/for-bedrifter` route. The routes that could be nested further, like `/betadev/wiki`, is written in seperate files. These are called blueprints and need to get imported in the `/flask/app/__init__.py` file.

This is how the `/betadev` and `/betadev/wiki` should be written:

```py
# In /flask/app/routes/betadev.py

from flask import Blueprint, render_template
from .utils import read_markdown

# Should be unique, will get exported
betadev_bp = Blueprint("betadev", __name__)

# The functions can be named whatever you like
@betadev_bp.route("/")
def betadev():
    content = read_markdown("betadev")
    return render_template("blank.html", title="BetaDEV", content=content)

@betadev_bp.route("/wiki")
def wiki():
    content = read_markdown("betadev/wiki")
    return render_template("blank.html", title="Dev wiki", content=content)
```

```py
# In /flask/app/__init__.py

from flask import Flask

def create_app():

    # Other routes and stuff...

    from app.routes.betadev import betadev_bp
    app.register_blueprint(betadev_bp, url_prefix="/betadev")

    return app
```

This will create the two pages from each markdown file and put it inside of the `blank.html` file. This is an empty html file that only contains the page template. It is also possible to use more than one content argument, but then you need to make another HTML-file.

## Customizing the HTML

The page itself can be customized further if it is necessary. This should not be done for content that only contains text, but could be used if you want to combine multiple files with seperate styles and such.

The HTML-files should be stored in the `/flask/app/templates/` folder, nested if possible. If it is a part of a layout used for multiple pages, then it should be stored in the `components/` folder in the same place. For the HTML-file, use the `base.html` file and the flask documentation that can be found at https://flask.palletsprojects.com/en/2.3.x/tutorial/templates/.


```html
<!-- In /flask/app/templates/base.html -->

<!-- Surrounds the content of this file with the header and footer -->
{% extends "components/base.html" %}

<!-- Formats and sets the title to the parameter set -->
{% block title %}{{title}} | BETA{% endblock %}

<!-- The content of the html file, takes the converted markdown and renders it safely -->
{% block content %}
<div class="container"><div class="container__content">{{ content|safe }}</div></div>
{% endblock %}
```


