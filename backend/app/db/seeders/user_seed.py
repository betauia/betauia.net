from sqlalchemy import delete

from app.auth.security import hash_password
from app.db.seeders.base import Seeder
from app.models.user import User


class UserSeeder(Seeder):
    name = "user_seed"

    async def run(self, session):
        await session.execute(delete(User))

        users = [
            User(
                email="post@betauia.net",
                username="testuser",
                hashed_password=hash_password("admin1234"),
                full_name="Test User",
                allergies="Bluebox pizza",
                is_admin=True,
            )
        ]

        session.add_all(users)
