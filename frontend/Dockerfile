# TODO: make a real multi-stage build where it is possible to copy over `node_modules/` to host.

FROM node:24-alpine AS development

WORKDIR /app

COPY package*.json ./

COPY . .

ENV NODE_ENV=development
CMD sh -c "npm install && npm run dev"

FROM node:24-alpine AS production

WORKDIR /app

COPY package*.json ./

COPY . .

ENV NODE_ENV=production
CMD sh -c "npm install && npm run build"
