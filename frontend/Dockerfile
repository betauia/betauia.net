FROM node:20-alpine AS base

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS development

ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM base AS production

ENV NODE_ENV=production
CMD ["npm", "run", "build"]
