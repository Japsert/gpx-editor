# got this from chatgpt, so it's probably not perfect :)

# stage 1: development
FROM node:lts-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#EXPOSE 3000
CMD ["npm", "run", "dev"]
