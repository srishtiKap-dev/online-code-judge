FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache openjdk11 g++ python3 
COPY package.json .
RUN npm i
COPY . .
EXPOSE 8080
CMD ["node","index.js"]
