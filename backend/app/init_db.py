import logging
from pathlib import Path

logger = logging.getLogger(__name__)

SQL_DIR = Path(__file__).parent / "sql"
SCHEMA_DIR = SQL_DIR / "schema"
SEEDS_DIR = SQL_DIR / "seeds"


async def init_tables(db_pool):
    async with db_pool.connection() as conn:
        async with conn.cursor() as cur:
            schema_files = sorted(SCHEMA_DIR.glob("*.sql"))

            if not schema_files:
                logger.warning(f"No schema files found in {SCHEMA_DIR}")
                return

            for sql_file in schema_files:
                logger.info(f"Executing schema: {sql_file.name}")
                sql_content = sql_file.read_text()
                await cur.execute(sql_content)

            logger.info(f"Successfully initialized {len(schema_files)} tables")


async def seed_database(db_pool):
    async with db_pool.connection() as conn:
        async with conn.cursor() as cur:
            seed_files = sorted(SEEDS_DIR.glob("*.sql"))

            if not seed_files:
                logger.warning(f"No seed files found in {SEEDS_DIR}")
                return

            for sql_file in seed_files:
                await cur.execute(
                    "SELECT 1 FROM applied_seeds WHERE filename = %s", (sql_file.name,)
                )

                if await cur.fetchone():
                    logger.info(f"Skipping already-applied seed: {sql_file.name}")
                    continue

                logger.info(f"Executing seed: {sql_file.name}")
                await cur.execute(sql_file.read_text())

                await cur.execute(
                    "INSERT INTO applied_seeds (filename) VALUES (%s)", (sql_file.name,)
                )

                sql_content = sql_file.read_text()
                await cur.execute(sql_content)

            logger.info(f"Successfully seeded database with {len(seed_files)} files")
