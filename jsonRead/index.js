const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');



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
function uploadJSON(req,res){
    upload(req, res, function (err) {
        let filedata = req.file;
        if(filedata === undefined){
            res.sendStatus(400);
        }else{
            const FileName = req.file.filename;
            const path = `./klausuren/${FileName}`;
            jsonRead(path);
            jsonDelete(path);
            res.sendStatus(200);
        }

    })
}

//Die Datei wird gelesen
function jsonRead(path){
    let rawdata = fs.readFileSync(path);
    let klausur = JSON.parse(rawdata);
    //klausur enthält die notwendige JSON
    console.log(klausur);
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
    uploadJSON
}
