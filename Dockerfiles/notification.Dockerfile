FROM node:18.0-alpine as builder
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./" ]
RUN npm i
COPY ./ ./
RUN npm run build notifications
CMD [ "node", "dist/apps/notifications/main.js" ] 