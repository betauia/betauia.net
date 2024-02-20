# About the Route System

## Using the Route System

1. First you need to set up the route for the page

```python
# app/routes/example.py

from flask import Blueprint, render_template

from routes.utils import read_markdown

example_bp = Blueprint("main", __name__)

@example_bp.route("/example")
def index():
	# content is optional, drop the content=content arg too
    content = read_markdown("example_markdown")
    return render_template("example.html", content=content)
```

2. Remember to add it to the `blueprints` list:

```python
# app/routes/__init__.py

from flask import Blueprint

from routes.main import main_bp
from routes.example import example_bp  # Import

blueprints = [main_bp, example_bp]  # And append
```

3.  Create the HTML file, flask reads `{% ... %}` as custom code

```html
<!-- templates/example.html -->

{% extends "components/base.html" %}

{% block title %}EXAMPLE TITLE{% endblock %}

{% block content %}
<h1>Bull Armstrong</h1>
<h2>and the Milky Ways appocalypse</h2>
<div>{{ content|safe }}</div>
<p>Mooo!</p>
{% endblock %}
```

In this template:

- `{% extends "components/base.html" %}` inherits the structure from the base HTML file.
- `{% block title %}EXAMPLE TITLE{% endblock %}` sets the title for the page.
- `{% block content %}` and `{% endblock %}` define where the content of the page will be extended.
- `{{ content|safe }}` displays any content fetched from a Markdown file, safely formatted.

## Base HTML Template

The defined base HTML template wraps around all pages formatted as done above. 

```html
<!-- templates/components/base.html -->

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% block title %}BETA{% endblock %}</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='css/global.css') }}">
</head>

<body>
  {% include "components/header.html" %}
  <div id="content">
    <div id="content-container">
		<!-- example.html gets added here -->
	    {% block content %}{% endblock %} 
	</div>
  </div>
  {% include "components/footer.html" %}
</body>

</html>
```

In this template:

- The title is set dynamically using `{% block title %}`.
- CSS can be linked as regular, it is encouraged to link here.
- The content of individual pages is inserted between `{% block content %}` and `{% endblock %}`.
- The header and footer are included using `{% include "components/header.html" %}` and `{% include "components/footer.html" %}` respectively.

---

This does actually resemble a front end framework. If we are over complicating more, we should probably consider changing (or maybe making our own).

