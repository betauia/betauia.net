from collections.abc import Generator
from contextlib import contextmanager

import psycopg2
import psycopg2.pool


class DatabasePool:
    def __init__(self):
        self._pool: psycopg2.pool.SimpleConnectionPool | None = None

    def init(self, config):
        self._pool = psycopg2.pool.SimpleConnectionPool(
            1,
            10,
            dbname=config.POSTGRES_DB,
            user=config.POSTGRES_USER,
            password=config.POSTGRES_PASSWORD,
            host=config.POSTGRES_HOST,
            port=config.POSTGRES_PORT,
        )

    @contextmanager
    def connection(self) -> Generator[psycopg2.extensions.connection]:
        if self._pool is None:
            raise RuntimeError("Database pool not initialized")

        conn = self._pool.getconn()
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            self._pool.putconn(conn)

    def close(self):
        if self._pool is not None:
            self._pool.closeall()
            self._pool = None


db = DatabasePool()


def get_db_dependency():
    with db.connection() as conn:
        yield conn
