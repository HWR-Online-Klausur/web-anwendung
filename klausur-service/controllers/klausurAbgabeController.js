const apiError = require('../errorHandl/apiError');
const klausurData = require("../db/models/klausurData.model");
const axios = require("axios");


class klausurAbgabeController {
    //TODO:überlegen wie wir Daten speicher. Vllt id's ändern oder so
    async saveKlausurData(req,res,next){
        //All data are in req.body
        console.log(req.body)
        // if (req.method === 'POST'){
        //     let data;
        //     try{
        //         data = req.body;
        //     }catch (_){
        //         return next(apiError.badRequest('Etwas ist schief gelaufen'));
        //     }
        //
        //     if(data){
        //         //I'm not sure about klausurData(data)
        //         await new klausurData(data)
        //             .save((err) => {
        //                 if (err) {
        //                     if (err.name === 'MongoError' && err.code === 11000) {
        //                         // Duplicate mail
        //                         return next(apiError.unprocessableEntity('Dieser Klausur existiert bereits'));
        //                     }
        //                     // Some other error
        //                     return next(apiError.unprocessableEntity('Fehler beim Speichern der Klausur'));
        //                 }
        //                 res.status(200).json('Speicherung erfolgreich abgeschlossen');
        //             })
        //     }else{
        //         return next(apiError.badRequest('Daten sind nicht eingegeben, bitte wiederholen Sie die Anfrage'));
        //     }
        // }else{
        //     return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
        // }
    }

    downloadKlausur = async (req, res, next) => {
        let klausurID, matrnr;
        try {
            klausurID = req.body.klausurID
            matrnr = req.body.matrikelnummer
        } catch (_) {
            return next(apiError.badRequest('Etwas ist schief gelaufen'));
        }

        if(klausurID && matrnr){
            klausurData.findOne({
                'matrikelnummer': matrnr,
                'klausurID': klausurID
            }).then((kData) => {
                const id = kData._id

                axios.get(process.env.PDF_SERVICE_URI + '/get/' + id)
                    .then((data) => {
                        const file = data.data
                        res.setHeader('Content-Disposition', `attachment; ${kData.name}.pdf`)
                        res.pipe(file)
                    })
            })
        }else{
            return next(apiError.badRequest('Daten sind nicht eingegeben, bitte wiederholen Sie die Anfrage'));
        }
    }
}

module.exports = new klausurAbgabeController();
