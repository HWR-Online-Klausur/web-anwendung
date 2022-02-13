const Student = require('../db/models/student.model');
const Dozent = require('../db/models/dozent.model');
const apiError = require('../errorHandl/apiError');
const Klausur = require("../db/models/klausur.model");

class UserController {
    async addStudent(req, res, next){
        if (req.method === 'POST'){
            let name, matrikelnummer, klausurID;
            try{
                name = req.body.name;
                matrikelnummer = req.body.matrikelnummer;
                klausurID = req.session.klausurID
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(name && matrikelnummer && klausurID){
                await new Student({
                    'name': name,
                    'matrikelnummer': matrikelnummer,
                    'klausurID': klausurID
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

    async CheckKlausurID(req, res, next){
        if (req.session && req.session.klausurID){
            await Klausur.findOne({
                _id: req.session.klausurID
            }).then((data)=>{
                if (data){
                    next();
                }else{
                    res.redirect('/');
                }
            }).catch(()=>{
                res.redirect('/');
            })
        }else {
            res.redirect('/');
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
                    res.status(200).json('User existiert nicht mehr');
                })
            }
        }else{
            return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
        }

    }

    async findAllStudents(req, res, next){
        let klausurID;
        try{
            klausurID = req.body.klausurID;
        }catch (_){
            return next(apiError.badRequest('Etwas ist schief gelaufen'));
        }
        await Student.find({'klausurID': klausurID}, (err, data) =>{
            if(err){
                return next(apiError.internalServerError('Unerwarteter Fehler'));
            }
            res.status(200).send(data);
        });
    }

    async addStudentKlausurID(req, res, next){
        if (req.method === 'POST'){
            let klausurID;
            try{
                klausurID = req.body.klausurID;
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(klausurID){
                await Klausur.findOne({
                    _id: klausurID
                }, (err) =>{
                    if(err){
                        return next(apiError.notFound('ID not found'));
                    }
                    req.session.klausurID = klausurID;
                    req.session.save();
                    res.sendStatus(200);
                }).catch(()=>{})

            }else{
                return next(apiError.badRequest('Die Klausur ID wurde nicht gefunden'));
            }
        }else{
            return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
        }
    }

    async addDozent(req, res, next){
        if (req.method === 'POST'){
            let mail, password, name;
            try{
                mail = req.body.mail;
                password = req.body.password;
                name = req.body.name;
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if(mail && password && name){
                await new Dozent({
                    'mail': mail,
                    'password': password,
                    'name': name
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
                return next(apiError.badRequest('die Mail, der Name oder Password sind nicht angegeben, bitte wiederholen Sie die Anfrage'));
            }
        }else{
            return next(apiError.methodNotAllowed('Methode nicht erlaubt'));
        }
    }

    async loginDozent(req, res, next){
        if (req.method === 'POST'){
            let mail, password;

            try{
                mail = req.body.mail;
                password = req.body.password;
            }catch (_){
                return next(apiError.badRequest('Etwas ist schief gelaufen'));
            }

            if (mail && password) {

                    Dozent.findByCredentials(mail, password)
                        .then(user =>{
                            return user.generateSession();
                        })
                        .then(id =>{
                            req.session.DozentID = id;
                            req.session.save();
                            res.sendStatus(200);
                        })
                        .catch(()=>{
                            return next(apiError.notFound('User wurde nicht gefunden!'))
                    })

            } else {
                return next(apiError.badRequest('Mail oder Password sind falsh'));
            }
        }else{
            return next(apiError.badRequest('Methode nicht erlaubt'));
        }

    }

    async CheckDozentID(req, res, next){
        if (req.session && req.session.DozentID){
            await Dozent.findOne({
                "session.token": req.session.DozentID
            }).then((data)=>{
                if (data){
                    next();
                }else{
                    res.redirect('/login.html');
                }
            }).catch(()=>{
                res.redirect('/login.html');
            })
        }else {
            res.redirect('/login.html');
        }
    }
}

module.exports = new UserController();
