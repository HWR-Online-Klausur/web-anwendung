const element = document.getElementById('timer-text');
const dozentElement = document.getElementById('timer-text-dozent');

let timerRemain;
let timeOffset;
let status;
let ended = false;

const params = new URLSearchParams(window.location.search);
const klausurID = params.get("ID")

function getTime() {
    if (element) {
        fetch('/api/timer')
            .then(r => r.json())
            .then(r => {
                timerRemain = r.timerRemain;
                timeOffset = r.timeOffset;
                ended = r.finished;
                status = r.status;
                setText(element);
            });
    } else if (dozentElement){

        const obj = {'klausurID': params.get("ID")}

        fetch('/api/timer/apiGetTime', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(r => r.json())
            .then(r => {
                timerRemain = r.timerRemain;
                timeOffset = r.timeOffset;
                ended = r.finished;
                status = r.status;
                setText(dozentElement);
            });
    }
}

const zeroPad = (num) => String(num).padStart(2, '0')

function setText(pElement) {
    if (status && !ended) {
        let tempRemain = new Date(timerRemain);
        let timerTime = new Date(tempRemain.getTime() + timeOffset * 60 * 1000);
        if ((timerTime.getMinutes() > 0 || timerTime.getSeconds() || timerTime.getHours() > 0) && !ended) {
            pElement.innerText = `${zeroPad(timerTime.getHours())}:${zeroPad(timerTime.getMinutes())}:${zeroPad(timerTime.getSeconds())}`
        }
    } else if (!status && !ended) {
        let tempRemain = new Date(timerRemain);
        let timerTime = new Date(tempRemain.getTime() + timeOffset * 60 * 1000);
        pElement.innerText = `${zeroPad(timerTime.getHours())}:${zeroPad(timerTime.getMinutes())}:${zeroPad(timerTime.getSeconds())}`
    } else {
        pElement.innerText = "00:00:00";
    }
}

function setTimer() {
    const e = document.getElementById('settime-text');
    const val = {timerTime: e.value, klausurID: klausurID};

    if (val.timerTime) {
        fetch('/api/timer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        }).catch(() => {});
    }
}

function addTimer() {
    const e = document.getElementById('addtime-text');
    const val = {timerTime: e.value, klausurID: klausurID};

    if (val.timerTime) {
        fetch('/api/timer/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        }).catch(() => {});
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
                fetch('/api/timer/start', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        klausurID: klausurID
                    })
                }).catch(() => {});
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function resetTimer() {
    fetch('/api/timer/reset', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
            body: JSON.stringify({
            klausurID: klausurID
        })
    }).catch(() => {});
}

/**
 *  Exec Timer
 */

getTime();

let timerSync = setInterval(() => {
    getTime();
}, 1000)
