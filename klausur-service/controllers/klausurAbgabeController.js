const apiError = require('../errorHandl/apiError');
const klausurData = require("../db/models/klausurData.model");

class klausurAbgabeController {
    //TODO:überlegen wie wir Daten speicher. Vllt id's ändern oder so
    async saveKlausurData(req,res,next){
        //All data are in req.body!
        console.log(req.body);
/* It needs to be configured
        if (req.method === 'POST'){
            let data;
            try{
                data = req.body;
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(data){
                //I'm not sure about klausurData(data)
                await new klausurData(data)
                    .save((err) => {
                        if (err) {
                            if (err.name === 'MongoError' && err.code === 11000) {
                                // Duplicate mail
                                return next(apiError.unprocessableEntity('Dieser Klausur existiert bereits'));
                            }
                            // Some other error
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
 */
    }

}

module.exports = new klausurAbgabeController();
