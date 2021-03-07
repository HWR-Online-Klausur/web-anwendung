const moment = require('moment');

let timerEnd;
let timerLag;

let timerTime = 60;

let status = false;

function setTime(m) {
    timerTime = m;
    timerEnd = calcEndTime();
}

function startTimer() {
    if (!status) {
        status = true;
        timerEnd = calcEndTime();
    }
}

function stopTimer() {
    if (status) {
        status = false;
        const a = new Date(timerEnd).getTime();
        const b = new Date().getTime()
        timerLag = a - b;
    }
}

function calcEndTime() {
    if (timerLag) {
        let tempTime = new Date();
        let tempLag = new Date(timerLag);

        return tempTime.getTime() + tempLag.getTime();
    } else {
        let dt = new Date();
        return moment(dt).add(timerTime, 'm').subtract(1, 'h').toDate();
    }
}

function apiSetTime(req, res) {
    const time = req.body.timerTime;
    if (time) {
        setTime(time);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

function apiStartTimer(req, res) {
    startTimer();
    res.sendStatus(200);
}

function apiStopTimer(req, res) {
    stopTimer();
    res.sendStatus(200);
}

function apiGetTime(req, res) {
    res.send({timerEnd, timerLag, status});
}


module.exports = {
    apiGetTime,
    apiSetTime,
    apiStartTimer,
    apiStopTimer
}
