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

    getBody = (req,res) => {
        let data = klausurHTML.getKlausurHTML();
        res.send(data);
    }
}

module.exports = new KlausurController();
