const element = document.getElementById('timer-text');

let timerRemain;
let timeOffset;
let status;
let ended = false;

function getTime() {
    fetch('/api/timer')
        .then(r => r.json())
        .then(r => {
            timerRemain = r.timerRemain;
            timeOffset = r.timeOffset;
            ended = r.finished;
            status = r.status;
            setText();
        });
}

const zeroPad = (num) => String(num).padStart(2, '0')

function setText() {
    if (status && !ended) {
        let tempRemain = new Date(timerRemain);
        let timerTime = new Date(tempRemain.getTime() + timeOffset * 60 * 1000);
        if ((timerTime.getMinutes() > 0 || timerTime.getSeconds() || timerTime.getHours() > 0) && !ended) {
            element.innerText = `${zeroPad(timerTime.getHours())}:${zeroPad(timerTime.getMinutes())}:${zeroPad(timerTime.getSeconds())}`
        }
    } else if (!status && !ended) {
        let tempRemain = new Date(timerRemain);
        let timerTime = new Date(tempRemain.getTime() + timeOffset * 60 * 1000);
        element.innerText = `${zeroPad(timerTime.getHours())}:${zeroPad(timerTime.getMinutes())}:${zeroPad(timerTime.getSeconds())}`
    } else {
        element.innerText = "00:00:00";
    }
}

function setTimer() {
    const e = document.getElementById('settime-text');
    const val = {timerTime: e.value};

    if (val.timerTime) {
        fetch('/api/timer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });
    }
}

function addTimer() {
    const e = document.getElementById('addtime-text');
    const val = {timerTime: e.value};

    if (val.timerTime) {
        fetch('/api/timer/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });
    }
}

function subTimer() {
    const e = document.getElementById('addtime-text');
    const val = {timerTime: e.value * -1};

    if (val.timerTime) {
        fetch('/api/timer/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });
    }
}

function startTimer() {
    fetch('/api/klausur/getBody', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(data.length===0){
                alert('Laden Sie die Klausur');
            }else{
                fetch('/api/timer/start');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function resetTimer() {
    fetch('/api/timer/reset');
}

/**
 *  Exec Timer
 */

getTime();

let timerSync = setInterval(() => {
    getTime();
}, 1000)
