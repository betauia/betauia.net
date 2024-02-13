import psycopg2 as pg
import os

conn = pg.connect(
    host=os.environ.get("POSTGRES_HOST"),
    database=os.environ.get("POSTGRES_DB"),
    user=os.environ.get("POSTGRES_USER"),
    password=os.environ.get("POSTGRES_PASSWORD")
)
