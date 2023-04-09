# got this from chatgpt, so it's probably not perfect :)

# stage 1: development
# to run: docker build -f frontend\Dockerfile -t frontend:dev .
FROM node:lts-alpine as dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# stage 2: production
# to run: docker build -f frontend\Dockerfile -t frontend:prod .
FROM node:lts-alpine as prod
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
