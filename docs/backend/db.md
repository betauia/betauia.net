# DB

The backend uses Postgresql as a database which is an SQL-database like the ones used in IKT-105. To ignore writing mistakes, and for quality of life, we use SQLAlchemy to handle tables as a class.

## Models

The models for the tables are created in the `/app/models/` folder and is class based with SQLAlchemy. A simple table can be made like this:

```py
# /app/models/player.py

from datetime import datetime

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Player(Base):
    __tablename__ = "players"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100))
    level: Mapped[int] = mapped_column(Integer, default=1)
    total_exp: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "level": self.level,
            "total_exp": self.total_exp,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
```

## Seeding data in development

To make it easier to test features in development, some dummy data can be seeded by implementing a function for it in the `/app/db/seeder/` folder like so:

```py
# /app/db/seeder/player_seed.py

from sqlalchemy import delete

from app.db.seeders.base import Seeder
from app.models.player import Player


class PlayerSeeder(Seeder):
    name = "player_seed"

    async def run(self, session):
        await session.execute(delete(Player))

        players = [
            Player(name="Arne", level=67, total_exp=243201),
            Player(name="Auby", level=69, total_exp=270420),
        ]

        session.add_all(players)
```

## Use in routes

To use the database, `get_session()` needs to be called in the parameters to execute the queries. The different methods can be imported from `sqlalchemy` like this:

```py
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models.player import Player

# ...

@router.get("/players")
@limiter.limit("60/minute")
async def get_players(request: Request, session: AsyncSession = Depends(get_session)):
    """Get all players"""
    result = await session.execute(
        select(Player).order_by(Player.level.desc(), Player.name.asc())
    )
    players = result.scalars().all()

    return {"players": [player.to_dict() for player in players], "count": len(players)}
```

## Migrations

When it is needed to alter a table, we use `alembic` to keep up with versioning changes to the tables. The `/alembic` folder should never need manual interference, but inside it, all the versionings will be stored.

When you modify or create SQLAlchemy models in `app/models/`, generate a migration that will be automatically loaded at build:

```bash
# Development
docker compose exec backend alembic revision --autogenerate -m "add user table"

# Production
docker compose -f compose.yaml -f compose.prod.yaml exec backend alembic revision --autogenerate -m "add user table"
```

> Remember to use clear names that is easy to navigate to specific changes with.

This will:

1. Compare your models with the database schema
2. Generate a migration file in `alembic/versions/`
3. Include both `upgrade()` and `downgrade()` functions

**Important:** Always review the generated migration file before committing!

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
