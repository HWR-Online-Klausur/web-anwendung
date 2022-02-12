const Student = require('../db/models/student.model');
const apiError = require('../errorHandl/apiError');

let updatePing = false;

class UserController {
    async addStudent(req, res, next){
        if (req.method === 'POST'){
            let name, matrikelnummer;
            try{
                name = req.body.name;
                matrikelnummer = req.body.matrikelnummer;
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(name && matrikelnummer){
                await new Student({
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
                    updatePing = true;
                    res.status(200).json('Registrierung erfolgreich abgeschlossen');
                })
            }else{
                return next(apiError.badRequest('der Name oder Matrikelnummer sind nicht angegeben, bitte wiederholen Sie die Anfrage'));
            }
        }else{
            return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
        }
    }

    async deleteStudent(req, res, next){
        if (req.method === 'POST'){
            let name, matrikelnummer;
            try{
                name = req.body.name;
                matrikelnummer = req.body.matrikelnummer;
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(name && matrikelnummer){
                await Student.deleteOne({
                    'name': name,
                    'matrikelnummer': matrikelnummer
                }, (err) => {
                    if(err){
                        return next(apiError.unprocessableEntity('Fehler beim Löschen des Users'));
                    }
                    updatePing = true;
                    res.status(200).json('User existiert nicht mehr');
                })
            }
        }else{
            return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
        }

    }

    async findAllStudents(req, res, next){
        await Student.find({}, (err, data) =>{
            if(err){
                return next(apiError.internalServerError('Unerwarteter Fehler'));
            }
            res.status(200).send(data);
            updatePing = false;
        });
    }

    async getUpdatePing(req,res,next){
        res.send(updatePing);
        updatePing=false;
    }
}

module.exports = new UserController();
