# DB

The backend uses Postgresql as a database. It also uses SQL, the same as most of you have done in IKT105.

## Connection

The connection can be established in a Flask blueprint like this:

```py
from flask import Blueprint, jsonify

from app.db import get_db

main_bp = Blueprint("main", __name__)


@main_bp.route("/db")
def db_test():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT 1;")
    result = cur.fetchone()[0]
    cur.close()
    return {"db": result}, 200
```

## Cleaning the DB

Stopping the containers keeps the volumes intact. To remove and clean it you need to follow these instructions.

1. List volumes to confirm the name:

```bash
docker volume ls
```

```bash
DRIVER    VOLUME NAME
local     betauianet_postgres_data  # This
local     vscode
```

2. Remove the volume:

```bash
docker volume rm betauianet_postgres_data
```

And done, it is gone!

> You can also prune all volumes if you have nothing important to keep with: `docker volume prune -f`
