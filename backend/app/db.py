from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

import psycopg
from psycopg_pool import AsyncConnectionPool


class DatabasePool:
    def __init__(self):
        self._pool: AsyncConnectionPool | None = None

    async def init(self, config):
        conninfo = (
            f"dbname={config.POSTGRES_DB} "
            f"user={config.POSTGRES_USER} "
            f"password={config.POSTGRES_PASSWORD} "
            f"host={config.POSTGRES_HOST} "
            f"port={config.POSTGRES_PORT}"
        )
        self._pool = AsyncConnectionPool(conninfo, min_size=1, max_size=10, open=False)
        await self._pool.open()

    @asynccontextmanager
    async def connection(self) -> AsyncGenerator[psycopg.AsyncConnection]:
        if self._pool is None:
            raise RuntimeError("Database pool not initialized")

        async with self._pool.connection() as conn:
            try:
                yield conn
                await conn.commit()
            except Exception:
                await conn.rollback()
                raise

    async def close(self):
        if self._pool is not None:
            await self._pool.close()
            self._pool = None


db = DatabasePool()


async def get_db_dependency():
    async with db.connection() as conn:
        yield conn
