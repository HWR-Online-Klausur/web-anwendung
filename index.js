const express = require('express');
const app = express();

const port = 3000;

const { connectDB } = require('./db');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');

//region Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/static"));
app.use('/api',router);
//endregion Middleware



//Error handler. Should always be last middleware!
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB();
        await app.listen(port);
    } catch (e) {
        console.log(e);
    }
}

start().then(()=>{
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
});
