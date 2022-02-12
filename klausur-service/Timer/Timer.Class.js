class Timer {

    constructor() {
        this.timerStart = Date.now();
        this.timerTime = 60 * 60 * 1000;

        this.status = false;
        this.finished = false;
    }

    setTime = (m) => {
        this.timerTime = m * 60 * 1000;
    }

    startTimer = () => {
        if (!this.status) {
            this.status = true;
            this.timerStart = Date.now();
        }
    }

    addTime = (m) => {
        this.timerTime += m * 60 * 1000;
        if (m > 0) {
            this.finished = false;
        }
    }

    convertTime = (stunden, minuten) => {
        return Number(stunden) * 60 + Number(minuten)
    }

}

module.exports = Timer
