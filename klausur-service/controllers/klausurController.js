const apiError = require('../errorHandl/apiError');
const {klausurHTML} = require("../klausur-parser");
const timerController = require('../controllers/timerController');

let klausurStatus = false;


class KlausurController{
    changeStatus =  (req,res, next) =>{
        let data = klausurHTML.getKlausurHTML();
        if(data.length===0){
            klausurStatus = false;
            apiError.notFound('JSON not found')
        }else{
            klausurStatus = true;
            next();
        }

    }

    klausurStatusSend = (req,res) => {
        res.send(klausurStatus);
    }

    setTime = (req,res) => {
        let stunden = req.body.stunden;
        let minuten = req.body.minuten;
        let time = timerController.convertTime(stunden, minuten);
        timerController.setTime(time);
        res.sendStatus(200);
    }

    getBody = (req,res) => {
        let data = klausurHTML.getKlausurHTML();
        res.send(data);
    }
}

module.exports = new KlausurController();
