const fs = require('fs');
const multer = require('multer');

const FileName = "tmp"+Date.now()+".json";
const path = `./klausuren/${FileName}`;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'klausuren')
    },
    filename: function (req, file, cb) {
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
            res.sendStatus(200);
        }else{
            jsonRead();
            res.sendStatus(400);
        }

    })
}

//Die Datei wird gelesen
function jsonRead(){
    let rawdata = fs.readFileSync(path);
    let klausur = JSON.parse(rawdata);
    console.log(klausur);
    jsonDelete();
}

//Die Datei löschen
function jsonDelete(){
    try {
        fs.unlinkSync(path)
    } catch(err) {
        console.error(err)
    }
}


module.exports = {
    uploadJSON
}
