FROM node:15.9-alpine3.10
RUN apk update \
    && apk add git \
    && npm install -g npm@7.5.6
RUN cd /tmp \
    && git clone https://github.com/B-Schwarz/hwr-online-klausuren.git
RUN cd /tmp/hwr-online-klausuren \
    && rm Dockerfile \
    && rm .gitignore \
    && npm install
RUN mkdir /hwr-klausur \
    && cp -r /tmp/hwr-online-klausuren/* /hwr-klausur
WORKDIR /hwr-klausur
EXPOSE 3000
CMD ["node", "index.js"]
