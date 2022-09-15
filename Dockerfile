# syntax=docker/dockerfile:1

FROM node:18.8.0

ENV NODE_ENV=production

RUN useradd -r bridge

USER bridge
WORKDIR /home/bridge

COPY ["package.json", "./"]

RUN npm install --production

COPY --chown=bridge: . .

CMD [ "npm", "start" ]

