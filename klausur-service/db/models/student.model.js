const mongoose = require('mongoose');

//Define a schema
const StudentSchema = new mongoose.Schema({
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
    klausurID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


//Create Model
const Student = mongoose.model('Student', StudentSchema);

//Export Model
module.exports = Student;

