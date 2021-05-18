const express = require('express');
const app = express();

const {uploadJSON} = require('./jsonRead');
const {apiGetTime, apiSetTime, apiStartTimer,
    konvertTime, apiResetTimer, apiAddTime, setTime} = require('./sync-timer')

const port = 3000;

app.use(express.json());

app.use(express.static(__dirname + "/static"));

app.post('/api/jsonRead', uploadJSON);


let klausurStatus = false;

app.get('/api/klausurStatus', (req,res)=>{
    res.send(klausurStatus);
})

app.post('/api/klausur', (req, res)=>{
        let stunden = req.body.stunden;
        let minuten = req.body.minuten;
        let time = konvertTime(stunden, minuten);
        setTime(time);
        res.sendStatus(200);
})

app.get('/api/timer', apiGetTime);
app.get('/api/timer/start', apiStartTimer);
app.get('/api/timer/reset', apiResetTimer);
app.post('/api/timer', apiSetTime);
app.post('/api/timer/add', apiAddTime);

app.listen(port, () => {
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
})
