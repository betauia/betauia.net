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
