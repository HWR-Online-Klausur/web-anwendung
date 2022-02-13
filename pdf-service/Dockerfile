FROM node:16.14-alpine3.14
COPY db/ /hwr-service/db/
COPY pdf/ /hwr-service/pdf/
COPY template/ /hwr-service/template/
COPY server.js /hwr-service/
COPY package.json /hwr-service/
COPY package-lock.json /hwr-service/
RUN cd /hwr-service/ \
    && npm ci
RUN apk add texlive
WORKDIR /hwr-service
EXPOSE 4000
CMD ["npm", "run", "start"]
