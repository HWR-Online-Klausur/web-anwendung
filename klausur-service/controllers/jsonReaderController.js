const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const multer = require('multer');
const {klausur} = require('../klausur-parser');
const apiError = require('../errorHandl/apiError');
const Klausur = require('../db/models/klausur.model')
const mongoose = require('mongoose');
const KlausurService = require('../Service/klausur.service')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'klausuren')
    },
    filename: function (req, file, cb) {
        const FileName = "tmp" + uuidv4() + ".json";
        cb(null, FileName)
    }
})

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/json") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter}).single("jsonKlausur");


function jsonRead(path) {
    let rawdata = fs.readFileSync(path);
    let klausurJson = JSON.parse(rawdata);
    //k enthält die notwendige JSON
    let k = new klausur(klausurJson);
    return k;
}

function jsonDelete(path) {
    try {
        fs.unlinkSync(path)
    } catch (err) {
        console.error(err)
    }
}


//Stellt sicher, dass Ordner "klausuren" da ist. Wenn nicht - erstellt es.
function checkFolder(req, res, next) {
    fs.stat('./klausuren', function (err) {
        if (!err) {
            next()
        } else if (err.code === 'ENOENT') {
            fs.mkdirSync('./klausuren');
            next()
        }
    });
}


function uploadJSONForm(req, res, next) {
    upload(req, res, async function (err) {
        let filedata = req.file;
        if (filedata === undefined) {
            return next(apiError.badRequest('Etwas ist schief gelaufen. Bitte versuche es erneut'));
        } else {
            const FileName = req.file.filename;
            const path = `./klausuren/${FileName}`;
            const k = jsonRead(path);
            jsonDelete(path);

            await saveKlausur(k, req, res, next)
        }
    })
}

async function uploadJSON(req, res, next) {
    let klausurJSON;

    try {
        klausurJSON = req.body
    } catch (_) {
        return next(apiError.badRequest('Etwas ist schief gelaufen. Bitte versuche es erneut'));
    }

    if (klausurJSON) {
        const k = new klausur(klausurJSON);
        await saveKlausur(k, req, res, next);
    } else {
        return next(apiError.badRequest('Etwas ist schief gelaufen. Bitte versuche es erneut'));
    }
}

async function saveKlausur(klausur, req, res, next) {
    if (klausur.getID()) {
        await Klausur.findOneAndUpdate({
            _id: klausur.getID()
        }, {
            'titel': klausur.getTitel(),
            'modul': klausur.getModul(),
            'dozent': req.session.DozentDBID,
            'aufgaben': klausur.getAufgaben()
        }).then(() => res.sendStatus(200))
            .catch(() => next(apiError.unprocessableEntity('Something went wrong while saving the klausur')))
    } else {
        await new Klausur({
            'titel': klausur.getTitel(),
            'modul': klausur.getModul(),
            'dozent': req.session.DozentDBID,
            'aufgaben': klausur.getAufgaben()
        }).save().then(kDB => {
            const id = kDB._id
            KlausurService.setKlausur(id, k)
            KlausurService.createTimer(id)
            res.send({klausurID: id})
        }).catch(() => {
            next(apiError.unprocessableEntity('Something went wrong while saving the klausur'))
        })
    }
}

module.exports = {
    checkFolder,
    uploadJSON,
    uploadJSONForm
}
