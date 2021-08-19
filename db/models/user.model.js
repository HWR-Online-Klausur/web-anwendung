const mongoose = require('mongoose');

//Define a schema
const UserSchema = new mongoose.Schema({
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
    }
});


//Create Model
const User = mongoose.model('User', UserSchema);

//Export Model
module.exports = User;

