const apiError = require('../errorHandl/apiError');
const klausurData = require("../db/models/klausurData.model");
const Klausur = require('../db/models/klausur.model');
require("../db/models/klausur.model");
const axios = require("axios");
const mongoose = require("mongoose");


class klausurAbgabeController {
    async saveKlausurData(req, res, next) {
        //console.log(req.body)
        if (req.method === 'POST'){
            let klausurID, name, matrikelnummer, aufgaben, data;
            try{
                klausurID = req.session.klausurID;
                name = req.body.name;
                matrikelnummer = req.body.matrikelnummer;
                aufgaben = req.body.aufgaben;
                if (req.session && req.session.klausurID){
                    data = await Klausur.findOne({
                        _id: req.session.klausurID
                    }).then((data)=>{
                        if (data){
                            return data
                        }
                    }).catch(()=>{})
                }
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(data){
                if (data.titel && data.modul && data.dozent){
                    await new klausurData({
                        'klausurID': klausurID,
                        'titel': data.titel,
                        'modul': data.modul,
                        'dozent': data.dozent,
                        'name': name,
                        'matrikelnummer': matrikelnummer,
                        'aufgaben': aufgaben
                    })
                        .save((err) => {
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    // Duplicate matrikelnummer
                                    return next(apiError.unprocessableEntity('Dieser Klausur existiert bereits'));
                                }
                                // Some other error
                                console.log(err)
                                return next(apiError.unprocessableEntity('Fehler beim Speichern der Klausur'));
                            }
                            res.status(200).json('Speicherung erfolgreich abgeschlossen');
                        })
                }else{
                    return next(apiError.badRequest('Daten sind nicht eingegeben, bitte wiederholen Sie die Anfrage'));
                }
            }else{
                return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
            }
        }
    }

    downloadKlausur = async (req, res, next) => {
        let klausurID, matrnr;
        try {
            klausurID = String(req.body.klausurID)
            matrnr = String(req.body.matrikelnummer)
        } catch (_) {
            return next(apiError.badRequest('Etwas ist schief gelaufen'));
        }

        if (klausurID && matrnr) {
            klausurData.findOne({
                'matrikelnummer': matrnr,
                'klausurID': klausurID
            }).then((kData) => {
                const id = kData._id

                axios.get(process.env.PDF_SERVICE_URI + '/get/' + id, {
                    responseType: 'stream'
                })
                    .then((data) => {
                        data.data.pipe(res)
                    })
                    .catch(() => {
                    })
            }).catch(() => {
                return next(apiError.notFound('Keine Klausur mit den daten gefunden'))
            })
        } else {
            return next(apiError.badRequest('Daten sind nicht eingegeben, bitte wiederholen Sie die Anfrage'));
        }
    }
}

module.exports = new klausurAbgabeController();
