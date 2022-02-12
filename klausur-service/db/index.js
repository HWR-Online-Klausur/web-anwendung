const mongoose = require('mongoose');


//Create connection
const connectDB = async() => {
    await mongoose.connect('mongodb://localhost:27017/onlineKlausur', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(()=>{
        console.log("Erfolgreiche Datenbankverbindung");
    }).catch((e) =>{
        console.log("Fehler beim Verbinden mit der Datenbank");
        console.log(e);
    });
}

module.exports = {
    connectDB
}
