from contextlib import asynccontextmanager

from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.models.base import Base


class Database:
    def __init__(self):
        self.engine: AsyncEngine | None = None
        self.session_maker: async_sessionmaker[AsyncSession] | None = None

    async def connect(self, config):
        url = (
            f"postgresql+asyncpg://{config.POSTGRES_USER}:"
            f"{config.POSTGRES_PASSWORD}@{config.POSTGRES_HOST}:"
            f"{config.POSTGRES_PORT}/{config.POSTGRES_DB}"
        )
        self.engine = create_async_engine(url, echo=config.DEBUG)
        self.session_maker = async_sessionmaker(self.engine, expire_on_commit=False)

    @asynccontextmanager
    async def session(self):
        if self.session_maker is None:
            raise RuntimeError("Database not connected. Call connect() first.")

        async with self.session_maker() as session:
            try:
                yield session
                await session.commit()
            except Exception:
                await session.rollback()
                raise

    async def create_tables(self, models: list):
        if self.engine is None:
            raise RuntimeError("Database not connected. Call connect() first.")

        # Automated with the import and all
        for model in models:
            _ = model  # Loaded model

        async with self.engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    async def seed(self, seeders):
        async with self.session() as session:
            for seeder in seeders:
                if await seeder.should_run(session):
                    await seeder.run(session)

    async def close(self):
        if self.engine:
            await self.engine.dispose()


db = Database()


async def get_session():
    async with db.session() as session:
        yield session
