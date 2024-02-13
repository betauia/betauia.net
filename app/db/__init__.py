import psycopg2 as pg

conn = pg.connect(
    host="postgres",
    database="testdb",
    user="user",
    password="1234"
)