const apiError = require('../errorHandl/apiError');
const {klausurHTML, klausur} = require("../klausur-parser");
const Klausur = require('../db/models/klausur.model')

class KlausurController{

    // TODO: Stop Bedingung zum löschen der

    //  "123": {
    //      status: false,
    //      'klausur': []
    //   }
    klausurList = {}

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

                this.klausurList[req.body.klausurID] = {
                    status: false,
                    'klausur': kHTML.getKlausurHTML()
                }

                if (this.klausurList[req.body.klausurID].klausur.length === 0) {
                    this.klausurList[req.body.klausurID].status = false;
                    return next(apiError.notFound('JSON not found'));
                } else {
                    this.klausurList[req.body.klausurID].status = true;
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
        const klausur = this.klausurList[klausurID];

        if (klausur) {
            res.send({klausurStatus: klausur.status});
        } else {
            res.send({klausurStatus: false})
        }
    }

    getBody = (req,res, next) => {
        const klausurID = req.session.klausurID;
        const klausur = this.klausurList[klausurID];

        if (klausur) {
            res.send(klausur.klausur);
        } else {
            return next(apiError.notFound('Klausur not found'));
        }
    }
}

module.exports = new KlausurController();
