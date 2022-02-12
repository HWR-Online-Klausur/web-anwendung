const Timer = require('../Timer/Timer.Class')

class klausurService {

    constructor() {
        this.klausurList = {}
    }

    getKlausur = (id) => {
        if (this.klausurList[id]) {
            return this.klausurList[id].klausur
        }
    }

    setKlausur = (id, pKlausur) => {
        this.klausurList[id] = {...this.klausurList[id], klausur: pKlausur}
    }

    getStatus = (id) => {
        if (this.klausurList[id]) {
            return this.klausurList[id].status
        }
    }

    setStatus = (id, pStatus) => {
        this.klausurList[id] = {...this.klausurList[id], status: pStatus}
    }

    getTimer = (id) => {
        if (this.klausurList[id]) {
            return this.klausurList[id].timer
        }
    }

    setTimer = (id, pTimer) => {
        this.klausurList[id] = {...this.klausurList[id], timer: pTimer}
    }

    getOrSetTimer = (id) => {
        if (this.klausurList[id] && this.klausurList[id].timer) {
             return this.klausurList[id].timer
        } else {
            this.createTimer(id)
            return this.getTimer(id)
        }
    }

    createTimer = (id) => {
        let timer = new Timer();
        this.setTimer(id, timer)
    }

    removeKlausur = (id) => {
        delete this.klausurList[id]
    }
}

module.exports = new klausurService()
