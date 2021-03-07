const express = require('express');
const app = express();

const {uploadJSON} = require('./jsonRead');
const {apiGetTime, apiSetTime, apiStartTimer, apiStopTimer} = require('./sync-timer')

const port = 3000;

app.use(express.json());

app.use(express.static(__dirname + "/static"));

app.post('/api/jsonRead', uploadJSON);

app.get('/api/timer', apiGetTime);
app.get('/api/timer/start', apiStartTimer);
app.get('/api/timer/stop', apiStopTimer);
app.post('/api/timer', apiSetTime);

app.listen(port, () => {
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
})
