const express = require('express');
const app = express();

const port = 3000;

const {connectDB} = require('./db');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');

//region Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/static"));
app.use('/api', router);
//endregion Middleware


//Error handler. Should always be last middleware!
app.use(errorHandler);

const start = async () => {
    await connectDB().then(async () => {
        await app.listen(port);
    });
}

start().then(() => {
    console.log(`Der Server wurde gestartet! http://localhost:${port}`);
}).catch(e => {
    console.error(e)
});
