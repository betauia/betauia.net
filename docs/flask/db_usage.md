# Using the DB

The DB in use is Postgres, a relational SQL-DB. To find the connection, import it:

```python
from db import conn
```

This sets up a connection using the `.env` variables as names and passwords. This is possible due to the *psycopg2* library. With this, you can make a cursor (like in ikt103, with SQLite). Here is an example:

```python
from db import conn

def init_db()
	cur = conn.cursor()
	cur.execute(
		"""
		CREATE TABLE IF NOT EXISTS users (
		username VARCHAR(50),
		password VARCHAR(50) NOT NULL,
		role VARCHAR(16) NOT NULL,
		PRIMARY KEY (username)
		);
		"""
	)
	conn.commit()
```

## Where to Organize Query Functions

Still unsure about where. Meanwhile, the `db/utils` is for queries that will be ran manually and `db` is for all run by the server. A topic to discuss
## TODOs

- Making a function that only takes the SQL and wraps it around the cursor and connection.
- Organizing `db` folder, should we use `db/utils`?
- Maybe use SQLAlchemy to make it easier?

## Additional Resources

https://www.geeksforgeeks.org/python-select-from-postgresql-table-using-psycopg2/