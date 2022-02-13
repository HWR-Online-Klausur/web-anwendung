const mongoose = require('mongoose');
const KlausurService = require('../Service/klausur.service')
const Klausur = require('./models/klausur.model')

//Create connection
const connectDB = async() => {
    if (process.env.DB_URI === undefined || process.env.DB_URI === '') {
        throw "DB_URI NOT SET"
    } else {
        await mongoose.connect(process.env.DB_URI + '/onlineKlausur', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(async () => {
            console.log("Erfolgreiche Datenbankverbindung");
            await Klausur.find({
                finished: false
            }, (error, result) => {
                for (const k of result) {
                    KlausurService.setKlausur(k._id, {
                        titel: k.titel,
                        modul: k.modul,
                        dozent: k.dozent,
                        aufgaben: k.aufgaben
                    })
                    KlausurService.createTimer(k._id)
                }
            })
        }).catch((e) => {
            console.log("Fehler beim Verbinden mit der Datenbank");
            console.log(e);
        });
    }
}

module.exports = {
    connectDB
}
