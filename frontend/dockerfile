FROM node:16.15.0-alpine as build

WORKDIR /root

COPY frontend/package-lock.json /root/
COPY frontend/package.json /root/

RUN npm ci

COPY frontend/public /root/public/
COPY frontend/src /root/src/

RUN npm run build

FROM node:16.15.0-alpine as runtime

WORKDIR /root

COPY --from=build /root/build/ /root/build/

RUN npm i -g serve
