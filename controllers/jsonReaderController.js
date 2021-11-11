const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const { klausur, aufgabenParse } = require('../klausur-parser');
const apiError = require('../errorHandl/apiError');


class JsonReaderController{
    //Stellt sicher, dass Ordner "klausuren" da ist. Wenn nicht - erstellt es.
    checkFolder(req,res, next){
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

    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'klausuren')
        },
        filename: function (req, file, cb) {
            const FileName = "tmp"+uuidv4()+".json";
            cb(null, FileName)
        }
    })

    fileFilter = (req, file, cb) => {

        if(file.mimetype === "application/json"){
            cb(null, true);
        }
        else{
            cb(null, false);
        }
    }

    upload = multer({storage: this.storage, fileFilter: fileFilter}).single("jsonKlausur");

    uploadJSON(req,res, next){
        this.upload(req, res, function (err) {
            let filedata = req.file;
            if(filedata === undefined){
                return next(apiError.badRequest('Etwas ist schief gelaufen. Bitte versuche es erneut'));
            }else{
                const FileName = req.file.filename;
                const path = `./klausuren/${FileName}`;
                this.jsonRead(path);
                this.jsonDelete(path);

                // IN DB EINTRAGEN
                res.sendStatus(200);
            }

        })
    }

    jsonRead(path){
        let rawdata = fs.readFileSync(path);
        let klausurJson = JSON.parse(rawdata);
        //klausur enthält die notwendige JSON
        klausur.setKlausur(klausurJson);
        aufgabenParse();

    }

    jsonDelete(path){
        try {
            fs.unlinkSync(path)
        } catch(err) {
            console.error(err)
        }
    }
}

module.exports = new JsonReaderController();
