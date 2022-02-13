const Timer = require('../Timer/Timer.Class')

class klausurService {

    constructor() {
        this.klausurList = {}
    }

    getKlausur = (id) => {
        if (id === undefined || id === null) {
            return null;
        }
        if (this.klausurList[id]) {
            return this.klausurList[id].klausur
        }
    }

    setKlausur = (id, pKlausur) => {
        if (id === undefined || id === null) {
            return null;
        }
        this.klausurList[id] = {...this.klausurList[id], klausur: pKlausur}
    }

    getStatus = (id) => {
        if (id === undefined || id === null) {
            return null;
        }
        if (this.klausurList[id]) {
            return this.klausurList[id].status
        }
    }

    setStatus = (id, pStatus) => {
        if (id === undefined || id === null) {
            return null;
        }
        this.klausurList[id] = {...this.klausurList[id], status: pStatus}
    }

    getTimer = (id) => {
        if (id === undefined || id === null) {
            return null;
        }
        if (this.klausurList[id]) {
            return this.klausurList[id].timer
        }
    }

    setTimer = (id, pTimer) => {
        if (id === undefined || id === null) {
            return null;
        }
        this.klausurList[id] = {...this.klausurList[id], timer: pTimer}
    }

    getOrSetTimer = (id) => {
        if (id === undefined || id === null) {
            return null;
        }
        if (this.klausurList[id] && this.klausurList[id].timer) {
             return this.klausurList[id].timer
        } else {
            this.createTimer(id)
            return this.getTimer(id)
        }
    }

    createTimer = (id) => {
        if (id === undefined || id === null) {
            return null;
        }
        let timer = new Timer();
        this.setTimer(id, timer)
    }

    removeKlausur = (id) => {
        if (id === undefined || id === null) {
            return null;
        }
        delete this.klausurList[id]
    }
}

module.exports = new klausurService()
