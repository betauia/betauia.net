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

1. List volumes:

```bash
docker volume ls
```

2. Find the name:

```bash
DRIVER    VOLUME NAME
local     betauianet_postgres_data  # This
local     vscode
```

3. Remove the volume:

```bash
docker volume rm betauianet_postgres_data
```

And done, it is gone!

> You can also prune all volumes if you have nothing important to keep with: `docker volume prune -f`

## Backups

We use a [Docker image](https://github.com/prodrigestivill/docker-postgres-backup-local) to automatically back up the Postgres database. To restore a backup, follow the given steps.

1. Open a shell in the backup image:

```bash
docker exec -it betauianet-dbbackups-1 sh
```

2. Locate the backup by using `ls` in `/backups`.

3. Exit the container and copy the tar file locally:

```bash
docker cp betauianet-dbbackups-1:/backups/last/dbname-123456-789012.sql.gz .
```

4. Write to database

```bash
cat dbname-123456-789012.sql | docker exec -i betauianet-db-1 \
    psql -U dbusername -d dbpassword
```

If you need to drop the tables before applying the backup, use this to enter psql:

```bash
docker exec -it betauianet-db-1 psql -U dbusername -d dbname
```
