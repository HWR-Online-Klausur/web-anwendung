const apiError = require('../errorHandl/apiError');

let timerStart;
let timerTime = 60 * 60 * 1000;

let status = false;
let finished = false;


class TimerController{
    setTime(m) {
        timerTime = m * 60 * 1000;
    }

    startTimer() {
        if (!status) {
            status = true;
            timerStart = Date.now();
        }
    }

    addTime(m) {
        timerTime += m * 60 * 1000;
        if (m > 0) {
            finished = false;
        }
    }

    apiSetTime(req, res) {
        try {
            const time = Number(req.body.timerTime);
            if (time) {
                this.setTime(time);
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } catch (_) {
            res.sendStatus(400);
        }
    }

    apiStartTimer(req, res) {
        this.startTimer();
        res.sendStatus(200);
    }

    apiGetTime(req, res) {
        if (!finished && status) {
            const tempNow = Date.now();
            const tempStart = new Date(timerStart);

            const tempDiff = new Date(tempNow - tempStart);
            const timerRemain = new Date(timerTime - tempDiff);
            const timeOffset = new Date().getTimezoneOffset();

            if (timerRemain <= 0) {
                finished = true;
            }
            res.send({timerRemain, timeOffset, status, finished});
        } else if (!finished) {
            const timeOffset = new Date().getTimezoneOffset();
            res.send({timerRemain: timerTime, timeOffset, status, finished});
        } else {
            status = false;
            res.send({status, finished});
        }
    }

    apiResetTimer(req, res) {
        status = false;
        res.sendStatus(200);
    }

    apiAddTime(req, res) {
        try {
            const time = Number(req.body.timerTime);
            this.addTime(time);
            res.sendStatus(200);
        } catch (_) {
            res.sendStatus(400);
        }
    }

    konvertTime(stunden, minuten){
        return Number(stunden)*60 + Number(minuten)
    }

}

module.exports = new TimerController();
