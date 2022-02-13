const apiError = require('../errorHandl/apiError');
const KlausurService = require('../Service/klausur.service')
const Timer = require('../Timer/Timer.Class')

class TimerController{

    apiSetTimeMinutes = (req, res, next) => {
        try {
            const stunden = Number(req.body.stunden);
            const minuten = Number(req.body.minuten);
            const klausurID = req.body.klausurID

            const timer = KlausurService.getOrSetTimer(klausurID)
            const time = timer.convertTime(stunden, minuten);
            if (time) {
                timer.setTime(time);
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
            const klausurID = req.body.klausurID;

            const timer = KlausurService.getOrSetTimer(klausurID);
            if (time) {
                timer.setTime(time);
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } catch (_) {
            res.sendStatus(400);
        }
    }

    apiStartTimer = (req, res) => {
        const klausurID = req.body.klausurID;

        const timer = KlausurService.getOrSetTimer(klausurID);
        timer.startTimer();
        res.sendStatus(200);
    }

    apiGetTime = (req, res) => {
        const klausurID = req.session.klausurID;

        getTime(klausurID, res)
    }

    apiGetTimeDozent = (req, res) => {
        const klausurID = req.body.klausurID;

        this.getTime(klausurID, res)
    }

    getTime = (klausurID, res) => {
        const timer = KlausurService.getOrSetTimer(klausurID);
        if (!timer.finished && timer.status) {
            const tempNow = Date.now();
            const tempStart = new Date(timer.timerStart);

            const tempDiff = new Date(tempNow - tempStart);
            const timerRemain = new Date(timer.timerTime - tempDiff);
            const timeOffset = new Date().getTimezoneOffset();

            if (timerRemain <= 0) {
                timer.finished = true;
            }
            res.send({timerRemain, timeOffset, status: timer.status, finished: timer.finished});
        } else if (!timer.finished) {
            const timeOffset = new Date().getTimezoneOffset();
            res.send({timerRemain: timer.timerTime, timeOffset, status: timer.status, finished: timer.finished});
        } else {
            timer.status = false;
            res.send({status: timer.status, finished: timer.finished});
        }
    }

    apiResetTimer = (req, res) => {
        const klausurID = req.body.klausurID;

        const timer = KlausurService.getOrSetTimer(klausurID);
        timer.status = false;
        res.sendStatus(200);
    }

    apiAddTime = (req, res) => {
        try {
            const time = Number(req.body.timerTime);
            const klausurID = req.body.klausurID;

            const timer = KlausurService.getOrSetTimer(klausurID);
            timer.addTime(time);
            res.sendStatus(200);
        } catch (_) {
            res.sendStatus(400);
        }
    }

}

module.exports = new TimerController();
