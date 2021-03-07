const element = document.getElementById('timer-text');

let timerEnd;
let timerPause;
let status;

function getTime() {
    fetch('/api/timer')
        .then(r => r.json())
        .then(r => {
            timerEnd = new Date(r.timerEnd);
            timerPause = new Date(r.timerLag);
            status = r.status;
            setText();
        });
}

const zeroPad = (num) => String(num).padStart(2, '0')

function setText() {
    if (status) {
        const timerTime = new Date(timerEnd - Date.now());
        element.innerText = `${zeroPad(timerTime.getHours())}:${zeroPad(timerTime.getMinutes())}:${zeroPad(timerTime.getSeconds())}`
    } else {
        const timerTime = new Date(timerPause);
        if (!isNaN(timerTime.getHours())) {
            element.innerText = `${zeroPad(timerTime.getHours())}:${zeroPad(timerTime.getMinutes())}:${zeroPad(timerTime.getSeconds())}`;
        } else {
            element.innerText = "00:00:00";
        }
    }
}

function setTimer() {
    const e = document.getElementById('settime-text');
    const val = { timerTime: e.value };

    if (val) {
        fetch('/api/timer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        });
    }
}

function startTimer() {
    fetch('/api/timer/start');
}
function stopTimer() {
    fetch('/api/timer/stop');
}

/**
 *  Exec Timer
 */

getTime();

let timerSync = setInterval(() => {
    getTime();
}, 5000)

let timer = setInterval(() => {
    setText();
}, 1000);
