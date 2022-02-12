const express = require('express');
const app = express();


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

module.exports = app;
