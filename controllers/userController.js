const User = require('../db/models/user.model');
const apiError = require('../errorHandl/apiError');

class UserController {
    async addUser(req,res,next){
        if (req.method === 'POST'){
            let name, matrikelnummer;
            try{
                name = req.body.name;
                matrikelnummer = req.body.matrikelnummer;
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(name && matrikelnummer){
                await new User({
                    'name': name,
                    'matrikelnummer': matrikelnummer
                })
                    .save((err) => {
                    if (err) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            // Duplicate mail
                            return next(apiError.unprocessableEntity('Dieser User existiert bereits'));
                        }
                        // Some other error
                        return next(apiError.unprocessableEntity('Fehler beim Speichern des Users'));
                    }
                    res.status(200).json('Registrierung erfolgreich abgeschlossen');
                })
            }else{
                return next(apiError.badRequest('der Name oder Matrikelnummer sind nicht angegeben, bitte wiederholen Sie die Anfrage'));
            }
        }else{
            return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
        }
    }

    async deleteUser(req,res,next){
        if (req.method === 'POST'){
            let name, matrikelnummer;
            try{
                name = req.body.name;
                matrikelnummer = req.body.matrikelnummer;
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(name && matrikelnummer){
                await User.deleteOne({
                    'name': name,
                    'matrikelnummer': matrikelnummer
                }, (err) => {
                    if(err){
                        return next(apiError.unprocessableEntity('Fehler beim Löschen des Users'));
                    }
                    res.status(200).json('User existiert nicht mehr');
                })
            }
        }else{
            return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
        }

    }
}

module.exports = new UserController();
