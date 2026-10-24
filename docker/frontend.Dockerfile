FROM node:24-alpine

RUN npm install --global pnpm@12.9.0

WORKDIR /app

COPY frontend/package.json frontend/pnpm-lock.yaml frontend/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY frontend/ .

# PUBLIC_ variables are baked into the site when it is built
ARG PUBLIC_BACKEND_URL
ARG PUBLIC_TURNSTILE_SITE_KEY
ARG PUBLIC_BETASEC_SECRET
RUN pnpm build

ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
EXPOSE 3000

CMD ["node", "dist/server/entry.mjs"]
