const express = require('express');
const app = express();

const { connectDB } = require('./db');
const {uploadJSON, checkFolder} = require('./jsonRead');
const {apiGetTime, apiSetTime, apiStartTimer,
    konvertTime, apiResetTimer, apiAddTime, setTime} = require('./sync-timer')
const {klausur} = require('./klausur-parser');

//const router = require('./routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const userController = require('./controllers/userController');
const klausurAbgabeController = require('./controllers/klausurAbgabeController');
//we need multer and upload just for /api/klausurData/saveKlausurData. I have not found another solution
const multer  = require('multer')
const upload = multer()


const port = 3000;

//region Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/static"));
//app.use('/api',router);
//endregion Middleware


let klausurStatus = false;

//should we move this function? Where?
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

app.post('/api/klausur/jsonRead', checkFolder, uploadJSON);
app.get('/api/klausur/klausurStatus', (req,res)=>{
    res.send(klausurStatus);
})
app.post('/api/klausur/setTime', (req, res)=>{
        let stunden = req.body.stunden;
        let minuten = req.body.minuten;
        let time = konvertTime(stunden, minuten);
        setTime(time);
        res.sendStatus(200);
})
app.get('/api/klausur/getBody', (req, res) => {
    let data = klausur.getKlausurHTML();
    res.send(data);
});

app.get('/api/timer', apiGetTime);
app.get('/api/timer/start',changeStatus, apiStartTimer);
app.get('/api/timer/reset', apiResetTimer);
app.post('/api/timer', apiSetTime);
app.post('/api/timer/add', apiAddTime);

app.post('/api/data/addUser',userController.addUser);
app.post('/api/data/deleteUser',userController.deleteUser);
app.get('/api/data/getAllUser',userController.findAllUser);
app.get('/api/data/getUpdatePing',userController.getUpdatePing);


app.post('/api/klausurData/saveKlausurData',upload.none(),klausurAbgabeController.saveKlausurData);


//Error handler. Should always be last middleware!
app.use(errorHandler);


const start = async () => {
    try {
        await connectDB();
        await app.listen(port);
    } catch (e) {
        console.log(e);
    }
}

start().then(()=>{
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
});
