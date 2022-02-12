const mongoose = require('mongoose');


//Create connection
const connectDB = async() => {
    if (process.env.DB_URI === undefined || process.env.DB_URI === '') {
        throw "DB_URI NOT SET"
    } else {
        await mongoose.connect(process.env.DB_URI + '/onlineKlausur', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(() => {
            console.log("Erfolgreiche Datenbankverbindung");
        }).catch((e) => {
            console.log("Fehler beim Verbinden mit der Datenbank");
            console.log(e);
        });
    }
}

module.exports = {
    connectDB
}
