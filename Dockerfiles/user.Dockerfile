FROM node:18.0-alpine as builder
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./" ]
RUN yarn
COPY ./ ./
RUN yarn build user
CMD [ "node", "dist/apps/user/main.js" ] 