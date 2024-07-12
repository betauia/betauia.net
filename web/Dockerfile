FROM node:20-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4321

ENTRYPOINT ["astro", "dev", "--host", "0.0.0.0"]
