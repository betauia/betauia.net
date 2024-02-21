# TODO list

## Make SELECT and INSERT for events

Make a python file in `db` folder where the functions for selections and insertions. The `db/utils/create_tables.py` contains the CREATE-query. This is the tables:

```sql
CREATE TABLE IF NOT EXISTS users (
	username VARCHAR(50),
	password VARCHAR(50) NOT NULL,
	role VARCHAR(16) NOT NULL,
	PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS files (
	name VARCHAR(50),
	branch VARCHAR(16) NOT NULL,
	body VARCHAR(100) NOT NULL,
	author VARCHAR(50),
	PRIMARY KEY (name),
	FOREIGN KEY (author) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS events (
	id SERIAL,
	title VARCHAR(50) NOT NULL,
	time timestamp NOT NULL,
	filename VARCHAR(50),
	PRIMARY KEY (id),
	FOREIGN KEY (filename) REFERENCES files(name)
);
```

!! **Decide on saving the file locally or in _body_ in table**  !!

Then, make a query for:

- Selecting every event and info
- Selecting every event and info from a specific branch (ex. select every BetaDev-event)
- Selecting events as both above, but just for a week
- Inserting a new user (in `db/utils`)
- Inserting a new file (ex. a md-file about next gamejam)
- Selecting a file and its information (for editing)
- Inserting a new event (posting the gamejam file as event)
- Selecting every username and role

**Docs**: `docs/flask/db_usage.md`
## Admin pages and login

A login system for users table. Lets board members and such login and make files/events. Only let logged in users access the admin pages. 

**Docs**: `docs/flask/route_system.md`, but check out Flask documentation to expand on this.

## Endpoints for events

Make an API to get the events. Create routes for the different calls, should include:

- GET all events
- GET specific branches events (ex. all from BetaDev)
- GET for both above, but weekly
- GET a file's content
- POST a new file
- POST a new event

**Docs**: `docs/flask/route_system.md`

## Dockerizing in production

Make the Dockerizing branch ready for production. 
Should:

- Hide `.env` file and secure DB-connection
- Make script for setting up DB in production 
- Testing

**Docs**: `docs/docker/compose.md`