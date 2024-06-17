# Docker Compose File Documentation

This Docker Compose file defines a multi-container setup for a web application environment. It includes services for a proxy, an application server, and a PostgreSQL database.

## Services

### Proxy Service

- **Build**: Builds the proxy service using the Dockerfile in the `proxy` directory.
- **Restart**: Always restarts the container if it stops.
- **Ports**: Forwards port 80 on the host machine to port 80 on the container.
- **Depends On**: Ensures that the proxy service starts after the `app` service.

### App Service

- **Build**: Builds the app service using the Dockerfile in the `app` directory, specifically targeting the `builder` stage (separating build-time from runtime dependencies).
- **Stop Signal**: Uses `SIGINT` to stop the Flask application gracefully (required by Flask).
- **Environment**:
  - `FLASK_SERVER_PORT`: Specifies the port on which the Flask server runs (9091).
  - `PYTHONUNBUFFERED`: Sets Python's unbuffered mode to `0` (default display behavior).
  - `PYTHONPATH`: Sets the Python path to `/src`.
- **Env File**: Loads environment variables from the `.env` file.
- **Volumes**: Mounts the local `./app` directory to `/src` in the container.
- **Depends On**: Makes sure the app service starts after the `postgres` service.

### PostgreSQL Service

- **Image**: Uses the `postgres:13-alpine` image from Docker Hub.
- **Environment**:
  - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: Environment variables for PostgreSQL database configuration.
- **Volumes**: Mounts the local `./postgres-data/postgres` directory to `/var/lib/postgresql/data` in the container to persist PostgreSQL data.
- **Ports**: Exposes port 5432 on the host machine to port 5432 on the container.
- **Restart**: Always restarts the container if it stops.
- **Healthcheck**: Periodically checks the health of the PostgreSQL service using `pg_isready`.

## Volumes

- **postgres_data**: Defines a named volume to persist PostgreSQL data.
