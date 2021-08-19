const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const { klausur, aufgabenParse } = require('../klausur-parser');
const apiError = require('../errorHandl/apiError');


//Stellt sicher, dass Ordner "klausuren" da ist. Wenn nicht - erstellt es.
function checkFolder(req,res, next){
    fs.stat('./klausuren', function(err) {
        if(!err){
            next()
        }
        else if (err.code === 'ENOENT') {
            fs.mkdirSync('./klausuren');
            next()
        }
    });
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'klausuren')
    },
    filename: function (req, file, cb) {
        const FileName = "tmp"+uuidv4()+".json";
        cb(null, FileName)
    }
})

const fileFilter = (req, file, cb) => {

    if(file.mimetype === "application/json"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter}).single("jsonKlausur");

//Datei uploaden
function uploadJSON(req,res, next){
    upload(req, res, function (err) {
        let filedata = req.file;
        if(filedata === undefined){
            return next(apiError.badRequest('Etwas ist schief gelaufen. Bitte versuche es erneut'));
        }else{
            const FileName = req.file.filename;
            const path = `./klausuren/${FileName}`;
            jsonRead(path);
            jsonDelete(path);

            // IN DB EINTRAGEN
            res.sendStatus(200);
        }

    })
}

//Die Datei wird gelesen
function jsonRead(path){
    let rawdata = fs.readFileSync(path);
    let klausurJson = JSON.parse(rawdata);
    //klausur enthält die notwendige JSON
    klausur.setKlausur(klausurJson);
    aufgabenParse();

}

//Die Datei löschen
function jsonDelete(path){
    try {
        fs.unlinkSync(path)
    } catch(err) {
        console.error(err)
    }
}


module.exports = {
    checkFolder,
    uploadJSON
}
