# Deployment

Every pull request is checked by [`.github/workflows/ci.yaml`](/.github/workflows/ci.yaml), which runs `pnpm check` and builds the production images.

Every push to master deploys automatically through [`.github/workflows/deploy.yaml`](/.github/workflows/deploy.yaml). It connects to the server with SSH, pulls the code and runs:

```bash
docker compose -f docker/compose.prod.yaml --env-file .env up -d --build
```

## What runs in production?

Everything is defined in [`docker/compose.prod.yaml`](/docker/compose.prod.yaml):

- `frontend`: the built Astro site on port 3000
- `backend`: the API on port 8000, applies database migrations when it starts
- `db`: Postgres, only reachable by the other containers
- `dbbackups`: daily database backups, see [DB](../backend/db.md#backups)

Uploaded files are stored in `uploads/` in the project folder on the server.

## The server `.env`

The server has its own `.env` in the project folder with production values. Use strong passwords and set:

- `DEBUG=false` (this is also the default when it is missing)
- `SECRET_KEY` to a random value (`openssl rand -hex 32`)
- `TURNSTILE_SECRET_KEY` and `PUBLIC_TURNSTILE_SITE_KEY` to the real keys from Cloudflare

`PUBLIC_BACKEND_URL` and `PUBLIC_TURNSTILE_SITE_KEY` are built into the frontend, so a change to them needs a new build (the next deploy does this).

## Testing the production build locally

```bash
pnpm prod
```

Stop `pnpm dev` first, since it uses the same ports. The production setup uses the same database volume as development, so your local data is kept.
