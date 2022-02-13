const mongoose = require('mongoose');

//Define a schema
const KlausurSchema = new mongoose.Schema({
    titel:{
        type: String,
        required: true,
        trim: true
    },
    modul:{
        type: String,
        trim: true,
        required: true
    },
    dozent:{
        type: String, //mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Dozent'
    },
    aufgaben: [{
        fragestellung:{
            type: String,
            required: true
        },
        antworten: [{
            type: String,
            required: true
        }],
        id:{
            type: String,
            required: true
        },
        methode:{
            type: Number,
            required: true
        }
    }],
    finished: {
        type: Boolean,
        default: false
    }
});


//Create Model
const Klausur = mongoose.model('Klausur', KlausurSchema);

//Export Model
module.exports = Klausur;
