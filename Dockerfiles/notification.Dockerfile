FROM node:18.0-alpine as builder
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./" ]
RUN yarn
COPY ./ ./
RUN npm run build notifications
CMD [ "node", "dist/apps/notifications/main.js" ] 