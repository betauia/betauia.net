from sqlalchemy import select

from app.db.seeders.base import Seeder
from app.models.player import Player


class PlayerSeeder(Seeder):
    name = "player_seed"

    async def should_run(self, session):
        result = await session.execute(select(Player).limit(1))
        return result.scalar_one_or_none() is None

    async def run(self, session):
        players = [
            Player(name="Arne", level=67),
            Player(name="Gamer1", level=12),
            Player(name="Gamer2", level=23),
        ]
        session.add_all(players)
