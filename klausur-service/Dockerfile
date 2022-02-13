FROM node:17.3-alpine3.14
COPY controllers/ /hwr-klausur/controllers/
COPY db/ /hwr-klausur/db/
COPY errorHandl/ /hwr-klausur/errorHandl/
COPY klausur-parser/ /hwr-klausur/klausur-parser/
COPY klausuren/ /hwr-klausur/klausuren/
COPY middleware/ /hwr-klausur/middleware/
COPY routes/ /hwr-klausur/routes/
COPY static/ /hwr-klausur/static/
COPY index.js /hwr-klausur/
COPY package.json /hwr-klausur/
COPY package-lock.json /hwr-klausur/
RUN cd /hwr-klausur/ \
    && npm ci
WORKDIR /hwr-klausur
EXPOSE 3000
CMD ["npm", "run", "start"]
