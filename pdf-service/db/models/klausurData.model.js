const mongoose = require('mongoose');

//Define a schema
const KlausurDataSchema = new mongoose.Schema({
    klausurID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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
        antworten:[{
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
    zeitpunkt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

KlausurDataSchema.pre('save', function (next) {
    let user = this

    user.zeitpunkt = Date.now()

    next()
})

//Create Model
const KlausurData = mongoose.model('KlausurData', KlausurDataSchema);

//Export Model
module.exports = KlausurData;
