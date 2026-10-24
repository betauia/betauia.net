# Development

The frontend and backend run directly on your machine. Docker is only used for the database and in production.

## Commands

Run these from the project root:

| Command                      | Description                                           |
| ---------------------------- | ----------------------------------------------------- |
| `pnpm dev`                   | Starts database, frontend (:3000) and backend (:8000) |
| `pnpm dev:frontend`          | Starts only the frontend                              |
| `pnpm dev:backend`           | Starts only the backend                               |
| `pnpm db`                    | Starts the database and applies migrations            |
| `pnpm db:migrate`            | Applies new migrations                                |
| `pnpm db:stop`               | Stops the database (the data is kept)                 |
| `pnpm db:reset`              | Deletes all data and starts a fresh database          |
| `pnpm db:revision "message"` | Creates a migration after you change a model          |
| `pnpm check`                 | Checks types, linting and formatting (same as CI)     |
| `pnpm format`                | Formats and fixes all code automatically              |
| `pnpm prod`                  | Runs the production setup locally in Docker           |

Dependencies are installed automatically when you start, so after pulling new changes just run `pnpm dev` again.

## Without the database

`pnpm dev` starts the database if Docker is running. If not, it prints `No database, running without it` and starts the rest anyway. Pages that need data (like login and job listings) then show an error, and the API answers `503 Database unavailable` until you start Docker and run `pnpm db`. When `DEBUG=true`, test data is seeded every time the backend starts with the database running.

## Project layout

```
/
├── frontend/      # Astro website, see docs/frontend/
├── backend/       # FastAPI API, see docs/backend/
├── docker/        # Docker files (database for development, everything for production)
├── docs/          # Documentation
├── .env           # Your local settings (copied from .env.example, never committed)
└── package.json   # The commands above
```

## Environment variables

All settings live in the `.env` file in the project root and are used by both frontend and backend.

Variables starting with `PUBLIC_` are sent to the browser, so never put secrets in them.

## Adding dependencies

- Frontend: `pnpm add some-package` inside `frontend/`
- Backend: `uv add some-package` inside `backend/` (see [FastAPI](../backend/fastapi.md#dependencies))
