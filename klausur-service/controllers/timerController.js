const apiError = require('../errorHandl/apiError');

class TimerController{

    constructor() {
        this.timerStart = Date.now();
        this.timerTime = 60 * 60 * 1000;

        this.stat = Boolean(false);
        this.finished = Boolean(false);
        console.log(this)
    }

    setTime = (m) => {
        this.timerTime = m * 60 * 1000;
    }

    startTimer = () => {
        if (!this.stat) {
            this.stat = true;
            this.timerStart = Date.now();
        }
    }

    addTime = (m) => {
        this.timerTime += m * 60 * 1000;
        if (m > 0) {
            this.finished = false;
        }
    }

    apiSetTimeMinutes = (req, res, next) => {
        try {
            const stunden = Number(req.body.stunden);
            const minuten = Number(req.body.minuten);
            const time = this.convertTime(stunden, minuten);
            if (time) {
                this.setTime(time);
                res.sendStatus(200);
            } else {
                return next(apiError.badRequest('Minuten or Stunden are missing'))
            }
        } catch (_) {
            res.sendStatus(400);
        }
    }

    apiSetTime = (req, res) => {
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

    apiStartTimer = (req, res) => {
        this.startTimer();
        res.sendStatus(200);
    }

    apiGetTime = (req, res) => {
        console.log(this)
        if (!this.finished && this.stat) {
            const tempNow = Date.now();
            const tempStart = new Date(this.timerStart);

            const tempDiff = new Date(tempNow - tempStart);
            const timerRemain = new Date(this.timerTime - tempDiff);
            const timeOffset = new Date().getTimezoneOffset();

            if (timerRemain <= 0) {
                this.finished = true;
            }
            res.send({timerRemain, timeOffset, status: this.stat, finished: this.finished});
        } else if (!this.finished) {
            const timeOffset = new Date().getTimezoneOffset();
            res.send({timerRemain: this.timerTime, timeOffset, status: this.stat, finished: this.finished});
        } else {
            this.stat = false;
            res.send({status: this.stat, finished: this.finished});
        }
    }

    apiResetTimer = (req, res) => {
        this.stat = false;
        res.sendStatus(200);
    }

    apiAddTime = (req, res) => {
        try {
            const time = Number(req.body.timerTime);
            this.addTime(time);
            res.sendStatus(200);
        } catch (_) {
            res.sendStatus(400);
        }
    }

    convertTime = (stunden, minuten) => {
        return Number(stunden) * 60 + Number(minuten)
    }

}

module.exports = new TimerController();
