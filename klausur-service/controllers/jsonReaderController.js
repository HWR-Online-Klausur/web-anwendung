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
function checkFolder(req, res, next)
{
    fs.stat('./klausuren', function (err) {
        if (!err) {
            next()
        } else if (err.code === 'ENOENT') {
            fs.mkdirSync('./klausuren');
            next()
        }
    });
}


function uploadJSON(req, res, next)
{
    upload(req, res, async function (err) {
        let filedata = req.file;
        if (filedata === undefined) {
            return next(apiError.badRequest('Etwas ist schief gelaufen. Bitte versuche es erneut'));
        } else {
            const FileName = req.file.filename;
            const path = `./klausuren/${FileName}`;
            const k = jsonRead(path);
            jsonDelete(path);

            await new Klausur({
                'titel': k.getTitel(),
                'modul': k.getModul(),
                'dozent': 'DOZENT_ID', //req.dozentID, // FROM MIDDLEWARE
                'aufgaben': k.getAufgaben()
            }).save().then(kDB => {
                const id = kDB._id
                KlausurService.setKlausur(id, k)
                KlausurService.createTimer(id)
                res.send({klausurID: id})
            }).catch((e) => {
                console.log(e)
                next(apiError.unprocessableEntity('Something went wrong while saving the klausur'))
            })
        }

    })
}


module.exports = {
    checkFolder,
    uploadJSON
}
