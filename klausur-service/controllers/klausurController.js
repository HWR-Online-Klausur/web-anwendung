const apiError = require('../errorHandl/apiError');
const {klausurHTML, klausur} = require("../klausur-parser");
const Klausur = require('../db/models/klausur.model')
const KlausurService = require('../Service/klausur.service')
const Student = require("../db/models/student.model");

class KlausurController{

    changeStatus = async (req,res, next) => {
        // ID der Klausur in body
        const klausurID = req.body.klausurID

        if (klausurID) {
            const kData = await Klausur.findOne({
                _id: klausurID
            })

            if (kData) {
                let k = new klausur()
                let kHTML = new klausurHTML()

                k.setKlausur(kData)
                kHTML.aufgabenParse(k.getAufgaben())


                KlausurService.setStatus(klausurID, false)
                KlausurService.setKlausur(klausurID, kHTML.getKlausurHTML())

                if (KlausurService.getKlausur(klausurID).length === 0) {
                    KlausurService.setStatus(klausurID, false)
                    return next(apiError.notFound('JSON not found'));
                } else {
                    KlausurService.setStatus(klausurID, true)
                    next();
                }
            } else {
                return next(apiError.notFound('Klausur not found'))
            }
        } else {
            return next(apiError.badRequest('klausurID not set'))
        }
    }

    klausurStatusSend = (req,res) => {
        const klausurID = req.session.klausurID;
        const klausur = KlausurService.getKlausur(klausurID);

        if (klausur) {
            res.send({klausurStatus: klausur.status});
        } else {
            res.send({klausurStatus: false})
        }
    }

    getBody = (req,res, next) => {
        const klausurID = req.session.klausurID;
        const klausur = KlausurService.getKlausur(klausurID);

        if (klausur) {
            res.send(klausur.klausur);
        } else {
            return next(apiError.notFound('Klausur not found'));
        }
    }

    getAllKlausuren = (req, res, next) => {
        let DozentDBID;
        try{
            DozentDBID = req.session.DozentDBID;
        }catch (_){
            return next(apiError.badRequest('DozentDBID nicht gefunden'));
        }
        Klausur.find({'dozent': DozentDBID}, (err, data) =>{
            if(err){
                return next(apiError.internalServerError('Unerwarteter Fehler'));
            }
            res.status(200).send(data);
        });
    }
}

module.exports = new KlausurController();
