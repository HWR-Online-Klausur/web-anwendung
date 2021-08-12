const express = require('express');
const app = express();

const {uploadJSON, checkFolder} = require('./jsonRead');
const {apiGetTime, apiSetTime, apiStartTimer,
    konvertTime, apiResetTimer, apiAddTime, setTime} = require('./sync-timer')
const {klausur} = require('./klausur-parser');

const errorHandler = require('./middleware/errorHandlingMiddleware');

const port = 3000;

app.use(express.json());

app.use(express.static(__dirname + "/static"));

app.post('/api/jsonRead', checkFolder, uploadJSON);


let klausurStatus = false;
const changeStatus =  (req,res, next) =>{
    let data = klausur.getKlausurHTML();
    if(data.length===0){
        klausurStatus = false;
        res.status(404).send('JSON not found');
    }else{
        klausurStatus = true;
        next();
    }

}

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
app.get('/api/timer/start',changeStatus, apiStartTimer);
app.get('/api/timer/reset', apiResetTimer);
app.post('/api/timer', apiSetTime);
app.post('/api/timer/add', apiAddTime);

app.get('/api/klausur/getBody', (req, res) => {
    let data = klausur.getKlausurHTML();
        res.send(data);
});

//Error handler. Should always be last middleware!
app.use(errorHandler);


const start = async () => {
    try {
        await app.listen(port);
    } catch (e) {
        console.log(e);
    }
}

start().then(()=>{
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
});
