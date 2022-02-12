const mongoose = require('mongoose');

//Define a schema
const KlausurDataSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 3,
        trim: true,
        required: true
    },
    matrikelnummer:{
        type: String,
        minlength: 6,
        trim: true,
        required: true,
        unique: true
    },
    aufgaben: [{
        fragestellung:{
            type: String,
            required: true
        },
        antworten:{
            type: String,
            required: true
        }
    }]

});


//Create Model
const KlausurData = mongoose.model('KlausurData', KlausurDataSchema);

//Export Model
module.exports = KlausurData;

