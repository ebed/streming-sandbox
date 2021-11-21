FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN apk update
RUN apk add
RUN apk add ffmpeg
EXPOSE 8080
CMD ["npm", "start" ]
