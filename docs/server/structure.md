# Server structure

## Docker compose

The project uses two different compose files, `compose.yaml` and `production.yaml`, for running either localy or in production. 

To run development build:
```bash
docker compose up --build
```

To run production build (detatched):
```bash
docker compose -f compose.yaml -f production.yaml up --build -d
```

### Services

- **API** (Flask)
  - Runs on port 9091.
  - The application is served using Gunicorn in production, but standard Flask in development.
  - Stopped gracefully with `SIGINT`.
  - Pip dependencies are listed in `requirements.txt`

- **Web Server** (Astro)
  - Runs on port 4321.
  - Uses a volume for `node_modules` in development (`astro_node_modules`).
  - Is built in production and the static files are stored in `/usr/share/nginx/html/` via the `astro_build` volume.

- **Reverse Proxy** (Nginx)
  - Runs on port 80.
  - Nginx routes requests to:
    - `/` for the Astro web server.
    - `/api` for the Flask API.
  - Runs on port 443 with SSL support, handled by Certbot in production.
  - SSL certificates are stored in `/etc/nginx/ssl` and renewed with Certbot.

- **Certbot**
  - Manages SSL certificates for the reverse proxy.
  - Uses volumes to store certificates and web challenges.

