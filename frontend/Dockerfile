FROM node:24-alpine AS development

RUN 

WORKDIR /app

COPY package*.json .

COPY . .

RUN rm -rf /app/node_modules

ENV NODE_ENV=development
CMD sh -c "npm install && npm run dev"

FROM node:24-alpine AS production

WORKDIR /app

COPY package*.json ./

COPY . .

RUN rm -rf /app/node_modules

ENV NODE_ENV=production
CMD sh -c "npm ci --no-save && npm run build"
